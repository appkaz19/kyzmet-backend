import admin from '../../core/firebase.js';
import { PrismaClient } from '@prisma/client';
import { serialize } from '../../utils/serialize.js';
const prisma = new PrismaClient();

export async function getMyWallet(userId) {
  let wallet = await prisma.wallet.findUnique({
    where: { userId },
    include: { 
      transactions: {
        orderBy: { createdAt: 'desc' },
        take: 20
      }
    }
  });

  if (!wallet) {
    wallet = await prisma.wallet.create({
      data: { userId, balance: 0 },
      include: { transactions: true }
    });
  }

  return serialize(wallet);
}

// Мокап функция для симуляции платежа
async function processMockPayment(paymentMethodId, amount) {
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  const isSuccess = Math.random() > 0.05;

  if (!isSuccess) {
    throw new Error('Платеж отклонен банком');
  }

  const transactionId = `mock_tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  return {
    success: true,
    transactionId,
    status: 'completed',
    amount
  };
}

export async function topUpWallet(userId, amount, paymentMethodId = null) {
  if (amount <= 0) throw new Error('Сумма должна быть положительной');

  if (paymentMethodId) {
    const paymentMethod = await prisma.paymentMethod.findFirst({
      where: { 
        id: paymentMethodId, 
        userId,
        isActive: true 
      }
    });

    if (!paymentMethod) {
      throw new Error('Способ оплаты не найден');
    }

    try {
      const paymentResult = await processMockPayment(paymentMethodId, amount);

      const wallet = await prisma.wallet.update({
        where: { userId },
        data: {
          balance: { increment: amount },
          transactions: {
            create: {
              amount,
              type: 'TOP_UP',
              description: `Пополнение через карту ••••${paymentMethod.last4}`,
              metadata: {
                paymentMethodId,
                transactionId: paymentResult.transactionId,
                cardLast4: paymentMethod.last4,
                cardType: paymentMethod.cardType
              }
            }
          }
        },
        include: { transactions: true }
      });

      await sendWalletNotification(userId, amount, 'top_up');

      return {
        ...serialize(wallet),
        transactionId: paymentResult.transactionId,
        newBalance: wallet.balance
      };

    } catch (error) {
      await prisma.transaction.create({
        data: {
          walletId: (await getMyWallet(userId)).id,
          amount: 0,
          type: 'TOP_UP_FAILED',
          description: `Неудачная попытка пополнения: ${error.message}`,
          metadata: {
            paymentMethodId,
            error: error.message
          }
        }
      });

      throw error;
    }
  }

  const wallet = await prisma.wallet.update({
    where: { userId },
    data: {
      balance: { increment: amount },
      transactions: {
        create: { 
          amount, 
          type: 'TOP_UP',
          description: 'Пополнение кошелька'
        }
      }
    },
    include: { transactions: true }
  });

  await sendWalletNotification(userId, amount, 'top_up');

  return serialize(wallet);
}

export async function spendFromWallet(userId, amount, description = 'Списание с кошелька') {
  if (amount <= 0) throw new Error('Сумма должна быть положительной');

  const wallet = await getMyWallet(userId);
  if (wallet.balance < amount) throw new Error('Недостаточно средств на кошельке');

  const updated = await prisma.wallet.update({
    where: { id: wallet.id },
    data: {
      balance: { decrement: amount },
      transactions: {
        create: { 
          amount: -amount, 
          type: 'SPEND',
          description
        }
      }
    },
    include: { transactions: true }
  });
  
  await sendWalletNotification(userId, amount, 'spend');
  
  return serialize(updated);
}

export async function getTransactionHistory(userId, limit = 50, offset = 0) {
  const wallet = await prisma.wallet.findUnique({
    where: { userId }
  });
  
  if (!wallet) {
    throw new Error('Кошелек не найден');
  }
  
  const transactions = await prisma.transaction.findMany({
    where: { walletId: wallet.id },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: offset
  });
  
  return serialize(transactions);
}

export async function updatePaymentStatus(transactionId, status, metadata = {}) {
  const transaction = await prisma.transaction.findFirst({
    where: {
      metadata: {
        path: ['transactionId'],
        equals: transactionId
      }
    },
    include: { wallet: true }
  });
  
  if (!transaction) {
    throw new Error('Транзакция не найдена');
  }
  
  await prisma.transaction.update({
    where: { id: transaction.id },
    data: {
      metadata: {
        ...transaction.metadata,
        status,
        ...metadata,
        updatedAt: new Date().toISOString()
      }
    }
  });
  
  return true;
}

async function sendWalletNotification(userId, amount, type) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user?.pushToken) {
      let title, body;
      
      switch (type) {
        case 'top_up':
          title = '💰 Кошелек пополнен';
          body = `Ваш баланс увеличился на ${amount} монет`;
          break;
        case 'spend':
          title = '💸 Списание с кошелька';
          body = `С вашего баланса списано ${amount} монет`;
          break;
        default:
          title = '💰 Операция с кошельком';
          body = `Операция на сумму ${amount} монет выполнена`;
      }

      await admin.messaging().send({
        token: user.pushToken,
        notification: { title, body },
        data: {
          type: 'wallet',
          amount: amount.toString(),
          operation: type
        }
      });
    }
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
}