'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { GlassCard } from '@/components/shared/glass-card';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Gift, Target, TrendingUp } from 'lucide-react';
import { z } from 'zod';
import type { BonusInput } from '@/types/salary';

const bonusFormSchema = z.object({
  month13Salary: z.number().min(0).optional(),
  kpiBonus: z.number().min(0),
  performanceBonus: z.number().min(0),
  otherBonus: z.number().min(0),
});

type BonusFormValues = z.infer<typeof bonusFormSchema>;

interface AnnualInputFormProps {
  monthlySalary: number;
  dependents: number;
  region: 'I' | 'II' | 'III' | 'IV';
  onCalculate: (bonuses: BonusInput) => void;
  isLoading?: boolean;
}

export function AnnualInputForm({
  monthlySalary,
  dependents,
  region,
  onCalculate,
  isLoading = false,
}: AnnualInputFormProps) {
  const form = useForm<BonusFormValues>({
    resolver: zodResolver(bonusFormSchema),
    defaultValues: {
      month13Salary: monthlySalary,
      kpiBonus: 0,
      performanceBonus: 0,
      otherBonus: 0,
    },
  });

  const onSubmit = (values: BonusFormValues) => {
    // Convert string values to numbers
    const numericValues = {
      month13Salary: Number(values.month13Salary) || 0,
      kpiBonus: Number(values.kpiBonus) || 0,
      performanceBonus: Number(values.performanceBonus) || 0,
      otherBonus: Number(values.otherBonus) || 0,
    };
    onCalculate(numericValues);
  };

  return (
    <GlassCard variant="strong" className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          Thu nhập hàng năm
        </h3>
        <p className="text-white/80 text-sm">
          Thêm các khoản thưởng và bonus để tính tổng thu nhập năm
        </p>
      </div>

      <div className="grid gap-4 mb-6">
        {/* Salary Info Card */}
        <Card className="glass-subtle">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Lương tháng hiện tại</span>
              <span className="text-white font-mono font-semibold">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(monthlySalary)}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-white/70">Vùng</span>
              <Badge variant="secondary">Vùng {region}</Badge>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-white/70">Người phụ thuộc</span>
              <span className="text-white">{dependents}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Month 13 Salary */}
          <FormField
            control={form.control}
            name="month13Salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Lương tháng 13
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập lương tháng 13"
                    className="bg-white/10 border-white/20 text-white"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                  />
                </FormControl>
                <FormDescription className="text-white/70">
                  Mặc định bằng lương tháng thường, có BHXH và tính thuế bình thường
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* KPI Bonus */}
          <FormField
            control={form.control}
            name="kpiBonus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Thưởng KPI
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập thưởng KPI"
                    className="bg-white/10 border-white/20 text-white"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                  />
                </FormControl>
                <FormDescription className="text-white/70">
                  Thưởng theo KPI, chịu thuế 10% (không đóng BHXH)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Performance Bonus */}
          <FormField
            control={form.control}
            name="performanceBonus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Thưởng hiệu suất
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập thưởng hiệu suất"
                    className="bg-white/10 border-white/20 text-white"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                  />
                </FormControl>
                <FormDescription className="text-white/70">
                  Thưởng theo hiệu suất công việc, chịu thuế 10%
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Other Bonus */}
          <FormField
            control={form.control}
            name="otherBonus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  Thưởng khác
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập các khoản thưởng khác"
                    className="bg-white/10 border-white/20 text-white"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                  />
                </FormControl>
                <FormDescription className="text-white/70">
                  Các khoản thưởng khác (thưởng tháng 13 thêm, thưởng dự án...)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500"
            disabled={isLoading}
          >
            {isLoading ? 'Đang tính...' : 'Tính thu nhập năm'}
          </Button>
        </form>
      </Form>
    </GlassCard>
  );
}