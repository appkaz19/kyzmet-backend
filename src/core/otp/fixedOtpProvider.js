// fixedOtpProvider.js - обновленная версия с Firebase
import { sendOTP, generateOTP, validateKZPhone } from './firebase.js';

// Для разработки используем фиксированный OTP
const FIXED_OTP = '0000';

// Хранилище OTP в памяти (для MVP)
const otpStorage = new Map();

export async function sendOtp(phone) {
  try {
    // Валидация номера телефона для Казахстана
    const validPhone = validateKZPhone(phone);
    if (!validPhone) {
      console.error(`❌ [OTP] Invalid KZ phone format: ${phone}`);
      return false;
    }

    // Генерируем OTP
    const otp = process.env.NODE_ENV === 'production' ? generateOTP() : FIXED_OTP;
    
    // Сохраняем OTP в памяти с TTL (5 минут)
    otpStorage.set(validPhone, {
      otp,
      expires: Date.now() + 5 * 60 * 1000 // 5 минут
    });

    console.log(`📤 [OTP] Sending OTP ${otp} to ${validPhone}`);
    
    // Отправляем SMS через Firebase
    const result = await sendOTP(validPhone, otp);
    
    if (result.success) {
      console.log(`✅ [OTP] Successfully sent to ${validPhone}`);
      return true;
    } else {
      console.error(`❌ [OTP] Failed to send to ${validPhone}:`, result.error);
      return false;
    }
    
  } catch (error) {
    console.error(`🔥 [OTP] Error sending to ${phone}:`, error);
    return false;
  }
}

export async function verifyOtp(phone, otp) {
  try {
    const validPhone = validateKZPhone(phone);
    if (!validPhone) {
      console.log(`❌ [OTP] Invalid phone format for verification: ${phone}`);
      return false;
    }

    // Для разработки всегда принимаем 0000
    if (process.env.NODE_ENV !== 'production' && otp === FIXED_OTP) {
      console.log(`✅ [OTP] Fixed OTP verified for ${validPhone}`);
      return true;
    }

    // Проверяем OTP из хранилища
    const stored = otpStorage.get(validPhone);
    if (!stored) {
      console.log(`❌ [OTP] No OTP found for ${validPhone}`);
      return false;
    }

    // Проверяем срок действия
    if (Date.now() > stored.expires) {
      console.log(`⏰ [OTP] Expired OTP for ${validPhone}`);
      otpStorage.delete(validPhone);
      return false;
    }

    // Проверяем сам код
    if (stored.otp === otp) {
      console.log(`✅ [OTP] Valid OTP verified for ${validPhone}`);
      otpStorage.delete(validPhone); // Удаляем после использования
      return true;
    } else {
      console.log(`❌ [OTP] Invalid OTP for ${validPhone}. Expected: ${stored.otp}, Got: ${otp}`);
      return false;
    }

  } catch (error) {
    console.error(`🔥 [OTP] Error verifying for ${phone}:`, error);
    return false;
  }
}

// Очистка просроченных OTP (запускать периодически)
export function cleanupExpiredOtp() {
  const now = Date.now();
  for (const [phone, data] of otpStorage.entries()) {
    if (now > data.expires) {
      otpStorage.delete(phone);
      console.log(`🧹 [OTP] Cleaned expired OTP for ${phone}`);
    }
  }
}

// Автоматическая очистка каждые 10 минут
setInterval(cleanupExpiredOtp, 10 * 60 * 1000);
