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
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Calendar,
  Gift,
  Target,
  TrendingUp,
  Award,
  Calculator,
  PiggyBank,
  AlertTriangle,
  Info,
  ChevronRight,
  DollarSign
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
  quarterlyBonus: z.number().min(0),
  projectBonus: z.number().min(0),
  salesCommission: z.number().min(0),
  distributionStrategy: z.enum(['even', 'concentrated', 'quarterly']),
});

type EnhancedBonusFormValues = z.infer<typeof enhancedBonusFormSchema>;

interface SimplifiedAnnualInputFormProps {
  monthlyInput: SalaryInput;
  monthlyNet: number;
  monthlyGross: number;
  onCalculate: (bonuses: EnhancedBonusFormValues) => void;
  isLoading?: boolean;
}

export function SimplifiedAnnualInputForm({
  monthlyInput,
  monthlyNet,
  monthlyGross,
  onCalculate,
  isLoading = false,
}: SimplifiedAnnualInputFormProps) {
  const [selectedStrategy, setSelectedStrategy] = useState<'even' | 'concentrated' | 'quarterly'>('concentrated');

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

  const bonusCategories = [
    {
      title: "Thưởng Thường Niên",
      description: "Các khoản thưởng cố định hàng năm",
      items: [
        {
          name: 'month13Salary',
          title: 'Lương tháng 13',
          description: 'Thưởng bằng 1 tháng lương',
          icon: Calendar,
          color: 'text-blue-600',
          default: monthlyGross
        },
        {
          name: 'tetBonus',
          title: 'Thưởng Tết',
          description: 'Thưởng dịp Tết Nguyên Đán',
          icon: Gift,
          color: 'text-red-600',
          default: 0
        }
      ]
    },
    {
      title: "Thưởng Hiệu Suất",
      description: "Thưởng dựa trên kết quả công việc",
      items: [
        {
          name: 'kpiBonus',
          title: 'Thưởng KPI',
          description: 'Thưởng theo chỉ số hiệu suất',
          icon: Target,
          color: 'text-orange-600',
          default: 0
        },
        {
          name: 'performanceBonus',
          title: 'Thưởng Đánh Giá',
          description: 'Thưởng performance review cuối năm',
          icon: TrendingUp,
          color: 'text-green-600',
          default: 0
        }
      ]
    },
    {
      title: "Thưởng Đặc Thù",
      description: "Các khoản thưởng khác theo dự án/doanh số",
      items: [
        {
          name: 'quarterlyBonus',
          title: 'Thưởng Quý',
          description: 'Thưởng hàng quý (giảm thuế hơn)',
          icon: Award,
          color: 'text-purple-600',
          default: 0
        },
        {
          name: 'projectBonus',
          title: 'Thưởng Dự Án',
          description: 'Thưởng hoàn thành dự án',
          icon: Calculator,
          color: 'text-cyan-600',
          default: 0
        },
        {
          name: 'salesCommission',
          title: 'Hoa Hồng',
          description: 'Thưởng theo doanh số',
          icon: DollarSign,
          color: 'text-yellow-600',
          default: 0
        }
      ]
    }
  ];

  const strategies = [
    {
      value: 'even' as const,
      title: 'Phân Bổ Đều',
      subtitle: 'Tối ưu nhất',
      description: 'Chia đều thưởng sang 12 tháng',
      benefit: 'Tiết kiệm đến 20% thuế',
      color: 'border-green-200 bg-green-50',
      selectedColor: 'border-green-500 bg-green-100'
    },
    {
      value: 'quarterly' as const,
      title: 'Theo Quý',
      subtitle: 'Cân bằng',
      description: 'Chia thưởng 4 lần/năm',
      benefit: 'Giảm thuế 10-15%',
      color: 'border-blue-200 bg-blue-50',
      selectedColor: 'border-blue-500 bg-blue-100'
    },
    {
      value: 'concentrated' as const,
      title: 'Tập Trung',
      subtitle: 'Phổ biến nhất',
      description: 'Tất cả thưởng vào tháng 12',
      drawback: 'Thuế cao nhất',
      color: 'border-red-200 bg-red-50',
      selectedColor: 'border-red-500 bg-red-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Current Salary Info */}
      <GlassCard variant="subtle" className="p-4">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <p className="text-black/60 text-xs mb-1">Lương Gross/Tháng</p>
            <p className="text-lg font-semibold text-black">
              {new Intl.NumberFormat('vi-VN').format(monthlyGross)} VNĐ
            </p>
          </div>
          <div>
            <p className="text-black/60 text-xs mb-1">Lương Net/Tháng</p>
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
            Tính Thu Nhập Năm 2026
          </h3>
          <p className="text-black/80 text-sm">
            Nhập các khoản thưởng và chọn chiến lược phân phối để tối ưu thuế
          </p>
        </div>

        <Form {...form}>
          <div className="space-y-8">
            {/* Bonus Categories */}
            {bonusCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-4">
                <div>
                  <h4 className="font-medium text-black mb-1">{category.title}</h4>
                  <p className="text-sm text-black/60">{category.description}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.items.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <FormField
                        key={item.name}
                        control={form.control}
                        name={item.name as keyof EnhancedBonusFormValues}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black flex items-center gap-2">
                              <IconComponent className={`h-4 w-4 ${item.color}`} />
                              {item.title}
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
                              {item.description}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Strategy Selection */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-black mb-1">Chiến Lược Phân Phối Thưởng</h4>
                <p className="text-sm text-black/60">Lựa chọn ảnh hưởng đến số thuế phải đóng</p>
              </div>
              <FormField
                control={form.control}
                name="distributionStrategy"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid md:grid-cols-3 gap-3">
                      {strategies.map((strategy) => (
                        <Card
                          key={strategy.value}
                          className={`cursor-pointer transition-all border-2 ${
                            field.value === strategy.value
                              ? strategy.selectedColor
                              : strategy.color + ' hover:shadow-md'
                          }`}
                          onClick={() => {
                            field.onChange(strategy.value);
                            setSelectedStrategy(strategy.value);
                          }}
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm flex items-center justify-between">
                              <div>
                                <div className="font-medium">{strategy.title}</div>
                                <div className="text-xs text-black/60 font-normal">
                                  {strategy.subtitle}
                                </div>
                              </div>
                              {field.value === strategy.value && (
                                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                              )}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-xs text-black/70 mb-2">{strategy.description}</p>
                            {'benefit' in strategy && (
                              <div className="flex items-center gap-1 text-xs text-green-600">
                                <PiggyBank className="h-3 w-3" />
                                {strategy.benefit}
                              </div>
                            )}
                            {'drawback' in strategy && (
                              <div className="flex items-center gap-1 text-xs text-red-600">
                                <AlertTriangle className="h-3 w-3" />
                                {strategy.drawback}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Summary Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-blue-600" />
                  Tổng Quan Thu Nhập
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-black/60 text-xs mb-1">Lương 12 tháng</p>
                    <p className="text-lg font-semibold text-black">
                      {new Intl.NumberFormat('vi-VN').format(monthlyGross * 12)} VNĐ
                    </p>
                  </div>
                  <div>
                    <p className="text-black/60 text-xs mb-1">Tổng thưởng</p>
                    <p className="text-lg font-semibold text-orange-600">
                      {new Intl.NumberFormat('vi-VN').format(totalBonuses)} VNĐ
                    </p>
                  </div>
                  <div>
                    <p className="text-black/60 text-xs mb-1">Tổng Gross Năm</p>
                    <p className="text-lg font-semibold text-blue-600">
                      {new Intl.NumberFormat('vi-VN').format((monthlyGross * 12) + totalBonuses)} VNĐ
                    </p>
                  </div>
                </div>

                {totalBonuses > 0 && (
                  <Alert className="mt-4 bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-sm text-black/80">
                      <strong>Tip:</strong> Với {new Intl.NumberFormat('vi-VN').format(totalBonuses)} VNĐ thưởng,
                      chiến lược "{strategies.find(s => s.value === selectedStrategy)?.title}"
                      sẽ giúp bạn tối ưu thuế tốt nhất.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Đang phân tích...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Phân Tích Thu Nhập Năm
                  <ChevronRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        </Form>
      </GlassCard>
    </div>
  );
}