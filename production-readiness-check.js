#!/usr/bin/env node

/**
 * Production Readiness Check for Kyzmet Backend
 * This script tests all critical authentication flows and checks configuration
 */

import fetch from 'node-fetch';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
const prisma = new PrismaClient();

const BASE_URL = 'http://localhost:6969';
const TEST_PHONE = '+77777777777';
const TEST_PASSWORD = 'testpass123';

class ProductionReadinessChecker {
  constructor() {
    this.results = [];
    this.errors = [];
  }

  log(message, status = 'INFO') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${status}: ${message}`;
    console.log(logMessage);
    this.results.push({ timestamp, status, message });
  }

  error(message, error) {
    this.log(`${message}: ${error.message}`, 'ERROR');
    this.errors.push({ message, error: error.message });
  }

  async checkDatabaseConnection() {
    this.log('🔍 Checking database connection...');
    try {
      await prisma.$connect();
      await prisma.user.count();
      this.log('✅ Database connection: OK');
      return true;
    } catch (error) {
      this.error('❌ Database connection failed', error);
      return false;
    }
  }

  async checkEnvironmentVariables() {
    this.log('🔍 Checking environment variables...');
    const requiredVars = [
      'DATABASE_URL',
      'JWT_SECRET',
      'FIREBASE_PROJECT_ID',
      'FIREBASE_CLIENT_EMAIL',
      'FIREBASE_PRIVATE_KEY'
    ];

    let allPresent = true;
    for (const varName of requiredVars) {
      if (!process.env[varName]) {
        this.log(`❌ Missing environment variable: ${varName}`, 'ERROR');
        allPresent = false;
      } else {
        this.log(`✅ Environment variable present: ${varName}`);
      }
    }

    return allPresent;
  }

  async checkServerHealth() {
    this.log('🔍 Checking server health...');
    try {
      const response = await fetch(`${BASE_URL}/health`);
      if (response.ok) {
        this.log('✅ Server health check: OK');
        return true;
      } else {
        this.log('⚠️ Server health endpoint not found (non-critical)', 'WARN');
        return true; // Non-critical
      }
    } catch (error) {
      this.error('❌ Server is not responding', error);
      return false;
    }
  }

  async testUserRegistration() {
    this.log('🔍 Testing user registration...');
    try {
      // Clean up test user first
      await prisma.user.deleteMany({ where: { phone: TEST_PHONE } });

      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: TEST_PHONE, password: TEST_PASSWORD })
      });

      if (response.ok) {
        const data = await response.json();
        this.log('✅ User registration: OK');
        return true;
      } else {
        const errorData = await response.json();
        this.log(`❌ Registration failed: ${errorData.error}`, 'ERROR');
        return false;
      }
    } catch (error) {
      this.error('❌ Registration test failed', error);
      return false;
    }
  }

  async testOTPFlow() {
    this.log('🔍 Testing OTP flow...');
    try {
      // Send OTP
      const otpResponse = await fetch(`${BASE_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: TEST_PHONE })
      });

      if (!otpResponse.ok) {
        this.log('❌ OTP send failed', 'ERROR');
        return false;
      }

      // Verify OTP (using development OTP: 1234)
      const verifyResponse = await fetch(`${BASE_URL}/api/auth/verify-phone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: TEST_PHONE, otp: '1234' })
      });

      if (verifyResponse.ok) {
        this.log('✅ OTP verification: OK');
        return true;
      } else {
        const errorData = await verifyResponse.json();
        this.log(`❌ OTP verification failed: ${errorData.error}`, 'ERROR');
        return false;
      }
    } catch (error) {
      this.error('❌ OTP flow test failed', error);
      return false;
    }
  }

  async testUserLogin() {
    this.log('🔍 Testing user login...');
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: TEST_PHONE, password: TEST_PASSWORD })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          this.log('✅ User login: OK');
          return true;
        } else {
          this.log('❌ Login successful but no token returned', 'ERROR');
          return false;
        }
      } else {
        const errorData = await response.json();
        this.log(`❌ Login failed: ${errorData.error}`, 'ERROR');
        return false;
      }
    } catch (error) {
      this.error('❌ Login test failed', error);
      return false;
    }
  }

  async checkDatabaseSchema() {
    this.log('🔍 Checking database schema...');
    try {
      // Check if all required tables exist
      const tables = await prisma.$queryRaw`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `;
      
      const tableNames = tables.map(t => t.table_name);
      const requiredTables = ['User', 'Admin', 'Service', 'Job', 'Category', 'Chat', 'ChatMessage'];
      
      let allTablesExist = true;
      for (const table of requiredTables) {
        if (tableNames.includes(table)) {
          this.log(`✅ Table exists: ${table}`);
        } else {
          this.log(`❌ Missing table: ${table}`, 'ERROR');
          allTablesExist = false;
        }
      }

      return allTablesExist;
    } catch (error) {
      this.error('❌ Database schema check failed', error);
      return false;
    }
  }

  async cleanup() {
    this.log('🧹 Cleaning up test data...');
    try {
      await prisma.user.deleteMany({ where: { phone: TEST_PHONE } });
      this.log('✅ Test data cleaned up');
    } catch (error) {
      this.error('⚠️ Cleanup failed (non-critical)', error);
    }
  }

  async runAllChecks() {
    this.log('🚀 Starting Production Readiness Check...');
    
    const checks = [
      { name: 'Database Connection', fn: () => this.checkDatabaseConnection() },
      { name: 'Environment Variables', fn: () => this.checkEnvironmentVariables() },
      { name: 'Server Health', fn: () => this.checkServerHealth() },
      { name: 'Database Schema', fn: () => this.checkDatabaseSchema() },
      { name: 'User Registration', fn: () => this.testUserRegistration() },
      { name: 'OTP Flow', fn: () => this.testOTPFlow() },
      { name: 'User Login', fn: () => this.testUserLogin() }
    ];

    const results = {};
    for (const check of checks) {
      try {
        results[check.name] = await check.fn();
      } catch (error) {
        this.error(`Check failed: ${check.name}`, error);
        results[check.name] = false;
      }
    }

    await this.cleanup();

    // Generate report
    this.generateReport(results);
    
    return results;
  }

  generateReport(results) {
    this.log('📊 Generating Production Readiness Report...');
    
    const passedChecks = Object.values(results).filter(r => r === true).length;
    const totalChecks = Object.keys(results).length;
    const successRate = Math.round((passedChecks / totalChecks) * 100);

    console.log('\n' + '='.repeat(60));
    console.log('🎯 PRODUCTION READINESS REPORT');
    console.log('='.repeat(60));
    console.log(`📈 Success Rate: ${successRate}% (${passedChecks}/${totalChecks})`);
    console.log('');

    for (const [checkName, passed] of Object.entries(results)) {
      const status = passed ? '✅ PASS' : '❌ FAIL';
      console.log(`${status} ${checkName}`);
    }

    console.log('');
    if (this.errors.length > 0) {
      console.log('🔥 CRITICAL ISSUES:');
      this.errors.forEach(error => {
        console.log(`   • ${error.message}`);
      });
      console.log('');
    }

    if (successRate >= 90) {
      console.log('🟢 READY FOR PRODUCTION');
    } else if (successRate >= 70) {
      console.log('🟡 NEEDS MINOR FIXES BEFORE PRODUCTION');
    } else {
      console.log('🔴 NOT READY FOR PRODUCTION - CRITICAL ISSUES FOUND');
    }
    
    console.log('='.repeat(60));
  }
}

// Run the checks
async function main() {
  const checker = new ProductionReadinessChecker();
  
  try {
    await checker.runAllChecks();
  } catch (error) {
    console.error('Fatal error during production readiness check:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();