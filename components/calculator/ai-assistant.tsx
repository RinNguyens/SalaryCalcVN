'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Bot,
  Send,
  Sparkles,
  X,
  Minimize2,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { zaiChat } from '@/lib/zai-chat-api';
import type { CalculatorResult, Message } from '@/types/salary';

interface AIAssistantProps {
  result: CalculatorResult;
  className?: string;
  variant?: 'sidebar' | 'panel' | 'modal';
  onClose?: () => void;
}

export function AIAssistant({
  result,
  className,
  variant = 'sidebar',
  onClose
}: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);
  const initializingRef = useRef(false);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with auto-analysis (only once)
  useEffect(() => {
    // Prevent double initialization
    if (hasInitialized.current || initializingRef.current) {
      return;
    }

    const initializeChat = async () => {
      // Mark as initializing
      initializingRef.current = true;
      setIsLoading(true);

      try {
        const { content, suggestions } = await zaiChat.generateInitialAnalysis(result);

        setMessages([{
          id: Date.now().toString(),
          role: 'user',
          content,
          timestamp: new Date(),
          suggestions,
        }]);

        // Mark as successfully initialized
        hasInitialized.current = true;
      } catch (error) {
        console.error('Initialization error:', error);

        // Show error message
        setMessages([{
          id: Date.now().toString(),
          role: 'user',
          content: '⚠️ Xin lỗi, mình gặp lỗi khi khởi tạo. Vui lòng thử lại! 🙏',
          timestamp: new Date(),
        }]);
      } finally {
        setIsLoading(false);
        initializingRef.current = false;
      }
    };

    initializeChat();
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

    try {
      const { content, suggestions } = await zaiChat.sendMessage({
        messages: [...messages, userMessage],
        result,
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content,
        timestamp: new Date(),
        suggestions,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      console.error('AI response error:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `⚠️ ${error.message || 'Xin lỗi, mình gặp lỗi. Bạn thử lại nhé!'} 🙏`,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  // Minimized state
  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="lg"
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 shadow-lg hover:shadow-xl"
        >
          <Bot className="h-8 w-8 text-black" />
        </Button>
      </motion.div>
    );
  }

  return (
    <GlassCard
      variant="strong"
      className={cn('flex flex-col h-full', className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 animate-pulse">
            <Bot className="h-5 w-5 text-black" />
          </div>
          <div>
            <h3 className="font-bold text-black">AI Salary Assistant</h3>
            <p className="text-xs text-black/60 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Powered by Z.AI
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {variant === 'modal' && (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMinimized(true)}
                className="text-black/60 hover:text-black"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onClose}
                className="text-black/60 hover:text-black"
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              onSuggestionClick={handleSuggestionClick}
            />
          ))}
        </AnimatePresence>

        {isLoading && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Hỏi mình bất cứ điều gì về lương..."
            className="flex-1 bg-white/5 border-white/10 text-black placeholder:text-black/40"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-gradient-to-br from-purple-600 to-pink-500"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        <p className="text-xs text-black/40 mt-2">
          AI có thể mắc lỗi. Hãy kiểm tra thông tin quan trọng.
        </p>
      </div>
    </GlassCard>
  );
}

// Message Bubble Component
function MessageBubble({
  message,
  onSuggestionClick
}: {
  message: Message;
  onSuggestionClick: (suggestion: string) => void;
}) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        'flex gap-3',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Bot className="h-4 w-4 text-black" />
          </div>
        </div>
      )}

      <div className={cn(
        'max-w-[80%] space-y-2',
        isUser && 'items-end'
      )}>
        <GlassCard
          variant={isUser ? 'default' : 'strong'}
          className={cn(
            'p-3 text-sm',
            isUser
              ? 'bg-gradient-to-br from-purple-600 to-pink-500 text-black'
              : 'text-black/90'
          )}
        >
          <div className="whitespace-pre-wrap leading-relaxed">
            {message.content}
          </div>
        </GlassCard>

        {/* Suggestions */}
        {message.suggestions && message.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {message.suggestions.map((suggestion, index) => (
              <Button
                key={index}
                size="sm"
                variant="outline"
                onClick={() => onSuggestionClick(suggestion)}
                className="text-xs bg-white/5 border-white/20 text-black/70 hover:bg-white/10 hover:text-black"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                {suggestion}
              </Button>
            ))}
          </div>
        )}

        <p className="text-xs text-black/40 px-1">
          {message.timestamp.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-black font-bold text-sm">
            U
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Typing Indicator
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex gap-3"
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
        <Bot className="h-4 w-4 text-black" />
      </div>

      <GlassCard variant="strong" className="p-3">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white/60"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
