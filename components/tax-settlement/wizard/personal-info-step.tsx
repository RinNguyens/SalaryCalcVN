'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { personalInfoSchema, type PersonalInfoFormData } from '@/lib/validators/tax-settlement-schema';
import type { TaxSettlementPersonalInfo } from '@/types/tax-settlement';
import { ArrowRight, User, Hash, Calendar, Users } from 'lucide-react';
import { useEffect } from 'react';

interface PersonalInfoStepProps {
  data?: TaxSettlementPersonalInfo;
  onUpdate: (data: TaxSettlementPersonalInfo) => void;
  onNext: () => void;
}

export default function PersonalInfoStep({
  data,
  onUpdate,
  onNext,
}: PersonalInfoStepProps) {
  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: data?.fullName || '',
      taxCode: data?.taxCode || '',
      year: data?.year || 2026,
      dependentCount: data?.dependentCount || 0,
    },
  });

  // Auto-save on form change
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.fullName && value.taxCode && value.year !== undefined && value.dependentCount !== undefined) {
        onUpdate(value as TaxSettlementPersonalInfo);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdate]);

  const onSubmit = (values: PersonalInfoFormData) => {
    onUpdate(values);
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard variant="strong" className="p-6 md:p-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-black">
              Bước 1: Thông tin cá nhân
            </h2>
          </div>
          <p className="text-black/70 ml-7">
            Nhập thông tin cơ bản để bắt đầu quyết toán thuế
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black font-semibold flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Họ và tên <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nguyễn Văn A"
                      className="bg-white/50 border-black/20"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-black/60">
                    Nhập họ tên đầy đủ theo giấy tờ tùy thân
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tax Code */}
            <FormField
              control={form.control}
              name="taxCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black font-semibold flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    Mã số thuế (MST) <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0123456789"
                      className="bg-white/50 border-black/20"
                      maxLength={13}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-black/60">
                    Mã số thuế cá nhân (10 chữ số)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Year */}
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Năm quyết toán <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white/50 border-black/20">
                        <SelectValue placeholder="Chọn năm" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="2018">2018</SelectItem>
                      <SelectItem value="2019">2019</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="2028">2028</SelectItem>
                      <SelectItem value="2029">2029</SelectItem>
                      <SelectItem value="2030">2030</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-black/60">
                    Năm thực hiện quyết toán thuế (mặc định: 2026)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dependent Count */}
            <FormField
              control={form.control}
              name="dependentCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black font-semibold flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Số người phụ thuộc
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      min="0"
                      max="20"
                      className="bg-white/50 border-black/20"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription className="text-black/60">
                    Số người phụ thuộc đã đăng ký (bạn sẽ khai chi tiết ở bước sau)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>💡 Lưu ý:</strong> Thông tin bạn nhập sẽ được lưu tự động
                trên trình duyệt của bạn. Dữ liệu không được gửi đến máy chủ.
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                Tiếp tục
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </GlassCard>
    </motion.div>
  );
}
