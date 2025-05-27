import { PrismaClient } from '@prisma/client';
const prisma = PrismaClient();

export function handleSocketConnection(io, socket) {
    const userId = socket.userId;
    console.log(`🔌 User connected: ${userId}`);

    socket.on('joinChat', async (chatId) => {
        const chat = await prisma.chat.findUnique({ where: { id: chatId } });
        if (!chat || (chat.userAId !== userId && chat.userBId !== userId)) return;

        socket.join(chatId);
        console.log(`👥 User ${userId} joined chat ${chatId}`);
    });

    socket.on('sendMessage', async ({ chatId, content }) => {
        try {
            const chat = await prisma.chat.findUnique({ where: { id: chatId }} );
            if (!chat || (chat.userAId !== userId && chat.userBId !== userId)) return;

            const message = await prisma.chatMessage.create({
                data: { chatId, senderId: userId, content }
            });

            io.to(chatId).emit('newMessage', {
                id: message.id,
                chatId,
                senderId: userId,
                content,
                createdAt: message.createdAt
            });

            console.log(`✉️ Message sent in ${chatId} by ${userId}`);
        } catch (err) {
            console.error('💥 Socket message error:', err);
        }
    });

    socket.on('disconnect', () => {
        console.log(`🔌 User disconnected: ${userId}`);
    });
}