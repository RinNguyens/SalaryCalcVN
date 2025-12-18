# 📧 SalaryLens - Contact Page Complete Documentation

> Trang Liên Hệ chuyên nghiệp với form, FAQ, và social links

**Features:** Contact Form, Multiple Methods, FAQ, Social Links, Animations  
**Framework:** Next.js 15 + TypeScript + Framer Motion

---

## 📋 MỤC LỤC

1. [Page Structure](#-page-structure)
2. [Contact Form](#-contact-form)
3. [Contact Methods](#-contact-methods)
4. [FAQ Section](#-faq-section)
5. [Social Links](#-social-links)
6. [Implementation](#-implementation)
7. [Email API](#-email-api)
8. [Validation](#-validation)
9. [UI Components](#-ui-components)

---

## 📁 PAGE STRUCTURE

```
app/
├── contact/
│   ├── page.tsx              # Main contact page
│   └── actions.ts            # Server actions for form
│
components/
├── contact/
│   ├── contact-form.tsx      # Form component
│   ├── contact-methods.tsx   # Contact methods grid
│   ├── contact-faq.tsx       # FAQ accordion
│   └── contact-hero.tsx      # Hero section
│
lib/
├── email.ts                  # Email sending logic
└── validations/
    └── contact.ts            # Form validation schemas
```

---

## 🎨 COMPLETE CONTACT PAGE

### **Main Page Component:**

```typescript
// app/contact/page.tsx

import type { Metadata } from 'next';
import { ContactHero } from '@/components/contact/contact-hero';
import { ContactForm } from '@/components/contact/contact-form';
import { ContactMethods } from '@/components/contact/contact-methods';
import { ContactFAQ } from '@/components/contact/contact-faq';
import { ContactSocial } from '@/components/contact/contact-social';

export const metadata: Metadata = {
  title: 'Liên Hệ | SalaryLens',
  description: 'Liên hệ với đội ngũ SalaryLens để được hỗ trợ, giải đáp thắc mắc hoặc đóng góp ý kiến',
  openGraph: {
    title: 'Liên Hệ | SalaryLens',
    description: 'Liên hệ với đội ngũ SalaryLens',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      {/* Hero Section */}
      <ContactHero />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Methods & Info */}
          <div className="space-y-8">
            <ContactMethods />
            <ContactSocial />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <ContactFAQ />
        </div>
      </div>
    </div>
  );
}
```

---

## 🎯 HERO SECTION

```typescript
// components/contact/contact-hero.tsx

'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

export function ContactHero() {
  const stats = [
    { icon: MessageCircle, label: 'Phản hồi trong', value: '24h' },
    { icon: Mail, label: 'Email hỗ trợ', value: '100+' },
    { icon: Phone, label: 'Tỷ lệ hài lòng', value: '98%' },
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Luôn sẵn sàng hỗ trợ bạn</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Liên Hệ Với Chúng Tôi
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 mb-12"
          >
            Có câu hỏi, góp ý hoặc cần hỗ trợ? Chúng tôi luôn sẵn sàng lắng nghe!
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="rgb(248, 250, 252)"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
}
```

---

## 📝 CONTACT FORM

```typescript
// components/contact/contact-form.tsx

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
```

---

## 📞 CONTACT METHODS

```typescript
// components/contact/contact-methods.tsx

'use client';

import { motion } from 'framer-motion';
import { Mail, MessageCircle, Phone, MapPin, Clock } from 'lucide-react';

export function ContactMethods() {
  const methods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'support@salarylens.com',
      description: 'Gửi email cho chúng tôi',
      link: 'mailto:support@salarylens.com',
      color: 'blue',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      value: 'Chat trực tuyến',
      description: 'T2-T6: 9:00 - 18:00',
      link: '#',
      color: 'emerald',
    },
    {
      icon: Phone,
      title: 'Điện thoại',
      value: '+84 123 456 789',
      description: 'Gọi cho chúng tôi',
      link: 'tel:+84123456789',
      color: 'purple',
    },
    {
      icon: MapPin,
      title: 'Địa chỉ',
      value: 'Hà Nội, Việt Nam',
      description: 'Ghé thăm văn phòng',
      link: '#',
      color: 'orange',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Cách Liên Hệ Khác
      </h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {methods.map((method, index) => (
          <motion.a
            key={index}
            href={method.link}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
          >
            <div className={`w-12 h-12 rounded-lg bg-${method.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <method.icon className={`w-6 h-6 text-${method.color}-600`} />
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-1">
              {method.title}
            </h3>
            
            <p className="text-blue-600 font-medium mb-1">
              {method.value}
            </p>
            
            <p className="text-sm text-gray-500">
              {method.description}
            </p>
          </motion.a>
        ))}
      </div>

      {/* Working Hours */}
      <div className="mt-6 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-3">
              Giờ Làm Việc
            </h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Thứ 2 - Thứ 6:</span>
                <span className="font-medium text-gray-900">9:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thứ 7:</span>
                <span className="font-medium text-gray-900">9:00 - 12:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Chủ nhật:</span>
                <span className="font-medium text-gray-900">Nghỉ</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              ⚡ Thời gian phản hồi trung bình: <strong>2-4 giờ</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## ❓ FAQ SECTION

```typescript
// components/contact/contact-faq.tsx

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Tôi có thể liên hệ SalaryLens qua kênh nào?',
      answer: 'Bạn có thể liên hệ qua email (support@salarylens.com), live chat trên website, hoặc điện thoại (+84 123 456 789). Chúng tôi cũng có mặt trên các mạng xã hội như Facebook, LinkedIn và Twitter.',
    },
    {
      question: 'Thời gian phản hồi trung bình là bao lâu?',
      answer: 'Chúng tôi cam kết phản hồi trong vòng 2-4 giờ làm việc cho email, và ngay lập tức qua live chat trong giờ làm việc (T2-T6: 9:00-18:00). Các yêu cầu phức tạp có thể cần 1-2 ngày làm việc để xử lý.',
    },
    {
      question: 'Tôi có thể báo lỗi hoặc đề xuất tính năng ở đâu?',
      answer: 'Bạn có thể báo lỗi hoặc đề xuất tính năng mới bằng cách sử dụng form liên hệ trên trang này (chọn chủ đề "Báo lỗi" hoặc "Góp ý / Đề xuất"). Mọi phản hồi đều được đội ngũ chúng tôi xem xét kỹ lưỡng.',
    },
    {
      question: 'SalaryLens có hỗ trợ tiếng Anh không?',
      answer: 'Hiện tại SalaryLens chủ yếu hỗ trợ tiếng Việt. Tuy nhiên, chúng tôi có kế hoạch ra mắt phiên bản tiếng Anh trong tương lai gần. Bạn vẫn có thể gửi email bằng tiếng Anh và chúng tôi sẽ phản hồi.',
    },
    {
      question: 'Làm sao để hợp tác kinh doanh với SalaryLens?',
      answer: 'Chúng tôi luôn chào đón các cơ hội hợp tác! Vui lòng gửi email đến business@salarylens.com hoặc sử dụng form liên hệ với chủ đề "Hợp tác kinh doanh". Đội ngũ Business Development sẽ liên hệ lại trong vòng 24 giờ.',
    },
    {
      question: 'Thông tin cá nhân của tôi có được bảo mật không?',
      answer: 'Tuyệt đối! Mọi thông tin bạn gửi qua form liên hệ đều được mã hóa và bảo mật theo tiêu chuẩn cao nhất. Chúng tôi chỉ sử dụng thông tin để phản hồi yêu cầu của bạn. Xem thêm tại Chính sách Bảo mật.',
    },
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm mb-4">
          <HelpCircle className="w-4 h-4" />
          <span>Câu hỏi thường gặp</span>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Có Thể Bạn Đang Tìm Câu Trả Lời
        </h2>
        
        <p className="text-gray-600 max-w-2xl mx-auto">
          Xem các câu hỏi phổ biến bên dưới. Nếu không tìm thấy câu trả lời, đừng ngần ngại liên hệ với chúng tôi!
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition"
            >
              <span className="font-semibold text-gray-900">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Still have questions */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          Vẫn chưa tìm thấy câu trả lời?
        </p>
        <a
          href="#contact-form"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Gửi câu hỏi cho chúng tôi</span>
        </a>
      </div>
    </div>
  );
}
```

---

## 🌐 SOCIAL LINKS

```typescript
// components/contact/contact-social.tsx

'use client';

import { motion } from 'framer-motion';
import { Facebook, Linkedin, Twitter, Youtube, Github } from 'lucide-react';

export function ContactSocial() {
  const socials = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/salarylens',
      color: 'bg-[#1877F2]',
      followers: '2.5K',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/company/salarylens',
      color: 'bg-[#0A66C2]',
      followers: '1.2K',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/salarylens',
      color: 'bg-[#1DA1F2]',
      followers: '800',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@salarylens',
      color: 'bg-[#FF0000]',
      followers: '500',
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/salarylens',
      color: 'bg-[#181717]',
      followers: '300',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Theo Dõi Chúng Tôi
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {socials.map((social, index) => (
          <motion.a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-transparent hover:shadow-lg transition-all text-center"
          >
            <div className={`w-12 h-12 ${social.color} rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <social.icon className="w-6 h-6 text-white" />
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-1">
              {social.name}
            </h3>
            
            <p className="text-sm text-gray-500">
              {social.followers} followers
            </p>
          </motion.a>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
        <h3 className="font-semibold text-gray-900 mb-2">
          📬 Nhận tin tức mới nhất
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Đăng ký nhận bản tin về tài chính, thuế và mẹo quản lý lương
        </p>
        
        <form className="flex gap-2">
          <input
            type="email"
            placeholder="email@example.com"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium whitespace-nowrap"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
}
```

---

## 🔧 SERVER ACTIONS

```typescript
// app/contact/actions.ts

'use server';

import { z } from 'zod';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  subject: z.string().min(1, 'Vui lòng chọn chủ đề'),
  message: z.string().min(10, 'Nội dung phải có ít nhất 10 ký tự'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export async function submitContactForm(data: ContactFormData) {
  try {
    // Validate data
    const validated = contactSchema.parse(data);

    // TODO: Send email using your email service
    // Example: SendGrid, Resend, Nodemailer, etc.
    
    // For now, just log (replace with actual email sending)
    console.log('Contact form submitted:', validated);

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Save to database if needed
    // await db.contact.create({ data: validated });

    // TODO: Send notification to admin
    // await sendAdminNotification(validated);

    return { 
      success: true, 
      message: 'Tin nhắn đã được gửi thành công!' 
    };
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: error.errors[0].message 
      };
    }
    
    return { 
      success: false, 
      error: 'Có lỗi xảy ra. Vui lòng thử lại sau.' 
    };
  }
}
```

---

## 📧 EMAIL INTEGRATION

### **Using Resend (Recommended):**

```typescript
// lib/email.ts

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    // Send to admin
    await resend.emails.send({
      from: 'SalaryLens Contact <noreply@salarylens.com>',
      to: 'support@salarylens.com',
      subject: `[Contact Form] ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1E40AF;">New Contact Form Submission</h2>
          
          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
          </div>
          
          <div style="background: white; padding: 20px; border: 1px solid #E5E7EB; border-radius: 8px;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
          
          <p style="color: #6B7280; font-size: 12px; margin-top: 20px;">
            Sent from SalaryLens Contact Form
          </p>
        </div>
      `,
    });

    // Send confirmation to user
    await resend.emails.send({
      from: 'SalaryLens <noreply@salarylens.com>',
      to: data.email,
      subject: 'Cảm ơn bạn đã liên hệ với SalaryLens',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1E40AF;">Xin chào ${data.name}!</h2>
          
          <p>Cảm ơn bạn đã liên hệ với SalaryLens. Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi sớm nhất có thể.</p>
          
          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Thông tin bạn đã gửi:</h3>
            <p><strong>Chủ đề:</strong> ${data.subject}</p>
            <p style="white-space: pre-wrap;"><strong>Nội dung:</strong><br>${data.message}</p>
          </div>
          
          <p>Thời gian phản hồi dự kiến: <strong>2-4 giờ làm việc</strong></p>
          
          <p style="color: #6B7280; font-size: 12px; margin-top: 30px;">
            Trân trọng,<br>
            Đội ngũ SalaryLens
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}
```

### **Install Resend:**

```bash
npm install resend
```

### **.env.local:**

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
```

---

## ✅ COMPLETE CHECKLIST

```
Setup:
□ Create contact page route
□ Install dependencies (framer-motion, zod, resend)
□ Create all components
□ Setup server actions

Content:
□ Update contact email
□ Update phone number
□ Update address
□ Update social media links
□ Update working hours
□ Customize FAQ

Email:
□ Setup email service (Resend/SendGrid)
□ Create email templates
□ Test email sending
□ Setup admin notifications

Styling:
□ Match brand colors
□ Test animations
□ Mobile responsive
□ Form validation working

Testing:
□ Form submission works
□ Success/error states
□ Email delivery
□ FAQ accordion
□ Social links work
```

---

**Complete! Ready to implement! 📧✨**
