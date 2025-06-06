import { PrismaClient } from '@prisma/client';
import { serialize } from '../../utils/serialize.js';

const prisma = new PrismaClient();

function detectCardType(cardNumber) {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  
  if (cleanNumber.startsWith('4')) return 'visa';
  if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'mastercard';
  if (cleanNumber.startsWith('8600')) return 'uzcard';
  if (cleanNumber.startsWith('9860')) return 'humo';
  
  return 'unknown';
}

function generateMockToken(cardNumber, cardHolder) {
  const timestamp = Date.now();
  const hash = Buffer.from(`${cardNumber}-${cardHolder}-${timestamp}`).toString('base64');
  return `mock_${hash.substring(0, 20)}`;
}

function validateCard(cardNumber, expiryDate, cvv) {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  
  if (cleanNumber.length < 13 || cleanNumber.length > 19) {
    throw new Error('Неверный номер карты');
  }
  
  const [month, year] = expiryDate.split('/');
  const currentDate = new Date();
  const expiryDateObj = new Date(2000 + parseInt(year), parseInt(month) - 1);
  
  if (expiryDateObj < currentDate) {
    throw new Error('Срок действия карты истек');
  }
  
  if (cvv.length < 3 || cvv.length > 4) {
    throw new Error('Неверный CVV код');
  }
  
  return true;
}

export async function getPaymentMethods(userId) {
  const methods = await prisma.paymentMethod.findMany({
    where: { 
      userId,
      isActive: true 
    },
    orderBy: [
      { isDefault: 'desc' },
      { createdAt: 'desc' }
    ]
  });

  return serialize(methods);
}

export async function addPaymentMethod(userId, cardData) {
  const { cardNumber, cardHolder, expiryDate, cvv } = cardData;
  
  validateCard(cardNumber, expiryDate, cvv);
  
  const cleanNumber = cardNumber.replace(/\s/g, '');
  const last4 = cleanNumber.slice(-4);
  const cardType = detectCardType(cleanNumber);
  
  const existingCard = await prisma.paymentMethod.findFirst({
    where: {
      userId,
      last4,
      cardType,
      isActive: true
    }
  });
  
  if (existingCard) {
    throw new Error('Карта с такими данными уже добавлена');
  }
  
  const mockToken = generateMockToken(cleanNumber, cardHolder);
  
  const existingMethodsCount = await prisma.paymentMethod.count({
    where: { userId, isActive: true }
  });
  
  const isFirstCard = existingMethodsCount === 0;
  
  const [month, year] = expiryDate.split('/');
  
  const method = await prisma.paymentMethod.create({
    data: {
      userId,
      token: mockToken,
      last4,
      cardType,
      expiryMonth: parseInt(month),
      expiryYear: 2000 + parseInt(year),
      cardHolder: cardHolder.toUpperCase(),
      isDefault: isFirstCard,
      providerType: 'mock',
      providerId: mockToken
    }
  });

  return serialize(method);
}

export async function deletePaymentMethod(userId, methodId) {
  const method = await prisma.paymentMethod.findFirst({
    where: { 
      id: methodId, 
      userId,
      isActive: true 
    }
  });

  if (!method) {
    throw new Error('Карта не найдена');
  }

  if (method.isDefault) {
    const otherMethod = await prisma.paymentMethod.findFirst({
      where: {
        userId,
        id: { not: methodId },
        isActive: true
      }
    });

    if (otherMethod) {
      await prisma.paymentMethod.update({
        where: { id: otherMethod.id },
        data: { isDefault: true }
      });
    }
  }

  await prisma.paymentMethod.update({
    where: { id: methodId },
    data: { isActive: false }
  });
}

export async function setDefaultPaymentMethod(userId, methodId) {
  const method = await prisma.paymentMethod.findFirst({
    where: { 
      id: methodId, 
      userId,
      isActive: true 
    }
  });

  if (!method) {
    throw new Error('Карта не найдена');
  }

  await prisma.paymentMethod.updateMany({
    where: { userId },
    data: { isDefault: false }
  });

  await prisma.paymentMethod.update({
    where: { id: methodId },
    data: { isDefault: true }
  });
}