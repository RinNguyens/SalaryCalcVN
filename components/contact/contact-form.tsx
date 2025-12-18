'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitContactForm } from '@/app/contact/actions';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Gửi Tin Nhắn</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Họ và Tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Nguyễn Văn A"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="example@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Chủ Đề <span className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          >
            <option value="">-- Chọn chủ đề --</option>
            <option value="support">Hỗ trợ kỹ thuật</option>
            <option value="feedback">Góp ý / Đề xuất</option>
            <option value="bug">Báo lỗi</option>
            <option value="business">Hợp tác kinh doanh</option>
            <option value="press">Báo chí / Truyền thông</option>
            <option value="other">Khác</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Nội Dung <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Nhập nội dung tin nhắn của bạn..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
          />
          <p className="mt-2 text-sm text-gray-500">
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
              <p className="text-sm font-medium text-green-900">Thành công!</p>
              <p className="text-sm text-green-700 mt-1">{state.message}</p>
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
              <p className="text-sm font-medium text-red-900">Lỗi!</p>
              <p className="text-sm text-red-700 mt-1">{state.message}</p>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={state.status === 'loading'}
          className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          {state.status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Đang gửi...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Gửi Tin Nhắn</span>
            </>
          )}
        </button>

        {/* Privacy Note */}
        <p className="text-xs text-gray-500 text-center">
          Bằng cách gửi form này, bạn đồng ý với{' '}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Chính sách Bảo mật
          </a>{' '}
          của chúng tôi.
        </p>
      </form>
    </motion.div>
  );
}
