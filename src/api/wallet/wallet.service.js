import admin from '../../core/firebase.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getMyWallet(userId) {
  let wallet = await prisma.wallet.findUnique({
    where: { userId },
    include: { transactions: true }
  });

  if (!wallet) {
    wallet = await prisma.wallet.create({
      data: { userId, balance: 0 }
    });
  }

  return wallet;
}

export async function topUpWallet(userId, amount) {
  if (amount <= 0) throw new Error('Amount must be positive');

  wallet = await prisma.wallet.update({
    where: { userId },
    data: {
      balance: { increment: amount },
      transactions: {
        create: { amount, type: 'TOP_UP' }
      }
    },
    include: { transactions: true }
  });

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user?.pushToken) {
    await admin.messaging().send({
      token: user.pushToken,
      notification: {
        title: '💰 Wallet Top-Up',
        body: `Your balance increased by ₸${amount}`,
      },
      data: {
        type: 'wallet',
      }
    });
  }

  return wallet;
}

export async function spendFromWallet(userId, amount) {
  if (amount <= 0) throw new Error('Amount must be positive');

  const wallet = await getMyWallet(userId);
  if (wallet.balance < amount) throw new Error('Insufficient balance');

  return await prisma.wallet.update({
    where: { id: wallet.id },
    data: {
      balance: { decrement: amount },
      transactions: {
        create: { amount: -amount, type: 'SPEND' }
      }
    },
    include: { transactions: true }
  });
}
