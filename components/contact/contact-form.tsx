'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitContactForm } from '@/app/contact/actions';
import { PastelGlassCard } from '@/components/ui/pastel-glass-card';
import { PastelGlassButton } from '@/components/ui/pastel-glass-button';
import { DarkInput } from '@/components/ui/dark-input';
import { DarkSelect } from '@/components/ui/dark-select';
import { DarkTextarea } from '@/components/ui/dark-textarea';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [state, setState] = useState<FormState>({ status: 'idle' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ status: 'loading' });

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setState({
          status: 'success',
          message: 'Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm nhất.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Reset success state after 5s
        setTimeout(() => {
          setState({ status: 'idle' });
        }, 5000);
      } else {
        setState({
          status: 'error',
          message: result.error || 'Có lỗi xảy ra. Vui lòng thử lại.'
        });
      }
    } catch (error) {
      setState({
        status: 'error',
        message: 'Không thể gửi tin nhắn. Vui lòng thử lại sau.'
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <PastelGlassCard glow="purple">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='p-10'
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Gửi Tin Nhắn</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <DarkInput
          type="text"
          id="name"
          name="name"
          label="Họ và Tên"
          required
          placeholder="Nguyễn Văn A"
          value={formData.name}
          onChange={handleChange}
        />

        {/* Email */}
        <DarkInput
          type="email"
          id="email"
          name="email"
          label="Email"
          required
          placeholder="example@email.com"
          value={formData.email}
          onChange={handleChange}
        />

        {/* Subject */}
        <DarkSelect
          id="subject"
          name="subject"
          label="Chủ Đề"
          required
          value={formData.subject}
          onChange={handleChange}
          className='w-full'
        >
          <option value="">-- Chọn chủ đề --</option>
          <option value="support">Hỗ trợ kỹ thuật</option>
          <option value="feedback">Góp ý / Đề xuất</option>
          <option value="bug">Báo lỗi</option>
          <option value="business">Hợp tác kinh doanh</option>
          <option value="press">Báo chí / Truyền thông</option>
          <option value="other">Khác</option>
        </DarkSelect>

        {/* Message */}
        <div>
          <DarkTextarea
            id="message"
            name="message"
            label="Nội Dung"
            required
            rows={6}
            placeholder="Nhập nội dung tin nhắn của bạn..."
            value={formData.message}
            onChange={handleChange}
          />
          <p className="mt-2 text-sm text-slate-500">
            Tối thiểu 10 ký tự • {formData.message.length} ký tự
          </p>
        </div>

        {/* Status Messages */}
        {state.status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-600">Thành công!</p>
              <p className="text-sm text-slate-600 mt-1">{state.message}</p>
            </div>
          </motion.div>
        )}

        {state.status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-600">Lỗi!</p>
              <p className="text-sm text-slate-600 mt-1">{state.message}</p>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <PastelGlassButton
          type="submit"
          variant="primary"
          size="lg"
          disabled={state.status === 'loading'}
          isLoading={state.status === 'loading'}
          icon={<Send className="w-5 h-5" />}
          className="w-full text-white"
        >
          Gửi Tin Nhắn
        </PastelGlassButton>

        {/* Privacy Note */}
        <p className="text-xs text-slate-400 text-center">
          Bằng cách gửi form này, bạn đồng ý với{' '}
          <a href="/privacy" className="text-indigo-600 hover:underline">
            Chính sách Bảo mật
          </a>{' '}
          của chúng tôi.
        </p>
      </form>
      </motion.div>
    </PastelGlassCard>
  );
}
