'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/shared/glass-card';
import {
  MapPin,
  Home,
  Building,
  Briefcase,
  Users,
  Scale
} from 'lucide-react';
import {
  LocationData,
  WorkPreferences,
  RemotePreference,
  CompanySize,
  SalaryEstimateRequest
} from '@/types/salary-estimator';
import { INDUSTRY_MULTIPLIERS } from '@/types/salary-estimator';

interface LocationFormProps {
  data: Partial<SalaryEstimateRequest>;
  onUpdate: (updates: Partial<SalaryEstimateRequest>) => void;
}

export function LocationForm({ data, onUpdate }: LocationFormProps) {
  const location = data.location || {
    city: 'Ho Chi Minh',
    country: 'Vietnam',
    region: 'South',
    remoteWorkPreference: RemotePreference.HYBRID,
  };

  const preferences = data.preferences || {
    workType: 'full_time',
    companySize: CompanySize.MEDIUM,
    industry: ['tech'],
    workLifeBalancePriority: 7,
    careerGrowthPriority: 8,
    salaryNegotiable: true,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: 1 as const,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };

  const updateLocation = (field: string, value: any) => {
    const updated = { ...location, [field]: value };
    onUpdate({ location: updated });
  };

  const updatePreferences = (field: string, value: any) => {
    const updated = { ...preferences, [field]: value };
    onUpdate({ preferences: updated });
  };

  const toggleIndustry = (industry: string) => {
    const industries = preferences.industry.includes(industry)
      ? preferences.industry.filter(i => i !== industry)
      : [...preferences.industry, industry];
    updatePreferences('industry', industries);
  };

  const allIndustries = Object.keys(INDUSTRY_MULTIPLIERS).map(key => ({
    value: key,
    label: {
      tech: 'Công nghệ',
      finance: 'Tài chính',
      ecommerce: 'E-commerce',
      fintech: 'Fintech',
      consulting: 'Tư vấn',
      manufacturing: 'Sản xuất',
      education: 'Giáo dục',
      healthcare: 'Y tế',
      government: 'Chính phủ',
      startup: 'Startup',
      other: 'Khác',
    }[key] || key,
    multiplier: INDUSTRY_MULTIPLIERS[key as keyof typeof INDUSTRY_MULTIPLIERS],
  }));

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Location Preferences */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold text-black mb-6 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Địa điểm làm việc
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="text-black mb-2 block">Thành phố</Label>
            <Select
              value={location.city}
              onValueChange={(value) => updateLocation('city', value)}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-black">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ho Chi Minh">TP. Hồ Chí Minh</SelectItem>
                <SelectItem value="Hanoi">Hà Nội</SelectItem>
                <SelectItem value="Da Nang">Đà Nẵng</SelectItem>
                <SelectItem value="Can Tho">Cần Thơ</SelectItem>
                <SelectItem value="Hai Phong">Hải Phòng</SelectItem>
                <SelectItem value="Bien Hoa">Biên Hòa</SelectItem>
                <SelectItem value="Nha Trang">Nha Trang</SelectItem>
                <SelectItem value="Other">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-black mb-2 block">Quốc gia</Label>
            <Input
              value={location.country}
              onChange={(e) => updateLocation('country', e.target.value)}
              className="bg-white/10 border-white/20 text-black"
              placeholder="Vietnam"
            />
          </div>
        </div>
      </GlassCard>

      {/* Remote Work Preference */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold text-black mb-6 flex items-center gap-2">
          <Home className="h-5 w-5" />
          Lựa chọn làm việc từ xa
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: RemotePreference.ONSITE, label: 'Tại văn phòng', desc: '100% onsite' },
            { value: RemotePreference.HYBRID, label: 'Linh hoạt', desc: '2-3 ngày/tuần' },
            { value: RemotePreference.REMOTE, label: 'Remote', desc: '100% remote' },
            { value: RemotePreference.FLEXIBLE, label: 'Lựa chọn', desc: 'Tự chọn' },
          ].map((option) => (
            <motion.div
              key={option.value}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`p-4 rounded-xl cursor-pointer border-2 transition-all ${
                  location.remoteWorkPreference === option.value
                    ? 'bg-purple-500/20 border-purple-400'
                    : 'bg-white/5 border-white/20 hover:bg-white/10'
                }`}
                onClick={() => updateLocation('remoteWorkPreference', option.value)}
              >
                <p className="text-black font-medium">{option.label}</p>
                <p className="text-black/60 text-sm">{option.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Work Preferences */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold text-black mb-6 flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Sở thích công việc
        </h3>
        <div className="space-y-6">
          <div>
            <Label className="text-black mb-2 block">Loại hình công việc</Label>
            <Select
              value={preferences.workType}
              onValueChange={(value: any) => updatePreferences('workType', value)}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-black">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full_time">Toàn thời gian</SelectItem>
                <SelectItem value="part_time">Bán thời gian</SelectItem>
                <SelectItem value="contract">Hợp đồng</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-black mb-2 block">Quy mô công ty</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { value: CompanySize.STARTUP, label: 'Startup', desc: '1-50 người' },
                { value: CompanySize.SMALL, label: 'Nhỏ', desc: '51-200 người' },
                { value: CompanySize.MEDIUM, label: 'Vừa', desc: '201-1000 người' },
                { value: CompanySize.LARGE, label: 'Lớn', desc: '1001-10000 người' },
                { value: CompanySize.ENTERPRISE, label: 'Đại doanh', desc: '>10000 người' },
              ].map((option) => (
                <motion.div
                  key={option.value}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`p-3 rounded-xl cursor-pointer border-2 transition-all ${
                      preferences.companySize === option.value
                        ? 'bg-purple-500/20 border-purple-400'
                        : 'bg-white/5 border-white/20 hover:bg-white/10'
                    }`}
                    onClick={() => updatePreferences('companySize', option.value)}
                  >
                    <p className="text-black font-medium text-sm">{option.label}</p>
                    <p className="text-black/60 text-xs">{option.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-black mb-3 block">Ngành nghề quan tâm</Label>
            <div className="flex flex-wrap gap-2 mb-4">
              {allIndustries.map((industry) => (
                <Badge
                  key={industry.value}
                  variant={preferences.industry.includes(industry.value) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    preferences.industry.includes(industry.value)
                      ? 'bg-purple-500 text-black'
                      : 'bg-white/10 text-black/80 border-white/20 hover:bg-white/20'
                  }`}
                  onClick={() => toggleIndustry(industry.value)}
                >
                  {industry.label}
                  {industry.multiplier > 1 && (
                    <span className="ml-1 text-xs">(+{Math.round((industry.multiplier - 1) * 100)}%)</span>
                  )}
                </Badge>
              ))}
            </div>
            {preferences.industry.length === 0 && (
              <p className="text-black/60 text-sm">Chưa chọn ngành nào</p>
            )}
          </div>
        </div>
      </GlassCard>

      {/* Priority Settings */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold text-black mb-6 flex items-center gap-2">
          <Scale className="h-5 w-5" />
          Ưu tiên của bạn
        </h3>
        <div className="space-y-6">
          <div>
            <Label className="text-black mb-2 block flex items-center gap-2">
              <Users className="h-4 w-4" />
              Cân bằng công việc-cuộc sống: {preferences.workLifeBalancePriority}/10
            </Label>
            <Slider
              value={[preferences.workLifeBalancePriority]}
              onValueChange={([value]) => updatePreferences('workLifeBalancePriority', value)}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <p className="text-black/60 text-sm mt-1">
              1 = Không quan trọng, 10 = Rất quan trọng
            </p>
          </div>

          <div>
            <Label className="text-black mb-2 block flex items-center gap-2">
              <Users className="h-4 w-4" />
              Phát triển sự nghiệp: {preferences.careerGrowthPriority}/10
            </Label>
            <Slider
              value={[preferences.careerGrowthPriority]}
              onValueChange={([value]) => updatePreferences('careerGrowthPriority', value)}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <p className="text-black/60 text-sm mt-1">
              1 = Không quan trọng, 10 = Rất quan trọng
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              id="salary-negotiable"
              checked={preferences.salaryNegotiable}
              onCheckedChange={(checked) =>
                updatePreferences('salaryNegotiable', checked)
              }
            />
            <Label htmlFor="salary-negotiable" className="text-black">
              Tôi sẵn sàng đàm phán lương
            </Label>
          </div>
        </div>
      </GlassCard>

      {/* Info Card */}
      <motion.div
        className="glass-subtle rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-black/80 text-sm">
          <span className="font-semibold">💡 Mẹo:</span> Các ngành được đánh dấu (+%) có xu hướng trả lương cao hơn.
          Việc làm việc từ xa cũng có thể giúp bạn có mức lương cao hơn.
        </p>
      </motion.div>
    </motion.div>
  );
}