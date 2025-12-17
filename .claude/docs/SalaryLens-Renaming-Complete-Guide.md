# 🔄 Project Renaming Guide: SalaryCalc VN → SalaryLens

> Complete step-by-step guide để rename toàn bộ project

**From:** SalaryCalc VN  
**To:** SalaryLens  
**Domain:** salarylens.com / salarylens.io  
**Tagline:** "Crystal Clear Salary Insights"

---

## 📋 MỤC LỤC

1. [Pre-Rename Checklist](#-pre-rename-checklist)
2. [Files to Update](#-files-to-update)
3. [Code Changes](#-code-changes)
4. [Configuration Updates](#-configuration-updates)
5. [Documentation Updates](#-documentation-updates)
6. [Branding & Assets](#-branding--assets)
7. [Domain & Hosting](#-domain--hosting)
8. [Database & Backend](#-database--backend)
9. [Git & GitHub](#-git--github)
10. [Testing & Verification](#-testing--verification)
11. [Deployment](#-deployment)
12. [Post-Rename Tasks](#-post-rename-tasks)

---

## ✅ PRE-RENAME CHECKLIST

### **Before Starting:**

```bash
# 1. Backup everything
git add .
git commit -m "Backup before renaming to SalaryLens"
git push origin main

# 2. Create backup branch
git checkout -b backup/salarycalc-vn
git push origin backup/salarycalc-vn

# 3. Create rename branch
git checkout main
git checkout -b feature/rename-to-salarylens

# 4. Take database backup (if applicable)
# ... your backup commands

# 5. Document current state
npm run build  # Make sure current version builds
npm test       # Make sure tests pass
```

### **Required Tools:**

```bash
# Install renaming tools
npm install -g rename-cli
npm install -g find-and-replace

# VS Code extensions (helpful)
# - Search & Replace
# - Better Comments
# - TODO Highlight
```

---

## 📁 FILES TO UPDATE

### **Complete File List:**

```
Root Level:
├── package.json ✅
├── package-lock.json ✅
├── README.md ✅
├── .env.local ✅
├── .env.example ✅
├── next.config.js ✅
├── tailwind.config.ts ✅
└── tsconfig.json

Source Code:
├── app/
│   ├── layout.tsx ✅
│   ├── page.tsx ✅
│   ├── metadata.ts ✅
│   └── */page.tsx (all pages) ✅
├── components/
│   ├── */all components ✅
│   └── ui/* ✅
├── lib/
│   ├── */all utilities ✅
│   └── constants.ts ✅
├── types/
│   └── index.ts ✅
└── public/
    ├── favicon.ico ✅
    ├── logo.svg ✅
    └── manifest.json ✅

Documentation:
├── docs/ ✅
├── CONTRIBUTING.md ✅
├── CHANGELOG.md ✅
└── LICENSE ✅

Config:
├── .github/
│   └── workflows/*.yml ✅
└── vercel.json ✅
```

---

## 💻 CODE CHANGES

### **Step 1: Global Find & Replace**

#### **In VS Code:**

```
Press: Cmd/Ctrl + Shift + F (Find in Files)

Replace (case-sensitive):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. "SalaryCalc VN"   → "SalaryLens"
2. "SalaryCalc"      → "SalaryLens"
3. "salarycalc-vn"   → "salarylens"
4. "salarycalc"      → "salarylens"
5. "SALARYCALC_VN"   → "SALARYLENS"
6. "SALARYCALC"      → "SALARYLENS"

URLs:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. "salarycalcvn.com"     → "salarylens.com"
8. "salarycalc-vn.vercel" → "salarylens.vercel"

Repository:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9. "github.com/.../salarycalc-vn" → "github.com/.../salarylens"
```

---

### **Step 2: Update package.json**

```json
// package.json

{
  "name": "salarylens",
  "version": "2.0.0",
  "description": "Crystal clear salary insights for Vietnamese workers",
  "author": "SalaryLens Team",
  "license": "MIT",
  "homepage": "https://salarylens.com",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/salarylens.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/salarylens/issues"
  },
  "keywords": [
    "salary",
    "calculator",
    "vietnam",
    "tax",
    "compensation",
    "salarylens",
    "paycheck",
    "income"
  ],
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "rename:complete": "echo 'Renamed to SalaryLens successfully!'"
  }
}
```

---

### **Step 3: Update Environment Variables**

```env
# .env.local

# ============================================
# SALARYLENS CONFIGURATION
# ============================================

# App Info
NEXT_PUBLIC_APP_NAME="SalaryLens"
NEXT_PUBLIC_APP_TAGLINE="Crystal Clear Salary Insights"
NEXT_PUBLIC_APP_URL="https://salarylens.com"
NEXT_PUBLIC_APP_DESCRIPTION="Công cụ tính lương và phân tích thu nhập chính xác nhất cho người lao động Việt Nam"

# Meta
NEXT_PUBLIC_SITE_NAME="SalaryLens"
NEXT_PUBLIC_TWITTER_HANDLE="@salarylens"
NEXT_PUBLIC_FACEBOOK_PAGE="salarylens"

# API
ZAI_API_KEY=your_key_here
ZAI_API_URL=https://api.z.ai/api/paas/v4
ZAI_MODEL=glm-4-6-flash

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ANALYTICS_ENABLED=true

# Feature Flags
NEXT_PUBLIC_AI_ASSISTANT_ENABLED=true
NEXT_PUBLIC_BLOG_ENABLED=true
NEXT_PUBLIC_ABOUT_PAGE_ENABLED=true
```

```env
# .env.example

NEXT_PUBLIC_APP_NAME="SalaryLens"
NEXT_PUBLIC_APP_URL="https://salarylens.com"
ZAI_API_KEY=your_api_key_here
```

---

### **Step 4: Update Constants**

```typescript
// lib/constants.ts

export const APP_CONFIG = {
  name: 'SalaryLens',
  tagline: 'Crystal Clear Salary Insights',
  description: 'Công cụ tính lương và phân tích thu nhập chính xác nhất cho người lao động Việt Nam',
  url: 'https://salarylens.com',
  domain: 'salarylens.com',
  email: 'support@salarylens.com',
  
  social: {
    twitter: 'https://twitter.com/salarylens',
    facebook: 'https://facebook.com/salarylens',
    linkedin: 'https://linkedin.com/company/salarylens',
    github: 'https://github.com/yourusername/salarylens',
  },

  seo: {
    title: 'SalaryLens - Crystal Clear Salary Insights',
    description: 'Công cụ tính lương thông minh với AI. Phân tích thu nhập, tối ưu thuế, và tư vấn tài chính cho người Việt Nam.',
    keywords: [
      'tính lương',
      'salary calculator',
      'vietnam salary',
      'tax calculator',
      'salarylens',
      'lương net',
      'thu nhập',
    ],
  },

  features: {
    aiAssistant: true,
    blog: true,
    about: true,
    calculator: true,
  },
} as const;

export const TAX_CONFIG_2026 = {
  personalDeduction: 15_500_000,
  dependentDeduction: 6_200_000,
  // ... rest of config
};

export const BRAND_COLORS = {
  primary: '#1E40AF',    // Deep Blue
  secondary: '#10B981',  // Emerald
  accent: '#8B5CF6',     // Purple
} as const;
```

---

### **Step 5: Update Metadata**

```typescript
// app/layout.tsx

import { APP_CONFIG } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: APP_CONFIG.seo.title,
    template: `%s | ${APP_CONFIG.name}`,
  },
  description: APP_CONFIG.seo.description,
  keywords: APP_CONFIG.seo.keywords,
  authors: [{ name: 'SalaryLens Team' }],
  creator: 'SalaryLens',
  publisher: 'SalaryLens',
  metadataBase: new URL(APP_CONFIG.url),
  
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: APP_CONFIG.url,
    title: APP_CONFIG.seo.title,
    description: APP_CONFIG.seo.description,
    siteName: APP_CONFIG.name,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SalaryLens - Crystal Clear Salary Insights',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: APP_CONFIG.seo.title,
    description: APP_CONFIG.seo.description,
    creator: APP_CONFIG.social.twitter,
    images: ['/og-image.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={APP_CONFIG.url} />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```

---

### **Step 6: Update README.md**

```markdown
# 🎯 SalaryLens - Crystal Clear Salary Insights

> Công cụ tính lương thông minh với AI cho người lao động Việt Nam

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

## 🌟 Features

- 🧮 **Salary Calculator** - Tính lương Gross ↔ Net chính xác
- 🤖 **AI Assistant** - Tư vấn tài chính thông minh
- 📊 **Tax Breakdown** - Phân tích thuế chi tiết (2026 update)
- 💡 **Smart Insights** - Gợi ý tối ưu thuế và tài chính
- 📱 **Mobile First** - Responsive hoàn hảo mọi thiết bị
- 🎨 **Modern UI** - Glass morphism design

## 🚀 Quick Start

\`\`\`bash
# Clone repository
git clone https://github.com/yourusername/salarylens.git
cd salarylens

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your config

# Run development server
npm run dev

# Open http://localhost:3000
\`\`\`

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **AI:** Z.AI (GLM-4-6-Flash)
- **Icons:** Lucide React

## 📖 Documentation

- [Features Documentation](./docs/FEATURES.md)
- [API Documentation](./docs/API.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Changelog](./CHANGELOG.md)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md).

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 📧 Contact

- Website: [salarylens.com](https://salarylens.com)
- Email: support@salarylens.com
- Twitter: [@salarylens](https://twitter.com/salarylens)

---

Made with ❤️ by SalaryLens Team
```

---

### **Step 7: Update Manifest**

```json
// public/manifest.json

{
  "name": "SalaryLens",
  "short_name": "SalaryLens",
  "description": "Crystal clear salary insights for Vietnamese workers",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1E40AF",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "orientation": "portrait",
  "categories": ["finance", "productivity", "utilities"]
}
```

---

### **Step 8: Update Next.js Config**

```javascript
// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Metadata
  env: {
    NEXT_PUBLIC_APP_NAME: 'SalaryLens',
    NEXT_PUBLIC_APP_URL: 'https://salarylens.com',
  },
  
  // Image optimization
  images: {
    domains: ['salarylens.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
  
  // Redirects (if needed)
  async redirects() {
    return [
      // Redirect old domain to new (if applicable)
      // {
      //   source: '/:path*',
      //   has: [{ type: 'host', value: 'salarycalc.com' }],
      //   destination: 'https://salarylens.com/:path*',
      //   permanent: true,
      // },
    ];
  },
};

module.exports = nextConfig;
```

---

## 🎨 BRANDING & ASSETS

### **Step 9: Update Branding Assets**

#### **Logo Files to Create/Update:**

```bash
public/
├── logo.svg              # New SalaryLens logo
├── logo-dark.svg         # Dark mode version
├── logo-icon.svg         # Icon only
├── favicon.ico           # New favicon
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── icon-192x192.png
├── icon-512x512.png
└── og-image.png          # Social sharing image
```

#### **Create New Logo:**

**Option 1: Canva (Free)**
```
1. Go to Canva.com
2. Search "Logo" template
3. Use these elements:
   - Icon: Magnifying glass + lens
   - Text: "SalaryLens"
   - Font: Inter Bold or Poppins Bold
   - Colors: #1E40AF (blue) + #10B981 (green)
4. Export as SVG + PNG
```

**Option 2: Fiverr ($50-200)**
```
1. Post gig on Fiverr
2. Brief: "Modern logo for SalaryLens - salary calculator app"
3. Include: Lens/magnifying glass concept
4. Colors: Blue + Green
5. Deliver: SVG, PNG, ICO formats
```

**Option 3: DIY with Figma (Free)**
```
1. Create account on Figma
2. New file → Logo design
3. Use circle (lens shape)
4. Add dollar sign or chart icon inside
5. Add "SalaryLens" text
6. Export all formats
```

---

### **Step 10: Color Scheme Update**

```typescript
// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // SalaryLens Brand Colors
        brand: {
          primary: '#1E40AF',      // Deep Blue
          secondary: '#10B981',    // Emerald
          accent: '#8B5CF6',       // Purple
          dark: '#0F172A',         // Slate 900
          light: '#F8FAFC',        // Slate 50
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 🌐 DOMAIN & HOSTING

### **Step 11: Domain Setup**

#### **Buy Domain:**

```bash
# Recommended registrars:
1. Namecheap.com
2. Google Domains
3. Cloudflare Registrar

# Buy these:
✅ salarylens.com (primary)
✅ salarylens.io (backup)
✅ salarylens.app (optional)

# Settings:
✅ Privacy protection: ON
✅ Auto-renew: ON
✅ Duration: 2+ years
```

#### **DNS Configuration:**

```
# Cloudflare DNS (recommended)

A Record:
- Name: @ (root)
- Value: Your_Server_IP
- TTL: Auto

CNAME Records:
- Name: www
- Value: salarylens.com
- TTL: Auto

# For Vercel:
- Follow Vercel domain setup guide
- Add custom domain in Vercel dashboard
```

---

### **Step 12: Vercel Deployment**

```bash
# Update Vercel project settings

1. Go to Vercel Dashboard
2. Select your project
3. Settings → General
   - Project Name: salarylens
   
4. Settings → Domains
   - Add domain: salarylens.com
   - Add domain: www.salarylens.com
   
5. Settings → Environment Variables
   - Update all NEXT_PUBLIC_APP_* variables
   - Update ZAI_API_KEY if needed
   
6. Redeploy
   - Deployments → Latest → Redeploy
```

---

## 🗄️ DATABASE & BACKEND

### **Step 13: Database Updates** (if applicable)

```sql
-- Update any database references

-- Example for PostgreSQL:
ALTER TABLE app_config 
SET name = 'SalaryLens' 
WHERE name = 'SalaryCalc VN';

UPDATE users 
SET app_name = 'SalaryLens' 
WHERE app_name = 'SalaryCalc VN';

-- Update any stored URLs
UPDATE settings 
SET value = REPLACE(value, 'salarycalcvn.com', 'salarylens.com');
```

---

### **Step 14: API Endpoints** (if applicable)

```typescript
// Update API routes

// Before:
// /api/salarycalc/calculate

// After:
// /api/calculator/calculate

// Or keep the same endpoints for backward compatibility
```

---

## 📂 GIT & GITHUB

### **Step 15: GitHub Repository**

#### **Option A: Rename Existing Repo**

```bash
# On GitHub:
1. Go to repository Settings
2. Rename repository: salarycalc-vn → salarylens
3. GitHub will setup redirects automatically

# Update local remote:
git remote set-url origin https://github.com/yourusername/salarylens.git
git remote -v  # Verify
```

#### **Option B: Create New Repo**

```bash
# Create new repo on GitHub: salarylens

# Update local repo:
git remote remove origin
git remote add origin https://github.com/yourusername/salarylens.git
git push -u origin main
```

---

### **Step 16: Update GitHub Settings**

```
Repository Settings:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Name: salarylens
✅ Description: "Crystal clear salary insights for Vietnamese workers"
✅ Website: https://salarylens.com
✅ Topics: salary, calculator, vietnam, tax, finance, nextjs, typescript

Branch Protection:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Require PR reviews
✅ Require status checks
✅ Require linear history

GitHub Pages (if using):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Update custom domain to salarylens.com
```

---

## 🧪 TESTING & VERIFICATION

### **Step 17: Testing Checklist**

```bash
# 1. Build test
npm run build
# Should build without errors

# 2. Start production server
npm run start
# Check if app loads at localhost:3000

# 3. Run tests (if you have them)
npm test

# 4. Check all pages
- Home page ✅
- Calculator page ✅
- Results page ✅
- Blog pages ✅
- About page ✅

# 5. Verify branding
- Logo displays correctly ✅
- Title shows "SalaryLens" ✅
- Meta tags updated ✅
- OG image shows new branding ✅

# 6. Test functionality
- Calculator works ✅
- AI Assistant works ✅
- All features functional ✅

# 7. Mobile responsive
- Test on mobile device ✅
- Check all breakpoints ✅
```

---

### **Step 18: SEO Verification**

```bash
# Use these tools:

1. Google Search Console
   - Add new property: salarylens.com
   - Submit sitemap
   - Verify ownership

2. Google Analytics
   - Create new property
   - Update tracking ID in .env.local

3. Meta Tags Checker
   - Use: metatags.io
   - Verify all meta tags

4. Lighthouse Audit
   - Run in Chrome DevTools
   - Score should be 90+ for all categories
```

---

## 🚀 DEPLOYMENT

### **Step 19: Production Deployment**

```bash
# Final checklist before deployment:

□ All code changes committed
□ All tests passing
□ Build successful
□ Environment variables set
□ Domain configured
□ DNS propagated (check: whatsmydns.net)
□ SSL certificate active
□ Analytics configured
□ Error tracking setup (Sentry, etc.)

# Deploy:
git add .
git commit -m "🎉 Rebrand to SalaryLens complete"
git push origin main

# Vercel will auto-deploy
# Or manual deploy:
vercel --prod
```

---

### **Step 20: Verify Production**

```bash
# Check these URLs:

✅ https://salarylens.com
✅ https://www.salarylens.com
✅ https://salarylens.com/calculator
✅ https://salarylens.com/blog
✅ https://salarylens.com/about

# Verify:
- All pages load ✅
- No broken links ✅
- Images load correctly ✅
- Meta tags correct ✅
- Analytics tracking ✅
- AI Assistant works ✅
```

---

## 📋 POST-RENAME TASKS

### **Step 21: Marketing & Communication**

```
Social Media:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Update Facebook page name
□ Update Twitter handle
□ Update LinkedIn company page
□ Update Instagram bio
□ Post announcement about rebrand

Email (if you have users):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subject: "We're now SalaryLens! 🎉"
- Announce rebrand
- Explain benefits
- Update bookmarks

Blog Post:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Title: "Introducing SalaryLens: Our New Brand"
- Why we rebranded
- What's new
- What stays the same
- Future roadmap

Press Release (optional):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Send to tech blogs
- Post on ProductHunt
- Share on Hacker News
```

---

### **Step 22: Redirects Setup** (if changing domain)

```javascript
// next.config.js

async redirects() {
  return [
    // Redirect old domain
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: 'salarycalcvn.com',
        },
      ],
      destination: 'https://salarylens.com/:path*',
      permanent: true,
    },
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: 'www.salarycalcvn.com',
        },
      ],
      destination: 'https://salarylens.com/:path*',
      permanent: true,
    },
  ];
},
```

---

### **Step 23: Update External Services**

```
Services to Update:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Google Search Console
  - Add new property
  - Keep old property for redirects

□ Google Analytics
  - Update property name
  - Or create new property

□ Sentry (error tracking)
  - Update project name
  - Update DSN if needed

□ Third-party APIs
  - Update app names
  - Update callback URLs

□ CDN (if using)
  - Update domain whitelist
  - Clear cache

□ Email service
  - Update sender name
  - Update templates
```

---

## 🔄 AUTOMATED RENAME SCRIPT

### **Step 24: Create Rename Script**

```bash
#!/bin/bash
# scripts/rename-project.sh

echo "🔄 Starting SalaryLens rebrand..."

# 1. Backup
echo "📦 Creating backup..."
git add .
git commit -m "Backup before SalaryLens rebrand"
git push origin main

# 2. Find and replace
echo "🔍 Replacing references..."
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | \
  xargs sed -i '' 's/SalaryCalc VN/SalaryLens/g'

find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | \
  xargs sed -i '' 's/SalaryCalc/SalaryLens/g'

find . -type f -name "*.json" -o -name "*.md" | \
  xargs sed -i '' 's/salarycalc-vn/salarylens/g'

# 3. Update package.json
echo "📝 Updating package.json..."
npm pkg set name="salarylens"
npm pkg set description="Crystal clear salary insights for Vietnamese workers"
npm pkg set homepage="https://salarylens.com"

# 4. Commit changes
echo "💾 Committing changes..."
git add .
git commit -m "🎉 Rebrand to SalaryLens"

echo "✅ Rename complete! Please review changes before pushing."
```

Make executable:
```bash
chmod +x scripts/rename-project.sh
./scripts/rename-project.sh
```

---

## ✅ FINAL CHECKLIST

### **Complete Verification:**

```
Code:
□ All imports updated
□ All components renamed
□ All files updated
□ No broken references
□ Build successful
□ Tests passing

Configuration:
□ package.json updated
□ .env.local updated
□ next.config.js updated
□ tailwind.config.ts updated
□ tsconfig.json checked

Documentation:
□ README.md updated
□ CONTRIBUTING.md updated
□ CHANGELOG.md updated
□ All docs/*.md updated

Assets:
□ New logo created
□ Favicon updated
□ OG images updated
□ Manifest.json updated
□ All icons updated

Domain & Hosting:
□ Domain purchased
□ DNS configured
□ SSL active
□ Vercel updated
□ Redirects setup

External:
□ GitHub renamed
□ Social media updated
□ Analytics configured
□ Search Console updated
□ Email templates updated

Testing:
□ All pages load
□ All features work
□ Mobile responsive
□ SEO verified
□ Performance tested

Launch:
□ Production deployed
□ Announcement posted
□ Users notified
□ Blog post published
```

---

## 🎉 SUCCESS!

```
┌─────────────────────────────────────────┐
│  ✅ SALARYLENS REBRAND COMPLETE!        │
├─────────────────────────────────────────┤
│                                         │
│  Old Name: SalaryCalc VN                │
│  New Name: SalaryLens                   │
│                                         │
│  Old URL:  salarycalcvn.com             │
│  New URL:  salarylens.com               │
│                                         │
│  Tagline:  Crystal Clear Salary         │
│            Insights                     │
│                                         │
│  Status:   🚀 LIVE                      │
│                                         │
└─────────────────────────────────────────┘

Next Steps:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Monitor analytics
2. Watch for errors
3. Gather user feedback
4. Plan marketing campaign
5. Celebrate! 🎉
```

---

## 🆘 ROLLBACK PLAN

### **If Something Goes Wrong:**

```bash
# Option 1: Revert to backup branch
git checkout backup/salarycalc-vn
git push origin main --force

# Option 2: Revert specific commit
git revert <commit-hash>
git push origin main

# Option 3: Restore from backup
# Use your backup from Step 1

# Option 4: Manual fixes
# Fix specific issues one by one
# Test thoroughly before redeploying
```

---

## 📞 SUPPORT

```
Need Help?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Email: support@salarylens.com
- GitHub: github.com/yourusername/salarylens/issues
- Docs: salarylens.com/docs
```

---

**Document Complete! Ready to rename! 🚀**
