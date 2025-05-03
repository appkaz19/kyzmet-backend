import * as walletService from './wallet.service.js';

export async function getMyWallet(req, res) {
  try {
    const userId = req.user.userId;
    const result = await walletService.getMyWallet(userId);
    res.json(result);
  } catch (error) {
    console.error('🔥 Get Wallet error:', error);
    res.status(500).json({ error: 'Failed to fetch wallet' });
  }
}

export async function topUpWallet(req, res) {
  try {
    const userId = req.user.userId;
    const { amount } = req.body;
    const result = await walletService.topUpWallet(userId, amount);
    res.json(result);
  } catch (error) {
    console.error('🔥 Top Up Wallet error:', error);
    res.status(500).json({ error: 'Failed to top up wallet' });
  }
}

export async function spendFromWallet(req, res) {
  try {
    const userId = req.user.userId;
    const { amount } = req.body;
    const result = await walletService.spendFromWallet(userId, amount);
    res.json(result);
  } catch (error) {
    console.error('🔥 Spend From Wallet error:', error);
    res.status(500).json({ error: 'Failed to spend from wallet' });
  }
}
