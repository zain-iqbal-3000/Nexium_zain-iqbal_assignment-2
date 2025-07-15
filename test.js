#!/usr/bin/env node

// Test script for the Blog Summarizer
const { execSync } = require('child_process');

console.log('🧪 Testing Blog Summarizer Enhanced...\n');

// Test 1: Check if server is running
console.log('1. Checking server status...');
try {
  const response = await fetch('http://localhost:3000');
  if (response.ok) {
    console.log('✅ Server is running');
  } else {
    console.log('❌ Server returned error:', response.status);
  }
} catch (error) {
  console.log('❌ Server is not running. Please start with "npm run dev"');
  process.exit(1);
}

// Test 2: Test API endpoint with a sample URL
console.log('\n2. Testing API endpoint...');
try {
  const testUrl = 'https://medium.com/@example/sample-blog-post';
  const response = await fetch('http://localhost:3000/api/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: testUrl }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log('✅ API endpoint is working');
    console.log('📄 Summary generated:', data.summary_english?.substring(0, 100) + '...');
  } else {
    console.log('⚠️ API endpoint returned error:', response.status);
    const error = await response.text();
    console.log('Error details:', error.substring(0, 200));
  }
} catch (error) {
  console.log('❌ API test failed:', error.message);
}

// Test 3: Check Urdu translation
console.log('\n3. Testing Urdu translation...');
try {
  const { translateToUrdu } = require('./lib/urdu-translations-clean');
  const translated = translateToUrdu('This is a test of the translation system');
  console.log('✅ Urdu translation working');
  console.log('🌐 Sample translation:', translated.substring(0, 50) + '...');
} catch (error) {
  console.log('❌ Urdu translation test failed:', error.message);
}

console.log('\n🎉 Testing complete! Visit http://localhost:3000 to use the application.');
