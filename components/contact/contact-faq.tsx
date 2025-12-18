'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

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
