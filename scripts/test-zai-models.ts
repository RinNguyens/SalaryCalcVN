// Test different Z.AI model names to find the correct one

import axios from 'axios';

const API_KEY = '76eec6f0ae9f4f92b872436c510f0592.PYtmoJ3GqQmCMSoa';
const API_URL = 'https://api.z.ai/api/paas/v4/chat/completions';

const modelsToTest = [
  'glm-4-flash',
  'glm-4-6-flash',
  'glm-4-plus',
  'glm-4',
  'glm-4-air',
  'glm-4-airx',
  'chatglm_turbo',
  'chatglm_pro',
  'chatglm_std',
];

async function testModel(modelName: string) {
  try {
    console.log(`\n🧪 Testing model: ${modelName}`);

    const response = await axios.post(
      API_URL,
      {
        model: modelName,
        messages: [
          {
            role: 'user',
            content: 'Hello',
          },
        ],
        max_tokens: 10,
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    );

    console.log(`✅ SUCCESS! Model "${modelName}" works!`);
    console.log('Response:', response.data.choices[0]?.message?.content);
    return true;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const errorMsg = error.response?.data?.error?.message || error.message;
      console.log(`❌ FAILED: ${errorMsg}`);
    }
    return false;
  }
}

async function main() {
  console.log('🔍 Testing Z.AI Models...\n');
  console.log('API URL:', API_URL);
  console.log('='.repeat(50));

  for (const model of modelsToTest) {
    await testModel(model);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s between tests
  }

  console.log('\n' + '='.repeat(50));
  console.log('✅ Testing complete!');
}

main();
