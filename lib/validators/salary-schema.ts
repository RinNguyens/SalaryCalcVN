import * as z from 'zod';

export const salaryFormSchema = z.object({
  salary: z
    .union([z.number(), z.string(), z.undefined()])
    .transform((val) => {
      if (val === '' || val === undefined || val === null) return 0;
      const num = typeof val === 'string' ? parseInt(val.replace(/[^\d]/g, '')) : val;
      return isNaN(num) ? 0 : num;
    })
    .refine((val) => val >= 1_000_000, {
      message: 'Lương tối thiểu 1 triệu đồng'
    })
    .refine((val) => val <= 500_000_000, {
      message: 'Vui lòng kiểm tra lại số tiền'
    }),

  dependents: z
    .union([z.number(), z.string()])
    .transform((val) => {
      if (val === '' || val === undefined || val === null) return 0;
      const num = typeof val === 'string' ? parseInt(val) : val;
      return isNaN(num) ? 0 : num;
    })
    .refine((val) => Number.isInteger(val), {
      message: 'Số người phụ thuộc phải là số nguyên'
    })
    .refine((val) => val >= 0, {
      message: 'Số người phụ thuộc không thể âm'
    })
    .refine((val) => val <= 20, {
      message: 'Vui lòng kiểm tra lại số người phụ thuộc'
    }),

  region: z.enum(['I', 'II', 'III', 'IV']),

  year: z.coerce
    .number()
    .int('Năm phải là số nguyên')
    .min(2025, 'Năm tính thuế tối thiểu là 2025')
    .max(2030, 'Năm tính thuế tối đa là 2030')
    .optional()
    .default(2026), // Default to 2026 for the new tax rates

  exemptions: z
    .union([z.number(), z.string()])
    .transform((val) => {
      if (val === '' || val === undefined || val === null) return 0;
      const num = typeof val === 'string' ? parseInt(val.replace(/[^\d]/g, '')) : val;
      return isNaN(num) ? 0 : num;
    })
    .refine((val) => val >= 0, {
      message: 'Các khoản miễn thuế không thể âm'
    }),
});

export type SalaryFormValues = z.infer<typeof salaryFormSchema>;
