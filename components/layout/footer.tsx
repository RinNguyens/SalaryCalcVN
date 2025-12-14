'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Logo } from './logo';
import {
  Calculator,
  TrendingUp,
  BookOpen,
  Github,
  Mail,
  Shield,
  Users,
  Zap
} from 'lucide-react';

const footerLinks = {
  product: [
    { href: '/calculator', label: 'Tính lương Gross → Net', icon: Calculator },
    { href: '/net-to-gross', label: 'Tính lương Net → Gross', icon: TrendingUp },
    { href: '/insights', label: 'Phân tích lương', icon: TrendingUp },
    { href: '/salary-estimator', label: 'Ước tính lương', icon: Calculator },
  ],
  company: [
    { href: '/about', label: 'Về chúng tôi', icon: Users },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/careers', label: 'Tuyển dụng', icon: Zap },
    { href: '/contact', label: 'Liên hệ', icon: Mail },
  ],
  legal: [
    { href: '/privacy', label: 'Chính sách bảo mật', icon: Shield },
    { href: '/terms', label: 'Điều khoản sử dụng', icon: Shield },
    { href: '/cookies', label: 'Chính sách Cookie', icon: Shield },
  ],
  social: [
    { href: 'https://github.com', label: 'GitHub', icon: Github },
    { href: 'mailto:contact@salarycalc.vn', label: 'Email', icon: Mail },
  ],
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-orange-900/20 backdrop-blur-xl" />

      {/* Glass overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10">
        {/* Top section */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Brand Column */}
              <div className="lg:col-span-2">
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Logo size="lg" />
                </motion.div>

                <motion.p
                  className="text-white/80 mb-6 max-w-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Công cụ tính lương miễn phí và chính xác nhất cho người lao động Việt Nam.
                  Cập nhật theo quy định thuế và bảo hiểm mới nhất.
                </motion.p>

                {/* Social Links */}
                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {footerLinks.social.map((social) => (
                    <Link
                      key={social.href}
                      href={social.href}
                      className="
                        w-10 h-10 rounded-full
                        bg-white/10 hover:bg-white/20
                        backdrop-blur-sm border border-white/20
                        flex items-center justify-center
                        text-white/80 hover:text-white
                        transition-all duration-200
                      "
                    >
                      <social.icon className="h-5 w-5" />
                    </Link>
                  ))}
                </motion.div>
              </div>

              {/* Product Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-white font-semibold mb-4">Sản phẩm</h3>
                <ul className="space-y-3">
                  {footerLinks.product.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="
                          flex items-center gap-2
                          text-white/70 hover:text-white
                          transition-colors duration-200
                        "
                      >
                        <link.icon className="h-4 w-4" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Company Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-white font-semibold mb-4">Công ty</h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="
                          flex items-center gap-2
                          text-white/70 hover:text-white
                          transition-colors duration-200
                        "
                      >
                        <link.icon className="h-4 w-4" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Legal Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-white font-semibold mb-4">Pháp lý</h3>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="
                          flex items-center gap-2
                          text-white/70 hover:text-white
                          transition-colors duration-200
                        "
                      >
                        <link.icon className="h-4 w-4" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <motion.div
              className="flex flex-col md:flex-row justify-between items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-white/60 text-sm">
                © 2024 SalaryCalc VN. Tất cả quyền được bảo lưu.
              </p>

              <div className="flex items-center gap-4">
                <span className="text-white/40 text-xs">Made with ❤️ in Vietnam</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}