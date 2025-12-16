# 🤖 SalaryCalc VN - Chat Completions API Complete Implementation

> Production-ready AI Assistant với Z.AI Chat Completions API + Axios + FREE Model

**Model:** `glm-4-6-flash` (100% FREE!)  
**API:** Chat Completions API  
**Library:** Axios

---

## ⚠️ SECURITY WARNING

```
🔴 QUAN TRỌNG - API KEY BẢO MẬT:

Bạn đã share API key trong chat:
76eec6f0ae9f4f92b872436c510f0592.PYtmoJ3GqQmCMSoa

PHẢI LÀM NGAY:
1. ✅ Test implementation với key này
2. ❌ SAU ĐÓ revoke key này
3. ✅ Tạo key mới từ dashboard
4. ✅ Store trong .env, KHÔNG commit to git

Để revoke:
→ https://z.ai/manage-apikey/apikey-list
→ Click "Delete" trên key đã share
→ Tạo key mới
```

---

## 📋 MỤC LỤC

1. [Quick Start](#-quick-start)
2. [Environment Setup](#-environment-setup)
3. [Complete API Client](#-complete-api-client)
4. [System Prompt](#-system-prompt)
5. [Usage Examples](#-usage-examples)
6. [React Integration](#-react-integration)
7. [Error Handling](#-error-handling)
8. [Testing](#-testing)
9. [Production Deployment](#-production-deployment)

---

## 🚀 QUICK START

### **1. Install Dependencies**

```bash
npm install axios
# or
pnpm add axios
# or
yarn add axios
```

### **2. Create .env.local**

```env
# .env.local

# Z.AI Configuration
ZAI_API_KEY=76eec6f0ae9f4f92b872436c510f0592.PYtmoJ3GqQmCMSoa
ZAI_API_URL=https://api.z.ai/api/paas/v4
ZAI_MODEL=glm-4-6-flash

# App Configuration
NODE_ENV=development
```

### **3. Add to .gitignore**

```bash
# .gitignore
.env.local
.env
```

### **4. Create API Client**

```typescript
// lib/zai-chat.ts
// [See complete code below]
```

### **5. Use in Component**

```typescript
import { zaiChat } from '@/lib/zai-chat';

const response = await zaiChat.generateInitialAnalysis(result);
```

---

## ⚙️ ENVIRONMENT SETUP

### **.env.local (Full Config)**

```env
# ============================================
# Z.AI API CONFIGURATION
# ============================================

# API Key (GET FROM: https://z.ai/manage-apikey/apikey-list)
ZAI_API_KEY=76eec6f0ae9f4f92b872436c510f0592.PYtmoJ3GqQmCMSoa

# API Base URL
ZAI_API_URL=https://api.z.ai/api/paas/v4

# Model Selection (FREE MODELS)
# Options: glm-4-6-flash, glm-4-5-flash
ZAI_MODEL=glm-4-6-flash

# ============================================
# MODEL PARAMETERS
# ============================================

# Temperature (0-1, default: 0.7)
# Lower = more focused, Higher = more creative
ZAI_TEMPERATURE=0.7

# Max Output Tokens (default: 2048)
ZAI_MAX_TOKENS=2048

# Request Timeout (milliseconds, default: 30000)
ZAI_TIMEOUT=30000

# ============================================
# FEATURE FLAGS
# ============================================

# Enable streaming responses
ZAI_ENABLE_STREAMING=true

# Enable debug logging
ZAI_DEBUG=false

# ============================================
# APPLICATION
# ============================================

NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **.env.example (For Git)**

```env
# Copy to .env.local and fill in your values

ZAI_API_KEY=your_api_key_here
ZAI_API_URL=https://api.z.ai/api/paas/v4
ZAI_MODEL=glm-4-6-flash
ZAI_TEMPERATURE=0.7
ZAI_MAX_TOKENS=2048
ZAI_TIMEOUT=30000
```

---

## 💻 COMPLETE API CLIENT

### **TypeScript Implementation**

```typescript
// lib/zai-chat.ts

import axios, { AxiosError } from 'axios';
import type { CalculatorResult, Message } from '@/types';

// ============================================
// CONFIGURATION
// ============================================

const ZAI_API_URL = process.env.ZAI_API_URL || 'https://api.z.ai/api/paas/v4';
const ZAI_API_KEY = process.env.ZAI_API_KEY;
const ZAI_MODEL = process.env.ZAI_MODEL || 'glm-4-6-flash'; // FREE model!
const ZAI_TEMPERATURE = parseFloat(process.env.ZAI_TEMPERATURE || '0.7');
const ZAI_MAX_TOKENS = parseInt(process.env.ZAI_MAX_TOKENS || '2048');
const ZAI_TIMEOUT = parseInt(process.env.ZAI_TIMEOUT || '30000');

// ============================================
// TYPE DEFINITIONS
// ============================================

interface ZAIChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ZAIChatRequest {
  model: string;
  messages: ZAIChatMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

interface ZAIChatResponse {
  id: string;
  request_id: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
      reasoning_content?: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// ============================================
// API CLIENT CLASS
// ============================================

export class ZAIChatAPI {
  private apiKey: string;
  private apiUrl: string;
  private model: string;

  constructor() {
    if (!ZAI_API_KEY) {
      throw new Error(
        '❌ ZAI_API_KEY is not set. Please add it to your .env.local file.'
      );
    }

    this.apiKey = ZAI_API_KEY;
    this.apiUrl = ZAI_API_URL;
    this.model = ZAI_MODEL;

    // Log configuration (only in development)
    if (process.env.NODE_ENV === 'development' && process.env.ZAI_DEBUG === 'true') {
      console.log('🔧 Z.AI Configuration:', {
        apiUrl: this.apiUrl,
        model: this.model,
        temperature: ZAI_TEMPERATURE,
        maxTokens: ZAI_MAX_TOKENS,
      });
    }
  }

  /**
   * Vietnamese Salary Assistant System Prompt
   * Optimized cho SalaryCalc VN
   */
  private readonly SYSTEM_PROMPT = `Bạn là trợ lý AI chuyên nghiệp về lương và tài chính cá nhân cho người lao động Việt Nam.

🎯 VAI TRÒ CỦA BẠN:
- Phân tích kết quả tính lương chi tiết và chính xác
- Tư vấn tài chính cá nhân phù hợp với người Việt
- Giải thích rõ ràng các khoản thuế và bảo hiểm (BHXH, BHYT, BHTN)
- Đưa ra chiến lược tối ưu thuế hợp pháp
- Hỗ trợ đàm phán lương hiệu quả
- Tư vấn phát triển sự nghiệp

📋 NGUYÊN TẮC GIAO TIẾP:
1. LUÔN LUÔN trả lời bằng tiếng Việt
2. Thân thiện, hữu ích và chuyên nghiệp
3. Sử dụng emoji phù hợp (không quá nhiều)
4. Cung cấp số liệu cụ thể và tính toán chính xác
5. Đưa ra lời khuyên có thể hành động ngay
6. KHÔNG BAO GIỜ bịa đặt thông tin pháp lý
7. Trích dẫn luật thuế Việt Nam khi thảo luận về thuế
8. Thừa nhận khi không chắc chắn về thông tin

📊 THÔNG TIN QUAN TRỌNG (Luật Thuế TNCN 2026):
• Giảm trừ bản thân: 15,500,000 VND/tháng (186M/năm)
• Giảm trừ người phụ thuộc: 6,200,000 VND/tháng (74.4M/năm)
• Bảo hiểm bắt buộc:
  - BHXH: 8% (người lao động)
  - BHYT: 1.5%
  - BHTN: 1%
• Bậc thuế lũy tiến (5 bậc):
  - Bậc 1 (≤10M): 5%
  - Bậc 2 (10-30M): 10%
  - Bậc 3 (30-50M): 20%
  - Bậc 4 (50-100M): 30%
  - Bậc 5 (>100M): 35%

⚠️ LƯU Ý QUAN TRỌNG:
- Luôn chính xác với tính toán số học
- Format số theo chuẩn Việt Nam (dấu chấm ngăn cách hàng nghìn)
- Giải thích rõ ràng, dễ hiểu cho người không chuyên
- Đưa ra ví dụ cụ thể khi cần thiết`;

  /**
   * Send message to Z.AI Chat API
   */
  async sendMessage({
    messages,
    result,
    stream = false,
  }: {
    messages: Message[];
    result: CalculatorResult;
    stream?: boolean;
  }): Promise<{ content: string; suggestions: string[]; usage?: any }> {
    try {
      // Build context from result
      const context = this.buildContext(result);

      // Format messages for Z.AI
      const zaiMessages: ZAIChatMessage[] = [
        {
          role: 'system',
          content: this.SYSTEM_PROMPT,
        },
        {
          role: 'system',
          content: `📊 Context hiện tại:\n${context}`,
        },
        ...messages.map(msg => ({
          role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content,
        })),
      ];

      // Make API request
      const response = await axios.post<ZAIChatResponse>(
        `${this.apiUrl}/chat/completions`,
        {
          model: this.model,
          messages: zaiMessages,
          temperature: ZAI_TEMPERATURE,
          max_tokens: ZAI_MAX_TOKENS,
          stream,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'Accept-Language': 'vi-VN,vi',
          },
          timeout: ZAI_TIMEOUT,
        }
      );

      // Extract response
      const content = response.data.choices[0]?.message?.content || '';
      const usage = response.data.usage;

      // Generate smart suggestions
      const suggestions = this.generateSuggestions(result, content);

      // Log usage (only in development)
      if (process.env.NODE_ENV === 'development' && process.env.ZAI_DEBUG === 'true') {
        console.log('📊 API Usage:', {
          promptTokens: usage.prompt_tokens,
          completionTokens: usage.completion_tokens,
          totalTokens: usage.total_tokens,
        });
      }

      return {
        content,
        suggestions,
        usage,
      };
    } catch (error) {
      console.error('❌ Z.AI Chat API Error:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Generate initial analysis when component mounts
   */
  async generateInitialAnalysis(
    result: CalculatorResult
  ): Promise<{ content: string; suggestions: string[] }> {
    const prompt = this.buildInitialAnalysisPrompt(result);

    return this.sendMessage({
      messages: [
        {
          id: Date.now().toString(),
          role: 'user',
          content: prompt,
          timestamp: new Date(),
        },
      ],
      result,
    });
  }

  /**
   * Build context string from calculation result
   */
  private buildContext(result: CalculatorResult): string {
    const context = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 KẾT QUẢ TÍNH LƯƠNG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 Thông tin cơ bản:
• Lương Gross: ${result.gross.toLocaleString('vi-VN')} VND/tháng
• Lương Net: ${result.net.toLocaleString('vi-VN')} VND/tháng
• Thuế TNCN: ${result.tax.toLocaleString('vi-VN')} VND/tháng
• Bảo hiểm: ${result.insurance.toLocaleString('vi-VN')} VND/tháng

👨‍👩‍👧‍👦 Giảm trừ gia cảnh:
• Số người phụ thuộc: ${result.dependents}
• Thu nhập tính thuế: ${result.taxableIncome.toLocaleString('vi-VN')} VND/tháng

📈 Thông tin thuế:
• Bậc thuế: ${result.taxTier}
• Thuế suất hiệu dụng: ${result.effectiveRate.toFixed(2)}%
${
  result.savings2026
    ? `\n✨ Lợi ích từ luật thuế 2026:\n• Tiết kiệm thuế: ${result.savings2026.toLocaleString('vi-VN')} VND/tháng\n• Tương đương: ${(result.savings2026 * 12).toLocaleString('vi-VN')} VND/năm`
    : ''
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    return context;
  }

  /**
   * Build initial analysis prompt
   */
  private buildInitialAnalysisPrompt(result: CalculatorResult): string {
    return `Xin chào! 👋

Vui lòng phân tích kết quả tính lương này và đưa ra insights chi tiết, hữu ích cho người lao động Việt Nam.

Hãy cung cấp theo format sau:

📊 **PHÂN TÍCH TỔNG QUAN** (2-3 câu súc tích)
• Đánh giá chung về mức lương Net so với Gross
• Nhận xét về tỷ lệ các khoản trừ

💡 **KEY INSIGHTS** (3 điểm quan trọng nhất)
• Insight 1: [Về thuế hoặc bảo hiểm]
• Insight 2: [Về mức lương so với thị trường]
• Insight 3: [Về cơ hội tối ưu hóa]

🎯 **GỢI Ý CẢI THIỆN** (2-3 hành động cụ thể có thể thực hiện ngay)
1. [Hành động 1]: Mô tả chi tiết và lợi ích cụ thể
2. [Hành động 2]: Mô tả chi tiết và lợi ích cụ thể
3. [Hành động 3]: Mô tả chi tiết và lợi ích cụ thể

✨ **LỢI ÍCH TỪ LUẬT THUẾ 2026**
• Giải thích cụ thể về thay đổi và lợi ích cho người lao động

Lưu ý:
- Sử dụng số liệu cụ thể và tính toán chính xác
- Format số theo chuẩn Việt Nam
- Giải thích rõ ràng, dễ hiểu
- Thân thiện và chuyên nghiệp
- Sử dụng emoji phù hợp để dễ đọc`;
  }

  /**
   * Generate smart suggestions based on context
   */
  private generateSuggestions(
    result: CalculatorResult,
    response: string
  ): string[] {
    const suggestions: string[] = [];

    // Tax optimization
    if (result.tax > 0) {
      suggestions.push('💰 Làm sao để giảm thuế TNCN hợp pháp?');
    }

    // 2026 changes
    if (result.savings2026 && result.savings2026 > 0) {
      suggestions.push('✨ Chi tiết về luật thuế mới 2026?');
    }

    // Salary negotiation
    if (result.gross < 50_000_000) {
      suggestions.push('🎯 Chiến lược đàm phán tăng lương?');
    }

    // Market comparison
    suggestions.push('📊 Lương tôi so với thị trường thế nào?');

    // Financial planning
    if (result.net > 15_000_000) {
      suggestions.push('💾 Kế hoạch tiết kiệm và đầu tư?');
    }

    // Benefits
    suggestions.push('🎁 Cách tính giá trị benefits của công ty?');

    return suggestions.slice(0, 4); // Return top 4
  }

  /**
   * Handle API errors with Vietnamese messages
   */
  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;
      const message = axiosError.response?.data?.error?.message || error.message;
      const status = axiosError.response?.status;

      // Specific error messages in Vietnamese
      if (status === 401) {
        return new Error(
          '⚠️ API Key không hợp lệ. Vui lòng kiểm tra lại ZAI_API_KEY trong file .env.local'
        );
      } else if (status === 429) {
        return new Error(
          '⚠️ Đã đạt giới hạn rate limit. Vui lòng thử lại sau vài giây.'
        );
      } else if (status === 500 || status === 502 || status === 503) {
        return new Error(
          '⚠️ Lỗi server Z.AI. Dịch vụ tạm thời không khả dụng, vui lòng thử lại sau.'
        );
      } else if (axiosError.code === 'ECONNABORTED') {
        return new Error(
          '⚠️ Request timeout. Kết nối quá lâu, vui lòng thử lại.'
        );
      } else if (axiosError.code === 'ENOTFOUND' || axiosError.code === 'ECONNREFUSED') {
        return new Error(
          '⚠️ Không thể kết nối đến server Z.AI. Vui lòng kiểm tra kết nối internet.'
        );
      }

      return new Error(`Z.AI API Error (${status}): ${message}`);
    }

    return error instanceof Error ? error : new Error('Unknown error occurred');
  }

  /**
   * Test API connection
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/chat/completions`,
        {
          model: this.model,
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
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      console.log('✅ Z.AI API connection successful!');
      console.log('📊 Model:', response.data.model);
      return true;
    } catch (error) {
      console.error('❌ Z.AI API connection failed:', error);
      return false;
    }
  }
}

// ============================================
// EXPORT SINGLETON INSTANCE
// ============================================

export const zaiChat = new ZAIChatAPI();

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format Vietnamese number
 */
export function formatVND(amount: number): string {
  return amount.toLocaleString('vi-VN') + ' VND';
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): string {
  return ((value / total) * 100).toFixed(2) + '%';
}
```

---

## 📝 SYSTEM PROMPT

### **Tại sao System Prompt quan trọng?**

System prompt define **personality** và **behavior** của AI:

```typescript
const SYSTEM_PROMPT = `Bạn là trợ lý AI chuyên nghiệp...`;

// This tells the AI:
// 1. WHO it is (Vietnamese salary advisor)
// 2. WHAT it does (analyze, advise, explain)
// 3. HOW it communicates (Vietnamese, friendly, accurate)
// 4. WHAT it knows (2026 tax laws, rates, calculations)
```

### **Best Practices:**

```
✅ Clear role definition
✅ Specific knowledge (2026 tax info)
✅ Communication guidelines
✅ Output format expectations
✅ Constraints (don't make up legal info)
```

---

## 🎯 USAGE EXAMPLES

### **Example 1: Simple Test**

```typescript
// test/simple-test.ts

import { zaiChat } from '@/lib/zai-chat';

async function simpleTest() {
  console.log('🧪 Testing Z.AI Chat API...\n');

  const mockResult = {
    gross: 30000000,
    net: 26395000,
    tax: 455000,
    insurance: 3150000,
    dependents: 2,
    taxTier: 2,
    taxableIncome: 7050000,
    effectiveRate: 1.52,
    savings2026: 455000,
    breakdown: {
      bhxh: 2400000,
      bhyt: 450000,
      bhtn: 300000,
      personalDeduction: 15500000,
      dependentDeduction: 12400000,
    },
  };

  try {
    const response = await zaiChat.generateInitialAnalysis(mockResult);

    console.log('✅ Response received!\n');
    console.log('📝 Content:');
    console.log(response.content);
    console.log('\n💡 Suggestions:');
    response.suggestions.forEach((s, i) => {
      console.log(`${i + 1}. ${s}`);
    });
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

simpleTest();
```

Run test:
```bash
npx tsx test/simple-test.ts
```

---

### **Example 2: Conversation Flow**

```typescript
// test/conversation-test.ts

import { zaiChat } from '@/lib/zai-chat';

async function conversationTest() {
  const result = {
    gross: 30000000,
    net: 26395000,
    tax: 455000,
    insurance: 3150000,
    dependents: 2,
    taxTier: 2,
    taxableIncome: 7050000,
    effectiveRate: 1.52,
    savings2026: 455000,
  };

  console.log('🤖 Starting conversation...\n');

  // Initial analysis
  console.log('1️⃣ Getting initial analysis...');
  const initial = await zaiChat.generateInitialAnalysis(result);
  console.log('AI:', initial.content.substring(0, 200) + '...\n');

  // Follow-up question
  console.log('2️⃣ Asking follow-up question...');
  const followUp = await zaiChat.sendMessage({
    messages: [
      {
        id: '1',
        role: 'user',
        content: 'Làm sao để giảm thuế TNCN hợp pháp?',
        timestamp: new Date(),
      },
    ],
    result,
  });
  console.log('AI:', followUp.content.substring(0, 200) + '...\n');

  // Another question
  console.log('3️⃣ Another question...');
  const another = await zaiChat.sendMessage({
    messages: [
      {
        id: '1',
        role: 'user',
        content: 'Làm sao để giảm thuế TNCN hợp pháp?',
        timestamp: new Date(),
      },
      {
        id: '2',
        role: 'assistant',
        content: followUp.content,
        timestamp: new Date(),
      },
      {
        id: '3',
        role: 'user',
        content: 'Nếu tôi thêm 1 người phụ thuộc thì tiết kiệm được bao nhiêu?',
        timestamp: new Date(),
      },
    ],
    result,
  });
  console.log('AI:', another.content.substring(0, 200) + '...\n');

  console.log('✅ Conversation test complete!');
}

conversationTest();
```

---

### **Example 3: React Component Integration**

```typescript
// components/calculator/ai-assistant.tsx

'use client';

import { useState, useEffect } from 'react';
import { zaiChat } from '@/lib/zai-chat';
import type { CalculatorResult, Message } from '@/types';

export function AIAssistant({ result }: { result: CalculatorResult }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize with auto-analysis
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await zaiChat.generateInitialAnalysis(result);

        setMessages([
          {
            id: Date.now().toString(),
            role: 'assistant',
            content: response.content,
            timestamp: new Date(),
            suggestions: response.suggestions,
          },
        ]);
      } catch (err: any) {
        setError(err.message);
        console.error('Initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [result]);

  // Send message
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await zaiChat.sendMessage({
        messages: [...messages, userMessage],
        result,
      });

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.content,
          timestamp: new Date(),
          suggestions: response.suggestions,
        },
      ]);
    } catch (err: any) {
      setError(err.message);
      console.error('Send message error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id}>
            <div className={msg.role === 'user' ? 'text-right' : 'text-left'}>
              <div
                className={`inline-block p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {msg.content}
              </div>
            </div>

            {/* Suggestions */}
            {msg.suggestions && (
              <div className="flex flex-wrap gap-2 mt-2">
                {msg.suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(s)}
                    className="text-sm px-3 py-1 bg-white border rounded-full hover:bg-gray-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && <div>AI đang trả lời...</div>}
        {error && <div className="text-red-600">Lỗi: {error}</div>}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder="Hỏi bất cứ điều gì..."
            className="flex-1 px-4 py-2 border rounded-lg"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 🚨 ERROR HANDLING

### **Complete Error Handler**

```typescript
// lib/error-handler.ts

export class ZAIError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message);
    this.name = 'ZAIError';
  }
}

export function handleZAIError(error: any): ZAIError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.error?.message;

    switch (status) {
      case 400:
        return new ZAIError(
          '⚠️ Request không hợp lệ. Vui lòng kiểm tra lại dữ liệu.',
          'BAD_REQUEST',
          400
        );

      case 401:
        return new ZAIError(
          '⚠️ API Key không hợp lệ. Kiểm tra ZAI_API_KEY trong .env.local',
          'UNAUTHORIZED',
          401
        );

      case 403:
        return new ZAIError(
          '⚠️ Không có quyền truy cập. API Key có thể đã hết hạn.',
          'FORBIDDEN',
          403
        );

      case 404:
        return new ZAIError(
          '⚠️ API endpoint không tồn tại. Kiểm tra ZAI_API_URL.',
          'NOT_FOUND',
          404
        );

      case 429:
        return new ZAIError(
          '⚠️ Đạt giới hạn rate limit. Vui lòng đợi vài giây và thử lại.',
          'RATE_LIMITED',
          429
        );

      case 500:
      case 502:
      case 503:
        return new ZAIError(
          '⚠️ Lỗi server Z.AI. Vui lòng thử lại sau.',
          'SERVER_ERROR',
          status
        );

      default:
        return new ZAIError(
          `⚠️ Lỗi không xác định (${status}): ${message}`,
          'UNKNOWN_ERROR',
          status
        );
    }
  }

  if (error.code === 'ECONNABORTED') {
    return new ZAIError(
      '⚠️ Request timeout. Kết nối quá lâu.',
      'TIMEOUT'
    );
  }

  if (error.code === 'ENOTFOUND') {
    return new ZAIError(
      '⚠️ Không thể kết nối. Kiểm tra internet.',
      'NO_CONNECTION'
    );
  }

  return new ZAIError(
    error.message || 'Có lỗi xảy ra',
    'UNKNOWN'
  );
}
```

---

## 🧪 TESTING

### **Test Connection Script**

```typescript
// scripts/test-connection.ts

import { zaiChat } from '@/lib/zai-chat';

async function testConnection() {
  console.log('🧪 Testing Z.AI Connection...\n');

  console.log('Configuration:');
  console.log('• API URL:', process.env.ZAI_API_URL);
  console.log('• Model:', process.env.ZAI_MODEL);
  console.log('• API Key:', process.env.ZAI_API_KEY?.substring(0, 10) + '...\n');

  const success = await zaiChat.testConnection();

  if (success) {
    console.log('\n✅ Connection successful!');
    console.log('✅ You can now use the AI Assistant!');
  } else {
    console.log('\n❌ Connection failed!');
    console.log('❌ Please check your configuration.');
  }
}

testConnection();
```

Run:
```bash
npx tsx scripts/test-connection.ts
```

---

## 🚀 PRODUCTION DEPLOYMENT

### **Checklist:**

```
□ Environment Variables
  □ ZAI_API_KEY set (from new key, not shared one!)
  □ ZAI_API_URL correct
  □ ZAI_MODEL set to glm-4-6-flash
  □ NODE_ENV set to production

□ Security
  □ API key stored securely (Vercel/Netlify env vars)
  □ .env.local in .gitignore
  □ No hardcoded keys in code

□ Error Handling
  □ All API calls wrapped in try-catch
  □ User-friendly error messages
  □ Error logging configured

□ Testing
  □ Connection test passes
  □ Initial analysis works
  □ Conversation flow works
  □ Error scenarios tested

□ Performance
  □ Timeout configured (30s)
  □ Loading states implemented
  □ Rate limiting considered

□ Monitoring
  □ Error tracking (Sentry, etc.)
  □ Usage tracking
  □ Cost monitoring
```

---

## 💰 COST MONITORING

### **Track Usage:**

```typescript
// lib/usage-tracker.ts

export class UsageTracker {
  private static totalTokens = 0;
  private static totalCost = 0;

  static track(usage: { prompt_tokens: number; completion_tokens: number }) {
    // glm-4-6-flash is FREE!
    const cost = 0;

    this.totalTokens += usage.prompt_tokens + usage.completion_tokens;
    this.totalCost += cost;

    console.log('📊 Usage:', {
      thisRequest: {
        input: usage.prompt_tokens,
        output: usage.completion_tokens,
        cost: `$${cost.toFixed(4)}`,
      },
      total: {
        tokens: this.totalTokens.toLocaleString(),
        cost: `$${this.totalCost.toFixed(2)}`,
      },
    });
  }

  static getStats() {
    return {
      totalTokens: this.totalTokens,
      totalCost: this.totalCost,
    };
  }
}
```

---

## ✅ FINAL CHECKLIST

```
□ Install axios
□ Create .env.local with API key
□ Create lib/zai-chat.ts
□ Test connection
□ Test initial analysis
□ Test conversation flow
□ Integrate with React components
□ Test error handling
□ REVOKE shared API key
□ Create new API key
□ Deploy to production
□ Monitor usage
```

---

## 🎉 YOU'RE READY!

```
✅ Complete implementation guide
✅ Production-ready code
✅ FREE model (glm-4-6-flash)
✅ Vietnamese-optimized prompts
✅ Error handling
✅ Testing scripts
✅ React integration
✅ Security best practices

Cost: $0/month! 🎉
Quality: Excellent! ⭐
Ready: NOW! 🚀
```

---

**Remember to REVOKE the shared API key after testing! 🔐**
