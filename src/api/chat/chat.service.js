import admin from '../../core/firebase.js';
import { PrismaClient } from '@prisma/client';
import { serialize } from '../../utils/serialize.js';
const prisma = new PrismaClient();

export async function startChat(userId, targetUserId) {
  if (userId === targetUserId) {
    throw new Error('Cannot start chat with yourself');
  }

  let chat = await prisma.chat.findFirst({
    where: {
      OR: [
        { userAId: userId, userBId: targetUserId },
        { userAId: targetUserId, userBId: userId }
      ]
    }
  });

  if (!chat) {
    chat = await prisma.chat.create({
      data: {
        userAId: userId,
        userBId: targetUserId
      }
    });
  }

  return serialize(chat);
}

export async function getMyChats(userId) {
  const chats = await prisma.chat.findMany({
    where: {
      OR: [
        { userAId: userId },
        { userBId: userId }
      ]
    },
    include: {
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1
      },
      userA: { select: { id: true, phone: true, email: true, fullName: true, avatarUrl: true } },
      userB: { select: { id: true, phone: true, email: true, fullName: true, avatarUrl: true } }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });

  return serialize(chats);
}

export async function getChatMessages(userId, chatId) {
  const chat = await prisma.chat.findUnique({
    where: { id: chatId }
  });

  if (!chat) {
    throw new Error('Chat not found');
  }

  if (chat.userAId !== userId && chat.userBId !== userId) {
    throw new Error('Unauthorized');
  }

  const messages = await prisma.chatMessage.findMany({
    where: { chatId },
    orderBy: { createdAt: 'asc' }
  });

  return serialize(messages);
}

export async function sendMessage(userId, chatId, content) {
  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    include: {
      userA: true,
      userB: true
    }
  });

  if (!chat) {
    throw new Error('Chat not found');
  }

  if (chat.userAId !== userId && chat.userBId !== userId) {
    throw new Error('Unauthorized');
  }

  const message = await prisma.chatMessage.create({
    data: {
      chatId,
      senderId: userId,
      content
    }
  });

  const recipient = chat.userAId === userId ? chat.userB : chat.userA;

  if (recipient && recipient.pushToken) {
    await admin.messaging().send({
      token: recipient.pushToken,
      notification: {
        title: '📩 New Message',
        body: content.slice(0, 100),
      },
      data: {
        type: 'chat',
        chatId,
      }
    });
  }

  return serialize(message);
}
