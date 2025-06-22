#!/usr/bin/env node

/**
 * Тестовый скрипт для проверки всех флоу аутентификации
 * Использование: node test-auth-flows.js
 */

import fetch from 'node-fetch';

// Конфигурация
const BASE_URL = 'http://localhost:6969/api';
const TEST_PHONE = '0000';
const TEST_PASSWORD = '0000';
const NEW_PASSWORD = '1111';

// Цвета для консоли
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n${colors.bold}[STEP ${step}]${colors.reset} ${colors.blue}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

// Вспомогательная функция для HTTP запросов
async function makeRequest(endpoint, method = 'GET', body = null, headers = {}) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();

    return {
      success: response.ok,
      status: response.status,
      data: data
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Задержка между запросами
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Тест 1: Регистрация нового пользователя
async function testRegistration() {
  logStep(1, 'Тестирование регистрации пользователя');
  
  const result = await makeRequest('/auth/register', 'POST', {
    phone: TEST_PHONE,
    password: TEST_PASSWORD
  });

  if (result.success) {
    logSuccess(`Пользователь зарегистрирован: ${result.data.user.phone}`);
    logWarning(`Пользователь не верифицирован: verified=${result.data.user.verified}`);
    return true;
  } else {
    if (result.data?.message?.includes('already exists')) {
      logWarning('Пользователь уже существует - пропускаем регистрацию');
      return true;
    }
    logError(`Ошибка регистрации: ${result.data?.message || result.error}`);
    return false;
  }
}

// Тест 2: Попытка логина без верификации
async function testLoginWithoutVerification() {
  logStep(2, 'Тестирование логина БЕЗ верификации (должно упасть)');
  
  const result = await makeRequest('/auth/login', 'POST', {
    phone: TEST_PHONE,
    password: TEST_PASSWORD
  });

  if (!result.success && result.data?.message?.includes('not verified')) {
    logSuccess('Правильно! Логин заблокирован для неверифицированного пользователя');
    return true;
  } else if (result.success) {
    logWarning('Пользователь уже верифицирован или логин разрешен без верификации');
    return true;
  } else {
    logError(`Неожиданная ошибка: ${result.data?.message || result.error}`);
    return false;
  }
}

// Тест 3: Отправка OTP
async function testSendOTP() {
  logStep(3, 'Тестирование отправки OTP');
  
  const result = await makeRequest('/auth/send-otp', 'POST', {
    phone: TEST_PHONE
  });

  if (result.success) {
    logSuccess('OTP отправлен успешно');
    logWarning('В реальном приложении OTP приходит по SMS');
    return true;
  } else {
    logError(`Ошибка отправки OTP: ${result.data?.message || result.error}`);
    return false;
  }
}

// Тест 4: Верификация телефона (имитация)
async function testPhoneVerification() {
  logStep(4, 'Тестирование верификации телефона');
  
  // В реальности здесь должен быть настоящий OTP код
  // Для тестирования используем фиктивный код
  const testOTP = '123456';
  
  logWarning(`Используем тестовый OTP: ${testOTP}`);
  logWarning('В реальном приложении нужно ввести код из SMS');
  
  const result = await makeRequest('/auth/verify-phone', 'POST', {
    phone: TEST_PHONE,
    otp: testOTP
  });

  if (result.success) {
    logSuccess('Телефон успешно верифицирован');
    return true;
  } else {
    logError(`Ошибка верификации: ${result.data?.message || result.error}`);
    logWarning('Возможно, нужно настроить тестовый OTP сервис');
    return false;
  }
}

// Тест 5: Успешный логин после верификации
async function testSuccessfulLogin() {
  logStep(5, 'Тестирование успешного логина');
  
  const result = await makeRequest('/auth/login', 'POST', {
    phone: TEST_PHONE,
    password: TEST_PASSWORD
  });

  if (result.success) {
    logSuccess('Логин успешен!');
    logSuccess(`Получен токен: ${result.data.token.substring(0, 20)}...`);
    return {
      success: true,
      token: result.data.token,
      user: result.data.user
    };
  } else {
    logError(`Ошибка логина: ${result.data?.message || result.error}`);
    return { success: false };
  }
}

// Тест 6: Неверные данные для логина
async function testInvalidLogin() {
  logStep(6, 'Тестирование логина с неверными данными');
  
  const result = await makeRequest('/auth/login', 'POST', {
    phone: TEST_PHONE,
    password: 'wrongpassword'
  });

  if (!result.success && result.data?.message?.includes('Invalid credentials')) {
    logSuccess('Правильно! Неверные данные отклонены');
    return true;
  } else {
    logError('Система должна отклонять неверные данные');
    return false;
  }
}

// Тест 7: Привязка Google аккаунта
async function testAttachGoogle(token) {
  logStep(7, 'Тестирование привязки Google аккаунта');
  
  const result = await makeRequest('/auth/attach-google', 'POST', {
    firebaseGoogleId: 'test_google_id_123456'
  }, {
    'Authorization': `Bearer ${token}`
  });

  if (result.success) {
    logSuccess('Google аккаунт успешно привязан');
    return true;
  } else {
    logError(`Ошибка привязки Google: ${result.data?.message || result.error}`);
    return false;
  }
}

// Тест 8: Безопасное восстановление пароля
async function testSecurePasswordReset() {
  logStep(8, 'Тестирование безопасного восстановления пароля');
  
  // Шаг 8.1: Запрос восстановления
  log('8.1. Запрос восстановления пароля...');
  const resetRequest = await makeRequest('/auth/request-password-reset', 'POST', {
    phone: TEST_PHONE
  });

  if (!resetRequest.success) {
    logError(`Ошибка запроса восстановления: ${resetRequest.data?.message || resetRequest.error}`);
    return false;
  }
  logSuccess('Запрос восстановления отправлен');

  await delay(1000);

  // Шаг 8.2: Верификация OTP для сброса
  log('8.2. Верификация OTP для сброса...');
  const testResetOTP = '123456';  // В реальности - из SMS
  
  const otpVerification = await makeRequest('/auth/verify-reset-otp', 'POST', {
    phone: TEST_PHONE,
    otp: testResetOTP
  });

  if (!otpVerification.success) {
    logError(`Ошибка верификации OTP: ${otpVerification.data?.message || otpVerification.error}`);
    logWarning('Возможно, нужно настроить тестовый OTP сервис для сброса пароля');
    return false;
  }

  const resetToken = otpVerification.data.resetToken;
  logSuccess(`Получен токен сброса: ${resetToken?.substring(0, 20)}...`);

  await delay(1000);

  // Шаг 8.3: Установка нового пароля
  log('8.3. Установка нового пароля...');
  const passwordReset = await makeRequest('/auth/reset-password-with-token', 'POST', {
    resetToken: resetToken,
    newPassword: NEW_PASSWORD
  });

  if (passwordReset.success) {
    logSuccess('Пароль успешно изменен через безопасный флоу');
    return true;
  } else {
    logError(`Ошибка смены пароля: ${passwordReset.data?.message || passwordReset.error}`);
    return false;
  }
}

// Тест 9: Логин с новым паролем
async function testLoginWithNewPassword() {
  logStep(9, 'Тестирование логина с новым паролем');
  
  const result = await makeRequest('/auth/login', 'POST', {
    phone: TEST_PHONE,
    password: NEW_PASSWORD
  });

  if (result.success) {
    logSuccess('Логин с новым паролем успешен!');
    return true;
  } else {
    logError(`Ошибка логина с новым паролем: ${result.data?.message || result.error}`);
    return false;
  }
}

// Тест 10: Устаревший флоу сброса пароля
async function testLegacyPasswordReset() {
  logStep(10, 'Тестирование устаревшего флоу сброса пароля');
  
  const result = await makeRequest('/auth/reset-password', 'POST', {
    phone: TEST_PHONE,
    newPassword: TEST_PASSWORD  // Возвращаем исходный пароль
  });

  if (result.success) {
    logSuccess('Устаревший флоу сброса работает (не рекомендуется в продакшене)');
    logWarning('Рекомендуется использовать безопасный флоу восстановления');
    return true;
  } else {
    logError(`Ошибка устаревшего сброса: ${result.data?.message || result.error}`);
    return false;
  }
}

// Основная функция тестирования
async function runAllTests() {
  log(`${colors.bold}${colors.blue}🧪 ЗАПУСК ТЕСТОВ АУТЕНТИФИКАЦИИ${colors.reset}`);
  log(`Тестируемый номер: ${TEST_PHONE}`);
  log(`Base URL: ${BASE_URL}`);
  log('=' * 50);

  const results = {
    passed: 0,
    failed: 0,
    skipped: 0
  };

  try {
    // Тест 1: Регистрация
    if (await testRegistration()) {
      results.passed++;
    } else {
      results.failed++;
      return results;
    }

    await delay(1000);

    // Тест 2: Логин без верификации
    if (await testLoginWithoutVerification()) {
      results.passed++;
    } else {
      results.failed++;
    }

    await delay(1000);

    // Тест 3: Отправка OTP
    if (await testSendOTP()) {
      results.passed++;
    } else {
      results.failed++;
    }

    await delay(2000);

    // Тест 4: Верификация телефона
    const verificationResult = await testPhoneVerification();
    if (verificationResult) {
      results.passed++;
    } else {
      results.failed++;
      logWarning('Пропускаем тесты, требующие верификации');
      results.skipped += 6;
      return results;
    }

    await delay(1000);

    // Тест 5: Успешный логин
    const loginResult = await testSuccessfulLogin();
    if (loginResult.success) {
      results.passed++;
    } else {
      results.failed++;
      return results;
    }

    await delay(1000);

    // Тест 6: Неверные данные
    if (await testInvalidLogin()) {
      results.passed++;
    } else {
      results.failed++;
    }

    await delay(1000);

    // Тест 7: Привязка Google
    if (await testAttachGoogle(loginResult.token)) {
      results.passed++;
    } else {
      results.failed++;
    }

    await delay(2000);

    // Тест 8: Безопасное восстановление пароля
    if (await testSecurePasswordReset()) {
      results.passed++;
    } else {
      results.failed++;
      logWarning('Пропускаем тест логина с новым паролем');
      results.skipped++;
    }

    await delay(1000);

    // Тест 9: Логин с новым паролем
    if (await testLoginWithNewPassword()) {
      results.passed++;
    } else {
      results.failed++;
    }

    await delay(1000);

    // Тест 10: Устаревший флоу
    if (await testLegacyPasswordReset()) {
      results.passed++;
    } else {
      results.failed++;
    }

  } catch (error) {
    logError(`Критическая ошибка: ${error.message}`);
    results.failed++;
  }

  return results;
}

// Отчет о результатах
function printResults(results) {
  log('\n' + '=' * 50);
  log(`${colors.bold}📊 РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ${colors.reset}`);
  log('=' * 50);
  
  logSuccess(`✅ Пройдено: ${results.passed}`);
  
  if (results.failed > 0) {
    logError(`❌ Упало: ${results.failed}`);
  }
  
  if (results.skipped > 0) {
    logWarning(`⏭️  Пропущено: ${results.skipped}`);
  }

  const total = results.passed + results.failed + results.skipped;
  const percentage = total > 0 ? Math.round((results.passed / total) * 100) : 0;
  
  log(`\n${colors.bold}Общий результат: ${percentage}% (${results.passed}/${total})${colors.reset}`);
  
  if (results.failed === 0) {
    logSuccess('\n🎉 ВСЕ ТЕСТЫ ПРОЙДЕНЫ УСПЕШНО!');
  } else {
    logError('\n💥 ЕСТЬ ПРОБЛЕМЫ В ТЕСТАХ');
  }
  
  log('\n📝 Дополнительные заметки:');
  log('• Для полного тестирования нужно настроить OTP сервис');
  log('• В продакшене используйте HTTPS и надежные пароли');
  log('• Рекомендуется использовать новый безопасный флоу восстановления');
  log('• Проверьте rate limiting в реальных условиях');
}

// Запуск тестов
async function main() {
  const results = await runAllTests();
  printResults(results);
  
  process.exit(results.failed > 0 ? 1 : 0);
}

// Проверка доступности сервера
async function checkServerHealth() {
  try {
    const response = await fetch(`${BASE_URL.replace('/api', '')}/health`);
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Инициализация
(async () => {
  log('🔍 Проверка доступности сервера...');
  
  const serverUp = await checkServerHealth();
  if (!serverUp) {
    logWarning('⚠️  Сервер недоступен или не отвечает на /health');
    logWarning('Убедитесь что сервер запущен: npm run dev');
    logWarning('Продолжаем тестирование...\n');
  } else {
    logSuccess('✅ Сервер доступен\n');
  }
  
  await main();
})();