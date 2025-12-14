# ☕ SalaryCalc VN - Buy Me a Coffee / Donate System

> Complete donation/tip system với Glass UI style, support cả international & VN payment methods

---

## 📋 MỤC LỤC

- [Component Variants](#-component-variants)
- [Payment Integrations](#-payment-integrations)
- [Implementation Code](#-implementation-code)
- [Vietnam Payment Methods](#-vietnam-payment-methods)
- [Placement Strategies](#-placement-strategies)

---

## 🎨 COMPONENT VARIANTS

### **Variant 1: Floating Button (Recommended)**
```
┌────────────────────────────────────┐
│                                    │
│                                    │
│                          ┌───────┐ │
│                          │  ☕   │ │
│                          │ Donate│ │
│                          └───────┘ │
│                                    │
└────────────────────────────────────┘

Features:
- Fixed position (bottom-right)
- Glass morphism effect
- Pulse animation
- Always visible
- Click → Modal/Redirect
```

### **Variant 2: Header Button**
```
[Logo] Nav Items... [🌙] [☕ Support] [👤 Login]

Features:
- Integrated into header
- Subtle, non-intrusive
- Same glass style
- Hover animation
```

### **Variant 3: Footer CTA**
```
┌──────────────────────────────────────┐
│  ☕ Enjoying SalaryCalc VN?          │
│  Buy me a coffee to support          │
│  continued development!              │
│                                      │
│  [☕ Donate via Coffee] [Bank Transfer]│
└──────────────────────────────────────┘

Features:
- Large, prominent
- Multiple payment options
- Social proof (supporter count)
- Message/testimonials
```

### **Variant 4: Modal Popup**
```
╔════════════════════════════════════╗
║  ☕ Support SalaryCalc VN          ║
╟────────────────────────────────────╢
║                                    ║
║  If you find this tool helpful,    ║
║  consider buying me a coffee! ❤️   ║
║                                    ║
║  [☕ $3] [☕ $5] [☕ $10] [Custom]  ║
║                                    ║
║  Or donate via:                    ║
║  [Momo] [ZaloPay] [Bank]           ║
║                                    ║
║  [Maybe later] [❌ Close]          ║
╚════════════════════════════════════╝

Features:
- Appears after X calculations
- Custom amounts
- Multiple payment methods
- "Maybe later" option
```

---

## 💳 PAYMENT INTEGRATIONS

### **International Platforms**

1. **Buy Me a Coffee** (Recommended)
   - URL: `https://www.buymeacoffee.com/yourusername`
   - Easy integration
   - Widget available
   - Membership tiers

2. **Ko-fi**
   - URL: `https://ko-fi.com/yourusername`
   - Similar to BMC
   - No platform fees

3. **Patreon**
   - Monthly subscriptions
   - Tiered rewards
   - Good for regular supporters

### **Vietnam Payment Methods**

1. **Momo**
   - QR Code payment
   - Instant transfer
   - Most popular in VN

2. **ZaloPay**
   - QR Code
   - Zalo integration

3. **Bank Transfer**
   - Vietcombank, Techcombank, etc.
   - QR Code via VietQR
   - Account number + QR

4. **Viettel Pay**
   - QR Code
   - Phone number based

---

## 🚀 IMPLEMENTATION CODE

### **1. Floating Donate Button**

**File: `components/donate/floating-donate-button.tsx`**
```typescript
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Heart, X } from 'lucide-react';
import { DonateModal } from './donate-modal';
import { GlassCard } from '@/components/ui/glass-card';

export function FloatingDonateButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => {
            setIsModalOpen(true);
            setIsPulsing(false);
          }}
          className="
            relative group
            px-5 py-3 rounded-full
            backdrop-blur-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20
            border-2 border-amber-400/30
            shadow-xl hover:shadow-2xl
            flex items-center gap-2
            text-white font-medium
            transition-all duration-300
            hover:scale-105 hover:border-amber-400/50
          "
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulsing ring animation */}
          {isPulsing && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-amber-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          )}

          {/* Coffee icon with animation */}
          <motion.div
            animate={{
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <Coffee className="h-5 w-5" />
          </motion.div>

          {/* Text */}
          <span className="hidden sm:inline">Buy me a coffee</span>
          
          {/* Heart icon on hover */}
          <motion.div
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            className="absolute -top-1 -right-1"
          >
            <Heart className="h-4 w-4 fill-red-400 text-red-400" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <DonateModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
```

---

### **2. Donate Modal with Payment Options**

**File: `components/donate/donate-modal.tsx`**
```typescript
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, X, Heart, CreditCard, Smartphone, Building2, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import Image from 'next/image';

interface DonateModalProps {
  onClose: () => void;
}

export function DonateModal({ onClose }: DonateModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(3);
  const [selectedMethod, setSelectedMethod] = useState<string>('buymeacoffee');
  const [showQR, setShowQR] = useState(false);

  const amounts = [
    { value: 3, label: '$3', cups: '☕' },
    { value: 5, label: '$5', cups: '☕☕' },
    { value: 10, label: '$10', cups: '☕☕☕' },
    { value: null, label: 'Custom', cups: '💝' },
  ];

  const paymentMethods = [
    {
      id: 'buymeacoffee',
      name: 'Buy Me a Coffee',
      icon: Coffee,
      url: 'https://www.buymeacoffee.com/yourusername',
      color: 'from-amber-500 to-orange-500',
      flag: '🌍',
    },
    {
      id: 'momo',
      name: 'Momo',
      icon: Smartphone,
      url: 'momo://payment',
      color: 'from-pink-500 to-rose-500',
      flag: '🇻🇳',
      qr: '/qr/momo-qr.png', // Your Momo QR code
    },
    {
      id: 'zalopay',
      name: 'ZaloPay',
      icon: Smartphone,
      url: 'zalopay://payment',
      color: 'from-blue-500 to-cyan-500',
      flag: '🇻🇳',
      qr: '/qr/zalopay-qr.png',
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Building2,
      color: 'from-green-500 to-emerald-500',
      flag: '🇻🇳',
      info: {
        bank: 'Vietcombank',
        account: '1234567890',
        name: 'NGUYEN VAN A',
        qr: '/qr/bank-qr.png',
      },
    },
  ];

  const handleDonate = () => {
    const method = paymentMethods.find(m => m.id === selectedMethod);
    
    if (method?.qr || method?.info) {
      setShowQR(true);
    } else if (method?.url) {
      window.open(method.url, '_blank');
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <GlassCard variant="strong" className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <Coffee className="h-8 w-8 text-amber-400" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Support SalaryCalc VN
                </h2>
                <p className="text-white/70 text-sm">
                  Help keep this tool free & awesome!
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {!showQR ? (
            <>
              {/* Amount Selection */}
              <div className="mb-6">
                <label className="text-white font-medium mb-3 block">
                  Choose amount:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {amounts.map((amount) => (
                    <button
                      key={amount.value || 'custom'}
                      onClick={() => setSelectedAmount(amount.value)}
                      className={`
                        p-3 rounded-lg border-2 transition-all
                        ${selectedAmount === amount.value
                          ? 'border-amber-400 bg-amber-400/20 scale-105'
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                        }
                      `}
                    >
                      <div className="text-2xl mb-1">{amount.cups}</div>
                      <div className="text-white font-medium text-sm">
                        {amount.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <label className="text-white font-medium mb-3 block">
                  Payment method:
                </label>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`
                        w-full p-3 rounded-lg border-2 transition-all
                        flex items-center gap-3
                        ${selectedMethod === method.id
                          ? 'border-white/40 bg-white/10 scale-[1.02]'
                          : 'border-white/20 bg-white/5 hover:border-white/30'
                        }
                      `}
                    >
                      <div className={`
                        p-2 rounded-lg bg-gradient-to-br ${method.color}
                      `}>
                        <method.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-white font-medium flex items-center gap-2">
                          {method.name}
                          <span className="text-lg">{method.flag}</span>
                        </div>
                      </div>
                      {selectedMethod === method.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-5 w-5 rounded-full bg-green-400 flex items-center justify-center"
                        >
                          ✓
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white"
                >
                  Maybe later
                </Button>
                <Button
                  onClick={handleDonate}
                  className="
                    flex-1 bg-gradient-to-r from-amber-500 to-orange-500
                    hover:from-amber-600 hover:to-orange-600
                    text-white font-semibold
                    shadow-lg
                  "
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Donate now
                </Button>
              </div>

              {/* Thank You Message */}
              <p className="text-white/60 text-xs text-center mt-4">
                Thank you for supporting independent developers! 💜
              </p>
            </>
          ) : (
            /* QR Code Display */
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">
                Scan QR Code
              </h3>
              
              {/* QR Code Image */}
              <div className="bg-white p-4 rounded-xl mb-4 inline-block">
                {selectedMethod === 'bank' ? (
                  <div className="space-y-3">
                    <Image
                      src="/qr/bank-qr.png"
                      alt="Bank QR"
                      width={200}
                      height={200}
                      className="mx-auto"
                    />
                    <div className="text-left text-sm text-gray-700 space-y-1">
                      <p><strong>Bank:</strong> Vietcombank</p>
                      <p><strong>Account:</strong> 1234567890</p>
                      <p><strong>Name:</strong> NGUYEN VAN A</p>
                      <p><strong>Amount:</strong> {selectedAmount}$</p>
                    </div>
                  </div>
                ) : (
                  <QrCode className="h-48 w-48 text-gray-400" />
                )}
              </div>

              <p className="text-white/80 mb-4">
                Open your {paymentMethods.find(m => m.id === selectedMethod)?.name} app
                and scan this QR code
              </p>

              <Button
                onClick={() => setShowQR(false)}
                variant="ghost"
                className="text-white"
              >
                ← Back to payment methods
              </Button>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
```

---

### **3. Header Donate Button Integration**

**File: `components/layout/header.tsx` (update)**
```typescript
import { FloatingDonateButton } from '@/components/donate/floating-donate-button';

export function Header() {
  // ... existing code

  return (
    <>
      <motion.header>
        {/* ... existing header code */}
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/calculator">Tính lương</Link>
          <Link href="/insights">Phân tích</Link>
          <Link href="/blog">Blog</Link>
          
          {/* Donate Button in Header */}
          <button
            onClick={() => setDonateModalOpen(true)}
            className="
              px-4 py-2 rounded-lg
              bg-gradient-to-r from-amber-500/20 to-orange-500/20
              border border-amber-400/30
              text-white/90 hover:text-white
              hover:bg-amber-500/30
              transition-all
              flex items-center gap-2
              font-medium
            "
          >
            <Coffee className="h-4 w-4" />
            <span className="hidden lg:inline">Support</span>
          </button>
        </nav>
      </motion.header>

      {/* Floating Button (Alternative) */}
      <FloatingDonateButton />
    </>
  );
}
```

---

### **4. Footer Donate Section**

**File: `components/layout/footer.tsx`**
```typescript
'use client';

import { Coffee, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="mt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Donate CTA */}
        <GlassCard variant="strong" className="p-8 mb-8">
          <div className="text-center">
            <motion.div
              className="inline-block mb-4"
              animate={{
                rotate: [0, -10, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <Coffee className="h-16 w-16 text-amber-400" />
            </motion.div>

            <h3 className="text-3xl font-bold text-white mb-3">
              Enjoying SalaryCalc VN?
            </h3>
            <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
              If this tool has helped you, consider buying me a coffee! ☕
              Your support helps keep SalaryCalc free and awesome for everyone.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                size="lg"
                className="
                  bg-gradient-to-r from-amber-500 to-orange-500
                  hover:from-amber-600 hover:to-orange-600
                  text-white font-semibold text-lg
                  px-8 py-6
                  shadow-xl hover:shadow-2xl
                "
              >
                <Coffee className="h-5 w-5 mr-2" />
                Buy me a coffee
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Image src="/icons/momo.svg" alt="Momo" width={20} height={20} className="mr-2" />
                  Momo
                </Button>
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Image src="/icons/bank.svg" alt="Bank" width={20} height={20} className="mr-2" />
                  Bank
                </Button>
              </div>
            </div>

            {/* Social Proof */}
            <div className="mt-6 flex items-center justify-center gap-2 text-white/60">
              <Heart className="h-4 w-4 fill-red-400 text-red-400" />
              <span className="text-sm">
                Joined by <strong className="text-white">127 awesome supporters</strong>
              </span>
            </div>
          </div>
        </GlassCard>

        {/* Regular Footer Content */}
        <div className="text-center text-white/60 text-sm">
          <p>Made with ❤️ in Vietnam</p>
          <p className="mt-2">© 2024 SalaryCalc VN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

---

## 🇻🇳 VIETNAM PAYMENT METHODS SETUP

### **1. Momo QR Code**

```typescript
// utils/payment.ts

export const MOMO_CONFIG = {
  phoneNumber: '0987654321', // Your Momo phone number
  qrCodeUrl: '/qr/momo-qr.png', // Static QR code image
  deepLink: 'momo://payment?amount=50000&note=SalaryCalcVN', // Dynamic amount
};

export function generateMomoLink(amount: number) {
  return `momo://transfer?phone=${MOMO_CONFIG.phoneNumber}&amount=${amount * 23000}&note=SalaryCalcVN%20Donation`;
}
```

### **2. Bank Transfer via VietQR**

```typescript
export const BANK_CONFIG = {
  bank: 'Vietcombank',
  accountNumber: '1234567890',
  accountName: 'NGUYEN VAN A',
  qrCodeUrl: '/qr/bank-qr.png',
};

// Generate VietQR dynamic QR code
export async function generateVietQR(amount: number) {
  // Use VietQR API (if available)
  const response = await fetch('https://api.vietqr.io/v2/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accountNo: BANK_CONFIG.accountNumber,
      accountName: BANK_CONFIG.accountName,
      acqId: '970436', // Vietcombank code
      amount: amount * 23000, // Convert USD to VND
      addInfo: 'SalaryCalcVN Donation',
      format: 'text',
      template: 'compact',
    }),
  });
  
  return response.json();
}
```

### **3. ZaloPay Integration**

```typescript
export const ZALOPAY_CONFIG = {
  phoneNumber: '0987654321',
  qrCodeUrl: '/qr/zalopay-qr.png',
};

export function generateZaloPayLink(amount: number) {
  return `zalopay://payment?amount=${amount * 23000}&note=SalaryCalcVN`;
}
```

---

## 📍 PLACEMENT STRATEGIES

### **Strategy 1: Subtle & Non-Intrusive**
```
✅ Floating button (bottom-right)
✅ Small icon in header
❌ No popups
❌ No auto-open modals
```
**Best for:** Apps with high daily usage

### **Strategy 2: Moderate Visibility**
```
✅ Floating button
✅ Footer CTA section
✅ Modal after 5 calculations
```
**Best for:** Balance between UX and conversion

### **Strategy 3: Maximum Visibility**
```
✅ All of the above
✅ Banner after calculation
✅ Reminder every 10 calculations
```
**Best for:** Apps with low engagement but high value

---

## 🎯 RECOMMENDED SETUP

**For SalaryCalc VN, use:**

1. **Floating Button** (always visible)
2. **Footer CTA** (prominent but not annoying)
3. **Modal trigger:**
   - After 5 successful calculations
   - Don't show again for 7 days if dismissed
   - Always accessible via floating button

**Implementation:**

```typescript
// hooks/use-donate-modal.ts
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export function useDonateModal() {
  const [showModal, setShowModal] = useState(false);
  const [calculationCount, setCalculationCount] = useState(0);

  useEffect(() => {
    // Check if user dismissed before
    const dismissed = Cookies.get('donate-modal-dismissed');
    if (dismissed) return;

    // Check calculation count
    const count = parseInt(localStorage.getItem('calculation-count') || '0');
    setCalculationCount(count);

    if (count === 5) {
      setShowModal(true);
    }
  }, []);

  const handleDismiss = () => {
    setShowModal(false);
    // Don't show again for 7 days
    Cookies.set('donate-modal-dismissed', 'true', { expires: 7 });
  };

  const incrementCalculation = () => {
    const newCount = calculationCount + 1;
    setCalculationCount(newCount);
    localStorage.setItem('calculation-count', newCount.toString());
  };

  return {
    showModal,
    setShowModal,
    handleDismiss,
    incrementCalculation,
  };
}
```

---

## 💰 PRICING TIERS (Optional)

```typescript
const DONATE_TIERS = [
  {
    amount: 3,
    label: 'Coffee',
    emoji: '☕',
    perks: ['Thank you message', 'Good karma'],
  },
  {
    amount: 5,
    label: 'Latte',
    emoji: '☕☕',
    perks: ['All above', 'Priority support'],
  },
  {
    amount: 10,
    label: 'Brunch',
    emoji: '☕☕☕',
    perks: ['All above', 'Feature requests', 'Early access'],
  },
  {
    amount: 25,
    label: 'Supporter',
    emoji: '💝',
    perks: ['All above', 'Name in credits', 'Custom features'],
  },
];
```

---

## 📊 TRACKING & ANALYTICS

```typescript
// Track donate button clicks
export function trackDonateClick(method: string, amount: number) {
  // Google Analytics
  gtag('event', 'donate_click', {
    payment_method: method,
    value: amount,
    currency: 'USD',
  });

  // Internal analytics
  fetch('/api/analytics/donate', {
    method: 'POST',
    body: JSON.stringify({ method, amount, timestamp: Date.now() }),
  });
}
```

---

## 🎨 STYLING EXAMPLES

### **Minimal Button**
```typescript
<button className="
  px-4 py-2 rounded-full
  bg-amber-500/10 hover:bg-amber-500/20
  border border-amber-400/30
  text-amber-300 hover:text-amber-200
  text-sm font-medium
  transition-all
">
  <Coffee className="inline h-4 w-4 mr-2" />
  Support
</button>
```

### **Prominent CTA**
```typescript
<button className="
  px-8 py-4 rounded-xl
  bg-gradient-to-r from-amber-500 to-orange-500
  hover:from-amber-600 hover:to-orange-600
  text-white font-bold text-lg
  shadow-xl hover:shadow-2xl
  transform hover:scale-105
  transition-all duration-300
">
  <Coffee className="inline h-6 w-6 mr-3" />
  Buy me a coffee ☕
</button>
```

---

## ✅ COMPLETE CHECKLIST

- [ ] Create FloatingDonateButton component
- [ ] Create DonateModal component
- [ ] Add payment method configs (Momo, ZaloPay, Bank)
- [ ] Generate QR codes for each method
- [ ] Add donate button to header
- [ ] Add donate CTA to footer
- [ ] Implement modal trigger logic
- [ ] Add analytics tracking
- [ ] Test all payment flows
- [ ] Add "Don't show again" logic
- [ ] Create thank you page/message
- [ ] Set up Cookies for persistence

---

## 🚀 QUICK START

**1. Install dependencies:**
```bash
npm install js-cookie framer-motion
npm install -D @types/js-cookie
```

**2. Add files:**
```
components/
├── donate/
│   ├── floating-donate-button.tsx
│   ├── donate-modal.tsx
│   └── thank-you-message.tsx
utils/
└── payment.ts
```

**3. Add to layout:**
```typescript
// app/layout.tsx
import { FloatingDonateButton } from '@/components/donate/floating-donate-button';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <FloatingDonateButton />
      </body>
    </html>
  );
}
```

**4. Configure payment methods:**
```typescript
// utils/payment.ts
export const PAYMENT_CONFIG = {
  momo: {
    phone: '0987654321',
    qr: '/qr/momo.png',
  },
  bank: {
    name: 'Vietcombank',
    account: '1234567890',
    qr: '/qr/bank.png',
  },
  buymeacoffee: 'https://buymeacoffee.com/yourusername',
};
```

---

**Bạn muốn:**
1. Mình tạo **Thank You page** sau khi donate?
2. **Email notification** khi có người donate?
3. **Supporter wall** hiển thị donors?
4. **Membership tiers** với exclusive features?

Let me know! ☕💜
