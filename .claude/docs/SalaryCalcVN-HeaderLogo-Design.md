# 🎨 SalaryCalc VN - Header & Logo Design Guide (Glass UI)

> Complete design system cho Header, Logo và Navigation với Glass Morphism aesthetic

---

## 📋 MỤC LỤC

- [Logo Design Concepts](#-logo-design-concepts)
- [Header Layouts](#-header-layouts)
- [Navigation Structure](#-navigation-structure)
- [Color Schemes](#-color-schemes)
- [Implementation Code](#-implementation-code)
- [Responsive Design](#-responsive-design)
- [Animations & Interactions](#-animations--interactions)

---

## 💎 LOGO DESIGN CONCEPTS

### **Concept 1: Abstract Money Symbol + Tech**
```
╔═══════════════════════════════════╗
║                                   ║
║         ┏━━━━━┓                   ║
║         ┃ 💰  ┃                   ║
║    ╱╲   ┃  ↔  ┃   ╱╲              ║
║   ╱  ╲  ┗━━━━━┛  ╱  ╲             ║
║  ╱____╲ Salary  ╱____╲            ║
║         Calc VN                   ║
║                                   ║
╚═══════════════════════════════════╝

Elements:
- Đồng xu (coin) với arrow bi-directional (↔)
- Geometric shapes (triangles) = precision, calculation
- Gradient: Purple → Pink
- Modern sans-serif font
```

**Variations:**
- Icon only: Simple "₫" currency symbol in glass bubble
- Text + Icon: SalaryCalc with small icon
- Minimal: Just "SC" monogram

---

### **Concept 2: Calculator + Vietnamese đ Symbol**
```
╔═══════════════════════════════════╗
║                                   ║
║    ┌─────────┐                    ║
║    │ 7  8  9 │                    ║
║    │ 4  5  6 │    ₫               ║
║    │ 1  2  3 │                    ║
║    │    0    │                    ║
║    └─────────┘                    ║
║                                   ║
║    SalaryCalc VN                  ║
║                                   ║
╚═══════════════════════════════════╝

Elements:
- Stylized calculator (glass effect)
- Vietnamese đ (dong) symbol prominently
- Clean, professional look
```

---

### **Concept 3: Layered Glass Circles (Recommended)**
```
╔═══════════════════════════════════╗
║                                   ║
║       ◯                           ║
║      ◯ ◯   ₫                      ║
║     ◯   ◯                         ║
║                                   ║
║   Salary Calc                     ║
║        VN                         ║
║                                   ║
╚═══════════════════════════════════╝

Elements:
- 3 overlapping circles (glass layers)
- Represents: Gross → Deductions → Net
- Transparent with blur effect
- Purple/Pink gradient rings
- Modern, abstract, memorable
```

**Why this works:**
✅ Unique, not generic  
✅ Represents the flow: Gross → Net  
✅ Glass morphism friendly  
✅ Scales well (mobile to desktop)  
✅ Easy to animate  

---

### **Concept 4: Minimal Text Logo**
```
╔═══════════════════════════════════╗
║                                   ║
║   Salary                          ║
║      Calc    VN                   ║
║                                   ║
║   (Modern, gradient text)         ║
║                                   ║
╚═══════════════════════════════════╝

Typography:
- "Salary" = Bold, large
- "Calc" = Regular weight, slightly smaller
- "VN" = Small badge/pill shape
- No icon, pure typography
```

---

## 🎨 RECOMMENDED LOGO: Layered Glass Concept

### **SVG Implementation**

**File: `public/logo.svg`**
```svg
<svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background blur circles -->
  <defs>
    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:0.6" />
    </linearGradient>
    
    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f093fb;stop-opacity:0.7" />
      <stop offset="100%" style="stop-color:#f5576c;stop-opacity:0.5" />
    </linearGradient>
    
    <filter id="blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
    </filter>
  </defs>
  
  <!-- Icon: 3 layered circles -->
  <g>
    <!-- Back circle -->
    <circle cx="15" cy="20" r="12" fill="url(#gradient1)" opacity="0.6" filter="url(#blur)" />
    <circle cx="15" cy="20" r="12" fill="none" stroke="white" stroke-width="1.5" opacity="0.3" />
    
    <!-- Middle circle -->
    <circle cx="22" cy="20" r="12" fill="url(#gradient2)" opacity="0.7" filter="url(#blur)" />
    <circle cx="22" cy="20" r="12" fill="none" stroke="white" stroke-width="1.5" opacity="0.4" />
    
    <!-- Front circle with ₫ symbol -->
    <circle cx="18.5" cy="20" r="10" fill="rgba(255,255,255,0.15)" />
    <circle cx="18.5" cy="20" r="10" fill="none" stroke="white" stroke-width="2" />
    
    <!-- Currency symbol -->
    <text x="18.5" y="25" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">₫</text>
  </g>
  
  <!-- Text -->
  <text x="42" y="22" font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="white">
    Salary<tspan font-weight="400">Calc</tspan>
  </text>
  <text x="42" y="32" font-family="'Inter', sans-serif" font-size="9" font-weight="500" fill="rgba(255,255,255,0.7)">
    VIETNAM
  </text>
</svg>
```

### **React Component Version**

**File: `components/layout/logo.tsx`**
```typescript
'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizes = {
    sm: { width: 80, height: 30, iconSize: 24, fontSize: 12 },
    md: { width: 140, height: 40, iconSize: 32, fontSize: 16 },
    lg: { width: 180, height: 50, iconSize: 40, fontSize: 20 },
  };

  const { width, height, iconSize, fontSize } = sizes[size];

  return (
    <motion.div
      className={`flex items-center gap-3 ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Icon */}
      <div className="relative" style={{ width: iconSize, height: iconSize }}>
        {/* Back circle */}
        <motion.div
          className="absolute w-full h-full rounded-full bg-gradient-to-br from-purple-500/60 to-violet-600/40 blur-sm"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.7, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Middle circle */}
        <motion.div
          className="absolute left-1/4 w-full h-full rounded-full bg-gradient-to-br from-pink-500/70 to-rose-600/50 blur-sm"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 0.8, 0.7],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
        
        {/* Front circle with symbol */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4/5 h-4/5 rounded-full bg-white/15 backdrop-blur-md border-2 border-white/30 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold" style={{ fontSize: fontSize * 0.8 }}>
              ₫
            </span>
          </div>
        </div>
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-0.5">
            <span 
              className="font-bold text-white"
              style={{ fontSize }}
            >
              Salary
            </span>
            <span 
              className="font-normal text-white/90"
              style={{ fontSize: fontSize * 0.95 }}
            >
              Calc
            </span>
          </div>
          <span 
            className="text-white/70 font-medium tracking-wider"
            style={{ fontSize: fontSize * 0.5 }}
          >
            VIETNAM
          </span>
        </div>
      )}
    </motion.div>
  );
}
```

---

## 📐 HEADER LAYOUTS

### **Layout 1: Floating Glass Header (Recommended)**

```
┌────────────────────────────────────────────────────┐
│  ╔════════════════════════════════════════════╗   │
│  ║                                            ║   │
│  ║  [Logo]    Calculator  About  Blog  [🌙]  ║   │
│  ║                                     [Login]║   │
│  ╚════════════════════════════════════════════╝   │
│                                                    │
│            (Gradient Background)                   │
└────────────────────────────────────────────────────┘

Features:
- Floating glass card (backdrop-blur)
- Subtle shadow
- Margin from top (20px)
- Rounded corners
- White border (opacity 20%)
```

**File: `components/layout/header.tsx`**
```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
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
  Sun
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
    { href: '/insights', label: 'Phân tích', icon: TrendingUp },
    { href: '/blog', label: 'Blog', icon: BookOpen },
  ];

  return (
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
                  text-white/80 hover:text-white
                  hover:bg-white/10
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
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Login Button */}
            <Button
              className="
                bg-gradient-to-r from-purple-500 to-pink-600
                hover:from-purple-600 hover:to-pink-700
                text-white font-medium
                shadow-lg hover:shadow-xl
                transition-all duration-200
              "
            >
              <User className="h-4 w-4 mr-2" />
              Đăng nhập
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
                    text-white/80 hover:text-white
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
              
              <Button
                className="
                  w-full mt-2
                  bg-gradient-to-r from-purple-500 to-pink-600
                  text-white font-medium
                "
              >
                <User className="h-4 w-4 mr-2" />
                Đăng nhập
              </Button>
            </nav>
          </motion.div>
        )}
      </motion.div>
    </motion.header>
  );
}
```

---

### **Layout 2: Sticky Minimal Header**

```
┌────────────────────────────────────────────────────┐
│ [Logo] Calculator | Insights | Blog    [🔍] [👤]  │
└────────────────────────────────────────────────────┘

