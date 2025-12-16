// Simple Node.js script to test Z.AI API
const https = require('https');

const API_KEY = '76eec6f0ae9f4f92b872436c510f0592.PYtmoJ3GqQmCMSoa';

// Test 1: Try to get models list
console.log('🔍 Testing Z.AI API...\n');

// Common endpoints to try
const endpoints = [
  'https://api.z.ai/api/paas/v4/models',
  'https://api.z.ai/api/v1/models',
  'https://api.z.ai/v1/models',
  'https://api.z.ai/models',
];

async function testEndpoint(url) {
  return new Promise((resolve) => {
    console.log(`Testing: ${url}`);

    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        if (res.statusCode === 200) {
          console.log('✅ SUCCESS! Response:');
          try {
            const json = JSON.parse(data);
            console.log(JSON.stringify(json, null, 2));
          } catch (e) {
            console.log(data);
          }
        } else {
          console.log(`❌ Failed: ${data}`);
        }
        console.log('---\n');
        resolve();
      });
    });

    req.on('error', (error) => {
      console.log(`❌ Error: ${error.message}\n---\n`);
      resolve();
    });

    req.end();
  });
}

// Test models with different names
const modelsToTest = [
  'glm-4',
  'glm-3-turbo',
  'chatglm_turbo',
  'chatglm_pro',
  'chatglm_std',
  'chatglm3',
  'chatglm2',
];

async function testChatWithModel(model) {
  return new Promise((resolve) => {
    const url = 'https://api.z.ai/api/paas/v4/chat/completions';

    const postData = JSON.stringify({
      model: model,
      messages: [
        {
          role: 'user',
          content: 'Hi',
        },
      ],
      max_tokens: 5,
    });

    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    console.log(`🧪 Testing chat with model: ${model}`);

    const req = https.request(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`✅ SUCCESS! Model "${model}" works!`);
          try {
            const json = JSON.parse(data);
            console.log('Response:', json.choices?.[0]?.message?.content || json);
          } catch (e) {
            console.log('Response:', data);
          }
        } else {
          try {
            const json = JSON.parse(data);
            console.log(`❌ Failed (${res.statusCode}):`, json.error?.message || json.msg || data);
          } catch (e) {
            console.log(`❌ Failed (${res.statusCode}):`, data);
          }
        }
        console.log('---\n');
        resolve();
      });
    });

    req.on('error', (error) => {
      console.log(`❌ Error: ${error.message}\n---\n`);
      resolve();
    });

    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('=' .repeat(60));
  console.log('PART 1: Testing models list endpoints');
  console.log('=' .repeat(60) + '\n');

  for (const endpoint of endpoints) {
    await testEndpoint(endpoint);
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n' + '='.repeat(60));
  console.log('PART 2: Testing chat completions with different models');
  console.log('=' .repeat(60) + '\n');

  for (const model of modelsToTest) {
    await testChatWithModel(model);
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log('\n✅ Testing complete!');
  console.log('\nLook for the model that shows "SUCCESS!" above.');
}

main();
