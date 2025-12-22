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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Calendar,
  Gift,
  Target,
  TrendingUp,
  Award,
  DollarSign,
  Info,
  Calculator,
  PiggyBank,
  AlertTriangle
} from 'lucide-react';
import { z } from 'zod';
import { FormattedCurrencyInput } from '@/components/ui/formatted-currency-input';
import type { SalaryInput } from '@/types/salary';

const enhancedBonusFormSchema = z.object({
  // Basic bonuses
  month13Salary: z.number().min(0).optional(),
  tetBonus: z.number().min(0),
  kpiBonus: z.number().min(0),
  performanceBonus: z.number().min(0),

  // Additional bonuses from tax guide
  quarterlyBonus: z.number().min(0),
  projectBonus: z.number().min(0),
  salesCommission: z.number().min(0),

  // Distribution strategy
  distributionStrategy: z.enum(['even', 'concentrated', 'quarterly']),
});

type EnhancedBonusFormValues = z.infer<typeof enhancedBonusFormSchema> & {
  distributionStrategy: 'even' | 'concentrated' | 'quarterly';
};

interface EnhancedAnnualInputFormProps {
  monthlyInput: SalaryInput;
  monthlyNet: number;
  monthlyGross: number;
  onCalculate: (bonuses: EnhancedBonusFormValues) => void;
  isLoading?: boolean;
}

