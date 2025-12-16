# 🤖 AI Assistant Setup Guide

Complete guide to set up the AI Salary Assistant powered by Z.AI.

## 📋 Quick Start

### 1. Get Z.AI API Key

1. Visit [Z.AI API Keys Management](https://z.ai/manage-apikey/apikey-list)
2. Create an account or sign in
3. Generate a new API key
4. Copy your API key

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Update the API key:

```env
NEXT_PUBLIC_ZAI_API_KEY=your_actual_api_key_here
```

### 3. Install Dependencies

If not already installed:

```bash
npm install axios
```

### 4. Run the Application

```bash
npm run dev
```

The AI Assistant will now appear automatically after you calculate a salary!

## 🎯 Features

The AI Assistant provides:

- ✅ **Automatic Initial Analysis** - Analyzes your salary calculation immediately
- 💬 **Interactive Chat** - Ask any questions about your salary
- 💡 **Smart Suggestions** - Context-aware question suggestions
- 📊 **Tax Optimization** - Advice on reducing taxes legally
- 💰 **Salary Negotiation** - Tips for salary discussions
- 🎯 **Financial Planning** - Personalized saving & investment advice
- 📈 **Market Comparison** - Compare your salary to market rates
- 🏆 **Benefits Valuation** - Calculate true compensation value

## 💰 Cost Efficiency

Z.AI is 30x cheaper than other AI providers:

| Provider | Cost per 1M tokens | Cost per conversation |
|----------|-------------------|---------------------|
| Z.AI | $0.50 | ~$0.001 |
| Anthropic | $15.00 | ~$0.03 |
| OpenAI | $10.00 | ~$0.02 |

For 1000 users/day:
- Z.AI: ~$30/month
- Anthropic: ~$900/month
- OpenAI: ~$600/month

## 🏗️ Architecture

```
User calculates salary
    ↓
AI Assistant appears automatically
    ↓
Z.AI API analyzes results
    ↓
Shows insights + suggestions
    ↓
User can chat for more details
```

## 📁 Files Structure

```
lib/
├── zai-chat-api.ts          # Z.AI API client
└── utils/
    └── ai-helper.ts         # Helper utilities

components/
└── calculator/
    └── ai-assistant.tsx     # AI Assistant UI

types/
└── salary.ts                # TypeScript types (Message, CalculatorResult)

app/
└── calculator/
    └── page.tsx             # Integration point
```

## 🔧 Configuration Options

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_ZAI_API_KEY` | - | **Required**: Your Z.AI API key |
| `NEXT_PUBLIC_ZAI_API_URL` | `https://api.z.ai/api/v1` | Z.AI API endpoint |
| `NEXT_PUBLIC_ZAI_MODEL` | `glm-4-6` | Model to use |
| `NEXT_PUBLIC_ZAI_MAX_TOKENS` | `2048` | Max response length |
| `NEXT_PUBLIC_ZAI_TEMPERATURE` | `0.7` | Response creativity (0-1) |
| `NEXT_PUBLIC_ZAI_TIMEOUT` | `30000` | Request timeout (ms) |

### Component Props

```typescript
<AIAssistant
  result={calculatorResult}    // Required: Calculation result
  variant="panel"              // Optional: 'sidebar' | 'panel' | 'modal'
  className="h-[600px]"        // Optional: Custom styling
  onClose={() => {}}           // Optional: Close handler (for modal)
/>
```

## 🧪 Testing

### Manual Testing

1. Go to calculator page
2. Enter salary information
3. Click "Tính toán"
4. AI Assistant should appear below the results
5. Try asking questions:
   - "Làm sao để giảm thuế?"
   - "Lương tôi so với thị trường?"
   - "Nên tiết kiệm bao nhiêu?"

### Error Handling

The AI Assistant handles:
- ❌ Missing API key - Shows clear error message
- ❌ Network errors - Retry with user feedback
- ❌ Rate limits - Graceful degradation
- ❌ Timeout - Timeout message with retry option

## 📊 Usage Examples

### Basic Implementation

```typescript
import { AIAssistant } from '@/components/calculator/ai-assistant';
import { convertToCalculatorResult } from '@/lib/utils/ai-helper';

function MyComponent() {
  const [salaryResult, setSalaryResult] = useState<SalaryResult | null>(null);
  const [dependents, setDependents] = useState(0);

  return (
    <div>
      {salaryResult && (
        <AIAssistant
          result={convertToCalculatorResult(salaryResult, dependents)}
          variant="panel"
          className="h-[600px]"
        />
      )}
    </div>
  );
}
```

### Custom Styling

```typescript
<AIAssistant
  result={result}
  variant="sidebar"
  className="lg:sticky lg:top-6 h-[calc(100vh-8rem)]"
/>
```

## 🐛 Troubleshooting

### AI Assistant doesn't appear

1. Check if calculation is complete
2. Verify environment variables are set
3. Check browser console for errors

### API Key errors

```
Error: ZAI_API_KEY is not set in environment variables
```

**Solution**: Add your API key to `.env.local`

### "401 Unauthorized" errors

**Solution**: Your API key is invalid. Generate a new one from Z.AI dashboard

### "429 Rate Limit" errors

**Solution**: Wait a few seconds before trying again. Consider upgrading your Z.AI plan.

## 📖 API Reference

### ZAIChatAPI

```typescript
import { zaiChat } from '@/lib/zai-chat-api';

// Generate initial analysis
const { content, suggestions } = await zaiChat.generateInitialAnalysis(result);

// Send message
const response = await zaiChat.sendMessage({
  messages: conversationHistory,
  result: calculatorResult,
});
```

## 🚀 Advanced Features

### Streaming Support

To enable real-time streaming responses, check the guide documentation for streaming implementation details.

### Context Management

The AI automatically maintains conversation context and includes:
- Current salary calculation
- Previous conversation messages
- User profile (if available)

### Custom Prompts

Modify `SYSTEM_PROMPT` in `lib/zai-chat-api.ts` to customize AI behavior.

## 📚 Additional Resources

- [Complete Guide](.claude/docs/SalaryCalcVN-AI-Assistant-Complete-Guide.md)
- [Z.AI Documentation](https://z.ai/docs)
- [Z.AI API Keys](https://z.ai/manage-apikey/apikey-list)

## 🤝 Support

For issues or questions:
1. Check this guide
2. Review the complete guide in `.claude/docs/`
3. Contact support

---

**Last Updated**: December 2024
**Version**: 1.0
