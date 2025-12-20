import axios, { AxiosError } from 'axios';
import type { CalculatorResult, Message } from '@/types/salary';

// ============================================
// CONFIGURATION
// ============================================

const ZAI_API_URL = process.env.NEXT_PUBLIC_ZAI_API_URL || 'https://api.z.ai/api/paas/v4';
const ZAI_API_KEY = process.env.NEXT_PUBLIC_ZAI_API_KEY;
const ZAI_MODEL = process.env.NEXT_PUBLIC_ZAI_MODEL || 'glm-4-6-flash'; // FREE model!
const ZAI_MAX_TOKENS = parseInt(process.env.NEXT_PUBLIC_ZAI_MAX_TOKENS || '2048');
const ZAI_TEMPERATURE = parseFloat(process.env.NEXT_PUBLIC_ZAI_TEMPERATURE || '0.7');
const ZAI_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_ZAI_TIMEOUT || '30000');
const ZAI_DEBUG = process.env.NEXT_PUBLIC_ZAI_DEBUG === 'true';

interface ZAIChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ZAIChatRequest {
  model: string;
  messages: ZAIChatMessage[];
  do_sample?: boolean;
  stream?: boolean;
  thinking?: {
    type: 'enabled' | 'disabled';
  };
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  tool_stream?: boolean;
  response_format?: {
    type: 'text' | 'json_object';
  };
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

    // Log configuration (only in development with debug mode)
    if (typeof window !== 'undefined' && ZAI_DEBUG) {
      console.log('🔧 Z.AI Configuration:', {
        apiUrl: this.apiUrl,
        model: this.model,
        temperature: ZAI_TEMPERATURE,
        maxTokens: ZAI_MAX_TOKENS,
      });
    }
  }

  /**
   * Vietnamese Salary Assistant System Prompt (Shortened)
   */
  private readonly SYSTEM_PROMPT = `Bạn là trợ lý AI về lương và thuế TNCN cho người Việt Nam.

VAI TRÒ: Phân tích lương, tư vấn tài chính, giải thích thuế và bảo hiểm, tối ưu thuế hợp pháp.

NGUYÊN TẮC:
- Trả lời bằng tiếng Việt, thân thiện và chuyên nghiệp
- Số liệu chính xác, format theo chuẩn VN
- Đưa lời khuyên hành động cụ thể

THÔNG TIN THUẾ 2026:
• Giảm trừ: Bản thân 15.5M/tháng, Người phụ thuộc 6.2M/tháng
• BHXH 8%, BHYT 1.5%, BHTN 1%
• Bậc thuế: ≤10M (5%), 10-30M (10%), 30-50M (20%), 50-100M (30%), >100M (35%)`;

  /**
   * Send message to Z.AI
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
      // Check if this is the first message
      const isFirstMessage = messages.length === 1;

      // Format messages for Z.AI
      let zaiMessages: ZAIChatMessage[];

      if (isFirstMessage) {
        // First time: Send concise prompt with essential context
        const userMessage = messages[0];
        zaiMessages = [
          {
            role: 'user',
            content: `${this.SYSTEM_PROMPT}\n\n📊 Lương Gross: ${result.gross.toLocaleString('vi-VN')} VND\n💰 Lương Net: ${result.net.toLocaleString('vi-VN')} VND\n📝 Thuế: ${result.tax.toLocaleString('vi-VN')} VND\n👥 Người phụ thuộc: ${result.dependents}\n\n${userMessage.content}`
          },
        ];
      } else {
        // Continue chat: Just send conversation messages
        zaiMessages = messages.map(msg => ({
          role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content,
        }));
      }

      // Call our API route (which calls Z.AI server-side)
      const response = await axios.post<ZAIChatResponse>(
        '/api/ai-chat',
        {
          model: this.model,
          messages: zaiMessages,
          stream: true,
          thinking: {
            type: 'enabled',
          },
          temperature: ZAI_TEMPERATURE,
          top_p: 0.95,
          tool_stream: false,
          response_format: {
            type: 'text',
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Log response for debugging
      console.log('Z.AI Response:', JSON.stringify(response.data, null, 2));

      // Extract response with validation
      if (!response.data) {
        throw new Error('No response data from Z.AI API');
      }

      if (!response.data.choices || !Array.isArray(response.data.choices) || response.data.choices.length === 0) {
        console.error('Invalid response structure:', response.data);
        throw new Error('Invalid response structure from Z.AI API');
      }

      const content = response.data.choices[0]?.message?.content || '';
      const usage = response.data.usage;

      // Generate smart suggestions
      const suggestions = this.generateSuggestions(result, content);

      return {
        content,
        suggestions,
        usage,
      };
    } catch (error) {
      console.error('Z.AI Chat API Error:', error);
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
      messages: [{
        id: Date.now().toString(),
        role: 'user',
        content: prompt,
        timestamp: new Date(),
      }],
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
}

// Export singleton instance
export const zaiChat = new ZAIChatAPI();
