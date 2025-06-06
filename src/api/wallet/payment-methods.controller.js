import * as paymentMethodsService from './payment-methods.service.js';

export async function getPaymentMethods(req, res) {
  try {
    const methods = await paymentMethodsService.getPaymentMethods(req.user.userId);
    res.json({ cards: methods });
  } catch (error) {
    console.error('🔥 Get Payment Methods error:', error);
    res.status(500).json({ error: 'Failed to fetch payment methods' });
  }
}

export async function addPaymentMethod(req, res) {
  try {
    const { cardNumber, cardHolder, expiryDate, cvv } = req.body;
    
    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const method = await paymentMethodsService.addPaymentMethod(
      req.user.userId,
      { cardNumber, cardHolder, expiryDate, cvv }
    );
    
    res.json({ 
      message: 'Карта успешно добавлена',
      card: method 
    });
  } catch (error) {
    console.error('🔥 Add Payment Method error:', error);
    res.status(400).json({ error: error.message });
  }
}

export async function deletePaymentMethod(req, res) {
  try {
    const { methodId } = req.params;
    
    await paymentMethodsService.deletePaymentMethod(req.user.userId, methodId);
    
    res.json({ message: 'Карта удалена' });
  } catch (error) {
    console.error('🔥 Delete Payment Method error:', error);
    res.status(400).json({ error: error.message });
  }
}

export async function setDefaultPaymentMethod(req, res) {
  try {
    const { methodId } = req.params;
    
    await paymentMethodsService.setDefaultPaymentMethod(req.user.userId, methodId);
    
    res.json({ message: 'Карта установлена как основная' });
  } catch (error) {
    console.error('🔥 Set Default Payment Method error:', error);
    res.status(400).json({ error: error.message });
  }
}