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
