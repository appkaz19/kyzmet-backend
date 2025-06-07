import admin from '../../core/firebase.js';
import { PrismaClient } from '@prisma/client';
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

  return chat;
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
      userA: { select: { id: true, phone: true, email: true } },
      userB: { select: { id: true, phone: true, email: true } }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });

  return chats;
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

  return messages;
}

export async function sendMessage(userId, chatId, content) {
  const chat = await prisma.chat.findUnique({
    where: { id: chatId }
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

  // После сохранения сообщения рассылаем его через WebSocket,
  // если Socket.IO инициализирован (используем глобальную переменную)
  if (global.io) {
    global.io.to(chatId).emit('newMessage', {
      id: message.id,
      chatId,
      senderId: userId,
      content,
      createdAt: message.createdAt
    });
  }

  const recepient = chat.userAId === userId ? chat.userB : chat.userA;

  if (recepient.pushToken) {
    await admin.messaging().send({
      token: recepient.pushToken,
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

  return message;
}
