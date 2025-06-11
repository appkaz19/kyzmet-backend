import * as chatService from './chat.service.js';

export async function startChat(req, res) {
  try {
    const userId = req.user.userId;
    const { targetUserId } = req.body;
    const result = await chatService.startChat(userId, targetUserId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Start Chat error:', error);
    res.status(500).json({ error: 'Failed to start chat' });
  }
}

export async function getMyChats(req, res) {
  try {
    const userId = req.user.userId;
    const result = await chatService.getMyChats(userId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Get My Chats error:', error);
    res.status(500).json({ error: 'Failed to get chats' });
  }
}

export async function getChatMessages(req, res) {
  try {
    const userId = req.user.userId;
    const chatId = req.params.chatId;
    const result = await chatService.getChatMessages(userId, chatId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Get Chat Messages error:', error);
    res.status(500).json({ error: 'Failed to get chat messages' });
  }
}

export async function sendMessage(req, res) {
  try {
    const userId = req.user.userId;
    const chatId = req.params.chatId;
    const { content } = req.body;
    const result = await chatService.sendMessage(userId, chatId, content);
    res.json(result);
  } catch (error) {
    console.error('🔥 Send Message error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
}

export async function markChatAsRead(req, res) {
  try {
    const userId = req.user.userId;
    const chatId = req.params.chatId;
    const result = await chatService.markChatAsRead(userId, chatId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Mark Chat As Read error:', error);
    res.status(500).json({ error: 'Failed to mark chat as read' });
  }
}
