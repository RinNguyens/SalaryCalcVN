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
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Calendar, Briefcase, Target } from 'lucide-react';
import { z } from 'zod';
import type { SalaryGrowthInput } from '@/types/salary';
import { REGIONS } from '@/lib/constants/tax-brackets';

const growthFormSchema = z.object({
  currentSalary: z.number().min(1000000, 'Lương phải lớn hơn 1 triệu'),
  yearsOfExperience: z.number().min(0).max(50),
  annualRaise: z.number().min(0).max(100),
  targetYears: z.number().min(1).max(30),
  dependents: z.number().min(0).max(20),
  region: z.enum(['I', 'II', 'III', 'IV']),
  industry: z.string().optional(),
  position: z.string().optional(),
});

type GrowthFormValues = z.infer<typeof growthFormSchema>;

const INDUSTRIES = [
  'IT/Software',
  'Finance/Banking',
  'Manufacturing',
  'Services',
  'Education',
  'Healthcare',
  'E-commerce',
  'Other',
];

const POSITIONS = [
  'Junior',
  'Middle/Regular',
  'Senior',
  'Lead/Team Lead',
  'Manager',
  'Director',
  'Other',
];

interface GrowthInputFormProps {
  onCalculate: (input: SalaryGrowthInput) => void;
  isLoading?: boolean;
  defaultValues?: Partial<SalaryGrowthInput>;
}

export function GrowthInputForm({
  onCalculate,
  isLoading = false,
  defaultValues,
}: GrowthInputFormProps) {
  const form = useForm<GrowthFormValues>({
    resolver: zodResolver(growthFormSchema),
    defaultValues: {
      currentSalary: 20000000,
      yearsOfExperience: 3,
      annualRaise: 8,
      targetYears: 5,
      dependents: 0,
      region: 'I',
      industry: 'none',
      position: 'none',
      ...defaultValues,
    },
  });

  const annualRaise = form.watch('annualRaise');
  const targetYears = form.watch('targetYears');

  const onSubmit = (values: GrowthFormValues) => {
    // Ensure all values are properly converted to numbers
    const numericValues: SalaryGrowthInput = {
      ...values,
      currentSalary: Number(values.currentSalary) || 0,
      yearsOfExperience: Number(values.yearsOfExperience) || 0,
      annualRaise: Number(values.annualRaise) || 0,
      targetYears: Number(values.targetYears) || 0,
      dependents: Number(values.dependents) || 0,
    };
    onCalculate(numericValues);
  };

  return (
    <GlassCard variant="strong" className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Dự báo tăng trưởng lương
        </h3>
        <p className="text-white/80 text-sm">
          Xem dự phóng thu nhập trong 1-10 năm tới
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Current Salary */}
            <FormField
              control={form.control}
              name="currentSalary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Lương hiện tại (Gross/tháng)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="20,000,000"
                      className="bg-white/10 border-white/20 text-white"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Years of Experience */}
            <FormField
              control={form.control}
              name="yearsOfExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Kinh nghiệm (năm)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="3"
                      className="bg-white/10 border-white/20 text-white"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription className="text-white/70">
                    Số năm kinh nghiệm làm việc
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Annual Raise Slider */}
          <FormField
            control={form.control}
            name="annualRaise"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Tăng lương hàng năm
                  </span>
                  <Badge variant="secondary" className="bg-white/20">
                    {annualRaise}%
                  </Badge>
                </FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={30}
                    step={1}
                    value={[annualRaise]}
                    onValueChange={(value) => field.onChange(value[0])}
                    className="mt-2"
                  />
                </FormControl>
                <FormDescription className="text-white/70">
                  Tỷ lệ tăng lương trung bình hàng năm (mặt bằng chung: 6-10%)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Target Years Slider */}
          <FormField
            control={form.control}
            name="targetYears"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white flex items-center justify-between">
                  <span>Dự báo trong</span>
                  <Badge variant="secondary" className="bg-white/20">
                    {targetYears} năm
                  </Badge>
                </FormLabel>
                <FormControl>
                  <Slider
                    min={1}
                    max={20}
                    step={1}
                    value={[targetYears]}
                    onValueChange={(value) => field.onChange(value[0])}
                    className="mt-2"
                  />
                </FormControl>
                <FormDescription className="text-white/70">
                  Số năm muốn dự báo tăng trưởng
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid md:grid-cols-2 gap-4">
            {/* Dependents */}
            <FormField
              control={form.control}
              name="dependents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Người phụ thuộc</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      className="bg-white/10 border-white/20 text-white"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription className="text-white/70">
                    Số người phụ thuộc (giảm trừ thuế)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Region */}
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
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Industry */}
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Ngành nghề
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Chọn ngành nghề" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">Không chọn</SelectItem>
                      {INDUSTRIES.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-white/70">
                    Ngành nghề của bạn (tùy chọn)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Position */}
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Vị trí</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Chọn vị trí" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">Không chọn</SelectItem>
                      {POSITIONS.map((position) => (
                        <SelectItem key={position} value={position}>
                          {position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-white/70">
                    Vị trí công việc hiện tại
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Quick Summary */}
          <Card className="glass-subtle">
            <CardContent className="p-4">
              <h4 className="text-white font-semibold mb-2">Tóm tắt dự báo</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/70">Năm bắt đầu:</span>
                  <span className="text-white ml-2">
                    {new Date().getFullYear()} (hiện tại {form.watch('yearsOfExperience')} năm Kinh nghiệm)
                  </span>
                </div>
                <div>
                  <span className="text-white/70">Năm kết thúc:</span>
                  <span className="text-white ml-2">
                    {new Date().getFullYear() + targetYears} (sau {targetYears} năm sẽ có {form.watch('yearsOfExperience') + targetYears} năm Kinh nghiệm)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
            disabled={isLoading}
          >
            {isLoading ? 'Đang dự báo...' : 'Dự báo tăng trưởng'}
          </Button>
        </form>
      </Form>
    </GlassCard>
  );
}