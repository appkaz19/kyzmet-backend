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
    const { amount, paymentMethodId } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Некорректная сумма' });
    }
    
    const result = await walletService.topUpWallet(
      req.user.userId, 
      amount, 
      paymentMethodId
    );
    
    res.json({
      success: true,
      message: 'Кошелек успешно пополнен',
      newBalance: result.balance,
      transactionId: result.transactionId
    });
  } catch (error) {
    console.error('🔥 Top Up Wallet error:', error);
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
  }
}

export async function spendFromWallet(req, res) {
  try {
    const { amount, description } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Некорректная сумма' });
    }
    
    const wallet = await walletService.spendFromWallet(
      req.user.userId, 
      amount, 
      description
    );
    
    res.json({
      success: true,
      message: 'Операция выполнена',
      newBalance: wallet.balance
    });
  } catch (error) {
    console.error('🔥 Spend From Wallet error:', error);
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
  }
}

export async function getTransactionHistory(req, res) {
  try {
    const { limit = 50, offset = 0 } = req.query;
    
    const transactions = await walletService.getTransactionHistory(
      req.user.userId,
      parseInt(limit),
      parseInt(offset)
    );
    
    res.json({ transactions });
  } catch (error) {
    console.error('🔥 Get Transaction History error:', error);
    res.status(500).json({ error: 'Failed to fetch transaction history' });
  }
}

// Webhook для обработки уведомлений от платежных провайдеров
export async function handlePaymentWebhook(req, res) {
  try {
    const { provider } = req.params;
    const webhookData = req.body;
    
    console.log(`Received webhook from ${provider}:`, webhookData);
    
    // В будущем здесь будет обработка реальных webhook'ов
    switch (provider) {
      case 'payme':
        await handlePaymeWebhook(webhookData);
        break;
      case 'click':
        await handleClickWebhook(webhookData);
        break;
      default:
        console.log('Unknown provider:', provider);
    }
    
    res.json({ status: 'ok' });
  } catch (error) {
    console.error('🔥 Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}

// Заглушки для будущих webhook'ов
async function handlePaymeWebhook(data) {
  // TODO: Реализовать обработку Payme webhook'ов
  console.log('Payme webhook:', data);
}

async function handleClickWebhook(data) {
  // TODO: Реализовать обработку Click webhook'ов
  console.log('Click webhook:', data);
}