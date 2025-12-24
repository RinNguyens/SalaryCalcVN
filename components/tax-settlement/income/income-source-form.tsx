'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { MonthPicker } from '@/components/ui/month-picker';
import {
  incomeSourceSchema,
  type IncomeSourceFormData,
  calculateMonthsWorked,
} from '@/lib/validators/tax-settlement-schema';
import type { IncomeSource } from '@/types/tax-settlement';
import { useEffect } from 'react';

interface IncomeSourceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: IncomeSource) => void;
  initialData?: IncomeSource;
}

export default function IncomeSourceForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: IncomeSourceFormProps) {
  const form = useForm<IncomeSourceFormData>({
    resolver: zodResolver(incomeSourceSchema),
    defaultValues: {
      companyName: initialData?.companyName ?? '',
      companyTaxCode: initialData?.companyTaxCode ?? '',
      periodFrom: initialData?.periodFrom ?? '2026-01',
      periodTo: initialData?.periodTo ?? '2026-12',
      basicSalary: initialData?.basicSalary ?? undefined,
      allowances: initialData?.allowances ?? undefined,
      bonus: initialData?.bonus ?? undefined,
      otherIncome: initialData?.otherIncome ?? undefined,
      insurancePaid: initialData?.insurancePaid ?? undefined,
      taxWithheld: initialData?.taxWithheld ?? undefined,
    },
  });

  // Auto-calculate months worked when period changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'periodFrom' || name === 'periodTo') {
        if (value.periodFrom && value.periodTo) {
          const months = calculateMonthsWorked(value.periodFrom, value.periodTo);
          // Just informational, not setting a form field
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleSubmit = (values: IncomeSourceFormData) => {
    const monthsWorked = calculateMonthsWorked(values.periodFrom, values.periodTo);

    const incomeSource: IncomeSource = {
      id: initialData?.id || crypto.randomUUID(),
      companyName: values.companyName,
      companyTaxCode: values.companyTaxCode || undefined,
      periodFrom: values.periodFrom,
      periodTo: values.periodTo,
      monthsWorked,
      basicSalary: values.basicSalary ?? 0,
      allowances: values.allowances ?? 0,
      bonus: values.bonus ?? 0,
      otherIncome: values.otherIncome ?? 0,
      insurancePaid: values.insurancePaid ?? 0,
      taxWithheld: values.taxWithheld ?? 0,
    };

    onSubmit(incomeSource);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {initialData ? 'Chỉnh sửa nguồn thu nhập' : 'Thêm nguồn thu nhập'}
          </DialogTitle>
          <DialogDescription>
            Nhập thông tin thu nhập từ một công ty/đơn vị
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Company Name */}
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tên công ty <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Công ty TNHH ABC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Company Tax Code */}
            <FormField
              control={form.control}
              name="companyTaxCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã số thuế công ty (tùy chọn)</FormLabel>
                  <FormControl>
                    <Input placeholder="0123456789" maxLength={13} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Work Period */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="periodFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Từ tháng <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <MonthPicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Chọn tháng bắt đầu"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="periodTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Đến tháng <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <MonthPicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Chọn tháng kết thúc"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Basic Salary */}
            <FormField
              control={form.control}
              name="basicSalary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Lương cơ bản (tháng) <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="25000000"
                      value={field.value || ''}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === '' ? undefined : Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription>Lương cơ bản trung bình mỗi tháng</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Allowances, Bonus, Other Income */}
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="allowances"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phụ cấp (năm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        value={field.value || ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === '' ? undefined : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bonus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thưởng (năm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        value={field.value || ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === '' ? undefined : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="otherIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thu nhập khác</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        value={field.value || ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === '' ? undefined : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Insurance and Tax Withheld */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="insurancePaid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Bảo hiểm đã đóng <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        value={field.value || ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === '' ? undefined : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Tổng BHXH + BHYT + BHTN đã đóng
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="taxWithheld"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Thuế đã khấu trừ <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        value={field.value || ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === '' ? undefined : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Tổng thuế TNCN đã khấu trừ
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {initialData ? 'Cập nhật' : 'Thêm'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