export function EnhancedAnnualInputForm({
  monthlyInput,
  monthlyNet,
  monthlyGross,
  onCalculate,
  isLoading = false,
}: EnhancedAnnualInputFormProps) {
  const form = useForm<EnhancedBonusFormValues>({
    resolver: zodResolver(enhancedBonusFormSchema),
    defaultValues: {
      month13Salary: monthlyGross,
      tetBonus: 0,
      kpiBonus: 0,
      performanceBonus: 0,
      quarterlyBonus: 0,
      projectBonus: 0,
      salesCommission: 0,
      distributionStrategy: 'concentrated',
    },
  });

  const watchedValues = form.watch();
  const totalBonuses = (watchedValues.month13Salary || 0) +
                      watchedValues.tetBonus +
                      watchedValues.kpiBonus +
                      watchedValues.performanceBonus +
                      watchedValues.quarterlyBonus +
                      watchedValues.projectBonus +
                      watchedValues.salesCommission;

  const onSubmit = (values: EnhancedBonusFormValues) => {
    onCalculate(values);
  };

  const bonusDescriptions = {
    month13Salary: {
      title: 'Lương tháng 13',
      description: 'Thưởng bằng 1 tháng lương, có đóng BHXH và chịu thuế TNCN bình thường',
      icon: Calendar,
      color: 'text-blue-600',
      tax: 'Thuế TNCN lũy tiến (5-35%)',
    },
    tetBonus: {
      title: 'Thưởng Tết',
      description: 'Thưởng dịp Tết Nguyên Đán, thường trả tháng 12 hoặc 1',
      icon: Gift,
      color: 'text-red-600',
      tax: 'Thuế TNCN lũy tiến (5-35%)',
    },
    kpiBonus: {
      title: 'Thưởng KPI',
      description: 'Thưởng theo chỉ số hiệu suất, có thể trả hàng tháng/quý/năm',
      icon: Target,
      color: 'text-orange-600',
      tax: 'Thuế TNCN lũy tiến (5-35%)',
    },
    performanceBonus: {
      title: 'Thưởng Hiệu Suất',
      description: 'Thưởng đánh giá cuối năm, dựa trên performance review',
      icon: TrendingUp,
      color: 'text-green-600',
      tax: 'Thuế TNCN lũy tiến (5-35%)',
    },
    quarterlyBonus: {
      title: 'Thưởng Quý',
      description: 'Thưởng hàng quý (Q1, Q2, Q3, Q4), giúp giảm thuế hơn',
      icon: Award,
      color: 'text-purple-600',
      tax: 'Thuế TNCN lũy tiến (5-35%)',
    },
    projectBonus: {
      title: 'Thưởng Dự Án',
      description: 'Thưởng hoàn thành dự án, có thể rất lớn',
      icon: Calculator,
      color: 'text-cyan-600',
      tax: 'Thuế TNCN lũy tiến (5-35%)',
    },
    salesCommission: {
      title: 'Hoa Hồng',
      description: '% doanh số bán hàng, biến động theo doanh thu',
      icon: DollarSign,
      color: 'text-yellow-600',
      tax: 'Thuế TNCN lũy tiến (5-35%)',
    },
  };

  type StrategyConfig = {
  title: string;
  description: string;
  color: string;
  benefit?: string;
  drawback?: string;
};

const strategyDescriptions: Record<'even' | 'concentrated' | 'quarterly', StrategyConfig> = {
    even: {
      title: 'Phân Bổ Đều (Tối Ưu)',
      description: 'Chia đều thưởng sang 12 tháng, thuế thấp nhất',
      benefit: 'Tiết kiệm đến 20% thuế so với tập trung',
      color: 'text-green-600 bg-green-50 border-green-200',
    },
    concentrated: {
      title: 'Tập Trung (Thường Xem)',
      description: 'Tất cả thưởng vào tháng 12, thuế cao nhất',
      drawback: 'Thuế tăng đột biến do nhảy bậc',
      color: 'text-red-600 bg-red-50 border-red-200',
    },
    quarterly: {
      title: 'Theo Quý (Hợp Lý)',
      description: 'Chia thưởng 4 lần/năm, cân bằng giữa thuế và cash flow',
      benefit: 'Giảm thuế 10-15% so với tập trung',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
  };

  return (
    <div className="space-y-6">
      {/* Current Salary Info */}
      <GlassCard variant="subtle" className="p-4">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <p className="text-black/60 text-xs mb-1">Lương Gross</p>
            <p className="text-lg font-semibold text-black">
              {new Intl.NumberFormat('vi-VN').format(monthlyGross)} VNĐ
            </p>
          </div>
          <div>
            <p className="text-black/60 text-xs mb-1">Lương Net</p>
            <p className="text-lg font-semibold text-green-600">
              {new Intl.NumberFormat('vi-VN').format(monthlyNet)} VNĐ
            </p>
          </div>
          <div>
            <p className="text-black/60 text-xs mb-1">Vùng</p>
            <Badge variant="secondary">Vùng {monthlyInput.region}</Badge>
          </div>
          <div>
            <p className="text-black/60 text-xs mb-1">Người phụ thuộc</p>
            <p className="text-lg font-semibold text-black">{monthlyInput.dependents}</p>
          </div>
        </div>
      </GlassCard>

      {/* Main Form */}
      <GlassCard variant="strong" className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-black mb-2">
            Phân Tích Thu Nhập Năm 2026
          </h3>
          <p className="text-black/80 text-sm">
            Nhập các khoản thưởng để phân tích thuế và tối ưu hóa thu nhập
          </p>
        </div>

        <Tabs defaultValue="bonuses" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="bonuses">Các Khoản Thưởng</TabsTrigger>
            <TabsTrigger value="strategy">Chiến Lược Phân Phối</TabsTrigger>
            <TabsTrigger value="summary">Tổng Kết</TabsTrigger>
          </TabsList>

          <TabsContent value="bonuses" className="space-y-4">
            <Form {...form}>
              <div className="space-y-6">
                {Object.entries(bonusDescriptions).map(([fieldName, config]) => (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as keyof EnhancedBonusFormValues}
                    render={({ field }) => {
                      const IconComponent = config.icon;
                      return (
                        <FormItem>
                          <FormLabel className="text-black flex items-center gap-2">
                            <IconComponent className={`h-4 w-4 ${config.color}`} />
                            {config.title}
                          </FormLabel>
                          <FormControl>
                            <FormattedCurrencyInput
                              value={field.value || 0}
                              onChange={(value) => field.onChange(value)}
                              placeholder="0"
                              className="bg-white/10 border-white/20 text-black border-slate-300"
                            />
                          </FormControl>
                          <FormDescription className="text-black/70">
                            {config.description}
                          </FormDescription>
                          <div className="flex items-center gap-2 text-xs text-orange-600">
                            <Info className="h-3 w-3" />
                            {config.tax}
                          </div>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
            </Form>
          </TabsContent>

          <TabsContent value="strategy" className="space-y-4">
            <FormField
              control={form.control}
              name="distributionStrategy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Chiến Lược Phân Phối Thưởng</FormLabel>
                  <div className="space-y-3">
                    {Object.entries(strategyDescriptions).map(([value, config]) => (
                      <Card
                        key={value}
                        className={`cursor-pointer transition-all ${
                          field.value === value
                            ? config.color + ' ring-2 ring-offset-2'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => field.onChange(value)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium flex items-center justify-between">
                            {config.title}
                            {field.value === value && (
                              <Badge variant="secondary" className="text-xs">Đã chọn</Badge>
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-xs text-black/70 mb-2">{config.description}</p>
                          {'benefit' in config && config.benefit && (
                            <Alert className="py-2">
                              <PiggyBank className="h-3 w-3" />
                              <AlertDescription className="text-xs">
                                {config.benefit}
                              </AlertDescription>
                            </Alert>
                          )}
                          {'drawback' in config && config.drawback && (
                            <Alert variant="destructive" className="py-2">
                              <AlertTriangle className="h-3 w-3" />
                              <AlertDescription className="text-xs">
                                {config.drawback}
                              </AlertDescription>
                            </Alert>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="summary" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Tổng Thu Nhập</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-black/70">Lương 12 tháng:</span>
                      <span className="font-medium">
                        {new Intl.NumberFormat('vi-VN').format(monthlyGross * 12)} VNĐ
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-black/70">Tổng thưởng:</span>
                      <span className="font-medium text-orange-600">
                        {new Intl.NumberFormat('vi-VN').format(totalBonuses)} VNĐ
                      </span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Tổng Gross năm:</span>
                      <span>
                        {new Intl.NumberFormat('vi-VN').format((monthlyGross * 12) + totalBonuses)} VNĐ
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Chiến Lược Tối Ưu</CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert className="mb-3">
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      <strong>Tip từ chuyên gia:</strong> Chia thưởng theo quý giúp giảm thuế 10-15%
                      và duy trì cash flow tốt hơn tập trung vào tháng 12.
                    </AlertDescription>
                  </Alert>
                  <div className="space-y-1 text-xs">
                    <p className="text-black/70">• Phân bổ đều: Thuế thấp nhất</p>
                    <p className="text-black/70">• Theo quý: Cân bằng tối ưu</p>
                    <p className="text-black/70">• Tập trung: Thuế cao nhất</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 mt-6"
          disabled={isLoading}
        >
          {isLoading ? 'Đang phân tích...' : 'Phân Tích Thu Nhập Năm'}
        </Button>
      </GlassCard>
    </div>
  );
}