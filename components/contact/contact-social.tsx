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
      <h2 className="text-2xl font-bold text-black mb-6">
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
            className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-transparent hover:shadow-lg transition-all text-center"
          >
            <div className={`w-12 h-12 ${social.color} rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <social.icon className="w-6 h-6 text-black" />
            </div>

            <h3 className="font-semibold text-slate-900 mb-1">
              {social.name}
            </h3>

            <p className="text-sm text-slate-500">
              {social.followers} followers
            </p>
          </motion.a>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
        <h3 className="font-semibold text-slate-900 mb-2">
          📬 Nhận tin tức mới nhất
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          Đăng ký nhận bản tin về tài chính, thuế và mẹo quản lý lương
        </p>

        <form className="flex gap-2">
          <input
            type="email"
            placeholder="email@example.com"
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-black rounded-lg hover:bg-purple-700 transition text-sm font-medium whitespace-nowrap"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
}
