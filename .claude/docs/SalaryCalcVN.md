# 💼 SalaryCalc VN - Công cụ tính lương Gross ↔ Net

> Tool tính chuyển đổi lương Gross-Net chính xác cho thị trường Việt Nam với UI Glass Effect hiện đại

---

## 📋 MỤC LỤC

- [Tổng quan dự án](#-tổng-quan-dự-án)
- [Tech Stack](#-tech-stack)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Phase Overview & Timeline](#-phase-overview--timeline)
- [Quy định thuế & bảo hiểm 2024-2025](#-quy-định-thuế--bảo-hiểm-2024-2025)
- [Phase Implementation Plan](#-phase-implementation-plan)
  - [Phase 0: Setup](#phase-0-setup--cấu-hình-dự-án-3-5-ngày)
  - [Phase 1: Core Calculator](#phase-1-core-calculator-logic--ui-cơ-bản-7-10-ngày)
  - [Phase 2: Enhanced Features](#phase-2-enhanced-features--visualizations-5-7-ngày)
  - [Phase 3: Advanced Features](#phase-3-advanced-features-5-7-ngày)
  - [Phase 4: Annual Compensation & Career Insights](#phase-4-annual-compensation--career-insights-5-7-ngày)
  - [Phase 5: Polish & Deploy](#phase-5-polish--deployment-3-5-ngày)
- [Implementation Details](#-implementation-details)
- [Deployment Checklist](#-deployment-checklist)

---

## 🎯 TỔNG QUAN DỰ ÁN

### **Mục tiêu**
Xây dựng web app tính toán chuyển đổi lương Gross ↔ Net cho người lao động Việt Nam với:
- Độ chính xác cao (theo quy định thuế TNCN 2024-2025)
- UI/UX hiện đại với Glass Effect
- Responsive trên mọi thiết bị
- Export PDF kết quả tính toán

### **Tính năng chính**
✅ Tính Gross → Net (lương thực nhận)  
✅ Tính Net → Gross (lương cần đàm phán)  
✅ Breakdown chi tiết (bảo hiểm, thuế, giảm trừ)  
✅ Biểu đồ trực quan (Pie chart, Bar chart)  
✅ Comparison mode (so sánh nhiều mức lương)  
✅ Export PDF với breakdown đầy đủ  
✅ Lưu lịch sử tính toán (localStorage)  
✅ What-if analysis (thay đổi tham số real-time)  
✅ Yearly projection (dự đoán thu nhập cả năm)  

---

## 🛠️ TECH STACK

```yaml
Framework: Next.js 15 (App Router)
Language: TypeScript
UI Library: shadcn/ui + Radix UI
Styling: Tailwind CSS
Forms: React Hook Form + Zod
Animation: Framer Motion
Charts: Recharts
PDF: jsPDF + html2canvas / React-PDF
State: React Hooks (useState, useReducer)
Storage: localStorage
Package Manager: pnpm (hoặc npm)
Deployment: Vercel
```

---

## 📁 CẤU TRÚC DỰ ÁN

```
salary-calc-vn/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx              # Landing page
│   │   └── layout.tsx
│   ├── calculator/
│   │   ├── page.tsx              # Main calculator page
│   │   └── layout.tsx
│   ├── comparison/
│   │   └── page.tsx              # Compare multiple salaries
│   ├── history/
│   │   └── page.tsx              # Calculation history
│   ├── api/
│   │   └── export-pdf/
│   │       └── route.ts          # PDF generation endpoint
│   ├── layout.tsx                # Root layout
│   └── globals.css
│
├── components/
│   ├── ui/                       # shadcn components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── badge.tsx
│   │   ├── separator.tsx
│   │   ├── progress.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   │
│   ├── calculator/
│   │   ├── salary-input-form.tsx     # Main input form
│   │   ├── result-card.tsx           # Result display
│   │   ├── salary-breakdown.tsx      # Detailed breakdown
│   │   ├── tax-chart.tsx             # Tax visualization
│   │   ├── insurance-breakdown.tsx   # Insurance details
│   │   ├── animated-result.tsx       # With animations
│   │   └── export-button.tsx         # PDF export trigger
│   │
│   ├── shared/
│   │   ├── glass-card.tsx            # Glass effect card
│   │   ├── gradient-text.tsx         # Gradient text
│   │   ├── animated-number.tsx       # Number animation
│   │   ├── stat-card.tsx             # Statistic card
│   │   └── loading-spinner.tsx       # Loading state
│   │
│   ├── comparison/
│   │   ├── comparison-table.tsx      # Side-by-side comparison
│   │   └── comparison-chart.tsx      # Visual comparison
│   │
│   ├── history/
│   │   ├── history-list.tsx          # List of past calculations
│   │   └── history-item.tsx          # Individual history item
│   │
│   ├── layout/
│   │   ├── header.tsx                # App header
│   │   ├── footer.tsx                # App footer
│   │   └── nav.tsx                   # Navigation
│   │
│   └── pdf/
│       ├── pdf-template.tsx          # PDF layout template
│       └── pdf-generator.tsx         # PDF generation logic
│
├── lib/
│   ├── calculations/
│   │   ├── gross-to-net.ts           # Gross → Net calculation
│   │   ├── net-to-gross.ts           # Net → Gross calculation
│   │   ├── tax-calculator.ts         # Tax calculation logic
│   │   ├── insurance-calculator.ts   # Insurance calculation
│   │   └── utils.ts                  # Helper functions
│   │
│   ├── constants/
│   │   ├── tax-brackets.ts           # Tax brackets & rates
│   │   ├── insurance-rates.ts        # Insurance rates
│   │   └── regions.ts                # Region definitions
│   │
│   ├── validators/
│   │   └── salary-schema.ts          # Zod validation schemas
│   │
│   ├── storage/
│   │   └── local-storage.ts          # localStorage utilities
│   │
│   ├── pdf/
│   │   └── pdf-generator.ts          # PDF export utilities
│   │
│   └── utils.ts                      # Global utilities
│
├── types/
│   ├── salary.ts                     # Salary-related types
│   └── index.ts                      # Type exports
│
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── images/
│
├── .env.local
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 📅 PHASE OVERVIEW & TIMELINE

### **Development Phases Summary**

Dự án chia thành **5 phases** với tổng thời gian **28-39 ngày**:

| Phase | Tên | Thời gian | Mô tả |
|-------|-----|-----------|-------|
| **0** | Setup & Configuration | 3-5 ngày | Project initialization, dependencies, folder structure |
| **1** | Core Calculator | 7-10 ngày | Calculation logic, forms, basic UI, validation |
| **2** | Enhanced Features | 5-7 ngày | Charts, animations, result cards, mobile responsive |
| **3** | Advanced Features | 5-7 ngày | PDF export, history, comparison mode, what-if analysis |
| **4** | Annual Compensation & Career Insights | 5-7 ngày | ⭐ **Tháng 13, KPI, growth projection, smart insights** |
| **5** | Polish & Deployment | 3-5 ngày | SEO, testing, deploy to Vercel |

### **Phase 4 Highlights** ⭐ **TÍNH NĂNG MỚI**

**Annual Compensation Calculator:**
- Tính tổng package cả năm (12 tháng + tháng 13 + KPI + bonuses)
- Breakdown chi tiết từng khoản thu nhập
- Bar charts visualization
- Financial advice (50-30-20 rule)

**Salary Growth Projection:**
- Dự đoán lương 1-10 năm tới
- Slider inputs (% raise, years)
- Line/Area charts với gradient fills
- Year-by-year analysis

**Smart Insights Engine:**
- 💰 Tax insights (bracket analysis)
- 🛡️ Insurance insights (cap detection)
- 📈 Growth insights (trajectory evaluation)
- 🎯 Benchmark comparison
- 💵 Financial recommendations

### **Daily Breakdown - Phase 4**

```
Day 1-2: Core Logic
├── Type definitions (BonusInput, AnnualCompensation, etc.)
├── calculateAnnualCompensation() function
├── calculateSalaryGrowth() function
└── Test calculations

Day 3-4: Smart Insights
├── generateSalaryInsights() function
├── Insight categorization logic
├── Benchmark comparison algorithm
└── Recommendation rules

Day 5: Annual Compensation UI
├── AnnualCompensationCard component
├── Input forms for bonuses
├── Summary cards & charts
└── Financial advice section

Day 6: Salary Growth UI
├── SalaryGrowthCard component
├── Slider inputs
├── Line/Area charts
└── Insight cards

Day 7: Integration
├── Add Tabs to main calculator
├── Connect Monthly → Annual → Growth
├── End-to-end testing
└── Polish & documentation
```

---

## 💰 QUY ĐỊNH THUẾ & BẢO HIỂM 2024-2025

### **1. BIỂU THUẾ TNCN (Lũy tiến từng phần)**

| Bậc | Thu nhập tính thuế/tháng | Thuế suất | Công thức tính nhanh |
|-----|--------------------------|-----------|---------------------|
| 1 | Đến 5 triệu | 5% | TNT × 5% |
| 2 | Trên 5 - 10 triệu | 10% | TNT × 10% - 0.25tr |
| 3 | Trên 10 - 18 triệu | 15% | TNT × 15% - 0.75tr |
| 4 | Trên 18 - 32 triệu | 20% | TNT × 20% - 1.65tr |
| 5 | Trên 32 - 52 triệu | 25% | TNT × 25% - 3.25tr |
| 6 | Trên 52 - 80 triệu | 30% | TNT × 30% - 5.85tr |
| 7 | Trên 80 triệu | 35% | TNT × 35% - 9.85tr |

### **2. GIẢM TRỪ GIA CẢNH**
- **Bản thân**: 11,000,000 VNĐ/tháng (132tr/năm)
- **Người phụ thuộc**: 4,400,000 VNĐ/tháng/người

### **3. BẢO HIỂM BẮT BUỘC**

**Tổng tỷ lệ: 32%**

| Loại | Người lao động | Doanh nghiệp |
|------|----------------|--------------|
| BHXH | 8% | 17% (14% hưu trí + 3% ốm đau) |
| BHYT | 1.5% | 3% |
| BHTN | 1% | 1% |
| BHTNLĐ-BNN | 0% | 0.5% |
| **Tổng** | **10.5%** | **21.5%** |

### **4. TRẦN LƯƠNG ĐÓNG BẢO HIỂM**

- **BHXH & BHYT**: 20 × Lương cơ sở = 20 × 2,340,000 = **46,800,000 VNĐ**
- **BHTN** (theo vùng):
  - Vùng I: 20 × 4,960,000 = 99,200,000 VNĐ
  - Vùng II: 20 × 4,410,000 = 88,200,000 VNĐ
  - Vùng III: 20 × 3,860,000 = 77,200,000 VNĐ
  - Vùng IV: 20 × 3,450,000 = 69,000,000 VNĐ

### **5. CÔNG THỨC TÍNH TOÁN**

#### **Gross → Net:**
```
1. Thu nhập chịu thuế = Gross - Các khoản miễn thuế
2. Bảo hiểm = Thu nhập chịu thuế × 10.5% (có trần)
3. Thu nhập sau BH = Thu nhập chịu thuế - Bảo hiểm
4. Giảm trừ = 11tr + (Số người phụ thuộc × 4.4tr)
5. Thu nhập tính thuế = Thu nhập sau BH - Giảm trừ
6. Thuế TNCN = Áp dụng biểu thuế (công thức nhanh)
7. Net = Gross - Bảo hiểm - Thuế TNCN
```

#### **Net → Gross:**
```
Sử dụng phương pháp Binary Search hoặc Newton-Raphson
để tìm Gross sao cho:
  calculateNetFromGross(Gross) ≈ Net mong muốn
```

---

## 📅 PHASE IMPLEMENTATION PLAN

## **PHASE 0: Setup & Cấu hình dự án** (3-5 ngày)

### **Mục tiêu**
✅ Setup Next.js 15 project  
✅ Cài đặt và cấu hình shadcn/ui  
✅ Setup Tailwind với glass effect  
✅ Tạo folder structure  
✅ Setup TypeScript types  
✅ Cấu hình Git & deployment  

### **Tasks chi tiết**

#### **Day 1: Project Initialization**
```bash
# 1. Create Next.js project
npx create-next-app@latest salary-calc-vn --typescript --tailwind --app --use-pnpm

# 2. Navigate to project
cd salary-calc-vn

# 3. Install shadcn/ui
npx shadcn-ui@latest init

# Chọn:
# - Style: Default
# - Base color: Slate
# - CSS variables: Yes
```

#### **Day 2: Install Dependencies**
```bash
# UI Components
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
npx shadcn-ui@latest add select
npx shadcn-ui@latest add card
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add label
npx shadcn-ui@latest add button
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu

# Form & Validation
pnpm add react-hook-form zod @hookform/resolvers

# Charts
pnpm add recharts

# Animation
pnpm add framer-motion

# PDF Export
pnpm add jspdf html2canvas
# OR
pnpm add @react-pdf/renderer

# Utilities
pnpm add clsx tailwind-merge class-variance-authority
pnpm add date-fns
```

#### **Day 3: Setup Glass Effect & Theme**

**File: `tailwind.config.ts`**
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

**File: `app/globals.css`**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 262 83% 58%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 262 83% 58%;
  }
}

@layer utilities {
  /* Glass Effect Utilities */
  .glass {
    @apply backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl;
  }

  .glass-hover {
    @apply transition-all duration-300 hover:bg-white/20 hover:border-white/30;
  }

  .glass-subtle {
    @apply backdrop-blur-md bg-white/5 border border-white/10 shadow-lg;
  }

  .glass-strong {
    @apply backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl;
  }

  /* Gradient Backgrounds */
  .gradient-bg {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .gradient-bg-alt {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }

  .gradient-bg-blue {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }

  /* Gradient Text */
  .gradient-text {
    @apply bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent;
  }

  .gradient-text-blue {
    @apply bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent;
  }

  /* Glow Effect */
  .glow {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  }

  .glow-strong {
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.4);
  }
}
```

#### **Day 4-5: Create Base Structure**

**File: `types/salary.ts`**
```typescript
export type Region = 'I' | 'II' | 'III' | 'IV';

export interface SalaryInput {
  salary: number;
  dependents: number;
  region: Region;
  exemptions?: number;
}

export interface InsuranceBreakdown {
  bhxh: number;
  bhyt: number;
  bhtn: number;
  total: number;
  cappedSalary: number;
  originalSalary: number;
}

export interface TaxBreakdown {
  taxableIncome: number;
  tax: number;
  bracket: number;
  effectiveRate: number;
  marginalRate: number;
}

export interface DeductionBreakdown {
  personal: number;
  dependents: number;
  total: number;
}

export interface SalaryResult {
  gross: number;
  net: number;
  insurance: InsuranceBreakdown;
  tax: TaxBreakdown;
  deductions: DeductionBreakdown;
  monthlyBreakdown: {
    gross: number;
    insurance: number;
    taxableIncome: number;
    tax: number;
    net: number;
  };
  yearlyProjection: {
    grossYearly: number;
    netYearly: number;
    totalTax: number;
    totalInsurance: number;
  };
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  input: SalaryInput;
  result: SalaryResult;
  mode: 'gross-to-net' | 'net-to-gross';
}
```

**File: `lib/constants/tax-brackets.ts`**
```typescript
export const TAX_BRACKETS = [
  { 
    max: 5_000_000, 
    rate: 0.05, 
    deduction: 0,
    label: 'Bậc 1: ≤5 triệu'
  },
  { 
    max: 10_000_000, 
    rate: 0.10, 
    deduction: 250_000,
    label: 'Bậc 2: 5-10 triệu' 
  },
  { 
    max: 18_000_000, 
    rate: 0.15, 
    deduction: 750_000,
    label: 'Bậc 3: 10-18 triệu'
  },
  { 
    max: 32_000_000, 
    rate: 0.20, 
    deduction: 1_650_000,
    label: 'Bậc 4: 18-32 triệu'
  },
  { 
    max: 52_000_000, 
    rate: 0.25, 
    deduction: 3_250_000,
    label: 'Bậc 5: 32-52 triệu'
  },
  { 
    max: 80_000_000, 
    rate: 0.30, 
    deduction: 5_850_000,
    label: 'Bậc 6: 52-80 triệu'
  },
  { 
    max: Infinity, 
    rate: 0.35, 
    deduction: 9_850_000,
    label: 'Bậc 7: >80 triệu'
  },
] as const;

export const DEDUCTIONS = {
  PERSONAL: 11_000_000,
  DEPENDENT: 4_400_000,
} as const;

export const INSURANCE_RATES = {
  EMPLOYEE: {
    BHXH: 0.08,
    BHYT: 0.015,
    BHTN: 0.01,
    TOTAL: 0.105,
  },
  EMPLOYER: {
    BHXH: 0.17,
    BHYT: 0.03,
    BHTN: 0.01,
    BHTNLD: 0.005,
    TOTAL: 0.215,
  },
} as const;

export const SALARY_BASE = 2_340_000; // Mức lương cơ sở từ 1/7/2024

export const INSURANCE_CAPS = {
  BHXH_BHYT: 20 * SALARY_BASE, // 46,800,000
  BHTN: {
    I: 99_200_000,
    II: 88_200_000,
    III: 77_200_000,
    IV: 69_000_000,
  },
} as const;

export const MINIMUM_WAGE = {
  I: 4_960_000,
  II: 4_410_000,
  III: 3_860_000,
  IV: 3_450_000,
} as const;

export const REGIONS = [
  { 
    value: 'I' as const, 
    label: 'Vùng I - HN, HCM',
    minWage: 4_960_000,
  },
  { 
    value: 'II' as const, 
    label: 'Vùng II - Đô thị lớn',
    minWage: 4_410_000,
  },
  { 
    value: 'III' as const, 
    label: 'Vùng III - Tỉnh thành',
    minWage: 3_860_000,
  },
  { 
    value: 'IV' as const, 
    label: 'Vùng IV - Nông thôn',
    minWage: 3_450_000,
  },
] as const;
```

### **Deliverables Phase 0**
✅ Next.js project initialized  
✅ All dependencies installed  
✅ Folder structure created  
✅ Type definitions complete  
✅ Constants defined  
✅ Tailwind configured with glass effects  
✅ Git repository initialized  

---

## **PHASE 1: Core Calculator Logic & UI Cơ Bản** (7-10 ngày)

### **Mục tiêu**
✅ Implement core calculation logic  
✅ Build basic calculator form  
✅ Display results with glass effect UI  
✅ Add basic animations  

### **Week 1: Calculation Logic**

#### **Day 1-2: Insurance Calculator**

**File: `lib/calculations/insurance-calculator.ts`**
```typescript
import { 
  INSURANCE_RATES, 
  INSURANCE_CAPS, 
  MINIMUM_WAGE 
} from '@/lib/constants/tax-brackets';
import type { Region, InsuranceBreakdown } from '@/types/salary';

/**
 * Calculate insurance contributions with proper capping
 */
export function calculateInsurance(
  grossSalary: number,
  region: Region
): InsuranceBreakdown {
  // Cap for BHXH and BHYT (same cap)
  const bhxhBhytCap = INSURANCE_CAPS.BHXH_BHYT;
  const bhxhBhytBase = Math.min(grossSalary, bhxhBhytCap);
  
  // Cap for BHTN (varies by region)
  const bhtnCap = INSURANCE_CAPS.BHTN[region];
  const bhtnBase = Math.min(grossSalary, bhtnCap);
  
  // Minimum wage check
  const minWage = MINIMUM_WAGE[region];
  const effectiveBhxhBhytBase = Math.max(bhxhBhytBase, minWage);
  const effectiveBhtnBase = Math.max(bhtnBase, minWage);
  
  // Calculate each component
  const bhxh = Math.round(effectiveBhxhBhytBase * INSURANCE_RATES.EMPLOYEE.BHXH);
  const bhyt = Math.round(effectiveBhxhBhytBase * INSURANCE_RATES.EMPLOYEE.BHYT);
  const bhtn = Math.round(effectiveBhtnBase * INSURANCE_RATES.EMPLOYEE.BHTN);
  
  const total = bhxh + bhyt + bhtn;
  
  return {
    bhxh,
    bhyt,
    bhtn,
    total,
    cappedSalary: effectiveBhxhBhytBase,
    originalSalary: grossSalary,
  };
}

/**
 * Calculate employer's insurance contribution (for reference)
 */
export function calculateEmployerInsurance(
  grossSalary: number,
  region: Region
): InsuranceBreakdown {
  const bhxhBhytCap = INSURANCE_CAPS.BHXH_BHYT;
  const bhxhBhytBase = Math.min(grossSalary, bhxhBhytCap);
  
  const bhtnCap = INSURANCE_CAPS.BHTN[region];
  const bhtnBase = Math.min(grossSalary, bhtnCap);
  
  const minWage = MINIMUM_WAGE[region];
  const effectiveBhxhBhytBase = Math.max(bhxhBhytBase, minWage);
  const effectiveBhtnBase = Math.max(bhtnBase, minWage);
  
  const bhxh = Math.round(effectiveBhxhBhytBase * INSURANCE_RATES.EMPLOYER.BHXH);
  const bhyt = Math.round(effectiveBhxhBhytBase * INSURANCE_RATES.EMPLOYER.BHYT);
  const bhtn = Math.round(effectiveBhtnBase * INSURANCE_RATES.EMPLOYER.BHTN);
  const bhtnld = Math.round(effectiveBhxhBhytBase * INSURANCE_RATES.EMPLOYER.BHTNLD);
  
  const total = bhxh + bhyt + bhtn + bhtnld;
  
  return {
    bhxh: bhxh + bhtnld,
    bhyt,
    bhtn,
    total,
    cappedSalary: effectiveBhxhBhytBase,
    originalSalary: grossSalary,
  };
}
```

#### **Day 3-4: Tax Calculator**

**File: `lib/calculations/tax-calculator.ts`**
```typescript
import { TAX_BRACKETS, DEDUCTIONS } from '@/lib/constants/tax-brackets';
import type { TaxBreakdown, DeductionBreakdown } from '@/types/salary';

/**
 * Calculate personal income tax using progressive brackets
 */
export function calculateTax(taxableIncome: number): TaxBreakdown {
  if (taxableIncome <= 0) {
    return {
      taxableIncome: 0,
      tax: 0,
      bracket: 0,
      effectiveRate: 0,
      marginalRate: 0,
    };
  }
  
  const bracketIndex = TAX_BRACKETS.findIndex(
    bracket => taxableIncome <= bracket.max
  );
  
  const bracket = TAX_BRACKETS[bracketIndex];
  
  // Use quick calculation formula
  const tax = Math.round(
    taxableIncome * bracket.rate - bracket.deduction
  );
  
  const effectiveRate = tax / taxableIncome;
  
  return {
    taxableIncome,
    tax: Math.max(0, tax),
    bracket: bracketIndex + 1,
    effectiveRate,
    marginalRate: bracket.rate,
  };
}

/**
 * Calculate deductions based on dependents
 */
export function calculateDeductions(dependents: number): DeductionBreakdown {
  const personal = DEDUCTIONS.PERSONAL;
  const dependentDeduction = dependents * DEDUCTIONS.DEPENDENT;
  
  return {
    personal,
    dependents: dependentDeduction,
    total: personal + dependentDeduction,
  };
}
```

#### **Day 5-6: Main Calculation Functions**

**File: `lib/calculations/gross-to-net.ts`**
```typescript
import { calculateInsurance } from './insurance-calculator';
import { calculateTax, calculateDeductions } from './tax-calculator';
import type { SalaryInput, SalaryResult } from '@/types/salary';

export function calculateNetFromGross(input: SalaryInput): SalaryResult {
  const { salary: grossSalary, dependents, region, exemptions = 0 } = input;
  
  // Step 1: Calculate insurance
  const insurance = calculateInsurance(grossSalary, region);
  
  // Step 2: Income after insurance
  const incomeAfterInsurance = grossSalary - insurance.total;
  
  // Step 3: Calculate deductions
  const deductions = calculateDeductions(dependents);
  
  // Step 4: Taxable income
  const taxableIncome = Math.max(
    0,
    incomeAfterInsurance - deductions.total - exemptions
  );
  
  // Step 5: Calculate tax
  const tax = calculateTax(taxableIncome);
  
  // Step 6: Net salary
  const netSalary = grossSalary - insurance.total - tax.tax;
  
  // Step 7: Yearly projection
  const yearlyProjection = {
    grossYearly: grossSalary * 12,
    netYearly: netSalary * 12,
    totalTax: tax.tax * 12,
    totalInsurance: insurance.total * 12,
  };
  
  return {
    gross: grossSalary,
    net: netSalary,
    insurance,
    tax,
    deductions,
    monthlyBreakdown: {
      gross: grossSalary,
      insurance: insurance.total,
      taxableIncome: tax.taxableIncome,
      tax: tax.tax,
      net: netSalary,
    },
    yearlyProjection,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function calculatePercentage(part: number, total: number): number {
  if (total === 0) return 0;
  return (part / total) * 100;
}
```

**File: `lib/calculations/net-to-gross.ts`**
```typescript
import { calculateNetFromGross } from './gross-to-net';
import type { SalaryInput, SalaryResult } from '@/types/salary';

/**
 * Reverse calculation using Binary Search
 */
export function calculateGrossFromNet(input: SalaryInput): SalaryResult {
  const targetNet = input.salary;
  const tolerance = 1000;
  const maxIterations = 50;
  
  let lowerBound = targetNet;
  let upperBound = targetNet * 2;
  
  let iteration = 0;
  let result: SalaryResult | null = null;
  
  while (iteration < maxIterations) {
    const midGross = Math.round((lowerBound + upperBound) / 2);
    
    const testResult = calculateNetFromGross({
      ...input,
      salary: midGross,
    });
    
    const difference = testResult.net - targetNet;
    
    if (Math.abs(difference) <= tolerance) {
      result = testResult;
      break;
    }
    
    if (difference > 0) {
      upperBound = midGross;
    } else {
      lowerBound = midGross;
    }
    
    iteration++;
  }
  
  if (!result) {
    result = calculateNetFromGross({
      ...input,
      salary: upperBound,
    });
  }
  
  return result;
}
```

#### **Day 7: Validation Schema**

**File: `lib/validators/salary-schema.ts`**
```typescript
import * as z from 'zod';

export const salaryFormSchema = z.object({
  salary: z.coerce
    .number({
      required_error: 'Vui lòng nhập mức lương',
      invalid_type_error: 'Mức lương phải là số',
    })
    .min(1_000_000, 'Lương tối thiểu 1 triệu đồng')
    .max(500_000_000, 'Vui lòng kiểm tra lại số tiền'),
  
  dependents: z.coerce
    .number({
      required_error: 'Vui lòng nhập số người phụ thuộc',
    })
    .int('Số người phụ thuộc phải là số nguyên')
    .min(0, 'Số người phụ thuộc không thể âm')
    .max(20, 'Vui lòng kiểm tra lại số người phụ thuộc'),
  
  region: z.enum(['I', 'II', 'III', 'IV'], {
    required_error: 'Vui lòng chọn vùng',
  }),
  
  exemptions: z.coerce
    .number()
    .min(0, 'Các khoản miễn thuế không thể âm')
    .optional()
    .default(0),
});

export type SalaryFormValues = z.infer<typeof salaryFormSchema>;
```

### **Week 2: UI Components**

#### **Day 8-9: Glass Card Components**

**File: `components/ui/glass-card.tsx`**
```typescript
import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const glassCardVariants = cva(
  'relative overflow-hidden rounded-xl transition-all duration-300',
  {
    variants: {
      variant: {
        default: [
          'backdrop-blur-lg bg-white/10',
          'border border-white/20',
          'shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]',
        ],
        subtle: [
          'backdrop-blur-md bg-white/5',
          'border border-white/10',
          'shadow-lg',
        ],
        strong: [
          'backdrop-blur-xl bg-white/20',
          'border border-white/30',
          'shadow-2xl',
        ],
      },
      hover: {
        true: 'hover:bg-white/20 hover:border-white/30',
        false: '',
      },
      glow: {
        true: 'before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      hover: false,
      glow: false,
    },
  }
);

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant, hover, glow, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(glassCardVariants({ variant, hover, glow }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export { GlassCard };
```

**File: `components/ui/animated-number.tsx`**
```typescript
'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  formatFn?: (value: number) => string;
}

export function AnimatedNumber({
  value,
  duration = 1000,
  className,
  formatFn = (v) => v.toLocaleString('vi-VN'),
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const rafRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    const startValue = displayValue;
    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) return;

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (value - startValue) * eased;

      setDisplayValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [value, duration]);

  return (
    <span className={cn('tabular-nums', className)}>
      {formatFn(Math.round(displayValue))}
    </span>
  );
}
```

#### **Day 10: Calculator Form**

**File: `components/calculator/salary-input-form.tsx`**
```typescript
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { salaryFormSchema, type SalaryFormValues } from '@/lib/validators/salary-schema';
import { REGIONS } from '@/lib/constants/tax-brackets';
import { Calculator, TrendingUp } from 'lucide-react';

interface SalaryInputFormProps {
  onCalculate: (values: SalaryFormValues, mode: 'gross-to-net' | 'net-to-gross') => void;
  isLoading?: boolean;
}

export function SalaryInputForm({ onCalculate, isLoading }: SalaryInputFormProps) {
  const form = useForm<SalaryFormValues>({
    resolver: zodResolver(salaryFormSchema),
    defaultValues: {
      salary: 20_000_000,
      dependents: 0,
      region: 'I',
      exemptions: 0,
    },
  });

  return (
    <GlassCard variant="strong" className="p-6">
      <Tabs defaultValue="gross-to-net" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="gross-to-net" className="gap-2">
            <Calculator className="h-4 w-4" />
            Gross → Net
          </TabsTrigger>
          <TabsTrigger value="net-to-gross" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Net → Gross
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gross-to-net">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => onCalculate(data, 'gross-to-net'))}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Lương Gross (VNĐ)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="20,000,000"
                        className="bg-white/10 border-white/20 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-white/70">
                      Tổng lương trước thuế và bảo hiểm
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dependents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Số người phụ thuộc</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className="bg-white/10 border-white/20 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-white/70">
                      4.4 triệu/người/tháng
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Vùng</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {REGIONS.map((region) => (
                          <SelectItem key={region.value} value={region.value}>
                            {region.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="exemptions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Miễn thuế (VNĐ)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className="bg-white/10 border-white/20 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-white/70">
                      VD: Phụ cấp ăn trưa
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
                disabled={isLoading}
              >
                {isLoading ? 'Đang tính...' : 'Tính lương Net'}
              </Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="net-to-gross">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => onCalculate(data, 'net-to-gross'))}
              className="space-y-6"
            >
              {/* Same fields with different labels */}
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Lương Net mong muốn</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="15,000,000"
                        className="bg-white/10 border-white/20 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-white/70">
                      Số tiền thực nhận
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ... other fields same as above ... */}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500"
                disabled={isLoading}
              >
                {isLoading ? 'Đang tính...' : 'Tính Gross cần thiết'}
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </GlassCard>
  );
}
```

### **Deliverables Phase 1**
✅ Core calculation functions working  
✅ Input form with validation  
✅ Basic result display  
✅ Glass effect UI implemented  

---

## **PHASE 2: Enhanced Features & Visualizations** (5-7 ngày)

### **Mục tiêu**
✅ Result cards with detailed breakdown  
✅ Charts & visualizations (Recharts)  
✅ Animations (Framer Motion)  
✅ Mobile responsive  

### **Day 1-2: Result Display Components**

**File: `components/calculator/result-card.tsx`**
```typescript
'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { SalaryResult } from '@/types/salary';
import { formatCurrency } from '@/lib/calculations/gross-to-net';
import { Wallet, Shield, Receipt, Users } from 'lucide-react';

interface ResultCardProps {
  result: SalaryResult;
  mode: 'gross-to-net' | 'net-to-gross';
}

export function ResultCard({ result, mode }: ResultCardProps) {
  return (
    <div className="space-y-4">
      {/* Main Result */}
      <GlassCard variant="strong" className="p-6" glow>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-white" />
            <h3 className="text-lg font-semibold text-white">
              {mode === 'gross-to-net' ? 'Lương thực nhận' : 'Lương Gross'}
            </h3>
          </div>
          <Badge variant="secondary" className="bg-white/20">
            {mode === 'gross-to-net' ? 'Net' : 'Gross'}
          </Badge>
        </div>

        <div className="text-center py-6">
          <div className="text-5xl font-bold text-white">
            <AnimatedNumber
              value={mode === 'gross-to-net' ? result.net : result.gross}
              formatFn={formatCurrency}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <Shield className="h-4 w-4 text-blue-300 mx-auto mb-1" />
            <p className="text-xs text-white/70">Bảo hiểm</p>
            <p className="text-sm font-semibold text-white">
              {formatCurrency(result.insurance.total)}
            </p>
          </div>
          <div className="text-center">
            <Receipt className="h-4 w-4 text-orange-300 mx-auto mb-1" />
            <p className="text-xs text-white/70">Thuế</p>
            <p className="text-sm font-semibold text-white">
              {formatCurrency(result.tax.tax)}
            </p>
          </div>
          <div className="text-center">
            <Users className="h-4 w-4 text-purple-300 mx-auto mb-1" />
            <p className="text-xs text-white/70">Giảm trừ</p>
            <p className="text-sm font-semibold text-white">
              {formatCurrency(result.deductions.total)}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Detailed Breakdown */}
      <GlassCard variant="default" className="p-6">
        <h4 className="text-md font-semibold text-white mb-4">Chi tiết</h4>
        
        <div className="space-y-3">
          <div className="flex justify-between text-white">
            <span>Lương Gross</span>
            <span className="font-mono">{formatCurrency(result.gross)}</span>
          </div>
          
          <Separator className="bg-white/20" />
          
          {/* Insurance breakdown */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-white/90">
              <span>BHXH (8%)</span>
              <span>-{formatCurrency(result.insurance.bhxh)}</span>
            </div>
            <div className="flex justify-between text-white/90">
              <span>BHYT (1.5%)</span>
              <span>-{formatCurrency(result.insurance.bhyt)}</span>
            </div>
            <div className="flex justify-between text-white/90">
              <span>BHTN (1%)</span>
              <span>-{formatCurrency(result.insurance.bhtn)}</span>
            </div>
          </div>
          
          <Separator className="bg-white/20" />
          
          <div className="flex justify-between text-white">
            <span>Thuế TNCN (Bậc {result.tax.bracket})</span>
            <span>-{formatCurrency(result.tax.tax)}</span>
          </div>
          
          <Separator className="bg-white/20" />
          
          <div className="flex justify-between text-white font-bold">
            <span>Lương Net</span>
            <span className="text-lg">{formatCurrency(result.net)}</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
```

### **Day 3-4: Charts with Recharts**

**File: `components/calculator/tax-chart.tsx`**
```typescript
'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { SalaryResult } from '@/types/salary';
import { formatCurrency } from '@/lib/calculations/gross-to-net';

interface TaxChartProps {
  result: SalaryResult;
}

const COLORS = {
  net: '#10b981',
  insurance: '#3b82f6',
  tax: '#f59e0b',
};

export function TaxChart({ result }: TaxChartProps) {
  const data = [
    { name: 'Lương thực nhận', value: result.net, color: COLORS.net },
    { name: 'Bảo hiểm', value: result.insurance.total, color: COLORS.insurance },
    { name: 'Thuế TNCN', value: result.tax.tax, color: COLORS.tax },
  ];

  return (
    <GlassCard variant="default" className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Phân bổ lương
      </h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry) => `${entry.name}: ${((entry.value / result.gross) * 100).toFixed(1)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
```

### **Day 5-7: Main Page with Animations**

**File: `app/calculator/page.tsx`**
```typescript
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SalaryInputForm } from '@/components/calculator/salary-input-form';
import { ResultCard } from '@/components/calculator/result-card';
import { TaxChart } from '@/components/calculator/tax-chart';
import { calculateNetFromGross } from '@/lib/calculations/gross-to-net';
import { calculateGrossFromNet } from '@/lib/calculations/net-to-gross';
import type { SalaryResult } from '@/types/salary';
import type { SalaryFormValues } from '@/lib/validators/salary-schema';

export default function CalculatorPage() {
  const [result, setResult] = useState<SalaryResult | null>(null);
  const [mode, setMode] = useState<'gross-to-net' | 'net-to-gross'>('gross-to-net');
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async (
    values: SalaryFormValues,
    calculationMode: 'gross-to-net' | 'net-to-gross'
  ) => {
    setIsCalculating(true);
    setMode(calculationMode);

    await new Promise((resolve) => setTimeout(resolve, 300));

    const newResult =
      calculationMode === 'gross-to-net'
        ? calculateNetFromGross(values)
        : calculateGrossFromNet(values);

    setResult(newResult);
    setIsCalculating(false);
  };

  return (
    <div className="min-h-screen  p-4 md:p-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"
          animate={{
            y: [0, 100, 0],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Salary<span className="text-yellow-300">Calc</span> VN
          </h1>
          <p className="text-white/80 text-lg">
            Công cụ tính lương Gross ↔ Net
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <SalaryInputForm
              onCalculate={handleCalculate}
              isLoading={isCalculating}
            />
          </motion.div>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={`result-${mode}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <ResultCard result={result} mode={mode} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Charts */}
        {result && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <TaxChart result={result} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
```

### **Deliverables Phase 2**
✅ Detailed result cards  
✅ Charts & visualizations  
✅ Smooth animations  
✅ Responsive design  

---

## **PHASE 3: Advanced Features** (5-7 ngày)

### **Mục tiêu**
✅ Export PDF functionality  
✅ Calculation history  
✅ Comparison mode  
✅ What-if analysis  

### **Day 1-3: PDF Export**

**Install dependencies:**
```bash
pnpm add jspdf html2canvas
# OR
pnpm add @react-pdf/renderer
```

**File: `lib/pdf/pdf-generator.ts`**
```typescript
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { SalaryResult } from '@/types/salary';
import { formatCurrency } from '@/lib/calculations/gross-to-net';

export async function generatePDF(
  result: SalaryResult,
  mode: 'gross-to-net' | 'net-to-gross'
): Promise<Blob> {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Add header
  pdf.setFontSize(24);
  pdf.setTextColor(102, 126, 234);
  pdf.text('SalaryCalc VN', pageWidth / 2, 20, { align: 'center' });
  
  pdf.setFontSize(12);
  pdf.setTextColor(100);
  pdf.text('Kết quả tính lương', pageWidth / 2, 28, { align: 'center' });
  
  // Add date
  const today = new Date().toLocaleDateString('vi-VN');
  pdf.setFontSize(10);
  pdf.text(`Ngày: ${today}`, pageWidth / 2, 35, { align: 'center' });
  
  // Separator
  pdf.setDrawColor(200);
  pdf.line(20, 40, pageWidth - 20, 40);
  
  let yPos = 50;
  
  // Main result
  pdf.setFontSize(16);
  pdf.setTextColor(0);
  const mainLabel = mode === 'gross-to-net' ? 'Lương thực nhận (Net)' : 'Lương Gross cần thiết';
  const mainValue = mode === 'gross-to-net' ? result.net : result.gross;
  
  pdf.text(mainLabel, 20, yPos);
  pdf.setFontSize(20);
  pdf.setTextColor(16, 185, 129);
  pdf.text(formatCurrency(mainValue), pageWidth - 20, yPos, { align: 'right' });
  
  yPos += 15;
  pdf.setDrawColor(200);
  pdf.line(20, yPos, pageWidth - 20, yPos);
  
  yPos += 10;
  
  // Breakdown
  pdf.setFontSize(14);
  pdf.setTextColor(0);
  pdf.text('Chi tiết tính toán', 20, yPos);
  yPos += 10;
  
  const items = [
    { label: 'Lương Gross', value: result.gross, color: [0, 0, 0] },
    { label: 'BHXH (8%)', value: -result.insurance.bhxh, color: [59, 130, 246] },
    { label: 'BHYT (1.5%)', value: -result.insurance.bhyt, color: [59, 130, 246] },
    { label: 'BHTN (1%)', value: -result.insurance.bhtn, color: [59, 130, 246] },
    { label: 'Tổng bảo hiểm', value: -result.insurance.total, color: [59, 130, 246], bold: true },
    { label: 'Giảm trừ bản thân', value: -result.deductions.personal, color: [147, 51, 234] },
  ];
  
  if (result.deductions.dependents > 0) {
    items.push({
      label: 'Giảm trừ người phụ thuộc',
      value: -result.deductions.dependents,
      color: [147, 51, 234],
    });
  }
  
  items.push(
    { label: `Thuế TNCN (Bậc ${result.tax.bracket})`, value: -result.tax.tax, color: [245, 158, 11], bold: true },
    { label: 'Lương thực nhận (Net)', value: result.net, color: [16, 185, 129], bold: true }
  );
  
  pdf.setFontSize(11);
  items.forEach((item) => {
    if (item.bold) {
      pdf.setFont(undefined, 'bold');
    }
    pdf.setTextColor(...item.color);
    pdf.text(item.label, 25, yPos);
    pdf.text(formatCurrency(Math.abs(item.value)), pageWidth - 20, yPos, { align: 'right' });
    pdf.setFont(undefined, 'normal');
    yPos += 7;
  });
  
  yPos += 5;
  pdf.setDrawColor(200);
  pdf.line(20, yPos, pageWidth - 20, yPos);
  
  // Tax info
  yPos += 10;
  pdf.setFontSize(12);
  pdf.setTextColor(0);
  pdf.text('Thông tin thuế', 20, yPos);
  yPos += 8;
  
  pdf.setFontSize(10);
  pdf.text(`Thu nhập tính thuế: ${formatCurrency(result.tax.taxableIncome)}`, 25, yPos);
  yPos += 6;
  pdf.text(`Thuế suất hiệu dụng: ${(result.tax.effectiveRate * 100).toFixed(2)}%`, 25, yPos);
  yPos += 6;
  pdf.text(`Thuế suất biên: ${(result.tax.marginalRate * 100).toFixed(0)}%`, 25, yPos);
  
  // Yearly projection
  yPos += 10;
  pdf.setFontSize(12);
  pdf.setTextColor(0);
  pdf.text('Dự đoán cả năm (12 tháng)', 20, yPos);
  yPos += 8;
  
  pdf.setFontSize(10);
  pdf.text(`Gross/năm: ${formatCurrency(result.yearlyProjection.grossYearly)}`, 25, yPos);
  yPos += 6;
  pdf.text(`Net/năm: ${formatCurrency(result.yearlyProjection.netYearly)}`, 25, yPos);
  yPos += 6;
  pdf.text(`Tổng thuế/năm: ${formatCurrency(result.yearlyProjection.totalTax)}`, 25, yPos);
  yPos += 6;
  pdf.text(`Tổng bảo hiểm/năm: ${formatCurrency(result.yearlyProjection.totalInsurance)}`, 25, yPos);
  
  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(150);
  pdf.text('Tạo bởi SalaryCalc VN - salarycalc.vn', pageWidth / 2, pageHeight - 10, { align: 'center' });
  
  return pdf.output('blob');
}

export async function downloadPDF(
  result: SalaryResult,
  mode: 'gross-to-net' | 'net-to-gross'
) {
  const blob = await generatePDF(result, mode);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `salary-calculation-${Date.now()}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}
```

**Alternative: Using @react-pdf/renderer**

**File: `components/pdf/pdf-document.tsx`**
```typescript
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { SalaryResult } from '@/types/salary';
import { formatCurrency } from '@/lib/calculations/gross-to-net';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    color: '#667eea',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 11,
  },
  value: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  mainResult: {
    backgroundColor: '#f0f9ff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  mainResultValue: {
    fontSize: 20,
    color: '#10b981',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginVertical: 10,
  },
});

interface PDFDocumentProps {
  result: SalaryResult;
  mode: 'gross-to-net' | 'net-to-gross';
}

export function PDFDocument({ result, mode }: PDFDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SalaryCalc VN</Text>
          <Text style={styles.subtitle}>Kết quả tính lương</Text>
          <Text style={styles.subtitle}>
            {new Date().toLocaleDateString('vi-VN')}
          </Text>
        </View>

        {/* Main Result */}
        <View style={styles.mainResult}>
          <Text style={styles.label}>
            {mode === 'gross-to-net' ? 'Lương thực nhận (Net)' : 'Lương Gross cần thiết'}
          </Text>
          <Text style={styles.mainResultValue}>
            {formatCurrency(mode === 'gross-to-net' ? result.net : result.gross)}
          </Text>
        </View>

        {/* Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chi tiết tính toán</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Lương Gross</Text>
            <Text style={styles.value}>{formatCurrency(result.gross)}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <Text style={styles.label}>BHXH (8%)</Text>
            <Text style={styles.value}>-{formatCurrency(result.insurance.bhxh)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>BHYT (1.5%)</Text>
            <Text style={styles.value}>-{formatCurrency(result.insurance.bhyt)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>BHTN (1%)</Text>
            <Text style={styles.value}>-{formatCurrency(result.insurance.bhtn)}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <Text style={styles.label}>Thuế TNCN (Bậc {result.tax.bracket})</Text>
            <Text style={styles.value}>-{formatCurrency(result.tax.tax)}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <Text style={[styles.label, { fontWeight: 'bold' }]}>Lương Net</Text>
            <Text style={[styles.value, { fontSize: 14 }]}>{formatCurrency(result.net)}</Text>
          </View>
        </View>

        {/* Tax Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin thuế</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Thu nhập tính thuế</Text>
            <Text style={styles.value}>{formatCurrency(result.tax.taxableIncome)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Thuế suất hiệu dụng</Text>
            <Text style={styles.value}>{(result.tax.effectiveRate * 100).toFixed(2)}%</Text>
          </View>
        </View>

        {/* Yearly Projection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dự đoán cả năm</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Gross/năm</Text>
            <Text style={styles.value}>{formatCurrency(result.yearlyProjection.grossYearly)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Net/năm</Text>
            <Text style={styles.value}>{formatCurrency(result.yearlyProjection.netYearly)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
```

**File: `components/calculator/export-button.tsx`**
```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { downloadPDF } from '@/lib/pdf/pdf-generator';
import type { SalaryResult } from '@/types/salary';
import { useToast } from '@/components/ui/use-toast';

// OR if using @react-pdf/renderer:
// import { pdf } from '@react-pdf/renderer';
// import { PDFDocument } from '@/components/pdf/pdf-document';

interface ExportButtonProps {
  result: SalaryResult;
  mode: 'gross-to-net' | 'net-to-gross';
}

export function ExportButton({ result, mode }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    try {
      setIsExporting(true);
      
      // Using jsPDF:
      await downloadPDF(result, mode);
      
      // OR using @react-pdf/renderer:
      // const blob = await pdf(<PDFDocument result={result} mode={mode} />).toBlob();
      // const url = URL.createObjectURL(blob);
      // const link = document.createElement('a');
      // link.href = url;
      // link.download = `salary-calculation-${Date.now()}.pdf`;
      // link.click();
      // URL.revokeObjectURL(url);
      
      toast({
        title: 'Xuất PDF thành công',
        description: 'File đã được tải xuống',
      });
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể xuất PDF. Vui lòng thử lại.',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      variant="outline"
      className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
    >
      {isExporting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Đang xuất...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Xuất PDF
        </>
      )}
    </Button>
  );
}
```

### **Day 4-5: Calculation History**

**File: `lib/storage/local-storage.ts`**
```typescript
import type { CalculationHistory } from '@/types/salary';

const STORAGE_KEY = 'salary_calc_history';
const MAX_HISTORY = 50;

export function saveCalculation(history: Omit<CalculationHistory, 'id' | 'timestamp'>) {
  const existing = getHistory();
  
  const newEntry: CalculationHistory = {
    ...history,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  };
  
  const updated = [newEntry, ...existing].slice(0, MAX_HISTORY);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getHistory(): CalculationHistory[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function deleteHistory(id: string) {
  const existing = getHistory();
  const filtered = existing.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
```

**File: `components/history/history-list.tsx`**
```typescript
'use client';

import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getHistory, deleteHistory, clearHistory } from '@/lib/storage/local-storage';
import { formatCurrency } from '@/lib/calculations/gross-to-net';
import { Trash2, Calendar, ArrowRight } from 'lucide-react';
import type { CalculationHistory } from '@/types/salary';

export function HistoryList() {
  const [history, setHistory] = useState<CalculationHistory[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleDelete = (id: string) => {
    deleteHistory(id);
    setHistory(getHistory());
  };

  const handleClearAll = () => {
    if (confirm('Xóa toàn bộ lịch sử?')) {
      clearHistory();
      setHistory([]);
    }
  };

  if (history.length === 0) {
    return (
      <GlassCard className="p-8 text-center">
        <p className="text-white/70">Chưa có lịch sử tính toán</p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Lịch sử tính toán</h2>
        <Button
          onClick={handleClearAll}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Xóa tất cả
        </Button>
      </div>

      {history.map((item) => (
        <GlassCard key={item.id} className="p-4 hover:bg-white/15">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={item.mode === 'gross-to-net' ? 'default' : 'secondary'}>
                  {item.mode === 'gross-to-net' ? 'Gross → Net' : 'Net → Gross'}
                </Badge>
                <div className="flex items-center gap-1 text-white/60 text-sm">
                  <Calendar className="h-3 w-3" />
                  {new Date(item.timestamp).toLocaleDateString('vi-VN')}
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-white">
                <span className="font-mono">
                  {formatCurrency(item.result.gross)}
                </span>
                <ArrowRight className="h-4 w-4" />
                <span className="font-mono font-semibold">
                  {formatCurrency(item.result.net)}
                </span>
              </div>
            </div>

            <Button
              onClick={() => handleDelete(item.id)}
              variant="ghost"
              size="icon"
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
```

### **Day 6-7: Comparison Mode**

**File: `components/comparison/comparison-table.tsx`**
```typescript
'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { calculateNetFromGross, formatCurrency } from '@/lib/calculations/gross-to-net';
import { Plus, X } from 'lucide-react';
import type { SalaryResult } from '@/types/salary';

export function ComparisonTable() {
  const [salaries, setSalaries] = useState<number[]>([20_000_000, 30_000_000]);
  const [results, setResults] = useState<SalaryResult[]>([]);

  const handleAddSalary = () => {
    if (salaries.length < 5) {
      setSalaries([...salaries, 0]);
    }
  };

  const handleRemoveSalary = (index: number) => {
    setSalaries(salaries.filter((_, i) => i !== index));
  };

  const handleCalculate = () => {
    const newResults = salaries.map((salary) =>
      calculateNetFromGross({
        salary,
        dependents: 0,
        region: 'I',
      })
    );
    setResults(newResults);
  };

  return (
    <GlassCard className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">So sánh mức lương</h2>

      {/* Input Section */}
      <div className="space-y-3 mb-6">
        {salaries.map((salary, index) => (
          <div key={index} className="flex gap-2">
            <Input
              type="number"
              value={salary}
              onChange={(e) => {
                const newSalaries = [...salaries];
                newSalaries[index] = Number(e.target.value);
                setSalaries(newSalaries);
              }}
              placeholder="Nhập lương Gross"
              className="bg-white/10 border-white/20 text-white"
            />
            {salaries.length > 2 && (
              <Button
                onClick={() => handleRemoveSalary(index)}
                variant="ghost"
                size="icon"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button onClick={handleAddSalary} disabled={salaries.length >= 5}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm mức lương
        </Button>
        <Button onClick={handleCalculate} variant="default">
          So sánh
        </Button>
      </div>

      {/* Results Table */}
      {results.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3">Mục</th>
                {results.map((_, i) => (
                  <th key={i} className="text-right py-3">
                    Lương {i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-3">Gross</td>
                {results.map((r, i) => (
                  <td key={i} className="text-right font-mono">
                    {formatCurrency(r.gross)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3">Bảo hiểm</td>
                {results.map((r, i) => (
                  <td key={i} className="text-right font-mono">
                    {formatCurrency(r.insurance.total)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3">Thuế</td>
                {results.map((r, i) => (
                  <td key={i} className="text-right font-mono">
                    {formatCurrency(r.tax.tax)}
                  </td>
                ))}
              </tr>
              <tr className="font-bold">
                <td className="py-3">Net</td>
                {results.map((r, i) => (
                  <td key={i} className="text-right font-mono text-green-400">
                    {formatCurrency(r.net)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </GlassCard>
  );
}
```

### **Deliverables Phase 3**
✅ PDF export working  
✅ History saved to localStorage  
✅ Comparison mode functional  

---

## **PHASE 4: Annual Compensation & Career Insights** (5-7 ngày)

### **Mục tiêu**
Cung cấp cái nhìn toàn diện về thu nhập cả năm và phân tích career growth cho user.

✅ Annual compensation calculator (Tháng 13, KPI, bonuses)  
✅ Salary growth projection (1-10 years)  
✅ Smart insights & recommendations  
✅ Market benchmark comparison  
✅ Financial planning advice

### **Implementation Roadmap**

#### **Day 1-2: Type Definitions & Core Calculation Logic**

**Tasks:**
- Extend type system với `BonusInput`, `AnnualCompensation`, `SalaryGrowthInput`
- Implement `calculateAnnualCompensation()` function
- Implement `calculateSalaryGrowth()` function
- Test calculation accuracy

**Key Features to Build:**
- Tính tổng thu nhập cả năm (12 tháng + bonuses)
- Tax calculation cho tháng 13 (có BHXH)
- Tax calculation cho thưởng KPI (flat 10%)
- Growth projection với compound interest

#### **Day 3-4: Smart Insights Engine**

**Tasks:**
- Implement `generateSalaryInsights()` function
- Add insight generation rules:
  - Tax bracket analysis
  - Insurance cap detection
  - Growth trajectory evaluation
  - Market benchmark comparison
  - Financial health recommendations
- Create insight categorization system (positive/warning/info/neutral)

**Insight Categories:**
- 💰 Tax Insights (bracket, effective rate)
- 🛡️ Insurance Insights (cap reached)
- 📈 Growth Insights (trajectory analysis)
- 🎯 Benchmark Insights (market comparison)
- 💵 Financial Insights (savings recommendations)

#### **Day 5: UI Components - Annual Compensation**

**Tasks:**
- Build `AnnualCompensationCard` component
- Input form cho 4 loại bonuses
- Summary card với animated numbers
- Bar chart breakdown (Recharts)
- Financial advice section (50-30-20 rule)

**Component Features:**
- Glass effect cards
- Animated number transitions
- Color-coded breakdown
- Responsive grid layout

#### **Day 6: UI Components - Salary Growth**

**Tasks:**
- Build `SalaryGrowthCard` component
- Slider inputs (% raise, years)
- Line/Area chart với gradient fills
- Stats grid (current vs future)
- Insight cards với color-coding

**Chart Features:**
- Dual-line chart (Gross vs Net)
- Gradient area fills
- Interactive tooltips
- Year-by-year data points

#### **Day 7: Integration & Testing**

**Tasks:**
- Integrate into main calculator with Tabs
- Add navigation between Monthly/Annual/Growth views
- Test all calculations end-to-end
- Polish animations and transitions
- Mobile responsiveness testing
- Documentation updates

**Integration Points:**
- Update `app/calculator/page.tsx` với Tabs
- Pass data between monthly → annual → growth
- Ensure state management works correctly

---

### **Detailed Implementation Code**

#### **Type Definitions**

**File: `types/salary.ts` (extend)**
```typescript
export interface BonusInput {
  month13Salary?: number; // Lương tháng 13
  kpiBonus?: number; // Thưởng KPI
  performanceBonus?: number; // Thưởng hiệu suất
  otherBonus?: number; // Thưởng khác
}

export interface AnnualCompensation {
  monthlyGross: number;
  monthlyNet: number;
  
  // 12 months regular
  regularGrossYearly: number;
  regularNetYearly: number;
  
  // Bonuses
  month13: {
    gross: number;
    net: number;
    tax: number;
    insurance: number;
  };
  
  kpiBonus: {
    gross: number;
    net: number;
    tax: number;
  };
  
  otherBonuses: {
    gross: number;
    net: number;
    tax: number;
  };
  
  // Total
  totalGrossYearly: number;
  totalNetYearly: number;
  totalTaxYearly: number;
  totalInsuranceYearly: number;
  
  // Averages
  averageMonthlyGross: number;
  averageMonthlyNet: number;
  
  // Breakdown
  breakdown: {
    label: string;
    gross: number;
    net: number;
    percentage: number;
  }[];
}

export interface SalaryGrowthInput {
  currentSalary: number;
  yearsOfExperience: number;
  industry?: string;
  position?: string;
  annualRaise?: number; // % tăng lương hàng năm
  targetYears?: number; // Số năm dự đoán
}

export interface SalaryGrowthProjection {
  currentYear: {
    year: number;
    gross: number;
    net: number;
    age?: number;
  };
  
  projections: Array<{
    year: number;
    gross: number;
    net: number;
    raise: number; // % tăng so với năm trước
    cumulativeRaise: number; // % tăng so với năm đầu
    age?: number;
  }>;
  
  insights: SalaryInsight[];
}

export interface SalaryInsight {
  type: 'positive' | 'neutral' | 'warning' | 'info';
  category: 'tax' | 'insurance' | 'growth' | 'benchmark' | 'financial';
  title: string;
  description: string;
  recommendation?: string;
  icon?: string;
}
```

#### **Calculation Functions**

**File: `lib/calculations/annual-compensation.ts`**
```typescript
import { calculateNetFromGross } from './gross-to-net';
import type { 
  SalaryResult, 
  BonusInput, 
  AnnualCompensation,
  SalaryInput 
} from '@/types/salary';

/**
 * Calculate annual compensation with all bonuses
 */
export function calculateAnnualCompensation(
  monthlySalary: SalaryInput,
  bonuses: BonusInput
): AnnualCompensation {
  // Calculate regular monthly salary
  const monthlyResult = calculateNetFromGross(monthlySalary);
  
  // 12 months regular
  const regularGrossYearly = monthlyResult.gross * 12;
  const regularNetYearly = monthlyResult.net * 12;
  
  // Month 13 calculation (if exists)
  let month13 = {
    gross: 0,
    net: 0,
    tax: 0,
    insurance: 0,
  };
  
  if (bonuses.month13Salary && bonuses.month13Salary > 0) {
    const month13Result = calculateNetFromGross({
      ...monthlySalary,
      salary: bonuses.month13Salary,
    });
    
    month13 = {
      gross: bonuses.month13Salary,
      net: month13Result.net,
      tax: month13Result.tax.tax,
      insurance: month13Result.insurance.total,
    };
  }
  
  // KPI Bonus calculation
  let kpiBonus = {
    gross: 0,
    net: 0,
    tax: 0,
  };
  
  if (bonuses.kpiBonus && bonuses.kpiBonus > 0) {
    // KPI bonus typically taxed at 10% flat rate for one-time payments
    const kpiTax = Math.round(bonuses.kpiBonus * 0.10);
    
    kpiBonus = {
      gross: bonuses.kpiBonus,
      net: bonuses.kpiBonus - kpiTax,
      tax: kpiTax,
    };
  }
  
  // Other bonuses (performance, etc.)
  let otherBonuses = {
    gross: 0,
    net: 0,
    tax: 0,
  };
  
  const totalOtherBonus = 
    (bonuses.performanceBonus || 0) + 
    (bonuses.otherBonus || 0);
  
  if (totalOtherBonus > 0) {
    const otherTax = Math.round(totalOtherBonus * 0.10);
    
    otherBonuses = {
      gross: totalOtherBonus,
      net: totalOtherBonus - otherTax,
      tax: otherTax,
    };
  }
  
  // Calculate totals
  const totalGrossYearly = 
    regularGrossYearly + 
    month13.gross + 
    kpiBonus.gross + 
    otherBonuses.gross;
  
  const totalNetYearly = 
    regularNetYearly + 
    month13.net + 
    kpiBonus.net + 
    otherBonuses.net;
  
  const totalTaxYearly = 
    (monthlyResult.tax.tax * 12) + 
    month13.tax + 
    kpiBonus.tax + 
    otherBonuses.tax;
  
  const totalInsuranceYearly = 
    (monthlyResult.insurance.total * 12) + 
    month13.insurance;
  
  // Calculate averages (divide total by 12 months)
  const averageMonthlyGross = totalGrossYearly / 12;
  const averageMonthlyNet = totalNetYearly / 12;
  
  // Create breakdown
  const breakdown = [
    {
      label: '12 tháng lương cơ bản',
      gross: regularGrossYearly,
      net: regularNetYearly,
      percentage: (regularGrossYearly / totalGrossYearly) * 100,
    },
  ];
  
  if (month13.gross > 0) {
    breakdown.push({
      label: 'Tháng 13',
      gross: month13.gross,
      net: month13.net,
      percentage: (month13.gross / totalGrossYearly) * 100,
    });
  }
  
  if (kpiBonus.gross > 0) {
    breakdown.push({
      label: 'Thưởng KPI',
      gross: kpiBonus.gross,
      net: kpiBonus.net,
      percentage: (kpiBonus.gross / totalGrossYearly) * 100,
    });
  }
  
  if (otherBonuses.gross > 0) {
    breakdown.push({
      label: 'Thưởng khác',
      gross: otherBonuses.gross,
      net: otherBonuses.net,
      percentage: (otherBonuses.gross / totalGrossYearly) * 100,
    });
  }
  
  return {
    monthlyGross: monthlyResult.gross,
    monthlyNet: monthlyResult.net,
    regularGrossYearly,
    regularNetYearly,
    month13,
    kpiBonus,
    otherBonuses,
    totalGrossYearly,
    totalNetYearly,
    totalTaxYearly,
    totalInsuranceYearly,
    averageMonthlyGross,
    averageMonthlyNet,
    breakdown,
  };
}
```

### **Feature 2: Salary Growth Projection**

**File: `lib/calculations/salary-growth.ts`**
```typescript
import { calculateNetFromGross } from './gross-to-net';
import type { 
  SalaryGrowthInput, 
  SalaryGrowthProjection,
  SalaryInsight,
  SalaryInput 
} from '@/types/salary';

/**
 * Calculate salary growth projection over multiple years
 */
export function calculateSalaryGrowth(
  input: SalaryGrowthInput,
  baseInput: Omit<SalaryInput, 'salary'>
): SalaryGrowthProjection {
  const {
    currentSalary,
    yearsOfExperience,
    annualRaise = 10, // Default 10% annual raise
    targetYears = 5,
  } = input;
  
  const currentYear = new Date().getFullYear();
  const currentAge = yearsOfExperience ? 22 + yearsOfExperience : undefined;
  
  // Current year calculation
  const currentResult = calculateNetFromGross({
    ...baseInput,
    salary: currentSalary,
  });
  
  const currentYearData = {
    year: currentYear,
    gross: currentSalary,
    net: currentResult.net,
    age: currentAge,
  };
  
  // Project future years
  const projections = [];
  let projectedGross = currentSalary;
  
  for (let i = 1; i <= targetYears; i++) {
    // Apply annual raise
    const raiseAmount = projectedGross * (annualRaise / 100);
    projectedGross = Math.round(projectedGross + raiseAmount);
    
    // Calculate net for projected gross
    const projectedResult = calculateNetFromGross({
      ...baseInput,
      salary: projectedGross,
    });
    
    const cumulativeRaise = ((projectedGross - currentSalary) / currentSalary) * 100;
    
    projections.push({
      year: currentYear + i,
      gross: projectedGross,
      net: projectedResult.net,
      raise: annualRaise,
      cumulativeRaise,
      age: currentAge ? currentAge + i : undefined,
    });
  }
  
  // Generate insights
  const insights = generateSalaryInsights(
    currentResult,
    projections,
    input
  );
  
  return {
    currentYear: currentYearData,
    projections,
    insights,
  };
}

/**
 * Generate smart insights based on salary data
 */
function generateSalaryInsights(
  current: any,
  projections: any[],
  input: SalaryGrowthInput
): SalaryInsight[] {
  const insights: SalaryInsight[] = [];
  
  // Tax bracket insights
  const currentBracket = current.tax.bracket;
  const taxRate = current.tax.effectiveRate * 100;
  
  if (currentBracket <= 2) {
    insights.push({
      type: 'positive',
      category: 'tax',
      title: 'Thuế suất thấp',
      description: `Bạn đang ở bậc thuế ${currentBracket} với thuế suất hiệu dụng ${taxRate.toFixed(1)}%. Đây là mức thuế tương đối thấp.`,
      icon: '💰',
    });
  } else if (currentBracket >= 5) {
    insights.push({
      type: 'warning',
      category: 'tax',
      title: 'Thuế suất cao',
      description: `Bạn đang ở bậc thuế ${currentBracket} với thuế suất ${taxRate.toFixed(1)}%. Cân nhắc các khoản giảm trừ hợp pháp.`,
      recommendation: 'Tối đa hóa đóng góp quỹ hưu trí tự nguyện, từ thiện để giảm thuế.',
      icon: '⚠️',
    });
  }
  
  // Insurance cap insight
  if (current.insurance.cappedSalary < current.gross) {
    const cappedAmount = current.gross - current.insurance.cappedSalary;
    insights.push({
      type: 'info',
      category: 'insurance',
      title: 'Đã đạt trần BHXH',
      description: `Lương của bạn vượt trần đóng BHXH ${cappedAmount.toLocaleString('vi-VN')}đ. Phần vượt không phải đóng bảo hiểm.`,
      icon: '🛡️',
    });
  }
  
  // Growth insights
  const finalYear = projections[projections.length - 1];
  const totalGrowth = finalYear.cumulativeRaise;
  
  if (input.annualRaise && input.annualRaise >= 15) {
    insights.push({
      type: 'positive',
      category: 'growth',
      title: 'Tăng trưởng lương tốt',
      description: `Với mức tăng ${input.annualRaise}%/năm, sau ${projections.length} năm lương sẽ tăng ${totalGrowth.toFixed(0)}%.`,
      icon: '📈',
    });
  } else if (input.annualRaise && input.annualRaise < 7) {
    insights.push({
      type: 'warning',
      category: 'growth',
      title: 'Tăng trưởng lương thấp',
      description: `Mức tăng ${input.annualRaise}%/năm thấp hơn lạm phát. Xem xét đàm phán hoặc tìm cơ hội mới.`,
      recommendation: 'Chuẩn bị portfolio và kỹ năng để đàm phán tăng lương hoặc chuyển việc.',
      icon: '⚠️',
    });
  }
  
  // Future tax bracket warning
  const futureBracket = projections.find(p => {
    const futureResult = calculateNetFromGross({
      salary: p.gross,
      dependents: 0,
      region: 'I',
    });
    return futureResult.tax.bracket > currentBracket;
  });
  
  if (futureBracket) {
    insights.push({
      type: 'info',
      category: 'tax',
      title: 'Sẽ chuyển bậc thuế',
      description: `Dự kiến năm ${futureBracket.year} bạn sẽ chuyển sang bậc thuế cao hơn.`,
      recommendation: 'Lập kế hoạch tài chính và tối ưu giảm trừ thuế.',
      icon: '📊',
    });
  }
  
  // Net income insight
  const currentNetPercent = (current.net / current.gross) * 100;
  
  if (currentNetPercent >= 80) {
    insights.push({
      type: 'positive',
      category: 'financial',
      title: 'Tỷ lệ thu nhập thực cao',
      description: `Bạn giữ được ${currentNetPercent.toFixed(1)}% lương gross. Đây là tỷ lệ tốt!`,
      icon: '✨',
    });
  }
  
  // Savings recommendation
  const monthlyNet = current.net;
  const recommendedSavings = monthlyNet * 0.2; // 20% of net
  
  insights.push({
    type: 'info',
    category: 'financial',
    title: 'Khuyến nghị tiết kiệm',
    description: `Với thu nhập ${monthlyNet.toLocaleString('vi-VN')}đ/tháng, nên tiết kiệm ít nhất ${recommendedSavings.toLocaleString('vi-VN')}đ/tháng (20%).`,
    recommendation: 'Áp dụng quy tắc 50-30-20: 50% nhu cầu, 30% mong muốn, 20% tiết kiệm.',
    icon: '💵',
  });
  
  // Market benchmark (example - would need real data)
  if (input.yearsOfExperience && input.yearsOfExperience >= 5) {
    const estimatedMarketRate = getMarketBenchmark(input);
    if (current.gross < estimatedMarketRate * 0.8) {
      insights.push({
        type: 'warning',
        category: 'benchmark',
        title: 'Lương thấp hơn thị trường',
        description: `Lương của bạn có thể thấp hơn mức trung bình thị trường cho kinh nghiệm ${input.yearsOfExperience} năm.`,
        recommendation: 'Đàm phán tăng lương hoặc tìm kiếm cơ hội mới.',
        icon: '🎯',
      });
    }
  }
  
  return insights;
}

/**
 * Get market benchmark (placeholder - would integrate with real data)
 */
function getMarketBenchmark(input: SalaryGrowthInput): number {
  const { yearsOfExperience = 0, industry, position } = input;
  
  // Simplified benchmark calculation
  // In real app, this would query a database or API
  const baseRate = 15_000_000;
  const experienceMultiplier = 1 + (yearsOfExperience * 0.15);
  
  return Math.round(baseRate * experienceMultiplier);
}
```

### **Feature 3: UI Components**

#### **Annual Compensation Display**

**File: `components/calculator/annual-compensation-card.tsx`**
```typescript
'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  TrendingUp,
  Award,
  Gift,
  Calculator,
  PiggyBank
} from 'lucide-react';
import { calculateAnnualCompensation } from '@/lib/calculations/annual-compensation';
import { formatCurrency } from '@/lib/calculations/gross-to-net';
import type { SalaryInput, BonusInput, AnnualCompensation } from '@/types/salary';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface AnnualCompensationCardProps {
  monthlySalary: SalaryInput;
}

export function AnnualCompensationCard({ monthlySalary }: AnnualCompensationCardProps) {
  const [bonuses, setBonuses] = useState<BonusInput>({
    month13Salary: monthlySalary.salary,
    kpiBonus: 0,
    performanceBonus: 0,
    otherBonus: 0,
  });

  const [result, setResult] = useState<AnnualCompensation | null>(null);

  const handleCalculate = () => {
    const annualComp = calculateAnnualCompensation(monthlySalary, bonuses);
    setResult(annualComp);
  };

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <GlassCard variant="strong" className="p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Thu nhập cả năm
        </h3>

        <div className="space-y-4">
          <div>
            <Label className="text-white">Lương tháng 13</Label>
            <Input
              type="number"
              value={bonuses.month13Salary || ''}
              onChange={(e) =>
                setBonuses({ ...bonuses, month13Salary: Number(e.target.value) })
              }
              placeholder="Bằng lương tháng cơ bản"
              className="bg-white/10 border-white/20 text-white mt-2"
            />
          </div>

          <div>
            <Label className="text-white flex items-center gap-2">
              <Award className="h-4 w-4" />
              Thưởng KPI
            </Label>
            <Input
              type="number"
              value={bonuses.kpiBonus || ''}
              onChange={(e) =>
                setBonuses({ ...bonuses, kpiBonus: Number(e.target.value) })
              }
              placeholder="0"
              className="bg-white/10 border-white/20 text-white mt-2"
            />
          </div>

          <div>
            <Label className="text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Thưởng hiệu suất
            </Label>
            <Input
              type="number"
              value={bonuses.performanceBonus || ''}
              onChange={(e) =>
                setBonuses({ ...bonuses, performanceBonus: Number(e.target.value) })
              }
              placeholder="0"
              className="bg-white/10 border-white/20 text-white mt-2"
            />
          </div>

          <div>
            <Label className="text-white flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Thưởng khác
            </Label>
            <Input
              type="number"
              value={bonuses.otherBonus || ''}
              onChange={(e) =>
                setBonuses({ ...bonuses, otherBonus: Number(e.target.value) })
              }
              placeholder="0"
              className="bg-white/10 border-white/20 text-white mt-2"
            />
          </div>

          <Button
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Tính tổng thu nhập năm
          </Button>
        </div>
      </GlassCard>

      {/* Results */}
      {result && (
        <>
          {/* Summary Card */}
          <GlassCard variant="strong" className="p-6" glow>
            <h4 className="text-lg font-semibold text-white mb-4">
              Tổng quan thu nhập năm
            </h4>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <p className="text-white/70 text-sm mb-1">Tổng Gross/năm</p>
                <p className="text-2xl font-bold text-white">
                  <AnimatedNumber
                    value={result.totalGrossYearly}
                    formatFn={formatCurrency}
                  />
                </p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-lg">
                <p className="text-white/70 text-sm mb-1">Tổng Net/năm</p>
                <p className="text-2xl font-bold text-green-400">
                  <AnimatedNumber
                    value={result.totalNetYearly}
                    formatFn={formatCurrency}
                  />
                </p>
              </div>
            </div>

            <Separator className="bg-white/20 mb-6" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/70 text-sm">TB Gross/tháng</p>
                <p className="text-lg font-semibold text-white">
                  {formatCurrency(result.averageMonthlyGross)}
                </p>
              </div>
              <div>
                <p className="text-white/70 text-sm">TB Net/tháng</p>
                <p className="text-lg font-semibold text-green-400">
                  {formatCurrency(result.averageMonthlyNet)}
                </p>
              </div>
              <div>
                <p className="text-white/70 text-sm">Tổng thuế/năm</p>
                <p className="text-lg font-semibold text-orange-400">
                  {formatCurrency(result.totalTaxYearly)}
                </p>
              </div>
              <div>
                <p className="text-white/70 text-sm">Tổng BH/năm</p>
                <p className="text-lg font-semibold text-blue-400">
                  {formatCurrency(result.totalInsuranceYearly)}
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Breakdown Chart */}
          <GlassCard variant="default" className="p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Phân bổ thu nhập
            </h4>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={result.breakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="label" 
                  stroke="#fff" 
                  tick={{ fill: '#fff', fontSize: 12 }}
                  angle={-15}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="#fff" 
                  tick={{ fill: '#fff' }}
                  tickFormatter={(value) => `${(value / 1_000_000).toFixed(0)}M`}
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="gross" name="Gross" fill="#3b82f6" />
                <Bar dataKey="net" name="Net" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* Detailed Breakdown */}
          <GlassCard variant="subtle" className="p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Chi tiết từng khoản
            </h4>

            <div className="space-y-4">
              {result.breakdown.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{item.label}</span>
                    <Badge variant="secondary" className="bg-white/20">
                      {item.percentage.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">Gross:</span>
                      <span className="text-white ml-2 font-mono">
                        {formatCurrency(item.gross)}
                      </span>
                    </div>
                    <div>
                      <span className="text-white/60">Net:</span>
                      <span className="text-green-400 ml-2 font-mono">
                        {formatCurrency(item.net)}
                      </span>
                    </div>
                  </div>
                  {index < result.breakdown.length - 1 && (
                    <Separator className="bg-white/10" />
                  )}
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Savings Recommendation */}
          <GlassCard variant="default" className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <div className="flex items-start gap-3">
              <PiggyBank className="h-6 w-6 text-purple-300 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  💡 Khuyến nghị tài chính
                </h4>
                <p className="text-white/80 text-sm mb-3">
                  Với thu nhập ròng <strong>{formatCurrency(result.averageMonthlyNet)}/tháng</strong>, đây là cách phân bổ khuyến nghị:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">🏠 Nhu cầu thiết yếu (50%)</span>
                    <span className="text-white font-mono">
                      {formatCurrency(result.averageMonthlyNet * 0.5)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">🎉 Giải trí & Mong muốn (30%)</span>
                    <span className="text-white font-mono">
                      {formatCurrency(result.averageMonthlyNet * 0.3)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">💰 Tiết kiệm & Đầu tư (20%)</span>
                    <span className="text-green-400 font-mono font-semibold">
                      {formatCurrency(result.averageMonthlyNet * 0.2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </>
      )}
    </div>
  );
}
```

#### **Salary Growth Projection Component**

**File: `components/calculator/salary-growth-card.tsx`**
```typescript
'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  TrendingUp, 
  Calculator,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { calculateSalaryGrowth } from '@/lib/calculations/salary-growth';
import { formatCurrency } from '@/lib/calculations/gross-to-net';
import type { SalaryGrowthInput, SalaryGrowthProjection, SalaryInput } from '@/types/salary';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts';

interface SalaryGrowthCardProps {
  currentSalary: SalaryInput;
}

export function SalaryGrowthCard({ currentSalary }: SalaryGrowthCardProps) {
  const [growthInput, setGrowthInput] = useState<SalaryGrowthInput>({
    currentSalary: currentSalary.salary,
    yearsOfExperience: 3,
    annualRaise: 10,
    targetYears: 5,
  });

  const [projection, setProjection] = useState<SalaryGrowthProjection | null>(null);

  const handleCalculate = () => {
    const result = calculateSalaryGrowth(growthInput, {
      dependents: currentSalary.dependents,
      region: currentSalary.region,
      exemptions: currentSalary.exemptions,
    });
    setProjection(result);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-400" />;
      default:
        return <Lightbulb className="h-5 w-5 text-purple-400" />;
    }
  };

  const getInsightBgColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'from-green-500/10 to-emerald-500/10 border-green-500/30';
      case 'warning':
        return 'from-yellow-500/10 to-orange-500/10 border-yellow-500/30';
      case 'info':
        return 'from-blue-500/10 to-cyan-500/10 border-blue-500/30';
      default:
        return 'from-purple-500/10 to-pink-500/10 border-purple-500/30';
    }
  };

  // Prepare chart data
  const chartData = projection
    ? [
        {
          year: projection.currentYear.year,
          gross: projection.currentYear.gross,
          net: projection.currentYear.net,
        },
        ...projection.projections.map((p) => ({
          year: p.year,
          gross: p.gross,
          net: p.net,
        })),
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <GlassCard variant="strong" className="p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Dự đoán tăng trưởng lương
        </h3>

        <div className="space-y-6">
          <div>
            <Label className="text-white">Kinh nghiệm (năm)</Label>
            <Input
              type="number"
              value={growthInput.yearsOfExperience}
              onChange={(e) =>
                setGrowthInput({
                  ...growthInput,
                  yearsOfExperience: Number(e.target.value),
                })
              }
              className="bg-white/10 border-white/20 text-white mt-2"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-white">% Tăng lương hàng năm</Label>
              <Badge variant="secondary" className="bg-white/20">
                {growthInput.annualRaise}%
              </Badge>
            </div>
            <Slider
              value={[growthInput.annualRaise || 10]}
              onValueChange={(values) =>
                setGrowthInput({ ...growthInput, annualRaise: values[0] })
              }
              min={0}
              max={30}
              step={1}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-white/60 mt-1">
              <span>0%</span>
              <span>15%</span>
              <span>30%</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-white">Số năm dự đoán</Label>
              <Badge variant="secondary" className="bg-white/20">
                {growthInput.targetYears} năm
              </Badge>
            </div>
            <Slider
              value={[growthInput.targetYears || 5]}
              onValueChange={(values) =>
                setGrowthInput({ ...growthInput, targetYears: values[0] })
              }
              min={1}
              max={10}
              step={1}
              className="mt-2"
            />
          </div>

          <Button
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Tính toán dự đoán
          </Button>
        </div>
      </GlassCard>

      {/* Results */}
      {projection && (
        <>
          {/* Chart */}
          <GlassCard variant="default" className="p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Biểu đồ tăng trưởng
            </h4>

            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={chartData}>
                <defs>
                  <linearGradient id="grossGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="netGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="year" 
                  stroke="#fff" 
                  tick={{ fill: '#fff' }}
                />
                <YAxis 
                  stroke="#fff" 
                  tick={{ fill: '#fff' }}
                  tickFormatter={(value) => `${(value / 1_000_000).toFixed(0)}M`}
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="gross"
                  fill="url(#grossGradient)"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Lương Gross"
                />
                <Area
                  type="monotone"
                  dataKey="net"
                  fill="url(#netGradient)"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Lương Net"
                />
              </ComposedChart>
            </ResponsiveContainer>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <p className="text-white/60 text-xs mb-1">Hiện tại</p>
                <p className="text-white font-semibold">
                  {formatCurrency(projection.currentYear.gross)}
                </p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <p className="text-white/60 text-xs mb-1">
                  Sau {growthInput.targetYears} năm
                </p>
                <p className="text-green-400 font-semibold">
                  {formatCurrency(
                    projection.projections[projection.projections.length - 1].gross
                  )}
                </p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <p className="text-white/60 text-xs mb-1">Tăng trưởng</p>
                <p className="text-purple-400 font-semibold">
                  {projection.projections[
                    projection.projections.length - 1
                  ].cumulativeRaise.toFixed(0)}
                  %
                </p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <p className="text-white/60 text-xs mb-1">Mức tăng/năm</p>
                <p className="text-blue-400 font-semibold">
                  {growthInput.annualRaise}%
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Insights */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white px-2">
              💡 Phân tích & Khuyến nghị
            </h4>

            {projection.insights.map((insight, index) => (
              <GlassCard
                key={index}
                variant="subtle"
                className={`p-4 bg-gradient-to-br ${getInsightBgColor(insight.type)} border`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {insight.icon ? (
                      <span className="text-2xl">{insight.icon}</span>
                    ) : (
                      getInsightIcon(insight.type)
                    )}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-white mb-1">
                      {insight.title}
                    </h5>
                    <p className="text-sm text-white/80 mb-2">
                      {insight.description}
                    </p>
                    {insight.recommendation && (
                      <div className="mt-2 p-2 bg-white/10 rounded border border-white/20">
                        <p className="text-xs text-white/90">
                          <strong>Khuyến nghị:</strong> {insight.recommendation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
```

### **Feature 4: Integration into Main Calculator**

**File: `app/calculator/page.tsx` (updated)**
```typescript
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SalaryInputForm } from '@/components/calculator/salary-input-form';
import { ResultCard } from '@/components/calculator/result-card';
import { AnnualCompensationCard } from '@/components/calculator/annual-compensation-card';
import { SalaryGrowthCard } from '@/components/calculator/salary-growth-card';
import { Calculator, Calendar, TrendingUp } from 'lucide-react';
// ... other imports

export default function CalculatorPage() {
  const [result, setResult] = useState<SalaryResult | null>(null);
  const [salaryInput, setSalaryInput] = useState<SalaryInput | null>(null);
  // ... other state

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Salary<span className="text-yellow-300">Calc</span> VN
          </h1>
        </motion.div>

        {/* Main Tabs */}
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="calculator" className="gap-2">
              <Calculator className="h-4 w-4" />
              Tính lương
            </TabsTrigger>
            <TabsTrigger value="annual" className="gap-2">
              <Calendar className="h-4 w-4" />
              Thu nhập năm
            </TabsTrigger>
            <TabsTrigger value="growth" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Tăng trưởng
            </TabsTrigger>
          </TabsList>

          {/* Monthly Calculator Tab */}
          <TabsContent value="calculator">
            <div className="grid md:grid-cols-2 gap-6">
              <SalaryInputForm
                onCalculate={(values, mode) => {
                  setSalaryInput(values);
                  // ... calculate result
                }}
              />
              {result && <ResultCard result={result} mode="gross-to-net" />}
            </div>
          </TabsContent>

          {/* Annual Compensation Tab */}
          <TabsContent value="annual">
            {salaryInput ? (
              <AnnualCompensationCard monthlySalary={salaryInput} />
            ) : (
              <div className="text-center text-white/70 py-12">
                Vui lòng tính lương tháng trước
              </div>
            )}
          </TabsContent>

          {/* Salary Growth Tab */}
          <TabsContent value="growth">
            {salaryInput ? (
              <SalaryGrowthCard currentSalary={salaryInput} />
            ) : (
              <div className="text-center text-white/70 py-12">
                Vui lòng tính lương tháng trước
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
```

### **Deliverables Phase 4**
✅ Annual compensation calculator complete
✅ Salary growth projection working  
✅ Smart insights engine generating recommendations  
✅ All charts and visualizations functional  
✅ Integration with main calculator via Tabs  

---

## **PHASE 5: Polish & Deployment** (3-5 ngày)

### **Mục tiêu**
✅ SEO optimization  
✅ Performance optimization  
✅ Testing  
✅ Documentation  
✅ Deploy to Vercel  

### **Day 1-2: SEO & Meta Tags**

**File: `app/layout.tsx`**
```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  title: 'SalaryCalc VN - Tính lương Gross Net chính xác cho Việt Nam',
  description: 'Công cụ tính chuyển đổi lương Gross sang Net và ngược lại. Tính toán chính xác thuế TNCN và bảo hiểm theo quy định 2024-2025.',
  keywords: ['tính lương', 'gross to net', 'net to gross', 'thuế TNCN', 'bảo hiểm xã hội', 'lương thực nhận'],
  authors: [{ name: 'SalaryCalc VN' }],
  openGraph: {
    title: 'SalaryCalc VN - Tính lương Gross Net',
    description: 'Công cụ tính lương miễn phí cho người lao động Việt Nam',
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

### **Day 3: Testing**

**File: `lib/calculations/__tests__/gross-to-net.test.ts`**
```typescript
import { describe, it, expect } from 'vitest';
import { calculateNetFromGross } from '../gross-to-net';

describe('calculateNetFromGross', () => {
  it('should calculate net salary correctly', () => {
    const result = calculateNetFromGross({
      salary: 20_000_000,
      dependents: 0,
      region: 'I',
    });

    expect(result.gross).toBe(20_000_000);
    expect(result.insurance.total).toBeGreaterThan(0);
    expect(result.tax.tax).toBeGreaterThan(0);
    expect(result.net).toBeLessThan(result.gross);
  });

  it('should apply dependent deductions', () => {
    const withoutDependents = calculateNetFromGross({
      salary: 30_000_000,
      dependents: 0,
      region: 'I',
    });

    const withDependents = calculateNetFromGross({
      salary: 30_000_000,
      dependents: 2,
      region: 'I',
    });

    expect(withDependents.net).toBeGreaterThan(withoutDependents.net);
  });
});
```

### **Day 4-5: Deploy to Vercel**

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

**File: `vercel.json`**
```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["sin1"]
}
```

### **Deliverables Phase 5**
✅ SEO optimized  
✅ Tests written  
✅ Deployed to production  
✅ Documentation complete  

---

## 🚀 DEPLOYMENT CHECKLIST

### **Pre-deployment**
- [ ] All features tested
- [ ] Mobile responsive verified
- [ ] SEO meta tags added
- [ ] Analytics setup (Google Analytics/Plausible)
- [ ] Error boundaries implemented
- [ ] Loading states added

### **Vercel Deployment**
- [ ] Connect GitHub repository
- [ ] Configure environment variables
- [ ] Set custom domain (optional)
- [ ] Enable Analytics
- [ ] Configure caching headers

### **Post-deployment**
- [ ] Submit to Google Search Console
- [ ] Test on multiple devices
- [ ] Monitor performance (Lighthouse)
- [ ] Setup error tracking (Sentry)
- [ ] Create backup

---

## 📚 ADDITIONAL RESOURCES

### **Useful Links**
- Next.js Docs: https://nextjs.org/docs
- shadcn/ui: https://ui.shadcn.com
- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion
- Recharts: https://recharts.org

### **Vietnam Tax Resources**
- Tổng cục Thuế: https://gdt.gov.vn
- Luật Thuế TNCN: https://thuvienphapluat.vn

---

## 🎁 TÍNH NĂNG MỚI: Annual Compensation & Career Insights

### **📊 Tổng quan tính năng**

Phần mở rộng này bổ sung 3 tính năng chính:

#### **1. Annual Compensation Calculator**
**Mục đích:** Tính tổng thu nhập cả năm bao gồm các khoản thưởng

**Input:**
- Lương tháng cơ bản (từ calculator chính)
- Lương tháng 13
- Thưởng KPI
- Thưởng hiệu suất
- Thưởng khác

**Output:**
- Tổng Gross/Net cả năm
- Trung bình Gross/Net tháng (tính theo 12 tháng)
- Tổng thuế & bảo hiểm cả năm
- Breakdown chi tiết từng khoản thưởng
- Biểu đồ so sánh Gross vs Net cho từng khoản
- Khuyến nghị phân bổ tài chính (50-30-20 rule)

**Highlights:**
- ✅ Tính thuế chính xác cho tháng 13 (có đóng BHXH)
- ✅ Tính thuế 10% flat cho thưởng KPI (theo quy định)
- ✅ Visual breakdown với Recharts
- ✅ Khuyến nghị tiết kiệm thông minh

#### **2. Salary Growth Projection**
**Mục đích:** Dự đoán mức lương trong tương lai và trajectory career

**Input:**
- Lương hiện tại
- Số năm kinh nghiệm
- % tăng lương hàng năm (slider 0-30%)
- Số năm muốn dự đoán (1-10 năm)
- Industry & Position (optional)

**Output:**
- Biểu đồ tăng trưởng lương (Line/Area chart)
- Dự đoán Gross & Net cho từng năm
- % tăng trưởng tích lũy
- So sánh với thị trường (benchmark)
- **Smart Insights** - phân tích tự động

**Chart Features:**
- Dual-line chart (Gross vs Net)
- Gradient fill areas
- Year-by-year breakdown
- Interactive tooltips

#### **3. Smart Insights & Recommendations**
**Mục đích:** Đưa ra phân tích và khuyến nghị thông minh

**Các loại insights:**

**Tax Insights:**
- 💰 "Thuế suất thấp" - Khi ở bậc 1-2
- ⚠️ "Thuế suất cao" - Khi ở bậc 5-7, khuyến nghị tối ưu
- 📊 "Sẽ chuyển bậc thuế" - Warning trước khi lên bậc cao

**Insurance Insights:**
- 🛡️ "Đã đạt trần BHXH" - Thông báo khi vượt 46.8M

**Growth Insights:**
- 📈 "Tăng trưởng lương tốt" - Khi raise ≥ 15%/năm
- ⚠️ "Tăng trưởng lương thấp" - Khi raise < 7%/năm
- 🎯 "Lương thấp hơn thị trường" - So sánh với benchmark

**Financial Insights:**
- ✨ "Tỷ lệ thu nhập thực cao" - Khi Net/Gross ≥ 80%
- 💵 "Khuyến nghị tiết kiệm" - 50-30-20 rule
- 💡 Tips về đầu tư, tiết kiệm

**Benchmark Comparison:**
- So sánh lương với thị trường (theo kinh nghiệm)
- Recommendations nếu lương thấp hơn 80% market rate

### **🎨 UI/UX Design**

**Annual Compensation Card:**
```
┌─────────────────────────────────┐
│  📅 Thu nhập cả năm             │
├─────────────────────────────────┤
│  Input Form:                    │
│  - Lương tháng 13: [__________] │
│  - Thưởng KPI:     [__________] │
│  - Thưởng hiệu suất:[__________]│
│  - Thưởng khác:    [__________] │
│  [Tính tổng thu nhập năm]       │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  Tổng quan thu nhập năm         │
│  ┌────────────┐  ┌────────────┐ │
│  │ Gross/năm  │  │ Net/năm    │ │
│  │ 280,000,000│  │ 230,000,000│ │
│  └────────────┘  └────────────┘ │
│                                 │
│  Bar Chart: Breakdown by type   │
│  [===12 tháng===]               │
│  [=Tháng 13=]                   │
│  [=KPI=]                        │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  💡 Khuyến nghị tài chính       │
│  🏠 Nhu cầu (50%): 9,583,333đ   │
│  🎉 Giải trí (30%): 5,750,000đ  │
│  💰 Tiết kiệm (20%): 3,833,333đ │
└─────────────────────────────────┘
```

**Salary Growth Card:**
```
┌─────────────────────────────────┐
│  📈 Dự đoán tăng trưởng lương   │
├─────────────────────────────────┤
│  Kinh nghiệm: [3] năm           │
│  % Tăng/năm:  [●━━━━━━] 10%    │
│  Số năm:      [●━━━━━━] 5 năm  │
│  [Tính toán dự đoán]            │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  Line Chart: Growth over time   │
│    ┌─────────────────────────┐  │
│  40M│        ╱────────────╱   │  │
│  30M│     ╱──────────╱        │  │
│  20M│  ╱──────╱               │  │
│  10M│╱───╱                    │  │
│    └─────────────────────────┘  │
│     2024 2025 2026 2027 2028    │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  💡 Phân tích & Khuyến nghị     │
├─────────────────────────────────┤
│  ✅ Tăng trưởng lương tốt       │
│  Với mức 10%/năm, sau 5 năm     │
│  lương tăng 61%                 │
├─────────────────────────────────┤
│  ⚠️ Sẽ chuyển bậc thuế          │
│  Dự kiến năm 2026 chuyển sang   │
│  bậc 4. Lập kế hoạch tài chính. │
├─────────────────────────────────┤
│  💵 Khuyến nghị tiết kiệm       │
│  Nên tiết kiệm 3,200,000đ/tháng │
│  (20% thu nhập)                 │
└─────────────────────────────────┘
```

### **📊 Data Flow**

```
User Input
    ↓
Calculate Monthly Salary (existing)
    ↓
    ├─→ Annual Compensation
    │       ├─ Add bonuses
    │       ├─ Calculate tax for each
    │       └─ Sum totals
    │
    └─→ Salary Growth
            ├─ Project future years
            ├─ Calculate tax progression
            ├─ Generate insights
            └─ Compare with benchmarks
```

### **🔧 Implementation Timeline**

**Add to Phase 3 (Days 6-7):**

**Day 6:**
- Implement `calculateAnnualCompensation()` function
- Implement `calculateSalaryGrowth()` function
- Implement `generateSalaryInsights()` logic
- Add type definitions

**Day 7:**
- Build `AnnualCompensationCard` component
- Build `SalaryGrowthCard` component
- Integrate into main calculator with Tabs
- Add Recharts visualizations
- Test all calculations

### **💡 Smart Insights Examples**

```typescript
// Example insights generated:

// Positive
{
  type: 'positive',
  title: 'Tăng trưởng lương tốt',
  description: 'Với mức tăng 15%/năm, sau 5 năm lương tăng 101%',
  icon: '📈'
}

// Warning
{
  type: 'warning',
  title: 'Thuế suất cao',
  description: 'Bạn ở bậc 6 với thuế suất 27.3%',
  recommendation: 'Tối đa hóa giảm trừ: đóng BHXH tự nguyện, từ thiện',
  icon: '⚠️'
}

// Info
{
  type: 'info',
  title: 'Đã đạt trần BHXH',
  description: 'Lương vượt 46.8M. Phần vượt không đóng BH',
  icon: '🛡️'
}

// Benchmark
{
  type: 'warning',
  title: 'Lương thấp hơn thị trường',
  description: 'Lương thấp hơn 15% so với mức trung bình',
  recommendation: 'Đàm phán tăng lương hoặc tìm cơ hội mới',
  icon: '🎯'
}
```

### **🎯 User Value Proposition**

**Trước khi có tính năng này:**
- User chỉ biết lương tháng Net
- Không có cái nhìn tổng thể về thu nhập năm
- Không biết mình đang ở đâu trong career path
- Không có benchmark để đàm phán lương

**Sau khi có tính năng này:**
- ✅ Biết chính xác tổng thu nhập cả năm (bao gồm thưởng)
- ✅ Có roadmap rõ ràng cho career growth
- ✅ Nhận insights thông minh về thuế & tài chính
- ✅ So sánh với thị trường để đàm phán
- ✅ Lập kế hoạch tài chính dài hạn

---

## 🎉 TỔNG KẾT

Dự án **SalaryCalc VN** được thiết kế để hoàn thành trong **28-39 ngày** với roadmap rõ ràng:

- **Phase 0**: Setup & Configuration (3-5 ngày)
- **Phase 1**: Core Calculator Logic & Basic UI (7-10 ngày)
- **Phase 2**: Enhanced Features & Visualizations (5-7 ngày)
- **Phase 3**: Advanced Features (PDF, History, Comparison) (5-7 ngày)
- **Phase 4**: Annual Compensation & Career Insights (5-7 ngày) ⭐ **MỚI**
- **Phase 5**: Polish & Deployment (3-5 ngày)

**Tech Stack hoàn chỉnh:**
- Next.js 15 + TypeScript
- shadcn/ui + Tailwind CSS
- React Hook Form + Zod
- Framer Motion + Recharts
- jsPDF cho export

**Tính năng chính:**
✅ Tính Gross ↔ Net  
✅ Glass Effect UI  
✅ Charts & Visualizations  
✅ PDF Export  
✅ History & Comparison  
✅ **Annual Compensation (Tháng 13, KPI, Bonus)**  
✅ **Salary Growth Projection**  
✅ **Smart Insights & Recommendations**  

**Key Highlights của tính năng mới:**
- 📅 Tính tổng thu nhập cả năm với đầy đủ các khoản thưởng
- 📈 Dự đoán tăng trưởng lương 1-10 năm
- 💡 Smart insights tự động phân tích thuế, bảo hiểm, career growth
- 🎯 So sánh với thị trường (benchmark)
- 💰 Khuyến nghị tài chính (50-30-20 rule)
- 📊 Visualizations với Line/Area/Bar charts
- ⚡ Real-time calculations với sliders

**Use Cases thực tế:**
1. **Nhân viên mới** - Tính tổng package cả năm khi nhận offer
2. **Đàm phán lương** - Biết chính xác gross cần để đạt net mong muốn
3. **Career planning** - Dự đoán lương sau 3-5 năm
4. **Tax optimization** - Nhận insights về cách giảm thuế hợp pháp
5. **Financial planning** - Lập kế hoạch tiết kiệm dài hạn

Good luck với project! 🚀
