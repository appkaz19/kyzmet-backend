#!/usr/bin/env node

import fetch from 'node-fetch';

const BASE_URL = 'https://uzxizmat.uz/api';

async function debugEndpoint(endpoint) {
  console.log(`\n🔍 Testing ${endpoint}`);
  console.log('─'.repeat(50));
  
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    const text = await response.text();
    
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log(`Headers: ${JSON.stringify(Object.fromEntries(response.headers))}`);
    
    // Try to parse as JSON
    try {
      const json = JSON.parse(text);
      console.log('Response (JSON):', JSON.stringify(json, null, 2));
    } catch {
      console.log('Response (Text):', text.substring(0, 200) + '...');
    }
  } catch (error) {
    console.log('Error:', error.message);
  }
}

async function main() {
  console.log('🐛 Debugging Production API Issues\n');
  
  // Debug problematic endpoints
  await debugEndpoint('/search?q=test');
  await debugEndpoint('/locations/regions');
  await debugEndpoint('/categories');
  
  // Check if search module exists
  await debugEndpoint('/search');
  
  // Check wallet transactions
  const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: '0000', password: '0000' })
  });
  
  const { token } = await loginResponse.json();
  
  console.log(`\n🔍 Testing /wallet/transactions (with auth)`);
  console.log('─'.repeat(50));
  
  const walletResponse = await fetch(`${BASE_URL}/wallet/transactions`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  const walletData = await walletResponse.text();
  try {
    const json = JSON.parse(walletData);
    console.log('Type:', Array.isArray(json) ? 'Array' : typeof json);
    console.log('Response:', JSON.stringify(json, null, 2));
  } catch {
    console.log('Response:', walletData);
  }
}

main().catch(console.error);