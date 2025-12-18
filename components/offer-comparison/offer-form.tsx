'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { X, Save } from 'lucide-react';
import type { JobOffer } from '@/types/job-offer';

const offerSchema = z.object({
  companyName: z.string().min(1, 'Tên công ty là bắt buộc'),
  position: z.string().min(1, 'Vị trí là bắt buộc'),
  location: z.string().min(1, 'Địa điểm là bắt buộc'),
  baseSalary: z.number().min(0, 'Lương cơ bản phải >= 0'),
  currency: z.enum(['VND', 'USD']),
  bonuses: z.object({
    performance: z.number(),
    signing: z.number().optional(),
    '13thMonth': z.number().optional(),
    stock: z.object({
      type: z.enum(['ESOP', 'RSU', 'Stock Options']),
      value: z.number(),
      vesting: z.string(),
      strikePrice: z.number().optional(),
    }).optional(),
  }),
  benefits: z.object({
    healthInsurance: z.object({
      value: z.number(),
      coverage: z.enum(['self', 'self+spouse', 'family']),
      notes: z.string().optional(),
    }),
    mealAllowance: z.object({
      value: z.number(),
      frequency: z.enum(['daily', 'monthly']),
    }),
    transport: z.object({
      value: z.number(),
      type: z.enum(['allowance', 'shuttle', 'parking']),
    }),
    phone: z.number(),
    internet: z.number(),
    gym: z.number(),
    learning: z.object({
      budget: z.number(),
      approved: z.boolean(),
    }),
    other: z.array(z.object({
      description: z.string(),
      value: z.number(),
    })),
  }),
  workLife: z.object({
    workingDays: z.number(),
    workingHours: z.number(),
    overtime: z.object({
      frequency: z.enum(['rare', 'sometimes', 'often', 'always']),
      paid: z.boolean(),
      rate: z.number().optional(),
    }),
    leaveDays: z.object({
      annual: z.number(),
      sick: z.number(),
      personal: z.number(),
      maternity: z.number(),
      paternity: z.number(),
    }),
    remote: z.object({
      daysPerWeek: z.number(),
      flexibility: z.enum(['fixed', 'flexible', 'fully-remote']),
      wfhStipend: z.number().optional(),
    }),
  }),
  commute: z.object({
    distance: z.number(),
    time: z.number(),
    cost: z.object({
      monthly: z.number(),
      breakdown: z.object({
        fuel: z.number(),
        parking: z.number(),
        public: z.number(),
      }),
    }),
    remoteDaysPerWeek: z.number(),
  }),
  career: z.object({
    reviewCycle: z.string(),
    promotionTrack: z.enum(['fast', 'normal', 'slow']),
    trainingOpportunities: z.array(z.string()),
    careerPath: z.array(z.string()),
  }),
  culture: z.object({
    teamSize: z.number(),
    companySize: z.string(),
    industry: z.string(),
    workEnvironment: z.enum(['startup', 'corporate', 'agency', 'remote-first']),
    dressCode: z.enum(['formal', 'business-casual', 'casual']),
  }),
});

type OfferFormData = z.infer<typeof offerSchema>;

interface OfferFormProps {
  offer?: JobOffer | null;
  onSubmit: (data: Partial<JobOffer>) => void;
  onCancel: () => void;
}

