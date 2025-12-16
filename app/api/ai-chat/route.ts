import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const ZAI_API_URL = process.env.NEXT_PUBLIC_ZAI_API_URL || 'https://api.z.ai/api/paas/v4';
const ZAI_API_KEY = process.env.NEXT_PUBLIC_ZAI_API_KEY;
const ZAI_MODEL = process.env.NEXT_PUBLIC_ZAI_MODEL || 'glm-4-6-flash'; // FREE model!
const ZAI_MAX_TOKENS = parseInt(process.env.NEXT_PUBLIC_ZAI_MAX_TOKENS || '2048');
const ZAI_TEMPERATURE = parseFloat(process.env.NEXT_PUBLIC_ZAI_TEMPERATURE || '0.7');

export async function POST(request: NextRequest) {
  try {
    if (!ZAI_API_KEY) {
      return NextResponse.json(
        { error: 'Z.AI API key not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { messages } = body;

    console.log('🔵 Sending request to Z.AI...');
    console.log('📍 API URL:', `${ZAI_API_URL}/chat/completions`);
    console.log('🤖 Model:', ZAI_MODEL);
    console.log('💬 Messages count:', messages?.length);
    console.log('📦 Full request body:', JSON.stringify({
      model: ZAI_MODEL,
      messages: messages?.slice(0, 2), // Show first 2 messages for debugging
      temperature: ZAI_TEMPERATURE,
      max_tokens: ZAI_MAX_TOKENS,
    }, null, 2));

    // Call Z.AI API with retry logic
    let lastError;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await axios.post(
          `${ZAI_API_URL}/chat/completions`,
          {
            model: ZAI_MODEL,
            messages,
            temperature: ZAI_TEMPERATURE,
            max_tokens: ZAI_MAX_TOKENS,
          },
          {
            headers: {
              'Authorization': `Bearer ${ZAI_API_KEY}`,
              'Content-Type': 'application/json',
              'Accept-Language': 'vi-VN,vi',
            },
            timeout: 30000,
          }
        );

        console.log('Z.AI Response Status:', response.status);
        console.log('Z.AI Response Data:', JSON.stringify(response.data, null, 2));

        // Validate response structure
        if (!response.data || !response.data.choices || !Array.isArray(response.data.choices) || response.data.choices.length === 0) {
          console.error('Invalid Z.AI response structure:', response.data);
          return NextResponse.json(
            {
              error: 'Invalid response from Z.AI',
              details: response.data
            },
            { status: 500 }
          );
        }

        return NextResponse.json(response.data);
      } catch (error: any) {
        lastError = error;

        // If rate limited, wait and retry
        if (axios.isAxiosError(error) && error.response?.status === 429) {
          if (attempt < 3) {
            const waitTime = attempt * 2000; // 2s, 4s
            console.log(`⏳ Rate limited, waiting ${waitTime/1000}s before retry ${attempt}/3...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
            continue;
          }
        }

        // Other errors, don't retry
        break;
      }
    }

    // If we get here, all retries failed
    throw lastError;
  } catch (error: any) {
    console.error('API Route Error:', error);

    if (axios.isAxiosError(error)) {
      console.error('❌ Z.AI API Error Details:');
      console.error('Status:', error.response?.status);
      console.error('Status Text:', error.response?.statusText);
      console.error('Response Data:', JSON.stringify(error.response?.data, null, 2));
      console.error('Request URL:', error.config?.url);
      console.error('Request Method:', error.config?.method);
      console.error('Request Headers:', error.config?.headers);

      // Friendly error messages
      let userMessage = error.response?.data?.error?.message || error.response?.data?.message || error.message;

      if (error.response?.status === 429) {
        userMessage = '⏱️ Đã gửi quá nhiều yêu cầu. Vui lòng đợi 1-2 phút và thử lại. AI đang nghỉ ngơi một chút! 😊';
      }

      return NextResponse.json(
        {
          error: userMessage,
          status: error.response?.status,
          details: error.response?.data,
          requestUrl: error.config?.url,
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Unknown error occurred' },
      { status: 500 }
    );
  }
}
