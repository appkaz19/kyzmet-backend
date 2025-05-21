import * as walletService from './wallet.service.js';

export async function getMyWallet(req, res) {
  try {
    const wallet = await walletService.getMyWallet(req.user.userId);
    res.json(wallet);
  } catch (error) {
    console.error('🔥 Get Wallet error:', error);
    res.status(500).json({ error: 'Failed to fetch wallet' });
  }
}

export async function topUpWallet(req, res) {
  try {
    const { amount } = req.body;
    const wallet = await walletService.topUpWallet(req.user.userId, amount);
    res.json(wallet);
  } catch (error) {
    console.error('🔥 Top Up Wallet error:', error);
    res.status(400).json({ error: error.message });
  }
}

export async function spendFromWallet(req, res) {
  try {
    const { amount } = req.body;
    const wallet = await walletService.spendFromWallet(req.user.userId, amount);
    res.json(wallet);
  } catch (error) {
    console.error('🔥 Spend From Wallet error:', error);
    res.status(400).json({ error: error.message });
  }
}
