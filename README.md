# 🎯 SalaryLens - Crystal Clear Salary Insights

> Công cụ tính lương thông minh với AI cho người lao động Việt Nam

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Library**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **Animation**: Framer Motion
- **Charts**: Recharts
- **PDF**: jsPDF + html2canvas
- **Package Manager**: pnpm

## 🗂️ Project Structure

```
salarylens/
├── app/                     # Next.js app directory
│   ├── calculator/         # Main calculator page
│   ├── comparison/         # Salary comparison
│   ├── history/           # Calculation history
│   └── api/               # API routes
├── components/
│   ├── ui/                # shadcn components
│   ├── calculator/        # Calculator components
│   ├── shared/            # Shared components
│   └── layout/            # Layout components
├── lib/
│   ├── calculations/      # Calculation logic
│   ├── constants/         # Constants (tax, insurance)
│   ├── validators/        # Zod schemas
│   └── storage/           # localStorage utilities
└── types/                 # TypeScript type definitions
```

## ✨ Features

- ✅ Calculate Gross → Net (actual salary)
- ✅ Calculate Net → Gross (salary negotiation)
- ✅ Detailed breakdown (insurance, tax, deductions)
- ✅ Visual charts (Pie chart, Bar chart)
- ✅ Comparison mode (compare multiple salaries)
- ✅ Export to PDF
- ✅ Calculation history (localStorage)
- ✅ Glass effect UI design
- ✅ Responsive design

## 📋 Development Status

### Phase 0: Setup & Configuration ✅ COMPLETED
- [x] Next.js 15 project initialized
- [x] shadcn/ui configured
- [x] All dependencies installed
- [x] Folder structure created
- [x] Type definitions defined
- [x] Constants configured
- [x] Glass effect styling added

### Phase 1: Core Calculator Logic & UI ✅ COMPLETED
- [x] Insurance calculator with proper capping
- [x] Tax calculator with progressive brackets
- [x] Gross to Net calculation
- [x] Net to Gross calculation (binary search)
- [x] Zod validation schema
- [x] GlassCard component with variants
- [x] AnimatedNumber component
- [x] SalaryInputForm component
- [x] ResultCard component with detailed breakdown
- [x] Calculator page with Framer Motion animations
- [x] Landing page with features overview

### Phase 2: Enhanced Features & Visualizations ✅ COMPLETED
- [x] TaxChart component (Pie chart with Recharts)
- [x] SalaryBreakdownChart component (Bar chart)
- [x] InsuranceBreakdown component with detailed info
- [x] Integrated all charts into calculator page
- [x] Toast notifications system
- [x] Skeleton loading states
- [x] Enhanced animations with Framer Motion
- [x] Mobile responsive design

### Phase 3: Advanced Features
- [ ] PDF export
- [ ] Calculation history
- [ ] Comparison mode
- [ ] What-if analysis

### Phase 4: Polish & Deploy
- [ ] Testing
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Deploy to Vercel

## 📚 Documentation

For detailed implementation guide, see the `.claude/docs` directory.

## 📝 License

MIT License - see LICENSE file for details

## 📧 Contact

- Website: [salarylens.com](https://salarylens.cc)
- Email: support@salarylens.com

---

Made with ❤️ by SalaryLens Team
