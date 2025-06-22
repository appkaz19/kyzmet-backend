#!/usr/bin/env node

/**
 * Production API Test Suite for Kyzmet Backend
 * Tests all API endpoints on production server
 */

import fetch from 'node-fetch';
import chalk from 'chalk';

const BASE_URL = 'https://uzxizmat.uz/api';
const TEST_USER = {
  phone: '0000',
  password: '0000'
};

let authToken = null;
let testUserId = null;

class ProductionAPITester {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      total: 0
    };
    this.errors = [];
  }

  async test(name, fn) {
    this.results.total++;
    process.stdout.write(`Testing ${name}... `);
    
    try {
      await fn();
      this.results.passed++;
      console.log(chalk.green('✓ PASS'));
    } catch (error) {
      this.results.failed++;
      console.log(chalk.red('✗ FAIL'));
      console.log(chalk.red(`  Error: ${error.message}`));
      this.errors.push({ test: name, error: error.message });
    }
  }

  async request(method, endpoint, body = null, needsAuth = true) {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (needsAuth && authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const options = {
      method,
      headers
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok && !data.error) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return { response, data };
  }

  async runAllTests() {
    console.log(chalk.blue('\n🧪 Production API Test Suite'));
    console.log(chalk.blue(`📍 Testing: ${BASE_URL}`));
    console.log(chalk.blue('━'.repeat(50)) + '\n');

    // Auth Tests
    console.log(chalk.yellow('\n🔐 Authentication Tests'));
    console.log(chalk.gray('─'.repeat(30)));
    
    await this.test('POST /auth/login', async () => {
      const { response, data } = await this.request('POST', '/auth/login', TEST_USER, false);
      if (!response.ok) throw new Error(data.error || 'Login failed');
      if (!data.token) throw new Error('No token returned');
      authToken = data.token;
      testUserId = data.user?.id;
    });

    await this.test('POST /auth/send-otp', async () => {
      const { response, data } = await this.request('POST', '/auth/send-otp', { phone: '0000' }, false);
      if (!response.ok) throw new Error(data.error || 'Send OTP failed');
    });

    // Search Tests
    console.log(chalk.yellow('\n🔍 Search Tests'));
    console.log(chalk.gray('─'.repeat(30)));

    await this.test('GET /search?q=test', async () => {
      const { response, data } = await this.request('GET', '/search?q=test', null, false);
      if (!response.ok) throw new Error(data.error || 'Search failed');
      if (!data.results) throw new Error('No results field in response');
    });

    await this.test('GET /search/suggestions?q=te', async () => {
      const { response, data } = await this.request('GET', '/search/suggestions?q=te', null, false);
      if (!response.ok) throw new Error(data.error || 'Suggestions failed');
      if (!data.suggestions) throw new Error('No suggestions field');
    });

    // Category Tests
    console.log(chalk.yellow('\n📂 Category Tests'));
    console.log(chalk.gray('─'.repeat(30)));

    await this.test('GET /categories', async () => {
      const { response, data } = await this.request('GET', '/categories', null, false);
      if (!response.ok) throw new Error(data.error || 'Get categories failed');
      if (!Array.isArray(data)) throw new Error('Response is not an array');
    });

    await this.test('GET /categories/:id/subcategories', async () => {
      // First get a category
      const { data: categories } = await this.request('GET', '/categories', null, false);
      if (categories.length > 0) {
        const categoryId = categories[0].id;
        const { response, data } = await this.request('GET', `/categories/${categoryId}/subcategories`, null, false);
        if (!response.ok) throw new Error(data.error || 'Get subcategories failed');
      }
    });

    // Location Tests
    console.log(chalk.yellow('\n📍 Location Tests'));
    console.log(chalk.gray('─'.repeat(30)));

    await this.test('GET /locations/regions', async () => {
      const { response, data } = await this.request('GET', '/locations/regions', null, false);
      if (!response.ok) throw new Error(data.error || 'Get regions failed');
      if (!Array.isArray(data)) throw new Error('Response is not an array');
    });

    await this.test('GET /locations/regions/:id/cities', async () => {
      const { data: regions } = await this.request('GET', '/locations/regions', null, false);
      if (regions.length > 0) {
        const regionId = regions[0].id;
        const { response, data } = await this.request('GET', `/locations/regions/${regionId}/cities`, null, false);
        if (!response.ok) throw new Error(data.error || 'Get cities failed');
      }
    });

    // Service Tests
    console.log(chalk.yellow('\n🛠️ Service Tests'));
    console.log(chalk.gray('─'.repeat(30)));

    await this.test('GET /services', async () => {
      const { response, data } = await this.request('GET', '/services', null, false);
      if (!response.ok) throw new Error(data.error || 'Get services failed');
      if (!data.services) throw new Error('No services field');
    });

    await this.test('GET /services/:id', async () => {
      const { data: serviceData } = await this.request('GET', '/services', null, false);
      if (serviceData.services && serviceData.services.length > 0) {
        const serviceId = serviceData.services[0].id;
        const { response, data } = await this.request('GET', `/services/${serviceId}`, null, false);
        if (!response.ok) throw new Error(data.error || 'Get service failed');
      }
    });

    // Job Tests
    console.log(chalk.yellow('\n💼 Job Tests'));
    console.log(chalk.gray('─'.repeat(30)));

    await this.test('GET /jobs', async () => {
      const { response, data } = await this.request('GET', '/jobs', null, false);
      if (!response.ok) throw new Error(data.error || 'Get jobs failed');
      if (!Array.isArray(data)) throw new Error('Response is not an array');
    });

    // User Tests (Authenticated)
    console.log(chalk.yellow('\n👤 User Tests (Authenticated)'));
    console.log(chalk.gray('─'.repeat(30)));

    await this.test('GET /users/profile', async () => {
      const { response, data } = await this.request('GET', '/users/profile');
      if (!response.ok) throw new Error(data.error || 'Get profile failed');
      if (!data.id) throw new Error('No user ID in profile');
    });

    await this.test('GET /users/my-services', async () => {
      const { response, data } = await this.request('GET', '/users/my-services');
      if (!response.ok) throw new Error(data.error || 'Get my services failed');
    });

    await this.test('GET /users/my-jobs', async () => {
      const { response, data } = await this.request('GET', '/users/my-jobs');
      if (!response.ok) throw new Error(data.error || 'Get my jobs failed');
    });

    // Wallet Tests
    console.log(chalk.yellow('\n💰 Wallet Tests'));
    console.log(chalk.gray('─'.repeat(30)));

    await this.test('GET /wallet', async () => {
      const { response, data } = await this.request('GET', '/wallet');
      if (!response.ok) throw new Error(data.error || 'Get wallet failed');
      if (data.balance === undefined) throw new Error('No balance in wallet');
    });

    await this.test('GET /wallet/transactions', async () => {
      const { response, data } = await this.request('GET', '/wallet/transactions');
      if (!response.ok) throw new Error(data.error || 'Get transactions failed');
      if (!Array.isArray(data)) throw new Error('Response is not an array');
    });

    // Favorites Tests
    console.log(chalk.yellow('\n⭐ Favorites Tests'));
    console.log(chalk.gray('─'.repeat(30)));

    await this.test('GET /favorites/services', async () => {
      const { response, data } = await this.request('GET', '/favorites/services');
      if (!response.ok) throw new Error(data.error || 'Get favorite services failed');
    });

    await this.test('GET /favorites/jobs', async () => {
      const { response, data } = await this.request('GET', '/favorites/jobs');
      if (!response.ok) throw new Error(data.error || 'Get favorite jobs failed');
    });

    // Chat Tests
    console.log(chalk.yellow('\n💬 Chat Tests'));
    console.log(chalk.gray('─'.repeat(30)));

    await this.test('GET /chat', async () => {
      const { response, data } = await this.request('GET', '/chat');
      if (!response.ok) throw new Error(data.error || 'Get chats failed');
      if (!Array.isArray(data)) throw new Error('Response is not an array');
    });

    // Notifications Tests
    console.log(chalk.yellow('\n🔔 Notifications Tests'));
    console.log(chalk.gray('─'.repeat(30)));

    await this.test('GET /notifications', async () => {
      const { response, data } = await this.request('GET', '/notifications');
      if (!response.ok) throw new Error(data.error || 'Get notifications failed');
    });

    // Reviews Tests
    console.log(chalk.yellow('\n⭐ Reviews Tests'));
    console.log(chalk.gray('─'.repeat(30)));

    await this.test('GET /reviews/my', async () => {
      const { response, data } = await this.request('GET', '/reviews/my');
      if (!response.ok) throw new Error(data.error || 'Get my reviews failed');
      if (!Array.isArray(data)) throw new Error('Response is not an array');
    });

    // Generate Report
    this.generateReport();
  }

  generateReport() {
    console.log('\n' + chalk.blue('━'.repeat(50)));
    console.log(chalk.blue('📊 TEST RESULTS SUMMARY'));
    console.log(chalk.blue('━'.repeat(50)));
    
    const successRate = Math.round((this.results.passed / this.results.total) * 100);
    
    console.log(`Total Tests: ${this.results.total}`);
    console.log(`${chalk.green('✓ Passed:')} ${this.results.passed}`);
    console.log(`${chalk.red('✗ Failed:')} ${this.results.failed}`);
    console.log(`Success Rate: ${successRate >= 80 ? chalk.green(successRate + '%') : chalk.red(successRate + '%')}`);
    
    if (this.errors.length > 0) {
      console.log('\n' + chalk.red('Failed Tests:'));
      this.errors.forEach(err => {
        console.log(chalk.red(`  • ${err.test}: ${err.error}`));
      });
    }

    console.log('\n' + chalk.blue('━'.repeat(50)));
    
    if (successRate === 100) {
      console.log(chalk.green('🎉 ALL TESTS PASSED! Production API is healthy.'));
    } else if (successRate >= 80) {
      console.log(chalk.yellow('⚠️  Most tests passed, but some issues detected.'));
    } else {
      console.log(chalk.red('❌ CRITICAL: Many tests failed. Check production immediately!'));
    }
  }
}

// Run tests
console.log(chalk.cyan(`
╔═══════════════════════════════════════╗
║    KYZMET PRODUCTION API TESTER       ║
║    Testing: ${BASE_URL}    ║
╚═══════════════════════════════════════╝
`));

const tester = new ProductionAPITester();
tester.runAllTests().catch(error => {
  console.error(chalk.red('\n💥 Fatal error during testing:'), error);
  process.exit(1);
});