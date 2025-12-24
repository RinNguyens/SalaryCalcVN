'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  dependentSchema,
  type DependentFormData,
  calculateMonthsRegistered,
} from '@/lib/validators/tax-settlement-schema';
import type { TaxSettlementDependent } from '@/types/tax-settlement';

interface DependentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TaxSettlementDependent) => void;
  year: number;
  initialData?: TaxSettlementDependent;
}

export default function DependentForm({
  open,
  onOpenChange,
  onSubmit,
  year,
  initialData,
}: DependentFormProps) {
  const form = useForm<DependentFormData>({
    resolver: zodResolver(dependentSchema),
    defaultValues: {
      name: initialData?.name || '',
      taxCode: initialData?.taxCode || '',
      relationship: initialData?.relationship || 'child',
      birthDate: initialData?.birthDate || '',
      registeredFrom: initialData?.registeredFrom || `${year}-01-01`,
      registeredTo: initialData?.registeredTo || '',
    },
  });

  const handleSubmit = (values: DependentFormData) => {
    const monthsRegistered = calculateMonthsRegistered(
      values.registeredFrom,
      values.registeredTo || undefined,
      year
    );

    const dependent: TaxSettlementDependent = {
      id: initialData?.id || crypto.randomUUID(),
      name: values.name,
      taxCode: values.taxCode,
      relationship: values.relationship,
      birthDate: values.birthDate || undefined,
      registeredFrom: values.registeredFrom,
      registeredTo: values.registeredTo || undefined,
      monthsRegistered,
    };

    onSubmit(dependent);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {initialData ? 'Chỉnh sửa người phụ thuộc' : 'Thêm người phụ thuộc'}
          </DialogTitle>
          <DialogDescription>
            Nhập thông tin người phụ thuộc đã đăng ký
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Họ và tên <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nguyễn Văn B" {...field} />
                  </FormControl>
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
                  <FormLabel>
                    Mã số thuế <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="0123456789" maxLength={13} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Relationship */}
            <FormField
              control={form.control}
              name="relationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Mối quan hệ <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn mối quan hệ" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="child">Con</SelectItem>
                      <SelectItem value="spouse">Vợ/Chồng</SelectItem>
                      <SelectItem value="parent">Bố/Mẹ</SelectItem>
                      <SelectItem value="sibling">Anh/Chị/Em</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Registration Period */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="registeredFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Đăng ký từ <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="registeredTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đến ngày</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Để trống nếu còn đăng ký
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