Features:
- Slim height (60px)
- No rounded corners (edge-to-edge)
- Appears on scroll
- Search icon
- Ultra minimal
```

---

### **Layout 3: Split Header with CTA**

```
┌────────────────────────────────────────────────────┐
│  [Logo]                                            │
│                                [Try Calculator →]   │
│  Calculator  Insights  Blog                        │
└────────────────────────────────────────────────────┘

Features:
- Two rows
- Prominent CTA button
- More space for branding
```

---

## 🎨 COLOR SCHEMES

### **Scheme 1: Purple Dream (Recommended)**
```css
/* Primary Gradient */
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Glass Background */
--glass-bg: rgba(255, 255, 255, 0.1);
--glass-border: rgba(255, 255, 255, 0.2);
--glass-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);

/* Text */
--text-primary: rgba(255, 255, 255, 1);
--text-secondary: rgba(255, 255, 255, 0.8);
--text-muted: rgba(255, 255, 255, 0.6);

/* Accents */
--accent-pink: #f093fb;
--accent-purple: #667eea;
```

### **Scheme 2: Blue Ocean**
```css
--gradient-primary: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
--glass-bg: rgba(255, 255, 255, 0.12);
```

### **Scheme 3: Sunset Orange**
```css
--gradient-primary: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
--glass-bg: rgba(255, 255, 255, 0.15);
```

---

## 🎭 HEADER VARIATIONS

### **Variation A: With Announcement Bar**

```typescript
export function HeaderWithAnnouncement() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <>
      {/* Announcement Bar */}
      {showAnnouncement && (
        <motion.div
          className="
            fixed top-0 left-0 right-0 z-50
            bg-gradient-to-r from-purple-600 to-pink-600
            text-white text-center py-2 px-4
            text-sm font-medium
          "
          initial={{ y: -100 }}
          animate={{ y: 0 }}
        >
          <span>🎉 New feature: Annual Compensation Calculator now available!</span>
          <button
            onClick={() => setShowAnnouncement(false)}
            className="ml-4 text-white/80 hover:text-white"
          >
            ✕
          </button>
        </motion.div>
      )}
      
      {/* Main Header */}
      <div className={showAnnouncement ? 'mt-10' : 'mt-0'}>
        <Header />
      </div>
    </>
  );
}
```

---

### **Variation B: With Search Bar**

```typescript
export function HeaderWithSearch() {
  return (
    <header className="...">
      <div className="flex items-center gap-4">
        <Logo />
        
        {/* Search Bar */}
        <div className="
          hidden md:flex items-center gap-2
          px-4 py-2 rounded-full
          bg-white/10 backdrop-blur-md
          border border-white/20
          flex-1 max-w-md
        ">
          <Search className="h-4 w-4 text-white/60" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="
              bg-transparent border-none outline-none
              text-white placeholder:text-white/60
              flex-1
            "
          />
        </div>
        
        <nav>...</nav>
      </div>
    </header>
  );
}
```

---

### **Variation C: Mega Menu Dropdown**

```typescript
export function HeaderWithMegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <header className="...">
      <nav>
        <div
          onMouseEnter={() => setActiveMenu('calculator')}
          onMouseLeave={() => setActiveMenu(null)}
          className="relative"
        >
          <button>Tính lương ▾</button>
          
          {activeMenu === 'calculator' && (
            <motion.div
              className="
                absolute top-full left-0 mt-2
                w-96 p-6 rounded-xl
                backdrop-blur-lg bg-white/10
                border border-white/20
                shadow-2xl
              "
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <Link href="/gross-to-net" className="...">
                  <Calculator className="h-5 w-5" />
                  <span>Gross → Net</span>
                </Link>
                <Link href="/net-to-gross" className="...">
                  <TrendingUp className="h-5 w-5" />
                  <span>Net → Gross</span>
                </Link>
                {/* More menu items */}
              </div>
            </motion.div>
          )}
        </div>
      </nav>
    </header>
  );
}
```

---

## 📱 RESPONSIVE DESIGN

### **Mobile Header (< 768px)**

```typescript
export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Compact Header */}
      <header className="
        fixed top-0 left-0 right-0 z-50
        backdrop-blur-lg bg-white/10
        border-b border-white/20
      ">
        <div className="flex items-center justify-between px-4 py-3">
          <Logo size="sm" />
          
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-lg bg-white/10"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Menu */}
      {isOpen && (
        <motion.div
          className="
            fixed inset-0 z-50
            bg-gradient-to-br from-purple-600 to-pink-600
            overflow-y-auto
          "
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-12">
              <Logo size="md" />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-white/10"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            <nav className="space-y-4">
              <Link
                href="/calculator"
                className="
                  block px-6 py-4 rounded-xl
                  bg-white/10 backdrop-blur-md
                  text-white text-lg font-medium
                "
              >
                <Calculator className="inline h-5 w-5 mr-3" />
                Tính lương
              </Link>
              {/* More links */}
            </nav>

            <div className="mt-12">
              <Button className="w-full py-6 text-lg">
                Đăng nhập
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
```

---

## ✨ ANIMATIONS & INTERACTIONS

### **Hover Effects**

```typescript
// Nav Item Hover
const navItemVariants = {
  initial: { scale: 1, backgroundColor: 'rgba(255, 255, 255, 0)' },
  hover: { 
    scale: 1.05, 
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
};

<motion.a
  variants={navItemVariants}
  initial="initial"
  whileHover="hover"
  whileTap="tap"
>
  Link
</motion.a>
```

### **Scroll Animations**

```typescript
export function AnimatedHeader() {
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.1],
    ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.15)']
  );

  return (
    <motion.header
      style={{ backgroundColor }}
      className="..."
    >
      {/* Content */}
    </motion.header>
  );
}
```

### **Logo Animation on Load**

```typescript
export function AnimatedLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -180, scale: 0 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      <Logo />
    </motion.div>
  );
}
```

---

## 🎯 IMPLEMENTATION CHECKLIST

### **Phase 1: Basic Structure**
- [ ] Create Logo component (SVG + React)
- [ ] Create basic Header layout
- [ ] Add responsive breakpoints
- [ ] Implement mobile menu

### **Phase 2: Glass Effects**
- [ ] Add backdrop-blur utilities
- [ ] Configure glass gradients
- [ ] Add border glow effects
- [ ] Implement shadows

### **Phase 3: Interactions**
- [ ] Add hover states
- [ ] Implement scroll animations
- [ ] Add mobile menu transitions
- [ ] Test on all devices

### **Phase 4: Polish**
- [ ] Add theme toggle
- [ ] Optimize performance
- [ ] A11y improvements
- [ ] Cross-browser testing

---

## 🖼️ COMPLETE EXAMPLE

### **File: `app/layout.tsx`**

```typescript
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="
        min-h-screen
        bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400
        overflow-x-hidden
      ">
        <Header />
        
        <main className="pt-24">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
