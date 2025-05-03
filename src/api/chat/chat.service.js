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

  return message;
}
