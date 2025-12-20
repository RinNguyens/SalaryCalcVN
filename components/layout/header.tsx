'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Logo } from './logo';
import { Button } from '@/components/ui/button';
import {
  Calculator,
  TrendingUp,
  BookOpen,
  User,
  Menu,
  X,
  Moon,
  Sun,
  Search
} from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 100], [8, 16]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/calculator', label: 'Tính lương', icon: Calculator },
    { href: '/salary-estimator', label: 'Ước tính lương', icon: TrendingUp },
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
          style={{
            backgroundColor: `rgba(255, 255, 255, ${headerOpacity})`,
          }}
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
                  className="
                    px-4 py-2 rounded-lg
                    text-black/80 hover:text-black
                    hover:bg-black/10
                    transition-all duration-200
                    flex items-center gap-2
                    font-medium
                  "
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
                className="rounded-full bg-black/10 hover:bg-white/20 text-black"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDark(!isDark)}
                className="rounded-full bg-black/10 hover:bg-white/20 text-black"
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              {/* Authentication */}
              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    className="
                      bg-gradient-to-r from-purple-400 to-pink-400
                      hover:from-purple-500 hover:to-pink-500
                      text-white font-medium
                      shadow-lg hover:shadow-xl
                      transition-all duration-200
                    "
                  >
                    <User className="h-4 w-4 mr-2" />
                    Đăng nhập
                  </Button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 rounded-full border-2 border-purple-400/30 hover:border-purple-400/50 transition-all"
                    }
                  }}
                />
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-black"
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
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 px-4 pb-4 border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <nav className="flex flex-col gap-2 mt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="
                      px-4 py-3 rounded-lg
                      text-black/80 hover:text-black
                      bg-white/5 hover:bg-white/10
                      transition-all duration-200
                      flex items-center gap-3
                      font-medium
                    "
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
                    className="flex-1 bg-white/10 hover:bg-white/20 text-black"
                  >
                    <Search className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDark(!isDark)}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-black"
                  >
                    {isDark ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </Button>
                </div>

                {/* Mobile Authentication */}
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button
                      className="
                        w-full mt-2
                        bg-gradient-to-r from-purple-500 to-pink-600
                        hover:from-purple-600 hover:to-pink-700
                        text-white font-medium
                      "
                    >
                      <User className="h-4 w-4 mr-2" />
                      Đăng nhập
                    </Button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <div className="mt-2 pt-2 border-t border-white/10">
                    <UserButton
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          rootBox: "w-full",
                          avatarBox: "w-10 h-10 mx-auto"
                        }
                      }}
                    />
                  </div>
                </SignedIn>
              </nav>
            </motion.div>
          )}
        </motion.div>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-20 md:h-24" />
    </>
  );
}