export function OfferForm({ offer, onSubmit, onCancel }: OfferFormProps) {
  const form = useForm<OfferFormData>({
    resolver: zodResolver(offerSchema),
    defaultValues: offer ? offer : {
      companyName: '',
      position: '',
      location: '',
      baseSalary: 0,
      currency: 'VND',
      bonuses: {
        performance: 0,
      },
      benefits: {
        healthInsurance: {
          value: 0,
          coverage: 'self',
        },
        mealAllowance: {
          value: 0,
          frequency: 'daily',
        },
        transport: {
          value: 0,
          type: 'allowance',
        },
        phone: 0,
        internet: 0,
        gym: 0,
        learning: {
          budget: 0,
          approved: false,
        },
        other: [],
      },
      workLife: {
        workingDays: 5,
        workingHours: 8,
        overtime: {
          frequency: 'rare',
          paid: false,
        },
        leaveDays: {
          annual: 12,
          sick: 0,
          personal: 0,
          maternity: 0,
          paternity: 0,
        },
        remote: {
          daysPerWeek: 0,
          flexibility: 'fixed',
        },
      },
      commute: {
        distance: 0,
        time: 0,
        cost: {
          monthly: 0,
          breakdown: {
            fuel: 0,
            parking: 0,
            public: 0,
          },
        },
        remoteDaysPerWeek: 0,
      },
      career: {
        reviewCycle: '',
        promotionTrack: 'normal',
        trainingOpportunities: [],
        careerPath: [],
      },
      culture: {
        teamSize: 0,
        companySize: '',
        industry: '',
        workEnvironment: 'corporate',
        dressCode: 'business-casual',
      },
    },
  });

  const handleSubmit = (data: OfferFormData) => {
    onSubmit(data);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black/20 backdrop-blur-xl border-white/20">
        <motion.div variants={modalVariants}>
          <DialogHeader>
            <DialogTitle className="text-black text-xl">
              {offer ? 'Chỉnh sửa thư mời' : 'Thêm thư mời mới'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Cơ bản</TabsTrigger>
                <TabsTrigger value="bonus">Thưởng & Cổ phiếu</TabsTrigger>
                <TabsTrigger value="benefits">Phúc lợi</TabsTrigger>
                <TabsTrigger value="worklife">Work-Life</TabsTrigger>
              </TabsList>

              {/* Basic Info Tab */}
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-black">
                      Tên công ty *
                    </Label>
                    <Input
                      id="companyName"
                      {...form.register('companyName')}
                      className="bg-white/10 border-white/20 text-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-black">
                      Vị trí *
                    </Label>
                    <Input
                      id="position"
                      {...form.register('position')}
                      className="bg-white/10 border-white/20 text-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-black">
                      Địa điểm *
                    </Label>
                    <Input
                      id="location"
                      {...form.register('location')}
                      className="bg-white/10 border-white/20 text-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency" className="text-black">
                      Tiền tệ
                    </Label>
                    <Select
                      value={form.watch('currency')}
                      onValueChange={(value) => form.setValue('currency', value as 'VND' | 'USD')}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-black">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VND">VND</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="baseSalary" className="text-black">
                    Lương cơ bản hàng tháng ({form.watch('currency')})
                  </Label>
                  <Input
                    id="baseSalary"
                    type="number"
                    {...form.register('baseSalary', { valueAsNumber: true })}
                    className="bg-white/10 border-white/20 text-black"
                  />
                </div>
              </TabsContent>

              {/* Bonus & Equity Tab */}
              <TabsContent value="bonus" className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-black font-semibold">Thưởng hàng năm</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-black">Thưởng hiệu suất</Label>
                      <Input
                        type="number"
                        {...form.register('bonuses.performance', { valueAsNumber: true })}
                        className="bg-white/10 border-white/20 text-black"
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-black">Thưởng ký hợp đồng</Label>
                      <Input
                        type="number"
                        {...form.register('bonuses.signing', { valueAsNumber: true })}
                        className="bg-white/10 border-white/20 text-black"
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-black">Lương tháng 13</Label>
                      <Input
                        type="number"
                        {...form.register('bonuses.13thMonth' as any, { valueAsNumber: true })}
                        className="bg-white/10 border-white/20 text-black"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/20" />

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={!!form.watch('bonuses.stock')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          form.setValue('bonuses.stock', {
                            type: 'ESOP',
                            value: 0,
                            vesting: '',
                          });
                        } else {
                          form.setValue('bonuses.stock', undefined);
                        }
                      }}
                    />
                    <Label className="text-black">Có cổ phiếu/ESOP</Label>
                  </div>

                  {form.watch('bonuses.stock') && (
                    <div className="space-y-4 ml-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-black">Loại</Label>
                          <Select
                            value={form.watch('bonuses.stock.type')}
                            onValueChange={(value) =>
                              form.setValue('bonuses.stock.type', value as any)
                            }
                          >
                            <SelectTrigger className="bg-white/10 border-white/20 text-black">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ESOP">ESOP</SelectItem>
                              <SelectItem value="RSU">RSU</SelectItem>
                              <SelectItem value="Stock Options">Stock Options</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-black">Giá trị hàng năm</Label>
                          <Input
                            type="number"
                            {...form.register('bonuses.stock.value', { valueAsNumber: true })}
                            className="bg-white/10 border-white/20 text-black"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-black">Vesting schedule</Label>
                        <Input
                          {...form.register('bonuses.stock.vesting')}
                          className="bg-white/10 border-white/20 text-black"
                          placeholder="4 năm với 1 năm cliff"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Benefits Tab */}
              <TabsContent value="benefits" className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-black font-semibold">Bảo hiểm & Sức khỏe</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-black">Giá trị BH sức khỏe/tháng</Label>
                        <Input
                          type="number"
                          {...form.register('benefits.healthInsurance.value', { valueAsNumber: true })}
                          className="bg-white/10 border-white/20 text-black"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-black">Phạm vi bảo hiểm</Label>
                        <Select
                          value={form.watch('benefits.healthInsurance.coverage')}
                          onValueChange={(value) =>
                            form.setValue('benefits.healthInsurance.coverage', value as any)
                          }
                        >
                          <SelectTrigger className="bg-white/10 border-white/20 text-black">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="self">Chỉ mình</SelectItem>
                            <SelectItem value="self+spouse">Mình và vợ/chồng</SelectItem>
                            <SelectItem value="family">Gia đình</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/20" />

                <div className="space-y-4">
                  <h3 className="text-black font-semibold">Trợ cấp hàng tháng</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-black">Ăn trưa</Label>
                      <Input
                        type="number"
                        {...form.register('benefits.mealAllowance.value', { valueAsNumber: true })}
                        className="bg-white/10 border-white/20 text-black"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-black">Tần suất</Label>
                      <Select
                        value={form.watch('benefits.mealAllowance.frequency')}
                        onValueChange={(value) =>
                          form.setValue('benefits.mealAllowance.frequency', value as any)
                        }
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-black">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Hàng ngày</SelectItem>
                          <SelectItem value="monthly">Hàng tháng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-black">Đi lại</Label>
                      <Input
                        type="number"
                        {...form.register('benefits.transport.value', { valueAsNumber: true })}
                        className="bg-white/10 border-white/20 text-black"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-black">Điện thoại</Label>
                      <Input
                        type="number"
                        {...form.register('benefits.phone', { valueAsNumber: true })}
                        className="bg-white/10 border-white/20 text-black"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-black">Internet</Label>
                      <Input
                        type="number"
                        {...form.register('benefits.internet', { valueAsNumber: true })}
                        className="bg-white/10 border-white/20 text-black"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-black">Phòng gym</Label>
                      <Input
                        type="number"
                        {...form.register('benefits.gym', { valueAsNumber: true })}
                        className="bg-white/10 border-white/20 text-black"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Work-Life Tab */}
              <TabsContent value="worklife" className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-black font-semibold">Giờ làm việc</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-black">Số ngày làm việc/tuần</Label>
                      <div className="px-3">
                        <Slider
                          value={[form.watch('workLife.workingDays')]}
                          onValueChange={([value]) =>
                            form.setValue('workLife.workingDays', value)
                          }
                          max={7}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-black/60 text-sm mt-1">
                          <span>1</span>
                          <span>{form.watch('workLife.workingDays')} ngày</span>
                          <span>7</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-black">Số giờ làm việc/ngày</Label>
                      <div className="px-3">
                        <Slider
                          value={[form.watch('workLife.workingHours')]}
                          onValueChange={([value]) =>
                            form.setValue('workLife.workingHours', value)
                          }
                          max={12}
                          min={4}
                          step={0.5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-black/60 text-sm mt-1">
                          <span>4</span>
                          <span>{form.watch('workLife.workingHours')} giờ</span>
                          <span>12</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/20" />

                <div className="space-y-4">
                  <h3 className="text-black font-semibold">Làm việc từ xa</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-black">Số ngày remote/tuần</Label>
                      <div className="px-3">
                        <Slider
                          value={[form.watch('workLife.remote.daysPerWeek')]}
                          onValueChange={([value]) =>
                            form.setValue('workLife.remote.daysPerWeek', value)
                          }
                          max={5}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-black/60 text-sm mt-1">
                          <span>0</span>
                          <span>{form.watch('workLife.remote.daysPerWeek')} ngày</span>
                          <span>5</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-black">Mức độ linh hoạt</Label>
                      <Select
                        value={form.watch('workLife.remote.flexibility')}
                        onValueChange={(value) =>
                          form.setValue('workLife.remote.flexibility', value as any)
                        }
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-black">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Cố định</SelectItem>
                          <SelectItem value="flexible">Linh hoạt</SelectItem>
                          <SelectItem value="fully-remote">Hoàn toàn remote</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/20" />

                <div className="space-y-4">
                  <h3 className="text-black font-semibold">Ngày nghỉ</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-black">Nghỉ phép năm</Label>
                      <Input
                        type="number"
                        {...form.register('workLife.leaveDays.annual', { valueAsNumber: true })}
                        className="bg-white/10 border-white/20 text-black"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-black">Nghỉ ốm</Label>
                      <Input
                        type="number"
                        {...form.register('workLife.leaveDays.sick', { valueAsNumber: true })}
                        className="bg-white/10 border-white/20 text-black"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4 border-t border-white/20">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="bg-white/10 border-white/20 text-black hover:bg-white/20"
              >
                <X className="h-4 w-4 mr-2" />
                Hủy
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Save className="h-4 w-4 mr-2" />
                Lưu
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}