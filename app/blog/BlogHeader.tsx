'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Logo } from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  Search,
  BookOpen,
  Calculator,
  Home
} from 'lucide-react';

export function BlogHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Trang chủ', icon: Home },
    { href: '/calculator', label: 'Tính lương', icon: Calculator },
    { href: '/blog', label: 'Blog', icon: BookOpen },
  ];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={`
            max-w-7xl mx-auto rounded-2xl
            backdrop-blur-lg bg-white/10
            border border-white/20
            shadow-2xl
            transition-all duration-300
            ${isScrolled ? 'py-3' : 'py-4'}
          `}
        >
          <div className="px-6 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Logo size="md" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    px-4 py-2 rounded-lg
                    text-white/80 hover:text-white
                    hover:bg-white/10
                    transition-all duration-200
                    flex items-center gap-2
                    font-medium
                    ${item.href === '/blog' ? 'bg-white/10 text-white' : ''}
                  `}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-3">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/10 hover:bg-white/20 text-white"
                onClick={() => {
                  const searchInput = document.querySelector('input[placeholder="Tìm kiếm bài viết..."]') as HTMLInputElement;
                  searchInput?.focus();
                }}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* CTA Button */}
              <Button
                className="
                  bg-gradient-to-r from-purple-500 to-pink-600
                  hover:from-purple-600 hover:to-pink-700
                  text-white font-medium
                  shadow-lg hover:shadow-xl
                  transition-all duration-200
                "
                onClick={() => window.location.href = '/calculator'}
              >
                Tính lương
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className="md:hidden mt-4 px-4 pb-4 border-t border-white/10"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <nav className="flex flex-col gap-2 mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        px-4 py-3 rounded-lg
                        text-white/80 hover:text-white
                        bg-white/5 hover:bg-white/10
                        transition-all duration-200
                        flex items-center gap-3
                        font-medium
                        ${item.href === '/blog' ? 'bg-white/10 text-white' : ''}
                      `}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}

                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white"
                      onClick={() => {
                        const searchInput = document.querySelector('input[placeholder="Tìm kiếm bài viết..."]') as HTMLInputElement;
                        searchInput?.focus();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>

                  <Button
                    className="
                      w-full mt-2
                      bg-gradient-to-r from-purple-500 to-pink-600
                      text-white font-medium
                    "
                    onClick={() => {
                      window.location.href = '/calculator';
                      setMobileMenuOpen(false);
                    }}
                  >
                    Tính lương
                  </Button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-20 md:h-24" />
    </>
  );
}