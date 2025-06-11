import admin from '../../core/firebase.js';
import { PrismaClient } from '@prisma/client';
import { serialize } from '../../utils/serialize.js';
const prisma = new PrismaClient();

let io = null;
export function setSocketIO(socketIoInstance) {
  io = socketIoInstance;
  console.log('✅ Socket.IO instance установлен в chat.service.js');
}

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

  const chatsWithUnreadCount = chats.map(chat => {
    const isUserA = chat.userAId === userId;

    return {
      ...serialize(chat),
      unreadCount: chat.unreadCount || 0
    };
  });

  return chatsWithUnreadCount;
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

  await prisma.chat.update({
    where: { id: chatId },
    data: { unreadCount: 0 }
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

  await prisma.chat.update({
    where: { id: chatId },
    data: {
      updatedAt: new Date(),
      unreadCount: { increment: 1 }
    }
  });

  if (io) {
    console.log('📨 Отправляем сообщение через WebSocket из HTTP API');
    
    const websocketMessage = {
      id: message.id,
      chatId,
      senderId: userId,
      content,
      createdAt: message.createdAt
    }

    const room = io.sockets.adapter.rooms.get(chatId);
    console.log('📨 Пользователи в комнате:', room ? Array.from(room) : 'Комната пуста');

    io.to(chatId).emit('newMessage', serialize(websocketMessage));
    console.log('📨 WebSocket событие newMessage успешно отправлено');
  } else {
    console.log('❌ io не установлен, WebSocket событие не отправлено');
  }

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

export async function markChatAsRead(userId, chatId) {
  const chat = await prisma.chat.findUnique({
    where: { id: chatId }
  });

  if (!chat) {
    throw new Error('Chat not found');
  }

  if (chat.userAId !== userId && chat.userBId !== userId) {
    throw new Error('Unauthorizaed');
  }

  await prisma.chat.update({
    where: { id: chatId },
    data: { unreadCount: 0 }
  });

  return { success: true };
}