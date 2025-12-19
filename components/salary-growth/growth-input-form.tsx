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
import { TrendingUp, Calendar, Briefcase, Target, DollarSign, UserCircle, Users, MapPin } from 'lucide-react';
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
    <GlassCard variant="strong" className="p-6 md:p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-black mb-2 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-blue-600" />
          Dự báo tăng trưởng lương
        </h3>
        <p className="text-black/70 text-sm">
          Xem dự phóng thu nhập trong 1-20 năm tới dựa trên tốc độ tăng trưởng mong muốn
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: Basic Information */}
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-base font-semibold text-black mb-1">Thông tin cơ bản</h4>
              <p className="text-xs text-black/60">Nhập thông tin lương và kinh nghiệm hiện tại</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Current Salary */}
              <FormField
                control={form.control}
                name="currentSalary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-medium flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                      Lương hiện tại (Gross/tháng)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="20,000,000"
                        className="bg-white/50 border-slate-300 text-black h-11 focus:border-blue-500 focus:ring-blue-500"
                        {...field}
                        value={field.value || ''}
                        onChange={(e) => {
                          const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormDescription className="text-black/60 text-xs">
                      Lương gross tháng hiện tại của bạn
                    </FormDescription>
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
                    <FormLabel className="text-black font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      Kinh nghiệm (năm)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="3"
                        className="bg-white/50 border-slate-300 text-black h-11 focus:border-blue-500 focus:ring-blue-500"
                        {...field}
                        value={field.value || ''}
                        onChange={(e) => {
                          const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormDescription className="text-black/60 text-xs">
                      Số năm kinh nghiệm làm việc của bạn
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Section 2: Growth Parameters */}
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="text-base font-semibold text-black mb-1">Thông số tăng trưởng</h4>
              <p className="text-xs text-black/60">Cấu hình mức tăng lương và thời gian dự báo</p>
            </div>

            <div className="space-y-6">
              {/* Annual Raise Slider */}
              <FormField
                control={form.control}
                name="annualRaise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-medium flex items-center justify-between mb-3">
                      <span className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-green-600" />
                        Tăng lương hàng năm
                      </span>
                      <Badge variant="success" className="text-sm px-3 py-1">
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
                        className="mt-4"
                      />
                    </FormControl>
                    <FormDescription className="text-black/60 text-xs mt-3">
                      Tỷ lệ tăng lương trung bình hàng năm (mặt bằng chung: 6-10%, xuất sắc: 15-20%)
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
                    <FormLabel className="text-black font-medium flex items-center justify-between mb-3">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-600" />
                        Dự báo trong
                      </span>
                      <Badge variant="completed" className="text-sm px-3 py-1">
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
                        className="mt-4"
                      />
                    </FormControl>
                    <FormDescription className="text-black/60 text-xs mt-3">
                      Số năm muốn dự báo tăng trưởng lương (khuyến nghị: 3-10 năm)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Section 3: Tax Information */}
          <div className="space-y-6">
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="text-base font-semibold text-black mb-1">Thông tin thuế</h4>
              <p className="text-xs text-black/60">Thông tin để tính toán thuế TNCN chính xác</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Dependents */}
              <FormField
                control={form.control}
                name="dependents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-medium flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      Người phụ thuộc
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className="bg-white/50 border-slate-300 text-black h-11 focus:border-purple-500 focus:ring-purple-500"
                        {...field}
                        value={field.value || ''}
                        onChange={(e) => {
                          const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormDescription className="text-black/60 text-xs">
                      Số người phụ thuộc (giảm trừ 6.2tr/người/tháng - Luật 2026)
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
                    <FormLabel className="text-black font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-purple-600" />
                      Vùng
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/50 border-slate-300 text-black h-11 focus:border-purple-500 focus:ring-purple-500">
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
                    <FormDescription className="text-black/60 text-xs">
                      Vùng theo quy định của Bảo hiểm xã hội
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Section 4: Career Information (Optional) */}
          <div className="space-y-6">
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="text-base font-semibold text-black mb-1">Thông tin nghề nghiệp (Tùy chọn)</h4>
              <p className="text-xs text-black/60">Giúp cung cấp insights phù hợp với ngành và vị trí</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Industry */}
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-medium flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-orange-600" />
                      Ngành nghề
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/50 border-slate-300 text-black h-11 focus:border-orange-500 focus:ring-orange-500">
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
                    <FormDescription className="text-black/60 text-xs">
                      Ngành nghề hiện tại (không bắt buộc)
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
                    <FormLabel className="text-black font-medium flex items-center gap-2">
                      <UserCircle className="h-4 w-4 text-orange-600" />
                      Vị trí
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/50 border-slate-300 text-black h-11 focus:border-orange-500 focus:ring-orange-500">
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
                    <FormDescription className="text-black/60 text-xs">
                      Vị trí công việc hiện tại (không bắt buộc)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Summary Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <h4 className="text-black font-bold text-lg">Tóm tắt dự báo</h4>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-white/60 rounded-lg">
                  <span className="text-black/70 font-medium min-w-[120px] text-sm">Năm bắt đầu:</span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-black font-semibold">
                      {new Date().getFullYear()}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {form.watch('yearsOfExperience')} năm kinh nghiệm
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-white/60 rounded-lg">
                  <span className="text-black/70 font-medium min-w-[120px] text-sm">Năm kết thúc:</span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-black font-semibold">
                      {new Date().getFullYear() + targetYears}
                    </span>
                    <Badge variant="completed" className="text-xs">
                      {form.watch('yearsOfExperience') + targetYears} năm kinh nghiệm
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-white/60 rounded-lg">
                  <span className="text-black/70 font-medium min-w-[120px] text-sm">Tăng trưởng:</span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-black font-bold text-lg text-green-600">
                      +{annualRaise}%
                    </span>
                    <span className="text-black/60 text-sm">
                      mỗi năm trong {targetYears} năm
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Đang tính toán dự báo...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Xem dự báo tăng trưởng lương
              </span>
            )}
          </Button>
        </form>
      </Form>
    </GlassCard>
  );
}