```

---

## 💡 DESIGN TIPS

### **Do's ✅**
- Keep header height consistent (60-80px)
- Use subtle animations (< 300ms)
- Maintain high contrast for accessibility
- Test on real devices
- Use semantic HTML
- Implement keyboard navigation

### **Don'ts ❌**
- Don't make header too tall
- Avoid too many menu items (max 5)
- Don't use pure white backgrounds
- Avoid heavy blur (max 16px)
- Don't forget focus states
- Avoid auto-playing animations

---

## 🎨 FIGMA DESIGN ASSETS

**Recommended Figma Structure:**
```
SalaryCalc VN Design System
├── 🎨 Brand
│   ├── Logo Variations
│   ├── Color Palette
│   └── Typography
├── 🧩 Components
│   ├── Header (Desktop)
│   ├── Header (Mobile)
│   ├── Navigation
│   └── Buttons
└── 📱 Screens
    ├── Landing Page
    ├── Calculator Page
    └── About Page
```

---

## 📦 EXPORT ASSETS

```bash
# Logo sizes to export:
logo-16x16.png    # Favicon
logo-32x32.png    # Favicon
logo-180x180.png  # Apple touch icon
logo-192x192.png  # Android icon
logo-512x512.png  # Large icon
logo.svg          # Vector (preferred)

