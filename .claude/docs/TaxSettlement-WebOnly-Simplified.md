# 🎯 QUYẾT TOÁN THUẾ - WEB-ONLY VERSION (SIMPLIFIED)

> Tài liệu implementation cho phiên bản Web đơn giản với Local Storage

---

## 📋 MỤC LỤC

1. [Tổng quan Simplified Version](#tổng-quan-simplified-version)
2. [Tech Stack đơn giản](#tech-stack-đơn-giản)
3. [Features Scope](#features-scope)
4. [UI/UX Wireframes](#uiux-wireframes)
5. [Data Structure (Local Storage)](#data-structure-local-storage)
6. [Implementation Plan](#implementation-plan)
7. [Code Examples](#code-examples)
8. [Testing](#testing)
9. [Deployment](#deployment)

---

## 🎯 TỔNG QUAN SIMPLIFIED VERSION

### **Scope Adjustment**

```
❌ KHÔNG CẦN:
- Mobile app
- External API integration (eTax, HR systems)
- Backend server
- Database (PostgreSQL)
- User authentication
- Multi-user/organization features
- Real-time sync
- File upload to cloud

✅ CẦN:
- Web app (Next.js)
- Local storage (browser)
- Static deployment
- Single-user mode
- Export to PDF/Excel
- Import from Excel (client-side)
- Offline-first
```

### **Use Cases**

```
PRIMARY USE CASE:
Cá nhân tự quyết toán thuế trên máy tính cá nhân
- Open web app trong browser
- Nhập thông tin thu nhập
- Tính toán thuế
- Export PDF để nộp
- Data lưu trong browser

SECONDARY USE CASE (Organization):
HR Manager dùng cho công ty nhỏ
- Import danh sách nhân viên từ Excel
- Tính toán batch
- Export PDF/Excel
- Data lưu local, có thể backup
```

### **Advantages of Local Storage Approach**

```
✅ Privacy: Data không rời máy user
✅ No Backend: Deploy static, chi phí thấp
✅ Offline: Hoạt động không cần internet
✅ Fast: Không có network latency
✅ Simple: Không cần authentication/authorization
✅ Free: Không có server costs
```

### **Limitations**

```
⚠️ Data loss nếu clear browser cache
⚠️ Không sync across devices
⚠️ Không share được với người khác
⚠️ Limited storage (5-10MB per domain)
⚠️ Không có audit trail
```

**Solution:** Provide export/import JSON để backup data

---

## 🛠️ TECH STACK ĐƠN GIẢN

### **Core Stack**

```typescript
Frontend:
- Next.js 15 (App Router) - Static Export
- React 19
- TypeScript 5.x

UI:
- Tailwind CSS
- shadcn/ui components
- Framer Motion (animations)
- Glass UI theme

State Management:
- Zustand (simple, no Redux)
- React Hook Form + Zod

Data Storage:
- LocalStorage (structured data)
- IndexedDB (large files, images)

Export/Import:
- jsPDF (PDF generation)
- xlsx (Excel import/export)
- FileSaver.js (download files)

Utilities:
- date-fns (date handling)
- numeral (number formatting)

Development:
- TypeScript
- ESLint + Prettier
- Vitest (testing)

Deployment:
- Vercel / Netlify (static hosting)
- CDN for assets
```

### **No Need For:**

```
❌ Database (PostgreSQL, MongoDB)
❌ Backend framework (Express, NestJS)
❌ Authentication (NextAuth, Clerk)
❌ API routes (Next.js API)
❌ ORM (Prisma, Drizzle)
❌ File upload services (S3, Cloudinary)
❌ Email services (SendGrid, SES)
❌ Payment gateway (Stripe, VNPay)
```

---

## ✨ FEATURES SCOPE

### **Phase 1: Individual Tax Settlement (MVP)**

```
┌─────────────────────────────────────────────────────┐
│  INDIVIDUAL FEATURES (Web Only)                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  1. ✅ Personal Information Form                    │
│     - Name, Tax Code, Year                         │
│     - Number of dependents                         │
│     - Save to LocalStorage                         │
│                                                     │
│  2. ✅ Income Input                                 │
│     - Single or multiple employers                 │
│     - Basic salary, bonus, allowances              │
│     - Insurance & tax withheld                     │
│     - Manual input only                            │
│                                                     │
│  3. ✅ Dependent Management                         │
│     - Add/edit/delete dependents                   │
│     - Name, Tax Code, Relationship                 │
│     - Store in LocalStorage                        │
│                                                     │
│  4. ✅ Tax Calculation Engine                       │
│     - 2026 5-tier progressive tax                  │
│     - All deductions                               │
│     - Real-time calculation                        │
│     - Client-side only                             │
│                                                     │
│  5. ✅ Results Display                              │
│     - Tax breakdown by tier                        │
│     - Settlement amount                            │
│     - Visual charts (Recharts)                     │
│     - Old vs new law comparison                    │
│                                                     │
│  6. ✅ PDF Export                                   │
│     - Generate Tờ khai 02/QTT-TNCN                 │
│     - Summary report                               │
│     - Download directly                            │
│     - jsPDF library                                │
│                                                     │
│  7. ✅ History Management                           │
│     - Save previous settlements                    │
│     - View/edit past settlements                   │
│     - Delete settlements                           │
│     - LocalStorage based                           │
│                                                     │
│  8. ✅ Data Backup                                  │
│     - Export all data to JSON                      │
│     - Import from JSON backup                      │
│     - Manual backup/restore                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### **Phase 2: Organization Features (Optional)**

```
┌─────────────────────────────────────────────────────┐
│  ORGANIZATION FEATURES (Web Only)                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  9. ✅ Excel Import                                 │
│     - Client-side Excel parsing (xlsx library)     │
│     - Template download                            │
│     - Validation errors display                    │
│     - No server upload                             │
│                                                     │
│  10. ✅ Employee List                               │
│      - Display imported employees                  │
│      - Filter/search                               │
│      - Edit individual records                     │
│      - Store in IndexedDB (large data)             │
│                                                     │
│  11. ✅ Batch Calculation                           │
│      - Process all employees                       │
│      - Progress indicator                          │
│      - Client-side processing                      │
│      - Web Workers for performance                 │
│                                                     │
│  12. ✅ Batch Export                                │
│      - Export all PDFs (ZIP file)                  │
│      - Export Excel summary                        │
│      - JSZip library                               │
│      - Download bundle                             │
│                                                     │
│  13. ✅ Dashboard                                   │
│      - Summary statistics                          │
│      - Charts & graphs                             │
│      - Department breakdown                        │
│      - Client-side aggregation                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### **Features NOT Included**

```
❌ User Authentication
❌ Cloud sync
❌ Multi-device sync
❌ Real-time collaboration
❌ eTax portal integration
❌ HR system integration
❌ OCR for payslips
❌ Mobile app
❌ Email notifications
❌ API endpoints
❌ Backend processing
❌ Database storage
❌ File upload to server
```

---

## 🎨 UI/UX WIREFRAMES

### **Screen 1: Home / Dashboard**

```
┌────────────────────────────────────────────────────────┐
│  SalaryCalc VN - Quyết Toán Thuế 2026                  │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │  🎯 Quyết Toán Thuế Thu Nhập Cá Nhân 2026        │ │
│  │                                                  │ │
│  │  📱 Web-only version - Dữ liệu lưu trên máy bạn │ │
│  │                                                  │ │
│  │  [🚀 Bắt đầu quyết toán mới]                    │ │
│  │                                                  │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ─────────────────────────────────────────────────    │
│                                                        │
│  📋 Quyết toán đã lưu (3)                              │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │  📅 Năm 2026 - Nguyễn Văn A                      │ │
│  │  Ngày tạo: 15/12/2024                            │ │
│  │  Kết quả: Được hoàn 500,000đ                     │ │
│  │  [Xem] [Sửa] [Xóa] [Export PDF]                 │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │  📅 Năm 2025 - Nguyễn Văn A                      │ │
│  │  ... (similar)                                   │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ─────────────────────────────────────────────────    │
│                                                        │
│  ⚙️ Công cụ                                            │
│  [💾 Backup dữ liệu] [📤 Import backup]              │
│  [🧑‍💼 Quyết toán cho tổ chức]                         │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### **Screen 2: Wizard - Step 1 (Personal Info)**

```
┌────────────────────────────────────────────────────────┐
│  ← Back                                         1/5    │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Bước 1: Thông tin cá nhân                             │
│  ●━━━○━━━○━━━○━━━○                                     │
│                                                        │
│  ─────────────────────────────────────────────────    │
│                                                        │
│  Họ và tên *                                           │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Nguyễn Văn A                                     │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  Mã số thuế (MST) *                                    │
│  ┌──────────────────────────────────────────────────┐ │
│  │ 8123456789                                       │ │
│  └──────────────────────────────────────────────────┘ │
│  ✅ Mã hợp lệ                                          │
│                                                        │
│  Năm quyết toán *                                      │
│  ┌──────────────────────────────────────────────────┐ │
│  │ 2026                                        [▼] │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  Số người phụ thuộc                                    │
│  ┌──────────────────────────────────────────────────┐ │
│  │ 2                                           [▼] │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  [+ Quản lý người phụ thuộc]                          │
│                                                        │
│  ─────────────────────────────────────────────────    │
│                                                        │
│  💾 Tự động lưu vào máy bạn                            │
│                                                        │
│  ─────────────────────────────────────────────────    │
│                                                        │
│                               [Hủy] [Tiếp tục →]      │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### **Screen 3: Results & Export**

```
┌────────────────────────────────────────────────────────┐
│  ← Sửa thông tin                                5/5    │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ✅ HOÀN THÀNH TÍNH TOÁN!                             │
│                                                        │
│  ╔══════════════════════════════════════════════════╗ │
│  ║  🎉 Bạn được hoàn thuế: 4,440,000đ              ║ │
│  ╚══════════════════════════════════════════════════╝ │
│                                                        │
│  ─────────────────────────────────────────────────    │
│                                                        │
│  📊 CHI TIẾT THUẾ                                      │
│                                                        │
│  Thu nhập:                     300,000,000đ           │
│  Giảm trừ:                     360,000,000đ           │
│  Thu nhập tính thuế:                     0đ           │
│  Thuế phải nộp:                          0đ           │
│  Thuế đã khấu trừ:               4,440,000đ           │
│  ════════════════════════════════════                 │
│  Được hoàn:                      4,440,000đ           │
│                                                        │
│  [Xem chi tiết breakdown →]                           │
│                                                        │
│  ─────────────────────────────────────────────────    │
│                                                        │
│  📥 EXPORT & LƯU                                       │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │  📄 Tờ khai 02/QTT-TNCN                          │ │
│  │  [📥 Tải PDF]                                    │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │  📊 Báo cáo tổng hợp                              │ │
│  │  [📥 Tải PDF]                                    │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │  💾 Backup dữ liệu                                │ │
│  │  [📥 Tải JSON] (để import sau)                   │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ─────────────────────────────────────────────────    │
│                                                        │
│  [💾 Lưu vào lịch sử] [🏠 Về trang chủ]               │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### **Screen 4: Organization - Import Excel**

```
┌────────────────────────────────────────────────────────┐
│  ← Dashboard                      Quyết toán tổ chức   │
├────────────────────────────────────────────────────────┤
│                                                        │
│  📤 IMPORT DANH SÁCH NHÂN VIÊN                         │
│                                                        │
│  ─────────────────────────────────────────────────    │
│                                                        │
│  Bước 1: Tải template                                  │
│  [📥 Download Template Excel]                         │
│                                                        │
│  Bước 2: Điền thông tin vào file Excel                 │
│  - Họ tên, MST, Lương, Thuế, ...                      │
│                                                        │
│  Bước 3: Upload file                                   │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │                                                  │ │
│  │           ☁️                                     │ │
│  │                                                  │ │
│  │      Kéo thả file Excel vào đây                  │ │
│  │      hoặc                                        │ │
│  │      [Chọn file từ máy tính]                    │ │
│  │                                                  │ │
│  │      Hỗ trợ: .xlsx, .xls                        │ │
│  │      ⚠️ File sẽ được xử lý ngay trên browser   │ │
│  │         không upload lên server                 │ │
│  │                                                  │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ─────────────────────────────────────────────────    │
│                                                        │
│  💡 Lưu ý:                                             │
│  • File được xử lý hoàn toàn trên máy bạn              │
│  • Dữ liệu không được gửi đi đâu                      │
│  • Lưu trong browser, có thể mất nếu xóa cache        │
│  • Nên export backup sau khi hoàn thành                │
│                                                        │
│  ─────────────────────────────────────────────────    │
│                                                        │
│                                      [Hủy] [Upload]   │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## 💾 DATA STRUCTURE (LOCAL STORAGE)

### **LocalStorage Structure**

```typescript
// LocalStorage Keys
const STORAGE_KEYS = {
  SETTLEMENTS: 'salarycalc_settlements',
  DEPENDENTS: 'salarycalc_dependents',
  EMPLOYEES: 'salarycalc_employees',
  APP_SETTINGS: 'salarycalc_settings',
  BACKUP_VERSION: 'salarycalc_backup_v1'
}

// Individual Settlement
interface TaxSettlement {
  id: string                    // UUID
  year: number                  // 2026
  createdAt: string             // ISO date
  updatedAt: string             // ISO date
  
  // Personal info
  personalInfo: {
    fullName: string
    taxCode: string
    dependentCount: number
  }
  
  // Income sources (array for multiple employers)
  income: IncomeSource[]
  
  // Dependents
  dependents: Dependent[]
  
  // Calculation result
  calculation: {
    totalIncome: number
    totalDeductions: number
    taxableIncome: number
    calculatedTax: number
    paidTax: number
    settlementAmount: number      // + hoàn, - nộp thêm
    breakdown: TaxBracketBreakdown[]
  }
  
  // Status
  status: 'draft' | 'completed'
}

interface IncomeSource {
  id: string
  companyName: string
  companyTaxCode?: string
  periodFrom: string              // "2026-01"
  periodTo: string                // "2026-12"
  monthsWorked: number            // 12
  basicSalary: number             // per month
  allowances: number              // total for year
  bonus: number                   // total for year
  insurancePaid: number           // total for year
  taxWithheld: number             // total for year
}

interface Dependent {
  id: string
  name: string
  taxCode: string
  relationship: 'child' | 'spouse' | 'parent'
  registeredFrom: string          // "2026-01-01"
  registeredTo?: string           // "2026-12-31" or null
}

interface TaxBracketBreakdown {
  tier: number                    // 1-5
  from: number                    // 0
  to: number | null               // 10M or null for tier 5
  rate: number                    // 5, 10, 20, 30, 35
  taxableAmount: number           // amount in this tier
  taxAmount: number               // tax for this tier
}

// Storage wrapper
class LocalStorageManager {
  // Save settlement
  saveSettlement(settlement: TaxSettlement): void {
    const settlements = this.getAllSettlements()
    const index = settlements.findIndex(s => s.id === settlement.id)
    
    if (index >= 0) {
      settlements[index] = settlement
    } else {
      settlements.push(settlement)
    }
    
    localStorage.setItem(
      STORAGE_KEYS.SETTLEMENTS, 
      JSON.stringify(settlements)
    )
  }
  
  // Get all settlements
  getAllSettlements(): TaxSettlement[] {
    const data = localStorage.getItem(STORAGE_KEYS.SETTLEMENTS)
    return data ? JSON.parse(data) : []
  }
  
  // Get settlement by ID
  getSettlement(id: string): TaxSettlement | null {
    const settlements = this.getAllSettlements()
    return settlements.find(s => s.id === id) || null
  }
  
  // Delete settlement
  deleteSettlement(id: string): void {
    const settlements = this.getAllSettlements()
    const filtered = settlements.filter(s => s.id !== id)
    localStorage.setItem(
      STORAGE_KEYS.SETTLEMENTS,
      JSON.stringify(filtered)
    )
  }
  
  // Export all data (backup)
  exportBackup(): string {
    const backup = {
      version: 1,
      exportedAt: new Date().toISOString(),
      settlements: this.getAllSettlements(),
      // ... other data
    }
    return JSON.stringify(backup, null, 2)
  }
  
  // Import backup
  importBackup(jsonString: string): void {
    const backup = JSON.parse(jsonString)
    // Validate version
    if (backup.version !== 1) {
      throw new Error('Incompatible backup version')
    }
    
    // Restore data
    localStorage.setItem(
      STORAGE_KEYS.SETTLEMENTS,
      JSON.stringify(backup.settlements)
    )
  }
  
  // Clear all data
  clearAll(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
  }
}
```

### **IndexedDB for Organization (Large Data)**

```typescript
// For organization features with 100+ employees
// IndexedDB provides better performance and larger storage

const DB_NAME = 'SalaryCalcDB'
const DB_VERSION = 1

interface OrgDatabase {
  employees: Employee[]
  settlements: EmployeeSettlement[]
}

interface Employee {
  id: string
  fullName: string
  taxCode: string
  employeeCode: string
  department?: string
  position?: string
  // ... other fields
}

interface EmployeeSettlement {
  id: string
  employeeId: string
  year: number
  // ... similar to individual settlement
}

class IndexedDBManager {
  private db: IDBDatabase | null = null
  
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        
        // Create stores
        if (!db.objectStoreNames.contains('employees')) {
          const employeeStore = db.createObjectStore('employees', { keyPath: 'id' })
          employeeStore.createIndex('taxCode', 'taxCode', { unique: true })
        }
        
        if (!db.objectStoreNames.contains('settlements')) {
          const settlementStore = db.createObjectStore('settlements', { keyPath: 'id' })
          settlementStore.createIndex('employeeId', 'employeeId')
          settlementStore.createIndex('year', 'year')
        }
      }
    })
  }
  
  async saveEmployee(employee: Employee): Promise<void> {
    const tx = this.db!.transaction('employees', 'readwrite')
    const store = tx.objectStore('employees')
    await store.put(employee)
  }
  
  async getAllEmployees(): Promise<Employee[]> {
    const tx = this.db!.transaction('employees', 'readonly')
    const store = tx.objectStore('employees')
    const request = store.getAll()
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }
  
  // ... other methods
}
```

---

## 🚀 IMPLEMENTATION PLAN

### **Timeline - 6 Weeks MVP**

```
Week 1: Setup & Foundation
├─ Project setup (Next.js 15, TypeScript)
├─ UI components (shadcn/ui)
├─ LocalStorage utilities
├─ Basic routing
└─ Glass UI theme

Week 2: Tax Engine
├─ Tax calculation logic (2026 law)
├─ Unit tests
├─ Validation functions
└─ Helper utilities

Week 3: Individual Settlement UI
├─ Wizard steps 1-5
├─ Forms with validation
├─ Real-time calculation
├─ Results display
└─ Charts

Week 4: Storage & History
├─ LocalStorage integration
├─ CRUD operations
├─ History list
├─ Edit/delete settlements
└─ Data persistence

Week 5: PDF Export
├─ jsPDF integration
├─ Generate Tờ khai 02/QTT-TNCN
├─ Summary report
├─ Styling & formatting
└─ Download functionality

Week 6: Polish & Launch
├─ Backup/restore feature
├─ Responsive design
├─ Error handling
├─ Testing
├─ Documentation
└─ Deploy to Vercel
```

### **Optional: Organization Features (Additional 2 weeks)**

```
Week 7: Organization Setup
├─ Excel template
├─ Client-side Excel parsing (xlsx)
├─ Employee list UI
├─ IndexedDB setup
└─ Batch calculation logic

Week 8: Batch Export & Polish
├─ Batch PDF generation (JSZip)
├─ Excel export
├─ Dashboard
├─ Testing
└─ Deploy
```

---

## 💻 CODE EXAMPLES

### **1. LocalStorage Hook**

```typescript
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [T, (value: T) => void] {
  // Get from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return initialValue
    }
  })
  
  // Save to localStorage whenever value changes
  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  }
  
  return [storedValue, setValue]
}

// Usage
const [settlements, setSettlements] = useLocalStorage<TaxSettlement[]>(
  'salarycalc_settlements',
  []
)
```

### **2. Tax Calculation (Client-Side)**

```typescript
// lib/tax-calculator-2026.ts

// Constants
const TAX_BRACKETS_2026 = [
  { tier: 1, from: 0, to: 10_000_000, rate: 0.05 },
  { tier: 2, from: 10_000_000, to: 30_000_000, rate: 0.10 },
  { tier: 3, from: 30_000_000, to: 52_000_000, rate: 0.20 },
  { tier: 4, from: 52_000_000, to: 100_000_000, rate: 0.30 },
  { tier: 5, from: 100_000_000, to: Infinity, rate: 0.35 },
]

const PERSONAL_DEDUCTION = 15_500_000 // per month
const DEPENDENT_DEDUCTION = 6_200_000 // per person per month
const INSURANCE_RATE = 0.105 // 10.5%
const INSURANCE_CAP = 36_000_000 // max salary for insurance

export function calculateProgressiveTax(
  monthlyTaxableIncome: number
): { 
  totalTax: number
  breakdown: TaxBracketBreakdown[]
} {
  if (monthlyTaxableIncome <= 0) {
    return { totalTax: 0, breakdown: [] }
  }
  
  let totalTax = 0
  const breakdown: TaxBracketBreakdown[] = []
  
  for (const bracket of TAX_BRACKETS_2026) {
    if (monthlyTaxableIncome <= bracket.from) break
    
    const taxableInBracket = Math.min(
      monthlyTaxableIncome - bracket.from,
      bracket.to - bracket.from
    )
    
    const taxInBracket = taxableInBracket * bracket.rate
    totalTax += taxInBracket
    
    breakdown.push({
      tier: bracket.tier,
      from: bracket.from,
      to: bracket.to === Infinity ? null : bracket.to,
      rate: bracket.rate * 100,
      taxableAmount: taxableInBracket,
      taxAmount: taxInBracket
    })
  }
  
  return { totalTax, breakdown }
}

export function calculateAnnualTax(input: {
  totalIncome: number           // Annual total income
  basicSalary: number            // Monthly basic salary (for insurance)
  monthsWorked: number           // Number of months
  dependentCount: number         // Number of dependents
  otherDeductions?: number       // Charity, voluntary insurance, etc.
}): TaxCalculationResult {
  const {
    totalIncome,
    basicSalary,
    monthsWorked,
    dependentCount,
    otherDeductions = 0
  } = input
  
  // Calculate insurance
  const monthlySalaryForInsurance = Math.min(basicSalary, INSURANCE_CAP)
  const annualInsurance = monthlySalaryForInsurance * INSURANCE_RATE * monthsWorked
  
  // Calculate deductions
  const personalDeduction = PERSONAL_DEDUCTION * monthsWorked
  const dependentDeduction = DEPENDENT_DEDUCTION * dependentCount * monthsWorked
  const totalDeductions = annualInsurance + personalDeduction + dependentDeduction + otherDeductions
  
  // Calculate taxable income
  const taxableIncome = Math.max(0, totalIncome - totalDeductions)
  
  // Calculate monthly taxable income for progressive tax
  const monthlyTaxableIncome = taxableIncome / 12
  
  // Calculate tax
  const { totalTax: monthlyTax, breakdown } = calculateProgressiveTax(monthlyTaxableIncome)
  const annualTax = monthlyTax * 12
  
  return {
    totalIncome,
    totalDeductions,
    breakdown: {
      insurance: annualInsurance,
      personal: personalDeduction,
      dependent: dependentDeduction,
      other: otherDeductions
    },
    taxableIncome,
    calculatedTax: annualTax,
    taxBreakdown: breakdown
  }
}
```

### **3. Zustand Store**

```typescript
// store/useSettlementStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettlementStore {
  settlements: TaxSettlement[]
  currentSettlement: TaxSettlement | null
  
  // Actions
  addSettlement: (settlement: TaxSettlement) => void
  updateSettlement: (id: string, updates: Partial<TaxSettlement>) => void
  deleteSettlement: (id: string) => void
  setCurrentSettlement: (settlement: TaxSettlement | null) => void
  clearAll: () => void
}

export const useSettlementStore = create<SettlementStore>()(
  persist(
    (set) => ({
      settlements: [],
      currentSettlement: null,
      
      addSettlement: (settlement) =>
        set((state) => ({
          settlements: [...state.settlements, settlement]
        })),
      
      updateSettlement: (id, updates) =>
        set((state) => ({
          settlements: state.settlements.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          )
        })),
      
      deleteSettlement: (id) =>
        set((state) => ({
          settlements: state.settlements.filter((s) => s.id !== id)
        })),
      
      setCurrentSettlement: (settlement) =>
        set({ currentSettlement: settlement }),
      
      clearAll: () =>
        set({ settlements: [], currentSettlement: null })
    }),
    {
      name: 'salarycalc-settlements', // localStorage key
    }
  )
)
```

### **4. PDF Export**

```typescript
// lib/pdf-generator.ts
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export function generateTaxDeclarationPDF(
  settlement: TaxSettlement
): void {
  const doc = new jsPDF()
  
  // Header
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('TỜ KHAI QUYẾT TOÁN THUẾ TNCN', 105, 20, { align: 'center' })
  doc.text('(Mẫu 02/QTT-TNCN)', 105, 28, { align: 'center' })
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Năm: ${settlement.year}`, 105, 36, { align: 'center' })
  
  // Personal Info
  let yPos = 50
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('I. THÔNG TIN NGƯỜI NỘP THUẾ', 20, yPos)
  
  yPos += 10
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Họ và tên: ${settlement.personalInfo.fullName}`, 20, yPos)
  
  yPos += 7
  doc.text(`Mã số thuế: ${settlement.personalInfo.taxCode}`, 20, yPos)
  
  yPos += 7
  doc.text(`Số người phụ thuộc: ${settlement.personalInfo.dependentCount}`, 20, yPos)
  
  // Income table
  yPos += 15
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('II. THU NHẬP', 20, yPos)
  
  yPos += 5
  doc.autoTable({
    startY: yPos,
    head: [['Nguồn thu nhập', 'Số tháng', 'Thu nhập']],
    body: settlement.income.map(inc => [
      inc.companyName,
      inc.monthsWorked,
      formatCurrency(inc.basicSalary * inc.monthsWorked + inc.allowances + inc.bonus)
    ]),
    foot: [['Tổng thu nhập', '', formatCurrency(settlement.calculation.totalIncome)]],
    theme: 'grid',
    styles: { font: 'helvetica', fontSize: 10 },
    headStyles: { fillColor: [66, 139, 202] },
    footStyles: { fillColor: [240, 240, 240], fontStyle: 'bold' }
  })
  
  // Deductions
  yPos = (doc as any).lastAutoTable.finalY + 15
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('III. CÁC KHOẢN GIẢM TRỪ', 20, yPos)
  
  yPos += 5
  const deductions = [
    ['Bảo hiểm bắt buộc', formatCurrency(settlement.calculation.totalDeductions)],
    ['Giảm trừ bản thân', formatCurrency(PERSONAL_DEDUCTION * 12)],
    [`Người phụ thuộc (${settlement.personalInfo.dependentCount})`, 
     formatCurrency(DEPENDENT_DEDUCTION * settlement.personalInfo.dependentCount * 12)],
  ]
  
  doc.autoTable({
    startY: yPos,
    body: deductions,
    foot: [['Tổng giảm trừ', formatCurrency(settlement.calculation.totalDeductions)]],
    theme: 'grid',
    styles: { fontSize: 10 },
    footStyles: { fillColor: [240, 240, 240], fontStyle: 'bold' }
  })
  
  // Tax calculation
  yPos = (doc as any).lastAutoTable.finalY + 15
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('IV. TÍNH THUẾ', 20, yPos)
  
  yPos += 5
  doc.autoTable({
    startY: yPos,
    head: [['Bậc thuế', 'Thu nhập tính thuế', 'Thuế suất', 'Thuế phải nộp']],
    body: settlement.calculation.breakdown.map(b => [
      `Bậc ${b.tier}`,
      formatCurrency(b.taxableAmount),
      `${b.rate}%`,
      formatCurrency(b.taxAmount)
    ]),
    foot: [['Tổng thuế', '', '', formatCurrency(settlement.calculation.calculatedTax)]],
    theme: 'grid',
    headStyles: { fillColor: [66, 139, 202] },
    footStyles: { fillColor: [240, 240, 240], fontStyle: 'bold' }
  })
  
  // Settlement
  yPos = (doc as any).lastAutoTable.finalY + 15
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('V. QUYẾT TOÁN', 20, yPos)
  
  yPos += 10
  doc.setFontSize(11)
  doc.text(`Thuế đã khấu trừ: ${formatCurrency(settlement.calculation.paidTax)}`, 20, yPos)
  
  yPos += 7
  doc.text(`Thuế phải nộp: ${formatCurrency(settlement.calculation.calculatedTax)}`, 20, yPos)
  
  yPos += 10
  doc.setFontSize(13)
  const isRefund = settlement.calculation.settlementAmount > 0
  doc.setTextColor(isRefund ? 0 : 255, isRefund ? 128 : 0, 0)
  doc.text(
    `${isRefund ? 'Được hoàn' : 'Phải nộp thêm'}: ${formatCurrency(Math.abs(settlement.calculation.settlementAmount))}`,
    20,
    yPos
  )
  
  // Signature
  yPos += 20
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(10)
  doc.text('Ngày ... tháng ... năm ...', 140, yPos)
  doc.text('Người khai thuế', 145, yPos + 7)
  doc.text('(Ký, ghi rõ họ tên)', 142, yPos + 14)
  
  // Download
  doc.save(`QuyetToan_${settlement.personalInfo.taxCode}_${settlement.year}.pdf`)
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}
```

### **5. Excel Import (Client-Side)**

```typescript
// lib/excel-importer.ts
import * as XLSX from 'xlsx'

export interface ExcelImportResult {
  success: boolean
  data: Employee[]
  errors: { row: number; message: string }[]
  warnings: { row: number; message: string }[]
}

export async function importEmployeesFromExcel(
  file: File
): Promise<ExcelImportResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: 'binary' })
        
        // Get first sheet
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        
        // Convert to JSON
        const json: any[] = XLSX.utils.sheet_to_json(worksheet)
        
        // Validate and parse
        const employees: Employee[] = []
        const errors: { row: number; message: string }[] = []
        const warnings: { row: number; message: string }[] = []
        
        json.forEach((row, index) => {
          const rowNum = index + 2 // +2 because Excel starts at 1 and has header
          
          // Validation
          if (!row['Họ và tên']) {
            errors.push({ row: rowNum, message: 'Thiếu họ tên' })
            return
          }
          
          if (!row['Mã số thuế']) {
            errors.push({ row: rowNum, message: 'Thiếu mã số thuế' })
            return
          }
          
          if (!row['Lương cơ bản']) {
            errors.push({ row: rowNum, message: 'Thiếu lương cơ bản' })
            return
          }
          
          // Parse employee
          const employee: Employee = {
            id: crypto.randomUUID(),
            fullName: row['Họ và tên'],
            taxCode: row['Mã số thuế'].toString(),
            employeeCode: row['Mã NV'] || '',
            department: row['Phòng ban'] || '',
            position: row['Vị trí'] || '',
            basicSalary: parseFloat(row['Lương cơ bản']),
            // ... other fields
          }
          
          // Warnings
          if (employee.basicSalary > 100_000_000) {
            warnings.push({
              row: rowNum,
              message: `Lương cơ bản ${employee.basicSalary} cao bất thường`
            })
          }
          
          employees.push(employee)
        })
        
        resolve({
          success: errors.length === 0,
          data: employees,
          errors,
          warnings
        })
      } catch (error) {
        reject(error)
      }
    }
    
    reader.onerror = reject
    reader.readAsBinaryString(file)
  })
}

// Generate template
export function downloadTemplate(): void {
  const template = [
    {
      'Họ và tên': 'Nguyễn Văn A',
      'Mã số thuế': '8123456789',
      'Mã NV': 'NV001',
      'Phòng ban': 'IT',
      'Vị trí': 'Developer',
      'Lương cơ bản': 20000000,
      'Thưởng': 60000000,
      'Bảo hiểm': 25200000,
      'Thuế đã khấu trừ': 4440000,
      'Số người phụ thuộc': 2
    }
  ]
  
  const ws = XLSX.utils.json_to_sheet(template)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Danh sách nhân viên')
  
  XLSX.writeFile(wb, 'Template_NhanVien.xlsx')
}
```

---

## ✅ TESTING

### **Unit Tests**

```typescript
// __tests__/tax-calculator.test.ts
import { describe, test, expect } from 'vitest'
import { calculateProgressiveTax, calculateAnnualTax } from '@/lib/tax-calculator-2026'

describe('Tax Calculator 2026', () => {
  describe('calculateProgressiveTax', () => {
    test('Tier 1: 5M/month income', () => {
      const result = calculateProgressiveTax(5_000_000)
      expect(result.totalTax).toBe(250_000) // 5M * 5%
      expect(result.breakdown).toHaveLength(1)
    })
    
    test('Tier 2: 20M/month income', () => {
      const result = calculateProgressiveTax(20_000_000)
      // Tier 1: 10M * 5% = 500K
      // Tier 2: 10M * 10% = 1M
      // Total: 1.5M
      expect(result.totalTax).toBe(1_500_000)
      expect(result.breakdown).toHaveLength(2)
    })
    
    test('Negative income returns 0 tax', () => {
      const result = calculateProgressiveTax(-1_000_000)
      expect(result.totalTax).toBe(0)
      expect(result.breakdown).toHaveLength(0)
    })
  })
  
  describe('calculateAnnualTax', () => {
    test('Standard case: 25M/month, 0 dependents', () => {
      const result = calculateAnnualTax({
        totalIncome: 300_000_000,
        basicSalary: 25_000_000,
        monthsWorked: 12,
        dependentCount: 0
      })
      
      expect(result.totalIncome).toBe(300_000_000)
      expect(result.calculatedTax).toBeGreaterThan(0)
    })
    
    test('With dependents reduces tax', () => {
      const withoutDependents = calculateAnnualTax({
        totalIncome: 300_000_000,
        basicSalary: 25_000_000,
        monthsWorked: 12,
        dependentCount: 0
      })
      
      const withDependents = calculateAnnualTax({
        totalIncome: 300_000_000,
        basicSalary: 25_000_000,
        monthsWorked: 12,
        dependentCount: 2
      })
      
      expect(withDependents.calculatedTax).toBeLessThan(withoutDependents.calculatedTax)
    })
  })
})
```

### **Component Tests**

```typescript
// __tests__/TaxWizard.test.tsx
import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TaxWizard from '@/components/TaxWizard'

describe('TaxWizard', () => {
  test('renders step 1 initially', () => {
    render(<TaxWizard />)
    expect(screen.getByText('Bước 1: Thông tin cá nhân')).toBeInTheDocument()
  })
  
  test('validates required fields', async () => {
    render(<TaxWizard />)
    
    const nextButton = screen.getByText('Tiếp tục')
    fireEvent.click(nextButton)
    
    expect(screen.getByText('Họ tên là bắt buộc')).toBeInTheDocument()
    expect(screen.getByText('Mã số thuế là bắt buộc')).toBeInTheDocument()
  })
  
  test('moves to next step when valid', async () => {
    render(<TaxWizard />)
    
    fireEvent.change(screen.getByLabelText('Họ và tên'), {
      target: { value: 'Nguyễn Văn A' }
    })
    fireEvent.change(screen.getByLabelText('Mã số thuế'), {
      target: { value: '8123456789' }
    })
    
    fireEvent.click(screen.getByText('Tiếp tục'))
    
    expect(screen.getByText('Bước 2: Thu nhập')).toBeInTheDocument()
  })
})
```

---

## 🚀 DEPLOYMENT

### **Next.js Static Export**

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export
  images: {
    unoptimized: true // Required for static export
  },
  // Optional: add base path if deploying to subdirectory
  // basePath: '/tax-calculator',
}

module.exports = nextConfig
```

### **Deploy to Vercel**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

### **Deploy to Netlify**

```bash
# Build
npm run build

# Netlify will automatically detect Next.js
# and deploy the /out directory
```

### **Environment Variables (Optional)**

```bash
# .env.local
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_NAME="SalaryCalc VN"
```

---

## 📊 SUMMARY

### **What We're Building**

```
✅ Web-only tax settlement calculator
✅ Individual + Organization features
✅ Local storage (no backend)
✅ Client-side processing
✅ PDF export
✅ Excel import/export
✅ Offline-capable
✅ Static deployment
```

### **Tech Stack**

```
Frontend: Next.js 15 + React + TypeScript
UI: Tailwind + shadcn/ui + Glass UI
State: Zustand + LocalStorage
Charts: Recharts
PDF: jsPDF
Excel: xlsx
Deploy: Vercel (static)
```

### **Timeline**

```
MVP (Individual): 4-5 weeks
Organization: +2 weeks
Total: 6-7 weeks
```

### **Storage Limits**

```
LocalStorage: ~5-10MB (enough for 100+ settlements)
IndexedDB: ~50MB-unlimited (for organization)
```

### **File Sizes**

```
Initial bundle: ~500KB (gzipped)
PDF per settlement: ~100KB
Excel export: ~50KB per 100 employees
```

---

## 🎉 NEXT STEPS

1. ✅ Review this simplified plan
2. ⏳ Create new Next.js project
3. ⏳ Setup UI components
4. ⏳ Implement tax engine
5. ⏳ Build wizard UI
6. ⏳ Add LocalStorage
7. ⏳ Implement PDF export
8. ⏳ Test & deploy!

---

**Có câu hỏi gì về version đơn giản này không?** 🚀
