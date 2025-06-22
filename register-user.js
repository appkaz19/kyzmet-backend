#!/usr/bin/env node

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:6969/api';
const TEST_PHONE = '0000';
const TEST_PASSWORD = '0000';

async function registerUser() {
  try {
    console.log('🔄 Registering user with phone:', TEST_PHONE);
    
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: TEST_PHONE,
        password: TEST_PASSWORD
      })
    });
    
    const data = await response.json();
    
    console.log('📊 Status:', response.status);
    console.log('📄 Response:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('✅ User registered successfully!');
      console.log('📱 Phone:', data.user.phone);
      console.log('🔐 Verified:', data.user.verified);
      console.log('🆔 User ID:', data.user.id);
    } else {
      if (data.message && data.message.includes('already exists')) {
        console.log('⚠️  User already exists');
      } else {
        console.log('❌ Registration failed:', data.message || 'Unknown error');
      }
    }
    
    return data;
  } catch (error) {
    console.log('❌ Network error:', error.message);
    return null;
  }
}

registerUser();