# Header background patterns:
glass-texture.png
gradient-bg.png
```

---

## 🚀 QUICK START CODE

Copy-paste ready header implementation:

```typescript
// components/layout/header.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, BookOpen, Menu } from 'lucide-react';

export function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="
        max-w-7xl mx-auto
        px-6 py-4 rounded-2xl
        backdrop-blur-lg bg-white/10
        border border-white/20
        shadow-2xl
      ">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="
              w-10 h-10 rounded-full
              bg-white/15 backdrop-blur-md
              border-2 border-white/30
              flex items-center justify-center
            ">
              <span className="text-white font-bold text-lg">₫</span>
            </div>
            <span className="text-white font-bold text-xl">
              Salary<span className="font-normal">Calc</span>
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex gap-1">
            {[
              { href: '/calculator', label: 'Tính lương', icon: Calculator },
              { href: '/insights', label: 'Phân tích', icon: TrendingUp },
              { href: '/blog', label: 'Blog', icon: BookOpen },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  px-4 py-2 rounded-lg
                  text-white/80 hover:text-white
                  hover:bg-white/10
                  transition-all
                  flex items-center gap-2
                "
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu */}
          <button className="md:hidden p-2 rounded-lg bg-white/10">
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
```

---

**Recommended Final Choice:**
- **Logo**: Layered Glass Circles với ₫ symbol
- **Header**: Floating Glass Header (Layout 1)
- **Colors**: Purple Dream scheme
- **Font**: Inter (sans-serif)

Bạn muốn mình tạo thêm:
1. **Footer design** matching với header?
2. **More logo variations** (dark mode, small sizes)?
3. **Complete design system** (buttons, cards, forms)?
4. **Animation showcase** với các interactions? 🎨
