# 📊 Hướng Dẫn Chi Tiết: Thu Nhập & Thuế TNCN Việt Nam 2026

> Tài liệu kỹ thuật đầy đủ về cách tính lương, thuế thu nhập cá nhân theo luật mới 2026 - Bao gồm tháng 13, KPI, và các loại thưởng

**⚠️ CẬP NHẬT CHÍNH THỨC: Biểu Thuế 5 Bậc Mới 2026**

---

## 📑 MỤC LỤC

1. [Các Loại Thu Nhập](#1-các-loại-thu-nhập)
2. [Biểu Thuế TNCN 2026 - CHÍNH THỨC](#2-biểu-thuế-tncn-2026---chính-thức)
3. [Công Thức Tính GROSS → NET](#3-công-thức-tính-gross--net)
4. [Tính Thuế Tháng Bình Thường](#4-tính-thuế-tháng-bình-thường)
5. [Tính Thuế Tháng Nhận Thưởng](#5-tính-thuế-tháng-nhận-thưởng)
6. [So Sánh Mức Lũy Tiến](#6-so-sánh-mức-lũy-tiến)
7. [Ví Dụ Thực Tế](#7-ví-dụ-thực-tế)
8. [Implementation Code](#8-implementation-code)
9. [Edge Cases & Lưu Ý](#9-edge-cases--lưu-ý)

---

## 1. CÁC LOẠI THU NHẬP

### 1.1. Thu Nhập Chịu Thuế TNCN

```typescript
interface SalaryComponents {
  // ✅ CHỊU THUẾ - Cộng vào thu nhập chịu thuế
  basicSalary: number;           // Lương cơ bản
  positionAllowance: number;     // Phụ cấp chức vụ
  responsibilityAllowance: number; // Phụ cấp trách nhiệm
  housingAllowance: number;      // Phụ cấp nhà ở
  phoneAllowance: number;        // Phụ cấp điện thoại (phần vượt 1M/tháng)
  transportAllowance: number;    // Phụ cấp đi lại (phần vượt mức quy định)
  overtimePay: number;           // Tiền làm thêm giờ
  holidayPay: number;            // Tiền làm ngày lễ, Tết
  
  // THƯỞNG - Tất cả đều chịu thuế
  month13Salary: number;         // Lương tháng 13
  tetBonus: number;              // Thưởng Tết
  kpiBonus: number;              // Thưởng KPI/hiệu suất
  projectBonus: number;          // Thưởng dự án
  quarterlyBonus: number;        // Thưởng quý
  yearEndBonus: number;          // Thưởng cuối năm
  salesCommission: number;       // Hoa hồng bán hàng
  
  // CỔ PHIẾU/ESOP (nếu có)
  stockOptions: number;          // Cổ phiếu ưu đãi (chịu thuế riêng)
}
```

### 1.2. Thu Nhập KHÔNG Chịu Thuế (Miễn Thuế)

```typescript
interface TaxExemptIncome {
  // ❌ KHÔNG CHỊU THUẾ - Trong giới hạn quy định
  lunchAllowance: number;        // Tiền ăn trưa (≤ 730K/tháng)
  uniformAllowance: number;      // Phụ cấp trang phục (≤ 5M/năm)
  nightShiftAllowance: number;   // Phụ cấp ca đêm (theo quy định)
  hazardAllowance: number;       // Phụ cấp độc hại (theo quy định)
  
  // Chế độ phúc lợi
  childcareAllowance: number;    // Trợ cấp nuôi con nhỏ (≤ 200K/tháng/con)
  maternityAllowance: number;    // Trợ cấp thai sản (theo BHXH)
  
  // Khác
  severancePay: number;          // Trợ cấp thôi việc (theo luật)
  retirementPension: number;     // Lương hưu BHXH
}
```

### 1.3. Phân Loại Chi Tiết Các Loại Thưởng

| Loại Thưởng | Mô Tả | Thời Điểm Chi | Chịu Thuế? | Ghi Chú |
|-------------|-------|---------------|------------|---------|
| **Lương Tháng 13** | Thưởng cuối năm = 1 tháng lương | Tháng 12 hoặc 01 | ✅ Có | Cộng gộp vào tháng trả |
| **Thưởng Tết** | Thưởng dịp Tết Nguyên Đán | Tháng 12 hoặc 01 | ✅ Có | Có thể tách hoặc gộp với tháng 13 |
| **Thưởng KPI** | Dựa trên hiệu suất làm việc | Hàng tháng/quý/năm | ✅ Có | Thường trả cùng tháng làm việc |
| **Thưởng Dự Án** | Hoàn thành dự án | Khi kết thúc dự án | ✅ Có | Có thể rất lớn, dễ nhảy bậc |
| **Thưởng Quý** | Đánh giá theo quý | Cuối mỗi quý | ✅ Có | Q1, Q2, Q3, Q4 |
| **Hoa Hồng** | % doanh số bán hàng | Hàng tháng | ✅ Có | Biến động theo doanh số |
| **Thưởng Sáng Kiến** | Ý tưởng cải tiến | Không định kỳ | ✅ Có | Thường nhỏ (1-5M) |

---

## 2. BIỂU THUẾ TNCN 2026 - CHÍNH THỨC

### 2.1. Biểu Thuế Lũy Tiến Từng Phần (Mới 2026)

**⚠️ QUAN TRỌNG: Đây là biểu thuế chính thức từ Bộ Tài Chính**

| Bậc | Thu Nhập Tính Thuế/Năm | Thu Nhập Tính Thuế/Tháng | Thuế Suất | Công Thức Rút Gọn (Tháng) |
|-----|------------------------|-------------------------|-----------|---------------------------|
| **1** | Đến 120 triệu | Đến 10 triệu | **5%** | `Thu nhập × 5%` |
| **2** | Trên 120 - 360 triệu | Trên 10 - 30 triệu | **10%** | `Thu nhập × 10% - 500K` |
| **3** | Trên 360 - 720 triệu | Trên 30 - 60 triệu | **20%** | `Thu nhập × 20% - 3.5M` |
| **4** | Trên 720 triệu - 1.2 tỷ | Trên 60 - 100 triệu | **30%** | `Thu nhập × 30% - 9.5M` |
| **5** | Trên 1.2 tỷ | Trên 100 triệu | **35%** | `Thu nhập × 35% - 14.5M` |

### 2.2. Chi Tiết Tính Công Thức Rút Gọn

**Bậc 1 (≤ 10M):**
```
Thuế = Thu nhập × 5%
Ví dụ: 8M × 5% = 400K
```

**Bậc 2 (10M - 30M):**
```
Bậc 1: 10M × 5% = 500K
Bậc 2: (Thu nhập - 10M) × 10%
→ Công thức rút gọn: Thu nhập × 10% - 500K

Ví dụ: 20M × 10% - 500K = 1.5M
```

**Bậc 3 (30M - 60M):**
```
Bậc 1: 10M × 5% = 500K
Bậc 2: 20M × 10% = 2M
Bậc 3: (Thu nhập - 30M) × 20%
→ Công thức rút gọn: Thu nhập × 20% - 3.5M

Ví dụ: 45M × 20% - 3.5M = 5.5M
```

**Bậc 4 (60M - 100M):**
```
Bậc 1: 10M × 5% = 500K
Bậc 2: 20M × 10% = 2M
Bậc 3: 30M × 20% = 6M
Bậc 4: (Thu nhập - 60M) × 30%
→ Công thức rút gọn: Thu nhập × 30% - 9.5M

Ví dụ: 80M × 30% - 9.5M = 14.5M
```

**Bậc 5 (> 100M):**
```
Bậc 1: 10M × 5% = 500K
Bậc 2: 20M × 10% = 2M
Bậc 3: 30M × 20% = 6M
Bậc 4: 40M × 30% = 12M
Bậc 5: (Thu nhập - 100M) × 35%
→ Công thức rút gọn: Thu nhập × 35% - 14.5M

Ví dụ: 150M × 35% - 14.5M = 38M
```

### 2.3. Mức Giảm Trừ Gia Cảnh 2026

| Khoản Giảm Trừ | Cũ (2025) | Mới (2026) | Tăng |
|----------------|-----------|------------|------|
| **Bản thân** | 11,000,000đ | **15,500,000đ** | +4.5M (+41%) |
| **Người phụ thuộc** | 4,400,000đ | **6,200,000đ** | +1.8M (+41%) |

**Ví dụ:**
```
Gia đình 4 người: Vợ chồng + 2 con

Giảm trừ cũ (2025):
- Bản thân: 11M
- Vợ: 4.4M
- 2 con: 4.4M × 2 = 8.8M
→ Tổng: 24.2M/tháng

Giảm trừ mới (2026):
- Bản thân: 15.5M
- Vợ: 6.2M
- 2 con: 6.2M × 2 = 12.4M
→ Tổng: 34.1M/tháng

Tăng: +9.9M/tháng giảm trừ
```

### 2.4. Bảng So Sánh Nhanh: Biểu Cũ vs Mới

| Thu Nhập Tính Thuế | Biểu Cũ (2025) | Biểu Mới (2026) | Thay Đổi |
|-------------------|----------------|----------------|----------|
| 5M | 5% | 5% | Không đổi |
| 10M | 10% | 5% | ⬇️ Giảm 50% thuế |
| 20M | 15% | 10% | ⬇️ Giảm 33% thuế |
| 40M | 20% | 20% | ⬇️ Giảm 0% (nhưng do giảm trừ tăng) |
| 70M | 25% | 30% | ⬆️ Tăng 20% |
| 120M | 30% | 35% | ⬆️ Tăng 17% |

**💡 Insight:**
- Thu nhập THẤP (< 30M): **Giảm thuế đáng kể**
- Thu nhập TRUNG BÌNH (30M - 60M): **Giảm nhẹ** (do giảm trừ tăng)
- Thu nhập CAO (> 60M): **Tăng thuế** nhưng bù lại bởi giảm trừ cao hơn

---

## 3. CÔNG THỨC TÍNH GROSS → NET

### 3.1. Sơ Đồ Tổng Quan

```
GROSS (Tổng Thu Nhập)
    ↓
[-] Bảo hiểm bắt buộc (10.5%)
    = Thu Nhập Chịu Thuế
    ↓
[-] Giảm trừ gia cảnh
    = Thu Nhập Tính Thuế
    ↓
[×] Biểu thuế lũy tiến (5%-35%)
    = Thuế TNCN phải nộp
    ↓
GROSS - Bảo hiểm - Thuế = NET (Thực Nhận)
```

### 3.2. Công Thức Chi Tiết

#### Bước 1: Tính Bảo Hiểm Bắt Buộc

```typescript
// Bảo hiểm tính trên lương cơ bản (hoặc lương đóng BHXH)
const insuranceBase = Math.min(basicSalary, 36000000); // Trần 36M từ 2024

const insuranceDeductions = {
  socialInsurance: insuranceBase * 0.08,    // BHXH: 8%
  healthInsurance: insuranceBase * 0.015,   // BHYT: 1.5%
  unemploymentInsurance: insuranceBase * 0.01, // BHTN: 1%
  totalInsurance: insuranceBase * 0.105     // Tổng: 10.5%
};
```

**Lưu Ý:**
- Bảo hiểm chỉ tính trên **lương cơ bản**, KHÔNG tính trên thưởng
- Mức trần đóng BHXH: **36,000,000đ/tháng** (2024-2025)

#### Bước 2: Tính Thu Nhập Chịu Thuế

```typescript
// Tháng bình thường (KHÔNG có thưởng)
const taxableIncome = grossSalary - totalInsurance;

// Tháng CÓ thưởng
const taxableIncomeWithBonus = 
  grossSalary 
  + month13Salary      // Lương tháng 13
  + tetBonus           // Thưởng Tết
  + kpiBonus           // Thưởng KPI
  + projectBonus       // Thưởng dự án
  - totalInsurance;    // Trừ bảo hiểm
```

#### Bước 3: Tính Giảm Trừ Gia Cảnh (2026)

```typescript
const personalDeduction = 15500000; // Bản thân
const dependentDeduction = 6200000; // Mỗi người phụ thuộc

const totalDeduction = 
  personalDeduction 
  + (numberOfDependents * dependentDeduction);
```

#### Bước 4: Tính Thu Nhập Tính Thuế

```typescript
const taxableIncomeForPIT = Math.max(0, taxableIncome - totalDeduction);
```

#### Bước 5: Tính Thuế TNCN (Lũy Tiến Từng Phần)

**Phương Pháp 1: Tính Từng Bậc (Chuẩn Xác)**

```typescript
function calculatePITProgressive(taxableIncome: number): number {
  let tax = 0;
  
  if (taxableIncome <= 0) return 0;
  
  // Bậc 1: ≤ 10M (5%)
  if (taxableIncome > 0) {
    tax += Math.min(taxableIncome, 10000000) * 0.05;
  }
  
  // Bậc 2: 10M - 30M (10%)
  if (taxableIncome > 10000000) {
    tax += Math.min(taxableIncome - 10000000, 20000000) * 0.10;
  }
  
  // Bậc 3: 30M - 60M (20%)
  if (taxableIncome > 30000000) {
    tax += Math.min(taxableIncome - 30000000, 30000000) * 0.20;
  }
  
  // Bậc 4: 60M - 100M (30%)
  if (taxableIncome > 60000000) {
    tax += Math.min(taxableIncome - 60000000, 40000000) * 0.30;
  }
  
  // Bậc 5: > 100M (35%)
  if (taxableIncome > 100000000) {
    tax += (taxableIncome - 100000000) * 0.35;
  }
  
  return Math.round(tax);
}
```

**Phương Pháp 2: Công Thức Rút Gọn (Nhanh Hơn)**

```typescript
function calculatePITShortcut(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  
  if (taxableIncome <= 10000000) {
    // Bậc 1: 5%
    return Math.round(taxableIncome * 0.05);
  } else if (taxableIncome <= 30000000) {
    // Bậc 2: 10% - 500K
    return Math.round(taxableIncome * 0.10 - 500000);
  } else if (taxableIncome <= 60000000) {
    // Bậc 3: 20% - 3.5M
    return Math.round(taxableIncome * 0.20 - 3500000);
  } else if (taxableIncome <= 100000000) {
    // Bậc 4: 30% - 9.5M
    return Math.round(taxableIncome * 0.30 - 9500000);
  } else {
    // Bậc 5: 35% - 14.5M
    return Math.round(taxableIncome * 0.35 - 14500000);
  }
}
```

#### Bước 6: Tính Lương NET (Thực Nhận)

```typescript
const netSalary = grossSalary + bonuses - totalInsurance - pitTax;
```

### 3.3. Công Thức Tổng Hợp (All-in-One)

```typescript
interface SalaryCalculationResult {
  gross: number;
  insurance: {
    social: number;
    health: number;
    unemployment: number;
    total: number;
  };
  taxableIncome: number;
  deductions: {
    personal: number;
    dependents: number;
    total: number;
  };
  taxableIncomeForPIT: number;
  pitTax: number;
  netSalary: number;
  taxBracket: number; // Bậc thuế (1-5)
  effectiveTaxRate: number; // % thuế thực tế
}

function calculateSalary(
  grossSalary: number,
  basicSalary: number,
  bonuses: number = 0, // Tổng các khoản thưởng
  numberOfDependents: number = 0
): SalaryCalculationResult {
  
  // 1. Bảo hiểm
  const insuranceBase = Math.min(basicSalary, 36000000);
  const insurance = {
    social: insuranceBase * 0.08,
    health: insuranceBase * 0.015,
    unemployment: insuranceBase * 0.01,
    total: insuranceBase * 0.105
  };
  
  // 2. Thu nhập chịu thuế
  const taxableIncome = grossSalary + bonuses - insurance.total;
  
  // 3. Giảm trừ gia cảnh (2026)
  const deductions = {
    personal: 15500000,
    dependents: numberOfDependents * 6200000,
    total: 15500000 + (numberOfDependents * 6200000)
  };
  
  // 4. Thu nhập tính thuế
  const taxableIncomeForPIT = Math.max(0, taxableIncome - deductions.total);
  
  // 5. Thuế TNCN
  const pitTax = calculatePITProgressive(taxableIncomeForPIT);
  
  // 6. NET
  const netSalary = grossSalary + bonuses - insurance.total - pitTax;
  
  // 7. Bậc thuế
  const taxBracket = getTaxBracket(taxableIncomeForPIT);
  
  // 8. Thuế suất thực tế
  const effectiveTaxRate = grossSalary > 0 
    ? (pitTax / (grossSalary + bonuses)) * 100 
    : 0;
  
  return {
    gross: grossSalary + bonuses,
    insurance,
    taxableIncome,
    deductions,
    taxableIncomeForPIT,
    pitTax,
    netSalary,
    taxBracket,
    effectiveTaxRate
  };
}

function getTaxBracket(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  if (taxableIncome <= 10000000) return 1;
  if (taxableIncome <= 30000000) return 2;
  if (taxableIncome <= 60000000) return 3;
  if (taxableIncome <= 100000000) return 4;
  return 5;
}
```

---

## 4. TÍNH THUẾ THÁNG BÌNH THƯỜNG

### 4.1. Kịch Bản: Tháng Không Thưởng

**Input:**
```typescript
const employee = {
  grossSalary: 25000000,  // Lương gross
  basicSalary: 15000000,  // Lương cơ bản (để tính bảo hiểm)
  dependents: 2           // Vợ + 1 con
};
```

**Calculation:**

```typescript
// Bước 1: Bảo hiểm
const insuranceBase = Math.min(15000000, 36000000); // = 15M
const insurance = {
  social: 15000000 * 0.08 = 1200000,
  health: 15000000 * 0.015 = 225000,
  unemployment: 15000000 * 0.01 = 150000,
  total: 1575000
};

// Bước 2: Thu nhập chịu thuế
const taxableIncome = 25000000 - 1575000 = 23425000;

// Bước 3: Giảm trừ gia cảnh (2026)
const deduction = 15500000 + (2 * 6200000) = 27900000;

// Bước 4: Thu nhập tính thuế
const taxableIncomeForPIT = 23425000 - 27900000 = -4475000;
// → Âm, không phải nộp thuế

// Bước 5: Thuế TNCN
const pitTax = 0; // Do thu nhập tính thuế ≤ 0

// Bước 6: NET
const netSalary = 25000000 - 1575000 - 0 = 23425000;
```

**Kết Quả:**

```
┌─────────────────────────────────────────┐
│  THÁNG BÌNH THƯỜNG (Không Thưởng)       │
├─────────────────────────────────────────┤
│  Lương GROSS:           25,000,000đ     │
│                                         │
│  Bảo Hiểm (10.5%):                      │
│    - BHXH (8%):          1,200,000đ     │
│    - BHYT (1.5%):          225,000đ     │
│    - BHTN (1%):            150,000đ     │
│    - Tổng:               1,575,000đ     │
│                                         │
│  Thu nhập chịu thuế:    23,425,000đ     │
│                                         │
│  Giảm trừ gia cảnh:                     │
│    - Bản thân:          15,500,000đ     │
│    - 2 người p.thuộc:   12,400,000đ     │
│    - Tổng:              27,900,000đ     │
│                                         │
│  Thu nhập tính thuế:            0đ      │
│  Thuế TNCN:                     0đ      │
│                                         │
│  ═══════════════════════════════════    │
│  💰 LƯƠNG NET:          23,425,000đ     │
│  ═══════════════════════════════════    │
│                                         │
│  Bậc thuế: 0 (Không đủ chịu thuế)       │
│  % Thuế thực tế: 0.00%                  │
└─────────────────────────────────────────┘
```

---

## 5. TÍNH THUẾ THÁNG NHẬN THƯỞNG

### 5.1. Kịch Bản: Tháng 12 Nhận Lương + Tháng 13 + Thưởng Tết + KPI

**Input:**
```typescript
const employeeWithBonus = {
  grossSalary: 25000000,     // Lương tháng 12
  basicSalary: 15000000,     // Lương cơ bản
  bonuses: {
    month13: 25000000,       // Lương tháng 13
    tetBonus: 15000000,      // Thưởng Tết
    kpiBonus: 10000000       // Thưởng KPI năm
  },
  dependents: 2              // Vợ + 1 con
};
```

**Calculation:**

```typescript
// Bước 1: Bảo hiểm (chỉ tính trên lương cơ bản, KHÔNG tính trên thưởng)
const insurance = {
  total: 15000000 * 0.105 = 1575000
};

// Bước 2: Tổng thu nhập tháng này
const totalIncome = 25000000 + 25000000 + 15000000 + 10000000 = 75000000;

// Bước 3: Thu nhập chịu thuế
const taxableIncome = 75000000 - 1575000 = 73425000;

// Bước 4: Giảm trừ gia cảnh
const deduction = 15500000 + (2 * 6200000) = 27900000;

// Bước 5: Thu nhập tính thuế
const taxableIncomeForPIT = 73425000 - 27900000 = 45525000;

// Bước 6: Thuế TNCN (Bậc 3: 30M - 60M, thuế suất 20%)
// Công thức rút gọn: 45525000 × 20% - 3500000 = 5605000
const pitTax = 5605000;

// Chi tiết tính từng bậc:
/*
Bậc 1: 10M × 5% = 500,000
Bậc 2: 20M × 10% = 2,000,000
Bậc 3: 15,525,000 × 20% = 3,105,000
Tổng = 5,605,000
*/

// Bước 7: NET
const netSalary = 75000000 - 1575000 - 5605000 = 67820000;
```

**Kết Quả:**

```
┌─────────────────────────────────────────────────┐
│  THÁNG NHẬN THƯỞNG (Tháng 12/2026)              │
├─────────────────────────────────────────────────┤
│  Thu Nhập:                                      │
│    - Lương tháng 12:        25,000,000đ         │
│    - Lương tháng 13:        25,000,000đ         │
│    - Thưởng Tết:            15,000,000đ         │
│    - Thưởng KPI:            10,000,000đ         │
│  ─────────────────────────────────────          │
│  TỔNG GROSS:                75,000,000đ         │
│                                                 │
│  Bảo Hiểm (10.5%):           1,575,000đ         │
│  Thu nhập chịu thuế:        73,425,000đ         │
│                                                 │
│  Giảm trừ gia cảnh:         27,900,000đ         │
│  Thu nhập tính thuế:        45,525,000đ         │
│                                                 │
│  Thuế TNCN (Chi tiết):                          │
│    📊 Bậc 1 (10M × 5%):        500,000đ         │
│    📊 Bậc 2 (20M × 10%):     2,000,000đ         │
│    📊 Bậc 3 (15.5M × 20%):   3,105,000đ         │
│  ─────────────────────────────────────          │
│  💸 TỔNG THUẾ:               5,605,000đ         │
│                                                 │
│  ═══════════════════════════════════════        │
│  💰 LƯƠNG NET:              67,820,000đ         │
│  ═══════════════════════════════════════        │
│                                                 │
│  ⚠️  Bậc thuế: 3 (Thu nhập trung bình)          │
│  ⚠️  % Thuế thực tế: 7.47%                      │
│  ℹ️  Thuế tăng do nhận thưởng                   │
└─────────────────────────────────────────────────┘
```

### 5.2. So Sánh: Tháng Thường vs Tháng Thưởng

```
┌──────────────────────────┬─────────────────┬─────────────────┐
│        Chỉ Số            │  Tháng Thường   │  Tháng Thưởng   │
├──────────────────────────┼─────────────────┼─────────────────┤
│  Tổng GROSS              │   25,000,000đ   │   75,000,000đ   │
│  Bảo hiểm                │    1,575,000đ   │    1,575,000đ   │
│  Thu nhập chịu thuế      │   23,425,000đ   │   73,425,000đ   │
│  Giảm trừ gia cảnh       │   27,900,000đ   │   27,900,000đ   │
│  Thu nhập tính thuế      │            0đ   │   45,525,000đ   │
│  ──────────────────────────────────────────────────────────  │
│  Thuế TNCN               │            0đ   │    5,605,000đ   │
│  Bậc thuế                │            0    │            3    │
│  % Thuế thực tế          │         0.00%   │         7.47%   │
│  ──────────────────────────────────────────────────────────  │
│  💰 NET Thực Nhận        │   23,425,000đ   │   67,820,000đ   │
│  ──────────────────────────────────────────────────────────  │
│  📈 Chênh lệch           │      Baseline   │   +44,395,000đ  │
│  ⚠️  Thuế tăng thêm      │      Baseline   │   +5,605,000đ   │
└──────────────────────────┴─────────────────┴─────────────────┘
```

**Phân Tích:**
- Thu nhập tăng: **+50,000,000đ** (thưởng)
- Thuế tăng: **+5,605,000đ** (từ 0 → 5.6M)
- NET thực nhận tăng: **+44,395,000đ**
- **Hiệu quả:** Nhận được 88.8% giá trị thưởng sau thuế

---

## 6. SO SÁNH MỨC LŨY TIẾN

### 6.1. Kịch Bản: Cùng Thu Nhập Năm, Khác Cách Trả

**Tổng thu nhập năm: 300M (25M/tháng × 12 tháng)**

#### Phương Án A: Chia Đều 12 Tháng

```typescript
// Mỗi tháng: 25M
// Không có thưởng đột biến

Tháng 1-12: Mỗi tháng 25M
→ Thu nhập tính thuế: 0 (do giảm trừ 27.9M > 23.4M thu nhập)
→ Thuế TNCN/tháng: 0đ
→ Thuế TNCN năm: 0đ
```

#### Phương Án B: 11 Tháng Bình Thường + 1 Tháng Thưởng Lớn

```typescript
// Tháng 1-11: Mỗi tháng 20M (total: 220M)
// Tháng 12: 20M + 60M thưởng = 80M

Tháng 1-11:
- Thu nhập: 20M
- Thu nhập tính thuế: 0 (do giảm trừ > thu nhập)
- Thuế: 0đ × 11 = 0đ

Tháng 12:
- Thu nhập: 80M
- Thu nhập chịu thuế: 80M - 1.575M = 78.425M
- Thu nhập tính thuế: 78.425M - 27.9M = 50.525M
- Bậc 3 (30M-60M): 50.525M × 20% - 3.5M = 6,605,000đ

→ Thuế TNCN năm: 6,605,000đ
```

#### Phương Án C: Chia Thưởng Theo Quý

```typescript
// Mỗi tháng: 20M
// Cuối mỗi quý: Thưởng 15M

Tháng thường (8 tháng):
- Thu nhập: 20M
- Thuế: 0đ × 8 = 0đ

Tháng cuối quý (4 tháng):
- Thu nhập: 20M + 15M = 35M
- Thu nhập chịu thuế: 35M - 1.575M = 33.425M
- Thu nhập tính thuế: 33.425M - 27.9M = 5.525M
- Bậc 1 (≤10M): 5.525M × 5% = 276,250đ

→ Thuế TNCN năm: 276,250đ × 4 = 1,105,000đ
```

### 6.2. Bảng So Sánh Chi Tiết

```
┌─────────────────────┬───────────┬───────────┬───────────┐
│    Phương Án        │     A     │     B     │     C     │
│                     │  Đều Đặn  │ Thưởng Tập│Thưởng Quý │
│                     │           │   Trung   │           │
├─────────────────────┼───────────┼───────────┼───────────┤
│ Tổng Thu Nhập Năm   │   300M    │   300M    │   300M    │
│ ─────────────────────────────────────────────────────── │
│ Phân Bổ:            │           │           │           │
│  - Tháng thường     │ 25M × 12  │ 20M × 11  │ 20M × 12  │
│  - Thưởng           │    0      │ 60M (T12) │ 15M × 4   │
│ ─────────────────────────────────────────────────────── │
│ Bậc Thuế Cao Nhất   │    0      │    3      │    1      │
│ Bậc Thuế Thấp Nhất  │    0      │    0      │    0      │
│ ─────────────────────────────────────────────────────── │
│ Thuế TNCN Năm       │     0đ    │ 6,605,000 │ 1,105,000 │
│ % Thuế/Thu Nhập     │   0.00%   │   2.20%   │   0.37%   │
│ ─────────────────────────────────────────────────────── │
│ NET Thực Nhận Năm   │   281M    │   275M    │   280M    │
│ ─────────────────────────────────────────────────────── │
│ Chênh Lệch vs A     │ Baseline  │  -6.6M ❌ │  -1.1M ⚠️  │
│ Khuyến Nghị         │  ✅ Tốt   │  ❌ Tệ    │  ⚠️ OK    │
└─────────────────────┴───────────┴───────────┴───────────┘
```

### 6.3. Phân Tích & Kết Luận

**🎯 Nguyên Tắc Vàng:**
> "Thu nhập càng phân bổ đều → Thuế càng thấp"

**📊 Insight:**

1. **Phương Án A (Đều Đặn) - TỐT NHẤT ✅**
   - Không bị nhảy bậc thuế
   - Tận dụng tối đa giảm trừ gia cảnh mỗi tháng
   - Thuế = 0đ (do thu nhập không vượt giảm trừ)
   - **Lợi thế:** +6.6M so với phương án B

2. **Phương Án B (Tập Trung) - TỆ NHẤT ❌**
   - Nhảy lên bậc 3 (20%) trong tháng thưởng
   - Lãng phí giảm trừ gia cảnh 11 tháng (do thu nhập thấp)
   - Thuế = 6.6M
   - **Bất lợi:** Mất 6.6M so với phương án A

3. **Phương Án C (Theo Quý) - CHẤP NHẬN ĐƯỢC ⚠️**
   - Chỉ ở bậc 1 (5%)
   - Tận dụng được phần lớn giảm trừ
   - Thuế = 1.1M
   - **Trung bình:** Mất 1.1M so với A, nhưng tốt hơn B rất nhiều

**💡 Lời Khuyên Cho Người Lao Động:**

1. **Nếu được chọn:**
   - Đề nghị công ty chia thưởng theo quý hoặc tháng
   - Tránh nhận tất cả thưởng trong 1 tháng

2. **Nếu không được chọn:**
   - Hiểu rằng tháng nhận thưởng sẽ bị thuế cao bất thường
   - Số thuế thừa sẽ được hoàn lại khi quyết toán (tháng 3-4 năm sau)
   - Chuẩn bị tâm lý về số tiền thực nhận thấp hơn kỳ vọng

3. **Chiến Lược Tối Ưu:**
   ```
   Nếu công ty cho phép, đề xuất:
   
   Thay vì: Lương 20M + Thưởng 60M tháng 12
   → Tốt hơn: Lương 25M mỗi tháng (không thưởng riêng)
   → Hoặc: Thưởng 15M/quý (4 lần/năm)
   
   Tiết kiệm thuế: Lên đến 6.6M/năm!
   ```

---

## 7. VÍ DỤ THỰC TẾ

### 7.1. Case Study 1: Junior Developer (Lương Thấp)

**Profile:**
```typescript
{
  name: "Nguyễn Văn A",
  position: "Junior Developer",
  grossSalary: 15000000,     // 15M/tháng
  basicSalary: 10000000,     // 10M
  dependents: 0,             // Độc thân
  bonuses: {
    month13: 15000000,       // Tháng 13
    tetBonus: 5000000        // Thưởng Tết
  }
}
```

**Tháng Thường:**
```
Gross: 15,000,000đ
Bảo hiểm: 1,050,000đ (10M × 10.5%)
Thu nhập chịu thuế: 13,950,000đ
Giảm trừ: 15,500,000đ
Thu nhập tính thuế: 0đ (âm)
Thuế TNCN: 0đ
─────────────────────────
NET: 13,950,000đ

✅ Không phải đóng thuế
```

**Tháng Nhận Thưởng (Tháng 12):**
```
Gross: 15M + 15M + 5M = 35,000,000đ
Bảo hiểm: 1,050,000đ
Thu nhập chịu thuế: 33,950,000đ
Giảm trừ: 15,500,000đ
Thu nhập tính thuế: 18,450,000đ

Thuế TNCN (Bậc 2: 10M-30M):
18,450,000 × 10% - 500,000 = 1,345,000đ
─────────────────────────
NET: 32,605,000đ

⚠️ Phải đóng thuế 1.3M vì nhảy bậc
```

**Quyết Toán Năm:**
```
Tổng thu nhập năm: (15M × 12) + 20M thưởng = 200M
Giảm trừ cả năm: 15.5M × 12 = 186M
Bảo hiểm năm: 1.05M × 12 = 12.6M

Thu nhập tính thuế năm: 200M - 186M - 12.6M = 1.4M
Thuế phải nộp năm: 1.4M × 5% = 70,000đ

Đã nộp tháng 12: 1,345,000đ
→ Được hoàn thuế: 1,345,000 - 70,000 = 1,275,000đ
```

---

### 7.2. Case Study 2: Senior Developer (Lương Cao)

**Profile:**
```typescript
{
  name: "Trần Thị B",
  position: "Senior Developer",
  grossSalary: 50000000,     // 50M/tháng
  basicSalary: 30000000,     // 30M
  dependents: 3,             // Vợ/chồng + 2 con
  bonuses: {
    month13: 50000000,       // 50M
    tetBonus: 30000000,      // 30M
    kpiBonus: 20000000       // 20M
  }
}
```

**Tháng Thường:**
```
Gross: 50,000,000đ
Bảo hiểm: 3,150,000đ (30M × 10.5%)
Thu nhập chịu thuế: 46,850,000đ
Giảm trừ: 15.5M + (3 × 6.2M) = 34,100,000đ
Thu nhập tính thuế: 12,750,000đ

Thuế TNCN (Bậc 2: 10M-30M):
12,750,000 × 10% - 500,000 = 775,000đ
─────────────────────────
NET: 46,075,000đ

📊 Bậc 2 - Thuế 1.6%
```

**Tháng Nhận Thưởng (Tháng 12):**
```
Gross: 50M + 50M + 30M + 20M = 150,000,000đ
Bảo hiểm: 3,150,000đ
Thu nhập chịu thuế: 146,850,000đ
Giảm trừ: 34,100,000đ
Thu nhập tính thuế: 112,750,000đ

Thuế TNCN (Bậc 5: >100M):
112,750,000 × 35% - 14,500,000 = 24,962,500đ
─────────────────────────
NET: 121,887,500đ

⚠️ Bậc 5 - Thuế cao 16.6%!
```

**Phân Tích:**
```
┌──────────────────────────────────────────┐
│  PHÂN TÍCH THUẾ                          │
├──────────────────────────────────────────┤
│  Tổng Thưởng Nhận:    100,000,000đ       │
│  Thuế Tăng Thêm:       24,187,500đ       │
│  (24.96M - 0.775M)                       │
│                                          │
│  Thưởng Sau Thuế:      75,812,500đ       │
│  Hiệu Suất:            75.8%             │
│                                          │
│  ⚠️ Mất gần 24M tiền thuế do nhảy bậc!   │
└──────────────────────────────────────────┘
```

---

### 7.3. Case Study 3: Manager (Lương Rất Cao)

**Profile:**
```typescript
{
  name: "Lê Văn C",
  position: "Engineering Manager",
  grossSalary: 80000000,     // 80M/tháng
  basicSalary: 36000000,     // 36M (trần BHXH)
  dependents: 2,             // Vợ + 1 con
  bonuses: {
    month13: 80000000,       // 80M
    tetBonus: 50000000,      // 50M
    kpiBonus: 30000000,      // 30M
    projectBonus: 40000000   // 40M
  }
}
```

**Tháng Thường:**
```
Gross: 80,000,000đ
Bảo hiểm: 3,780,000đ (36M × 10.5%, trần)
Thu nhập chịu thuế: 76,220,000đ
Giảm trừ: 15.5M + (2 × 6.2M) = 27,900,000đ
Thu nhập tính thuế: 48,320,000đ

Thuế TNCN (Bậc 3: 30M-60M):
48,320,000 × 20% - 3,500,000 = 6,164,000đ
─────────────────────────
NET: 70,056,000đ

📊 Bậc 3 - Thuế 7.7%
```

**Tháng Nhận Thưởng (Tháng 12):**
```
Gross: 80M + 80M + 50M + 30M + 40M = 280,000,000đ
Bảo hiểm: 3,780,000đ
Thu nhập chịu thuế: 276,220,000đ
Giảm trừ: 27,900,000đ
Thu nhập tính thuế: 248,320,000đ

Thuế TNCN (Bậc 5: >100M):
248,320,000 × 35% - 14,500,000 = 72,412,000đ
─────────────────────────
NET: 203,808,000đ

⚠️ Thuế 72M trong tháng này!
```

**Insight:**
```
Với mức lương này:
- Thu nhập tính thuế đã ở Bậc 3 ngay cả tháng thường
- Tháng thưởng: Thuế = 25.9% tổng thu nhập
- Quyết toán năm: Vẫn phải nộp thuế cao

💡 Chiến lược:
1. Đề xuất chia thưởng theo quý (giảm nhảy bậc)
2. Tối ưu giảm trừ: Donate tối đa, đăng ký thêm người phụ thuộc
3. Cân nhắc các khoản đầu tư giảm thuế hợp pháp
```

---

## 8. IMPLEMENTATION CODE

### 8.1. TypeScript Interfaces

```typescript
// ============================================
// TYPE DEFINITIONS
// ============================================

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  hireDate: Date;
}

interface SalaryInput {
  // Lương cơ bản
  grossSalary: number;        // Tổng lương gross
  basicSalary: number;        // Lương cơ bản (tính bảo hiểm)
  
  // Phụ cấp
  allowances?: {
    position?: number;        // Phụ cấp chức vụ
    housing?: number;         // Phụ cấp nhà ở
    phone?: number;           // Phụ cấp điện thoại
    transport?: number;       // Phụ cấp đi lại
    lunch?: number;           // Tiền ăn trưa (miễn thuế ≤ 730K)
    other?: number;           // Phụ cấp khác
  };
  
  // Thưởng
  bonuses?: {
    month13?: number;         // Lương tháng 13
    tet?: number;             // Thưởng Tết
    kpi?: number;             // Thưởng KPI
    quarterly?: number;       // Thưởng quý
    project?: number;         // Thưởng dự án
    other?: number;           // Thưởng khác
  };
  
  // Người phụ thuộc
  numberOfDependents: number;
  
  // Tháng tính toán
  month: number;              // 1-12
  year: number;               // 2026+
}

interface InsuranceBreakdown {
  socialInsurance: number;      // BHXH 8%
  healthInsurance: number;      // BHYT 1.5%
  unemploymentInsurance: number; // BHTN 1%
  total: number;                // Tổng 10.5%
  base: number;                 // Lương tính bảo hiểm
}

interface DeductionBreakdown {
  personal: number;             // Giảm trừ bản thân (15.5M)
  dependents: number;           // Giảm trừ người phụ thuộc (6.2M/người)
  numberOfDependents: number;
  total: number;
}

interface TaxBreakdown {
  bracket1: number;             // Thuế bậc 1
  bracket2: number;             // Thuế bậc 2
  bracket3: number;             // Thuế bậc 3
  bracket4: number;             // Thuế bậc 4
  bracket5: number;             // Thuế bậc 5
  total: number;                // Tổng thuế
  effectiveRate: number;        // % thuế thực tế
  marginalRate: number;         // % thuế biên
}

interface SalaryCalculationResult {
  // Input
  employee?: Employee;
  month: number;
  year: number;
  
  // Thu nhập
  grossSalary: number;
  totalAllowances: number;
  totalBonuses: number;
  totalIncome: number;
  
  // Bảo hiểm
  insurance: InsuranceBreakdown;
  
  // Thu nhập chịu thuế
  taxableIncome: number;
  
  // Giảm trừ
  deductions: DeductionBreakdown;
  
  // Thu nhập tính thuế
  taxableIncomeForPIT: number;
  
  // Thuế
  tax: TaxBreakdown;
  taxBracket: number;           // 1-5
  
  // Kết quả
  netSalary: number;
  
  // Metadata
  isHighTaxMonth: boolean;      // Tháng thuế cao (có thưởng)
  comparedToNormalMonth?: {
    normalMonthNet: number;
    difference: number;
    percentIncrease: number;
  };
}

interface YearEndReconciliation {
  totalIncomeYear: number;
  totalInsuranceYear: number;
  totalDeductionsYear: number;
  taxableIncomeYear: number;
  taxDueYear: number;
  taxPaidYear: number;
  taxRefund: number;            // Dương = hoàn thuế, Âm = nộp thêm
}
```

### 8.2. Core Calculation Functions

```typescript
// ============================================
// CONSTANTS (2026)
// ============================================

const TAX_CONFIG_2026 = {
  personalDeduction: 15500000,      // 15.5M
  dependentDeduction: 6200000,      // 6.2M
  insuranceRates: {
    social: 0.08,                   // 8%
    health: 0.015,                  // 1.5%
    unemployment: 0.01,             // 1%
    total: 0.105                    // 10.5%
  },
  insuranceCeiling: 36000000,       // Trần 36M
  taxBrackets: [
    { min: 0, max: 10000000, rate: 0.05, deduction: 0 },
    { min: 10000000, max: 30000000, rate: 0.10, deduction: 500000 },
    { min: 30000000, max: 60000000, rate: 0.20, deduction: 3500000 },
    { min: 60000000, max: 100000000, rate: 0.30, deduction: 9500000 },
    { min: 100000000, max: Infinity, rate: 0.35, deduction: 14500000 }
  ],
  exemptAllowances: {
    lunch: 730000,                  // 730K/tháng
    uniform: 416667                 // 5M/năm ÷ 12
  }
};

// ============================================
// INSURANCE CALCULATION
// ============================================

function calculateInsurance(basicSalary: number): InsuranceBreakdown {
  const base = Math.min(basicSalary, TAX_CONFIG_2026.insuranceCeiling);
  const rates = TAX_CONFIG_2026.insuranceRates;
  
  return {
    base,
    socialInsurance: Math.round(base * rates.social),
    healthInsurance: Math.round(base * rates.health),
    unemploymentInsurance: Math.round(base * rates.unemployment),
    total: Math.round(base * rates.total)
  };
}

// ============================================
// DEDUCTION CALCULATION
// ============================================

function calculateDeductions(numberOfDependents: number): DeductionBreakdown {
  const personal = TAX_CONFIG_2026.personalDeduction;
  const dependents = numberOfDependents * TAX_CONFIG_2026.dependentDeduction;
  
  return {
    personal,
    dependents,
    numberOfDependents,
    total: personal + dependents
  };
}

// ============================================
// TAX CALCULATION (Progressive)
// ============================================

function calculatePIT(taxableIncome: number): TaxBreakdown {
  if (taxableIncome <= 0) {
    return {
      bracket1: 0,
      bracket2: 0,
      bracket3: 0,
      bracket4: 0,
      bracket5: 0,
      total: 0,
      effectiveRate: 0,
      marginalRate: 0
    };
  }
  
  const breakdown: TaxBreakdown = {
    bracket1: 0,
    bracket2: 0,
    bracket3: 0,
    bracket4: 0,
    bracket5: 0,
    total: 0,
    effectiveRate: 0,
    marginalRate: 0
  };
  
  let remaining = taxableIncome;
  let marginalRate = 0;
  
  // Bậc 1: 0 - 10M (5%)
  if (remaining > 0) {
    const taxable = Math.min(remaining, 10000000);
    breakdown.bracket1 = taxable * 0.05;
    remaining -= taxable;
    marginalRate = 0.05;
  }
  
  // Bậc 2: 10M - 30M (10%)
  if (remaining > 0) {
    const taxable = Math.min(remaining, 20000000);
    breakdown.bracket2 = taxable * 0.10;
    remaining -= taxable;
    marginalRate = 0.10;
  }
  
  // Bậc 3: 30M - 60M (20%)
  if (remaining > 0) {
    const taxable = Math.min(remaining, 30000000);
    breakdown.bracket3 = taxable * 0.20;
    remaining -= taxable;
    marginalRate = 0.20;
  }
  
  // Bậc 4: 60M - 100M (30%)
  if (remaining > 0) {
    const taxable = Math.min(remaining, 40000000);
    breakdown.bracket4 = taxable * 0.30;
    remaining -= taxable;
    marginalRate = 0.30;
  }
  
  // Bậc 5: > 100M (35%)
  if (remaining > 0) {
    breakdown.bracket5 = remaining * 0.35;
    marginalRate = 0.35;
  }
  
  breakdown.total = Math.round(
    breakdown.bracket1 + 
    breakdown.bracket2 + 
    breakdown.bracket3 + 
    breakdown.bracket4 + 
    breakdown.bracket5
  );
  
  breakdown.effectiveRate = taxableIncome > 0 
    ? (breakdown.total / taxableIncome) * 100 
    : 0;
  breakdown.marginalRate = marginalRate * 100;
  
  return breakdown;
}

// ============================================
// TAX CALCULATION (Shortcut Formula)
// ============================================

function calculatePITShortcut(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  
  if (taxableIncome <= 10000000) {
    // Bậc 1: 5%
    return Math.round(taxableIncome * 0.05);
  } else if (taxableIncome <= 30000000) {
    // Bậc 2: 10% - 500K
    return Math.round(taxableIncome * 0.10 - 500000);
  } else if (taxableIncome <= 60000000) {
    // Bậc 3: 20% - 3.5M
    return Math.round(taxableIncome * 0.20 - 3500000);
  } else if (taxableIncome <= 100000000) {
    // Bậc 4: 30% - 9.5M
    return Math.round(taxableIncome * 0.30 - 9500000);
  } else {
    // Bậc 5: 35% - 14.5M
    return Math.round(taxableIncome * 0.35 - 14500000);
  }
}

// ============================================
// DETERMINE TAX BRACKET
// ============================================

function getTaxBracket(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  if (taxableIncome <= 10000000) return 1;
  if (taxableIncome <= 30000000) return 2;
  if (taxableIncome <= 60000000) return 3;
  if (taxableIncome <= 100000000) return 4;
  return 5;
}

// ============================================
// MAIN SALARY CALCULATION
// ============================================

function calculateSalary(input: SalaryInput): SalaryCalculationResult {
  // 1. Tổng thu nhập
  const totalAllowances = Object.values(input.allowances || {})
    .reduce((sum, val) => sum + (val || 0), 0);
  
  const totalBonuses = Object.values(input.bonuses || {})
    .reduce((sum, val) => sum + (val || 0), 0);
  
  const totalIncome = input.grossSalary + totalAllowances + totalBonuses;
  
  // 2. Bảo hiểm
  const insurance = calculateInsurance(input.basicSalary);
  
  // 3. Thu nhập chịu thuế
  const taxableIncome = totalIncome - insurance.total;
  
  // 4. Giảm trừ gia cảnh
  const deductions = calculateDeductions(input.numberOfDependents);
  
  // 5. Thu nhập tính thuế
  const taxableIncomeForPIT = Math.max(0, taxableIncome - deductions.total);
  
  // 6. Thuế TNCN
  const tax = calculatePIT(taxableIncomeForPIT);
  const taxBracket = getTaxBracket(taxableIncomeForPIT);
  
  // 7. Lương NET
  const netSalary = totalIncome - insurance.total - tax.total;
  
  // 8. Kiểm tra tháng thuế cao
  const isHighTaxMonth = totalBonuses > 0 && taxBracket >= 3;
  
  return {
    month: input.month,
    year: input.year,
    grossSalary: input.grossSalary,
    totalAllowances,
    totalBonuses,
    totalIncome,
    insurance,
    taxableIncome,
    deductions,
    taxableIncomeForPIT,
    tax,
    taxBracket,
    netSalary,
    isHighTaxMonth
  };
}

// ============================================
// COMPARISON: NORMAL vs BONUS MONTH
// ============================================

function compareSalaryMonths(
  normalMonth: SalaryInput,
  bonusMonth: SalaryInput
): {
  normal: SalaryCalculationResult;
  bonus: SalaryCalculationResult;
  analysis: {
    incomeDifference: number;
    taxDifference: number;
    netDifference: number;
    taxImpactPercent: number;
  };
} {
  const normal = calculateSalary(normalMonth);
  const bonus = calculateSalary(bonusMonth);
  
  return {
    normal,
    bonus,
    analysis: {
      incomeDifference: bonus.totalIncome - normal.totalIncome,
      taxDifference: bonus.tax.total - normal.tax.total,
      netDifference: bonus.netSalary - normal.netSalary,
      taxImpactPercent: 
        ((bonus.tax.total - normal.tax.total) / (bonus.totalIncome - normal.totalIncome)) * 100
    }
  };
}

// ============================================
// YEAR-END RECONCILIATION
// ============================================

function calculateYearEndReconciliation(
  monthlyResults: SalaryCalculationResult[]
): YearEndReconciliation {
  const totalIncomeYear = monthlyResults.reduce(
    (sum, month) => sum + month.totalIncome, 0
  );
  
  const totalInsuranceYear = monthlyResults.reduce(
    (sum, month) => sum + month.insurance.total, 0
  );
  
  const totalDeductionsYear = monthlyResults.reduce(
    (sum, month) => sum + month.deductions.total, 0
  );
  
  const taxableIncomeYear = 
    totalIncomeYear - totalInsuranceYear - totalDeductionsYear;
  
  const taxDueYear = calculatePITShortcut(taxableIncomeYear);
  
  const taxPaidYear = monthlyResults.reduce(
    (sum, month) => sum + month.tax.total, 0
  );
  
  const taxRefund = taxPaidYear - taxDueYear;
  
  return {
    totalIncomeYear,
    totalInsuranceYear,
    totalDeductionsYear,
    taxableIncomeYear,
    taxDueYear,
    taxPaidYear,
    taxRefund
  };
}
```

### 8.3. Utility Functions

```typescript
// ============================================
// FORMATTING HELPERS
// ============================================

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(amount);
}

function formatPercent(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

// ============================================
// VALIDATION
// ============================================

function validateSalaryInput(input: SalaryInput): { 
  isValid: boolean; 
  errors: string[]; 
} {
  const errors: string[] = [];
  
  if (input.grossSalary < 0) {
    errors.push('Lương gross không thể âm');
  }
  
  if (input.basicSalary < 0) {
    errors.push('Lương cơ bản không thể âm');
  }
  
  if (input.basicSalary > input.grossSalary) {
    errors.push('Lương cơ bản không thể lớn hơn lương gross');
  }
  
  if (input.numberOfDependents < 0) {
    errors.push('Số người phụ thuộc không thể âm');
  }
  
  if (input.month < 1 || input.month > 12) {
    errors.push('Tháng phải từ 1-12');
  }
  
  if (input.year < 2026) {
    errors.push('Năm phải từ 2026 trở đi');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// ============================================
// DISPLAY HELPERS
// ============================================

function displaySalaryBreakdown(result: SalaryCalculationResult): string {
  return `
┌─────────────────────────────────────────┐
│  PHIẾU LƯƠNG THÁNG ${result.month}/${result.year}          │
├─────────────────────────────────────────┤
│  📊 THU NHẬP                            │
│  Lương GROSS:        ${formatCurrency(result.grossSalary).padStart(15)} │
│  Phụ cấp:            ${formatCurrency(result.totalAllowances).padStart(15)} │
│  Thưởng:             ${formatCurrency(result.totalBonuses).padStart(15)} │
│  ───────────────────────────────────    │
│  TỔNG THU NHẬP:      ${formatCurrency(result.totalIncome).padStart(15)} │
│                                         │
│  📉 KHẤU TRỪ                            │
│  Bảo hiểm:                              │
│    - BHXH (8%):      ${formatCurrency(result.insurance.socialInsurance).padStart(15)} │
│    - BHYT (1.5%):    ${formatCurrency(result.insurance.healthInsurance).padStart(15)} │
│    - BHTN (1%):      ${formatCurrency(result.insurance.unemploymentInsurance).padStart(15)} │
│    - Tổng:           ${formatCurrency(result.insurance.total).padStart(15)} │
│                                         │
│  Giảm trừ gia cảnh:                     │
│    - Bản thân:       ${formatCurrency(result.deductions.personal).padStart(15)} │
│    - ${result.deductions.numberOfDependents} người p.thuộc:  ${formatCurrency(result.deductions.dependents).padStart(15)} │
│    - Tổng:           ${formatCurrency(result.deductions.total).padStart(15)} │
│                                         │
│  💸 THUẾ TNCN                           │
│  Thu nhập tính thuế: ${formatCurrency(result.taxableIncomeForPIT).padStart(15)} │
│  Bậc thuế: ${result.taxBracket}        Thuế suất: ${formatPercent(result.tax.marginalRate)} │
│  Thuế phải nộp:      ${formatCurrency(result.tax.total).padStart(15)} │
│                                         │
│  ═══════════════════════════════════    │
│  💰 LƯƠNG NET:       ${formatCurrency(result.netSalary).padStart(15)} │
│  ═══════════════════════════════════    │
${result.isHighTaxMonth ? '│  ⚠️  Tháng thuế cao do nhận thưởng      │' : ''}
└─────────────────────────────────────────┘
  `.trim();
}
```

---

## 9. EDGE CASES & LƯU Ý

### 9.1. Các Tình Huống Đặc Biệt

#### A. Lương Cơ Bản Vượt Trần BHXH

```typescript
// Trường hợp: Lương cơ bản 50M
const input = {
  grossSalary: 50000000,
  basicSalary: 50000000,  // Vượt trần 36M
  // ...
};

// ⚠️ Lưu ý:
// - Bảo hiểm chỉ tính trên 36M (trần)
// - Thu nhập chịu thuế = 50M - (36M × 10.5%) = 46.22M
// - Phần 14M không được khấu trừ bảo hiểm
```

#### B. Nhân Viên Mới (Làm Không Đủ Tháng)

```typescript
// Trường hợp: Vào làm từ 15/06/2026
const salaryJune = {
  grossSalary: 25000000 * 0.5,  // 50% tháng
  basicSalary: 15000000 * 0.5,
  // ...
};

// ⚠️ Lưu ý:
// - Giảm trừ gia cảnh vẫn FULL tháng (15.5M)
// - Có thể không phải đóng thuế do thu nhập thấp
```

#### C. Nhận Nhiều Loại Thưởng Cùng Tháng

```typescript
const bonusesInDecember = {
  month13: 25000000,
  tetBonus: 15000000,
  kpiBonus: 10000000,
  projectBonus: 20000000,
  quarterBonus: 8000000
};
// Tổng thưởng: 78M

// ⚠️ Lưu ý:
// - TẤT CẢ đều cộng gộp vào thu nhập tháng 12
// - Rất dễ nhảy lên Bậc 4 hoặc 5
// - Khuyến nghị: Tách thưởng sang nhiều tháng
```

### 9.2. Lỗi Thường Gặp

#### ❌ Lỗi 1: Tính Bảo Hiểm Trên Gross

```typescript
// SAI ❌
const insurance = grossSalary * 0.105;

// ĐÚNG ✅
const insuranceBase = Math.min(basicSalary, 36000000);
const insurance = insuranceBase * 0.105;
```

#### ❌ Lỗi 2: Quên Giảm Trừ Gia Cảnh

```typescript
// SAI ❌
const taxableIncome = grossSalary - insurance;
const tax = calculatePIT(taxableIncome);

// ĐÚNG ✅
const taxableIncome = grossSalary - insurance;
const deduction = 15500000 + (dependents * 6200000);
const taxableIncomeForPIT = taxableIncome - deduction;
const tax = calculatePIT(taxableIncomeForPIT);
```

#### ❌ Lỗi 3: Dùng Biểu Thuế Cũ

```typescript
// SAI ❌ (Biểu cũ)
if (income > 18000000) {
  tax = income * 0.20 - 1650000; // Công thức cũ
}

// ĐÚNG ✅ (Biểu mới 2026)
if (income > 30000000 && income <= 60000000) {
  tax = income * 0.20 - 3500000; // Bậc 3 mới
}
```

### 9.3. Câu Hỏi Thường Gặp (FAQ)

**Q1: Tháng 13 có phải đóng bảo hiểm không?**
> KHÔNG. Bảo hiểm chỉ tính trên lương cơ bản hàng tháng, không tính trên thưởng.

**Q2: Thưởng Tết vào tháng 1/2026 có được hưởng giảm trừ mới không?**
> CÓ. Thuế tính theo thời điểm trả, nên thưởng tháng 1/2026 sẽ hưởng mức giảm trừ mới 15.5M.

**Q3: Nếu thuế tháng 12 cao, có được hoàn lại không?**
> CÓ. Khi quyết toán cuối năm (tháng 3-4 năm sau), nếu đóng thừa sẽ được hoàn.

**Q4: Có cách nào tránh nhảy bậc thuế không?**
> CÓ. Đề xuất công ty:
> - Chia thưởng theo quý thay vì một lần
> - Tăng lương cơ bản, giảm thưởng cuối năm
> - Chi thưởng vào tháng có thu nhập thấp

**Q5: Thu nhập bao nhiêu thì không phải đóng thuế?**
> - Với 0 người phụ thuộc: ≤ 15.5M (sau trừ bảo hiểm)
> - Với 1 người phụ thuộc: ≤ 21.7M
> - Với 2 người phụ thuộc: ≤ 27.9M
> - Với 3 người phụ thuộc: ≤ 34.1M

**Q6: Biểu thuế mới có lợi hơn biểu cũ không?**
> TÙY thu nhập:
> - Thu nhập THẤP (<30M): Lợi hơn nhiều
> - Thu nhập TRUNG BÌNH (30-60M): Lợi nhẹ
> - Thu nhập CAO (>100M): Bất lợi hơn (35% thay vì 30%)

---

## 10. KẾT LUẬN & KHUYẾN NGHỊ

### 10.1. Tóm Tắt Quan Trọng

**🎯 5 Điểm Cần Nhớ:**

1. **Biểu thuế mới 2026:**
   - 5 bậc: 5%, 10%, 20%, 30%, 35%
   - Ngưỡng cao hơn: Bậc 2 từ 10M (thay vì 5M)
   - Giảm trừ tăng 41%: 15.5M + 6.2M/người

2. **Tháng nhận thưởng:**
   - Thưởng được cộng gộp vào thu nhập tháng đó
   - Dễ nhảy bậc thuế → Thuế tăng đột biến
   - Sẽ được hoàn lại khi quyết toán (nếu thừa)

3. **Bảo hiểm:**
   - Chỉ tính trên lương cơ bản, KHÔNG tính trên thưởng
   - Trần: 36M/tháng

4. **Tối ưu thuế:**
   - Thu nhập càng đều → Thuế càng thấp
   - Chia thưởng theo quý thay vì một lần
   - Tận dụng giảm trừ mỗi tháng

5. **Impact của biểu mới:**
   - Lương thấp (<30M): Giảm thuế đáng kể
   - Lương cao (>100M): Tăng thuế (35% vs 30% cũ)

### 10.2. Checklist Cho Developers

Khi implement SalaryCalc VN:

- [ ] Sử dụng biểu thuế 2026 CHÍNH XÁC (5 bậc: 10M, 30M, 60M, 100M)
- [ ] Công thức rút gọn: -500K, -3.5M, -9.5M, -14.5M
- [ ] Giảm trừ gia cảnh: 15.5M + 6.2M/người
- [ ] Bảo hiểm: Tính trên `min(basicSalary, 36M)`
- [ ] Thưởng: Cộng gộp vào thu nhập tháng trả
- [ ] Validate input: Gross ≥ Basic, Dependents ≥ 0
- [ ] Format currency: VND không decimal
- [ ] Highlight tháng thuế cao (bậc ≥ 3)
- [ ] Cảnh báo nhảy bậc thuế
- [ ] Hỗ trợ so sánh tháng thường vs tháng thưởng
- [ ] Tính quyết toán năm
- [ ] Mobile responsive
- [ ] Export PDF phiếu lương

---

## PHỤ LỤC

### A. Bảng Thuế Nhanh (2026)

| Thu Nhập Tính Thuế | Bậc | Thuế Suất | Công Thức Rút Gọn | Ví Dụ Thuế |
|-------------------|-----|-----------|-------------------|------------|
| 5M | 1 | 5% | `x × 5%` | 250K |
| 15M | 2 | 10% | `x × 10% - 500K` | 1M |
| 40M | 3 | 20% | `x × 20% - 3.5M` | 4.5M |
| 80M | 4 | 30% | `x × 30% - 9.5M` | 14.5M |
| 150M | 5 | 35% | `x × 35% - 14.5M` | 38M |

### B. Ví Dụ Tính Nhanh

```typescript
// Thu nhập tính thuế 15M (Bậc 2)
15,000,000 × 10% - 500,000 = 1,000,000đ thuế

// Thu nhập tính thuế 40M (Bậc 3)
40,000,000 × 20% - 3,500,000 = 4,500,000đ thuế

// Thu nhập tính thuế 80M (Bậc 4)
80,000,000 × 30% - 9,500,000 = 14,500,000đ thuế

// Thu nhập tính thuế 150M (Bậc 5)
150,000,000 × 35% - 14,500,000 = 38,000,000đ thuế
```

---

**Document Version:** 2.0 - OFFICIAL TAX TABLE  
**Last Updated:** December 2024  
**Valid From:** January 1, 2026  
**Author:** SalaryCalc VN Team

---

*Tài liệu này được biên soạn dựa trên Biểu Thuế TNCN Chính Thức 2026 từ Bộ Tài Chính. Mọi thông tin chỉ mang tính chất tham khảo.*
