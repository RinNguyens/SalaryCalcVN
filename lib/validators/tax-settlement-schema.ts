import { z } from 'zod';

// Personal Information Schema
export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(100, 'Tên không được quá 100 ký tự'),
  taxCode: z
    .string()
    .regex(/^\d{10}(-\d{3})?$/, 'Mã số thuế không hợp lệ (10 chữ số)'),
  year: z
    .number()
    .int('Năm phải là số nguyên')
    .min(2026, 'Năm phải từ 2026 trở lên')
    .max(2030, 'Năm không được quá 2030'),
  dependentCount: z
    .number()
    .int('Số người phụ thuộc phải là số nguyên')
    .min(0, 'Số người phụ thuộc không được âm')
    .max(20, 'Số người phụ thuộc không được quá 20'),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

// Income Source Schema
export const incomeSourceSchema = z.object({
  companyName: z
    .string()
    .min(1, 'Tên công ty là bắt buộc')
    .max(200, 'Tên công ty không được quá 200 ký tự'),
  companyTaxCode: z
    .string()
    .regex(/^\d{10}(-\d{3})?$/, 'Mã số thuế công ty không hợp lệ')
    .optional()
    .or(z.literal('')),
  periodFrom: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Định dạng tháng không hợp lệ (YYYY-MM)'),
  periodTo: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Định dạng tháng không hợp lệ (YYYY-MM)'),
  basicSalary: z
    .number({ message: 'Lương cơ bản phải là số hợp lệ' })
    .min(0, 'Lương cơ bản không được âm')
    .max(1_000_000_000, 'Lương cơ bản không hợp lệ'),
  allowances: z
    .number({ message: 'Phụ cấp phải là số hợp lệ' })
    .min(0, 'Phụ cấp không được âm')
    .max(5_000_000_000, 'Phụ cấp không hợp lệ')
    .optional(),
  bonus: z
    .number({ message: 'Thưởng phải là số hợp lệ' })
    .min(0, 'Thưởng không được âm')
    .max(5_000_000_000, 'Thưởng không hợp lệ')
    .optional(),
  otherIncome: z
    .number({ message: 'Thu nhập khác phải là số hợp lệ' })
    .min(0, 'Thu nhập khác không được âm')
    .max(5_000_000_000, 'Thu nhập khác không hợp lệ')
    .optional(),
  insurancePaid: z
    .number({ message: 'Bảo hiểm đã đóng phải là số hợp lệ' })
    .min(0, 'Bảo hiểm đã đóng không được âm')
    .max(100_000_000, 'Bảo hiểm không hợp lệ'),
  taxWithheld: z
    .number({ message: 'Thuế đã khấu trừ phải là số hợp lệ' })
    .min(0, 'Thuế đã khấu trừ không được âm')
    .max(1_000_000_000, 'Thuế không hợp lệ'),
}).refine(
  (data) => {
    // Validate that periodTo is after or equal to periodFrom
    const from = new Date(data.periodFrom + '-01');
    const to = new Date(data.periodTo + '-01');
    return to >= from;
  },
  {
    message: 'Thời gian kết thúc phải sau hoặc bằng thời gian bắt đầu',
    path: ['periodTo'],
  }
);

export type IncomeSourceFormData = z.infer<typeof incomeSourceSchema>;

// Dependent Schema
export const dependentSchema = z.object({
  name: z
    .string()
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(100, 'Tên không được quá 100 ký tự'),
  taxCode: z
    .string()
    .regex(/^\d{10}(-\d{3})?$/, 'Mã số thuế không hợp lệ (10 chữ số)'),
  relationship: z.enum(['child', 'spouse', 'parent', 'sibling', 'other'], {
    message: 'Vui lòng chọn mối quan hệ',
  }),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Định dạng ngày sinh không hợp lệ (YYYY-MM-DD)')
    .optional()
    .or(z.literal('')),
  registeredFrom: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Định dạng ngày đăng ký không hợp lệ (YYYY-MM-DD)'),
  registeredTo: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Định dạng ngày kết thúc không hợp lệ (YYYY-MM-DD)')
    .optional()
    .or(z.literal('')),
}).refine(
  (data) => {
    // If registeredTo is provided, it must be after registeredFrom
    if (data.registeredTo && data.registeredTo !== '') {
      const from = new Date(data.registeredFrom);
      const to = new Date(data.registeredTo);
      return to >= from;
    }
    return true;
  },
  {
    message: 'Ngày kết thúc phải sau hoặc bằng ngày bắt đầu',
    path: ['registeredTo'],
  }
);

export type DependentFormData = z.infer<typeof dependentSchema>;

// Helper function to calculate months worked from period
export function calculateMonthsWorked(periodFrom: string, periodTo: string): number {
  const from = new Date(periodFrom + '-01');
  const to = new Date(periodTo + '-01');

  const yearDiff = to.getFullYear() - from.getFullYear();
  const monthDiff = to.getMonth() - from.getMonth();

  return yearDiff * 12 + monthDiff + 1; // +1 to include both start and end months
}

// Helper function to calculate months registered for dependent
export function calculateMonthsRegistered(
  registeredFrom: string,
  registeredTo: string | undefined,
  taxYear: number
): number {
  const yearStart = new Date(taxYear, 0, 1); // January 1st of tax year
  const yearEnd = new Date(taxYear, 11, 31); // December 31st of tax year

  const from = new Date(registeredFrom);
  const to = registeredTo ? new Date(registeredTo) : yearEnd;

  // Clamp dates to tax year
  const effectiveFrom = from < yearStart ? yearStart : from;
  const effectiveTo = to > yearEnd ? yearEnd : to;

  // If outside tax year, return 0
  if (effectiveFrom > yearEnd || effectiveTo < yearStart) {
    return 0;
  }

  const yearDiff = effectiveTo.getFullYear() - effectiveFrom.getFullYear();
  const monthDiff = effectiveTo.getMonth() - effectiveFrom.getMonth();

  return Math.max(0, yearDiff * 12 + monthDiff + 1);
}
