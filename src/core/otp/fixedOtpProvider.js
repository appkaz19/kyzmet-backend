const FIXED_OTP = '0000';

export async function sendOtp(phone) {
  console.log(`📤 [OTP] Отправка OTP ${FIXED_OTP} на ${phone}`);
  return true;
}

export async function verifyOtp(phone, otp) {
  return otp === FIXED_OTP;
}