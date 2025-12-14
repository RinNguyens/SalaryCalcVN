import * as z from 'zod';

export const salaryFormSchema = z.object({
  salary: z.coerce
    .number()
    .min(1_000_000, 'Lương tối thiểu 1 triệu đồng')
    .max(500_000_000, 'Vui lòng kiểm tra lại số tiền'),

  dependents: z.coerce
    .number()
    .int('Số người phụ thuộc phải là số nguyên')
    .min(0, 'Số người phụ thuộc không thể âm')
    .max(20, 'Vui lòng kiểm tra lại số người phụ thuộc'),

  region: z.enum(['I', 'II', 'III', 'IV']),

  year: z.coerce
    .number()
    .int('Năm phải là số nguyên')
    .min(2025, 'Năm tính thuế tối thiểu là 2025')
    .max(2030, 'Năm tính thuế tối đa là 2030')
    .optional()
    .default(2026), // Default to 2026 for the new tax rates

  exemptions: z.coerce
    .number()
    .min(0, 'Các khoản miễn thuế không thể âm')
    .optional()
    .default(0),
});

export type SalaryFormValues = z.infer<typeof salaryFormSchema>;
