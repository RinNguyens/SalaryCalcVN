const https = require('https');

const testModel = (modelName) => {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      model: modelName,
      messages: [{ role: 'user', content: 'Xin chào' }],
      max_tokens: 50,
    });

    const options = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 76eec6f0ae9f4f92b872436c510f0592.PYtmoJ3GqQmCMSoa',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    console.log(`\n🧪 Testing: ${modelName}`);

    const req = https.request('https://api.z.ai/api/paas/v4/chat/completions', options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (res.statusCode === 200) {
            console.log(`✅ SUCCESS! "${modelName}" works!`);
            console.log('Response:', json.choices[0].message.content);
          } else {
            console.log(`❌ FAILED (${res.statusCode}):`, json.error?.message || json.msg);
          }
        } catch (e) {
          console.log(`❌ Parse error:`, data);
        }
        resolve();
      });
    });

    req.on('error', (e) => {
      console.log(`❌ Network error:`, e.message);
      resolve();
    });

    req.write(postData);
    req.end();
  });
};

async function main() {
  await testModel('glm-4.5-flash');
  await new Promise(r => setTimeout(r, 1000));
  await testModel('glm-4.6-flash');
  await new Promise(r => setTimeout(r, 1000));
  await testModel('glm-4-flash');
}

main();
