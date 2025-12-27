'use client';

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
import { FormattedCurrencyInput } from '@/components/ui/formatted-currency-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  salaryFormSchema,
  type SalaryFormValues,
} from '@/lib/validators/salary-schema';
import { REGIONS } from '@/lib/constants/tax-brackets';
import { Calculator, TrendingUp } from 'lucide-react';

interface SalaryInputFormProps {
  onCalculate: (
    values: SalaryFormValues,
    mode: 'gross-to-net' | 'net-to-gross'
  ) => void;
  isLoading?: boolean;
}

export function SalaryInputForm({
  onCalculate,
  isLoading,
}: SalaryInputFormProps) {
  const form = useForm<SalaryFormValues>({
    resolver: zodResolver(salaryFormSchema) as any,
    mode: 'onSubmit', // Ensure validation runs on submit
    defaultValues: {
      salary: 0, // Start with 0, will be validated on submit
      dependents: 0,
      region: 'I' as const,
      exemptions: 0,
    },
  });

  return (
    <GlassCard variant="strong" className="p-6">
      <Tabs defaultValue="gross-to-net" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="gross-to-net" className="gap-2">
            <Calculator className="h-4 w-4" />
            Gross → Net
          </TabsTrigger>
          <TabsTrigger value="net-to-gross" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Net → Gross
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gross-to-net">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => {
                // Additional validation to ensure salary is a valid number
                if (!data.salary || data.salary === 0) {
                  form.setError('salary', {
                    message: 'Vui lòng nhập mức lương'
                  });
                  return;
                }
                if (data.salary < 1000000) {
                  form.setError('salary', {
                    message: 'Lương tối thiểu 1 triệu đồng'
                  });
                  return;
                }
                onCalculate(data, 'gross-to-net');
              })}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">
                      Lương Gross (VND)
                    </FormLabel>
                    <FormControl>
                      <FormattedCurrencyInput
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                          // Trigger validation when value changes
                          field.onBlur();
                        }}
                        placeholder="20,000,000"
                        className="bg-white/10 border-white/20 text-black border-slate-300 placeholder:text-black/50"
                      />
                    </FormControl>
                   <div className='flex gap-2 items-center'>
                    
                    <FormDescription className="text-black/70">
                      Tổng lương trước thuế và bảo hiểm
                    </FormDescription>
                     {field.value > 0 && (
                        <p className="text-sm font-semibold text-purple-900">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(Number(field.value))}
                        </p>
                    )}
                   </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dependents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">
                      Số người phụ thuộc
                    </FormLabel>
                    <FormControl>
                      <FormattedCurrencyInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="0"
                        className="bg-white/10 border-white/20 text-black border-slate-300 placeholder:text-black/50"
                      />
                    </FormControl>
                    <FormDescription className="text-black/70">
                      6.2 triệu/người/tháng (Luật 2026)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Vùng</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white/10 border-white/20 text-black border-slate-300">
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

              <FormField
                control={form.control}
                name="exemptions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">
                      Phụ cấp (VND)
                    </FormLabel>
                    <FormControl>
                      <FormattedCurrencyInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="0"
                        className="bg-white/10 border-white/20 text-black border-slate-300 placeholder:text-black/50"
                      />
                    </FormControl>
                    <FormDescription className="text-black/70">
                      VD: Phụ cấp ăn trưa, đi lại
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled={isLoading}
              >
                {isLoading ? 'Đang tính...' : 'Tính lương Net'}
              </Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="net-to-gross">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => {
                // Additional validation to ensure salary is a valid number
                if (!data.salary || data.salary === 0) {
                  form.setError('salary', {
                    message: 'Vui lòng nhập mức lương'
                  });
                  return;
                }
                if (data.salary < 1000000) {
                  form.setError('salary', {
                    message: 'Lương tối thiểu 1 triệu đồng'
                  });
                  return;
                }
                onCalculate(data, 'net-to-gross');
              })}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">
                      Lương Net (VND)
                    </FormLabel>
                    <FormControl>
                      <FormattedCurrencyInput
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                          // Trigger validation when value changes
                          field.onBlur();
                        }}
                        placeholder="15,000,000"
                        className="bg-white/10 border-white/20 text-black border-slate-300 placeholder:text-black/50"
                      />
                    </FormControl>
                   <div className='flex flex-row items-center gap-2'>
                    
                    <FormDescription className="text-black/70">
                      Số tiền thực nhận sau thuế và bảo hiểm
                    </FormDescription>
                     {field.value > 0 && (
                        <p className="text-sm font-semibold text-blue-900">
                          : {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(Number(field.value))}
                        </p>
                    )}
                   </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dependents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">
                      Số người phụ thuộc
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className="bg-white/10 border-white/20 text-black border-slate-300 placeholder:text-black/50"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-black/70">
                      6.2 triệu/người/tháng (Luật 2026)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Vùng</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white/10 border-white/20 text-black border-slate-300">
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

              <FormField
                control={form.control}
                name="exemptions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">
                      Miễn thuế (VND)
                    </FormLabel>
                    <FormControl>
                      <FormattedCurrencyInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="0"
                        className="bg-white/10 border-white/20 text-black border-slate-300 placeholder:text-black/50"
                      />
                    </FormControl>
                    <FormDescription className="text-black/70">
                      VD: Phụ cấp ăn trưa, đi lại
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                disabled={isLoading}
              >
                {isLoading ? 'Đang tính...' : 'Tính Gross cần thiết'}
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </GlassCard>
  );
}
