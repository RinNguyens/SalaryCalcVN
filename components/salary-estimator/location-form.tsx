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
import { VIETNAM_CITIES, getCityIcon, formatCityName } from '@/constants/vietnam-cities';

interface LocationFormProps {
  data: Partial<SalaryEstimateRequest>;
  onUpdate: (updates: Partial<SalaryEstimateRequest>) => void;
}

export function LocationForm({ data, onUpdate }: LocationFormProps) {
  const [location, setLocation] = useState<LocationData>(data.location || {
    city: 'ho_chi_minh',
    country: 'Vietnam',
    region: 'South',
    remoteWorkPreference: RemotePreference.HYBRID,
  });

  const [preferences, setPreferences] = useState<WorkPreferences>(data.preferences || {
    workType: 'full_time' as const,
    companySize: CompanySize.MEDIUM,
    industry: ['tech'],
    workLifeBalancePriority: 7,
    careerGrowthPriority: 8,
    salaryNegotiable: true,
  });

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
    setLocation(updated);
    onUpdate({ location: updated });
  };

  const updatePreferences = (field: string, value: any) => {
    const updated = { ...preferences, [field]: value };
    setPreferences(updated);
    onUpdate({ preferences: updated });
  };

  const toggleIndustry = (industry: string) => {
    const industries = preferences.industry.includes(industry)
      ? preferences.industry.filter(i => i !== industry)
      : [...preferences.industry, industry];
    const updated = { ...preferences, industry: industries };
    setPreferences(updated);
    onUpdate({ preferences: updated });
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
    <motion.div initial="hidden" animate="visible" className="space-y-6">
      {/* Location Preferences */}
      <GlassCard className="p-6 pointer-events-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
          <h3 className="text-2xl font-bold text-black">
            Địa điểm làm việc
          </h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div >
            <Label className="text-black/70 text-xs font-semibold mb-2 uppercase tracking-wide flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              Thành phố
            </Label>
            <Select
              value={location.city}
              onValueChange={(value) => updateLocation('city', value)}
            >
              <SelectTrigger className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-300/40 text-black font-semibold hover:from-green-500/30 hover:to-emerald-500/30 transition-all">
                <SelectValue placeholder="Chọn thành phố" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {VIETNAM_CITIES.map((city) => (
                  <SelectItem key={city.code} value={city.codename}>
                    {getCityIcon(city.codename)} {formatCityName(city.name, city.division_type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
          <motion.div >
            <Label className="text-black/70 text-xs font-semibold mb-2 block uppercase tracking-wide">
              Quốc gia
            </Label>
            <Input
              value={location.country}
              onChange={(e) => updateLocation('country', e.target.value)}
              className="bg-white/60 border-slate-300 text-black font-medium hover:bg-white/80 focus:bg-white transition-colors"
              placeholder="Vietnam"
            />
          </motion.div>
        </div>
      </GlassCard>

      {/* Remote Work Preference */}
      <GlassCard className="p-6 pointer-events-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
          <h3 className="text-2xl font-bold text-black">
            Lựa chọn làm việc từ xa
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Onsite */}
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`relative p-5 rounded-2xl cursor-pointer border-2 transition-all duration-300 overflow-hidden ${
                location.remoteWorkPreference === RemotePreference.ONSITE
                  ? 'bg-gradient-to-br from-orange-500 to-red-500 border-transparent shadow-lg'
                  : 'bg-white/40 border-white/40 hover:bg-white/60 hover:border-white/60 shadow-sm hover:shadow-md'
              }`}
              onClick={() => updateLocation('remoteWorkPreference', RemotePreference.ONSITE)}
            >
              {location.remoteWorkPreference === RemotePreference.ONSITE && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              )}
              <div className="relative">
                <div className="text-3xl mb-2">🏢</div>
                <p className={`font-bold mb-1 ${location.remoteWorkPreference === RemotePreference.ONSITE ? 'text-white' : 'text-black'}`}>
                  Tại văn phòng
                </p>
                <p className={`text-sm ${location.remoteWorkPreference === RemotePreference.ONSITE ? 'text-white/90' : 'text-black/60'}`}>
                  100% onsite
                </p>
              </div>
            </div>
          </motion.div>

          {/* Hybrid */}
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`relative p-5 rounded-2xl cursor-pointer border-2 transition-all duration-300 overflow-hidden ${
                location.remoteWorkPreference === RemotePreference.HYBRID
                  ? 'bg-gradient-to-br from-blue-500 to-cyan-500 border-transparent shadow-lg'
                  : 'bg-white/40 border-white/40 hover:bg-white/60 hover:border-white/60 shadow-sm hover:shadow-md'
              }`}
              onClick={() => updateLocation('remoteWorkPreference', RemotePreference.HYBRID)}
            >
              {location.remoteWorkPreference === RemotePreference.HYBRID && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              )}
              <div className="relative">
                <div className="text-3xl mb-2">🔄</div>
                <p className={`font-bold mb-1 ${location.remoteWorkPreference === RemotePreference.HYBRID ? 'text-white' : 'text-black'}`}>
                  Linh hoạt
                </p>
                <p className={`text-sm ${location.remoteWorkPreference === RemotePreference.HYBRID ? 'text-white/90' : 'text-black/60'}`}>
                  2-3 ngày/tuần
                </p>
              </div>
            </div>
          </motion.div>

          {/* Remote */}
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`relative p-5 rounded-2xl cursor-pointer border-2 transition-all duration-300 overflow-hidden ${
                location.remoteWorkPreference === RemotePreference.REMOTE
                  ? 'bg-gradient-to-br from-green-500 to-emerald-500 border-transparent shadow-lg'
                  : 'bg-white/40 border-white/40 hover:bg-white/60 hover:border-white/60 shadow-sm hover:shadow-md'
              }`}
              onClick={() => updateLocation('remoteWorkPreference', RemotePreference.REMOTE)}
            >
              {location.remoteWorkPreference === RemotePreference.REMOTE && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              )}
              <div className="relative">
                <div className="text-3xl mb-2">🏠</div>
                <p className={`font-bold mb-1 ${location.remoteWorkPreference === RemotePreference.REMOTE ? 'text-white' : 'text-black'}`}>
                  Remote
                </p>
                <p className={`text-sm ${location.remoteWorkPreference === RemotePreference.REMOTE ? 'text-white/90' : 'text-black/60'}`}>
                  100% remote
                </p>
              </div>
            </div>
          </motion.div>

          {/* Flexible */}
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`relative p-5 rounded-2xl cursor-pointer border-2 transition-all duration-300 overflow-hidden ${
                location.remoteWorkPreference === RemotePreference.FLEXIBLE
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 border-transparent shadow-lg'
                  : 'bg-white/40 border-white/40 hover:bg-white/60 hover:border-white/60 shadow-sm hover:shadow-md'
              }`}
              onClick={() => updateLocation('remoteWorkPreference', RemotePreference.FLEXIBLE)}
            >
              {location.remoteWorkPreference === RemotePreference.FLEXIBLE && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              )}
              <div className="relative">
                <div className="text-3xl mb-2">⚡</div>
                <p className={`font-bold mb-1 ${location.remoteWorkPreference === RemotePreference.FLEXIBLE ? 'text-white' : 'text-black'}`}>
                  Lựa chọn
                </p>
                <p className={`text-sm ${location.remoteWorkPreference === RemotePreference.FLEXIBLE ? 'text-white/90' : 'text-black/60'}`}>
                  Tự chọn
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </GlassCard>

      {/* Work Preferences */}
      <GlassCard className="p-6 pointer-events-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
          <h3 className="text-2xl font-bold text-black">
            Sở thích công việc
          </h3>
        </div>
        <div className="space-y-8">
          <motion.div >
            <Label className="text-black/70 text-xs font-semibold mb-3 block uppercase tracking-wide flex items-center gap-2">
              <Briefcase className="h-3.5 w-3.5" />
              Loại hình công việc
            </Label>
            <Select
              value={preferences.workType}
              onValueChange={(value: any) => updatePreferences('workType', value)}
            >
              <SelectTrigger className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-300/40 text-black font-semibold hover:from-orange-500/30 hover:to-red-500/30 transition-all">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full_time">⏰ Toàn thời gian</SelectItem>
                <SelectItem value="part_time">⏱️ Bán thời gian</SelectItem>
                <SelectItem value="contract">📝 Hợp đồng</SelectItem>
                <SelectItem value="freelance">💼 Freelance</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <div>
            <Label className="text-black/70 text-xs font-semibold mb-4 block uppercase tracking-wide flex items-center gap-2">
              <Building className="h-3.5 w-3.5" />
              Quy mô công ty
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { value: CompanySize.STARTUP, label: 'Startup', desc: '1-50', icon: '🚀' },
                { value: CompanySize.SMALL, label: 'Nhỏ', desc: '51-200', icon: '🏢' },
                { value: CompanySize.MEDIUM, label: 'Vừa', desc: '201-1K', icon: '🏗️' },
                { value: CompanySize.LARGE, label: 'Lớn', desc: '1K-10K', icon: '🏛️' },
                { value: CompanySize.ENTERPRISE, label: 'Đại doanh', desc: '>10K', icon: '🌐' },
              ].map((option) => {
                const isSelected = preferences.companySize === option.value;

                return (
                  <motion.div
                    key={option.value}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`p-4 rounded-xl cursor-pointer border-2 transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-br from-orange-500 to-red-500 border-transparent shadow-lg'
                          : 'bg-white/40 border-white/40 hover:bg-white/60 hover:border-white/60 shadow-sm'
                      }`}
                      onClick={() => updatePreferences('companySize', option.value)}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">{option.icon}</div>
                        <p className={`font-bold text-sm mb-0.5 ${isSelected ? 'text-white' : 'text-black'}`}>
                          {option.label}
                        </p>
                        <p className={`text-xs ${isSelected ? 'text-white/90' : 'text-black/60'}`}>
                          {option.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div>
            <Label className="text-black/70 text-xs font-semibold mb-4 block uppercase tracking-wide">
              Ngành nghề quan tâm
            </Label>
            <div className="p-5 rounded-xl bg-white/30 border-2 border-gray-300/50">
              <div className="flex flex-wrap gap-2">
                {allIndustries.map((industry) => (
                  <motion.div
                    key={industry.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant={preferences.industry.includes(industry.value) ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-300 py-2 px-4 ${
                        preferences.industry.includes(industry.value)
                          ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white border-0 shadow-md'
                          : 'bg-white/60 text-black border-slate-300 hover:bg-white hover:border-purple-400/60'
                      }`}
                      onClick={() => toggleIndustry(industry.value)}
                    >
                      {industry.label}
                      {industry.multiplier > 1 && (
                        <span className={`ml-1.5 text-xs font-bold ${preferences.industry.includes(industry.value) ? 'text-yellow-200' : 'text-green-600'}`}>
                          +{Math.round((industry.multiplier - 1) * 100)}%
                        </span>
                      )}
                    </Badge>
                  </motion.div>
                ))}
              </div>
              {preferences.industry.length === 0 ? (
                <div className="text-center py-6 mt-4 border-t-2 border-dashed border-black/20">
                  <p className="text-black/50 text-sm">Chưa chọn ngành nào. Chọn ít nhất 1 ngành.</p>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t-2 border-white/40">
                  <p className="text-black/70 text-sm">
                    <span className="font-semibold">Đã chọn {preferences.industry.length} ngành:</span>{' '}
                    {preferences.industry.map(ind => allIndustries.find(i => i.value === ind)?.label).join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Priority Settings */}
      <GlassCard className="p-6 pointer-events-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
          <h3 className="text-2xl font-bold text-black">
            Ưu tiên của bạn
          </h3>
        </div>
        <div className="space-y-8">
          <motion.div className="p-5 rounded-xl bg-white/30 border-2 border-white/40">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-black/70 text-xs font-semibold uppercase tracking-wide flex items-center gap-2">
                <Users className="h-4 w-4" />
                Cân bằng công việc-cuộc sống
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {preferences.workLifeBalancePriority}
                </span>
                <span className="text-sm text-black/60 font-medium">/10</span>
              </div>
            </div>
            <Slider
              value={[preferences.workLifeBalancePriority]}
              onValueChange={([value]) => updatePreferences('workLifeBalancePriority', value)}
              max={10}
              min={1}
              step={1}
              className="w-full cursor-pointer border-slate-300"
            />
            <div className="flex justify-between mt-2 text-xs text-black/50">
              <span>1 = Không quan trọng</span>
              <span>10 = Rất quan trọng</span>
            </div>
          </motion.div>

          <motion.div className="p-5 rounded-xl bg-white/30 border-2 border-white/40">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-black/70 text-xs font-semibold uppercase tracking-wide flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Phát triển sự nghiệp
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {preferences.careerGrowthPriority}
                </span>
                <span className="text-sm text-black/60 font-medium">/10</span>
              </div>
            </div>
            <Slider
              value={[preferences.careerGrowthPriority]}
              onValueChange={([value]) => updatePreferences('careerGrowthPriority', value)}
              max={10}
              min={1}
              step={1}
              className="w-full cursor-pointer border-slate-300"
            />
            <div className="flex justify-between mt-2 text-xs text-black/50">
              <span>1 = Không quan trọng</span>
              <span>10 = Rất quan trọng</span>
            </div>
          </motion.div>

          <motion.div
            className="p-5 rounded-xl bg-gradient-to-br from-white/40 to-white/20 border-2 border-purple/40 hover:border-purple-400/60 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <Checkbox
                id="salary-negotiable"
                checked={preferences.salaryNegotiable}
                onCheckedChange={(checked) =>
                  updatePreferences('salaryNegotiable', checked)
                }
                className="h-5 w-5 border-2 border-slate-300"
              />
              <Label htmlFor="salary-negotiable" className="text-black font-medium cursor-pointer flex-1 text-base">
                Tôi sẵn sàng đàm phán lương
              </Label>
              {preferences.salaryNegotiable && (
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                  ✓ Đã bật
                </Badge>
              )}
            </div>
          </motion.div>
        </div>
      </GlassCard>

      {/* Info Card */}
      <motion.div
        className="relative rounded-2xl p-6 overflow-hidden border-2 border-yellow-400/40 bg-gradient-to-br from-yellow-50/60 to-orange-50/40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
        <div className="relative flex items-start gap-4">
          <div className="text-3xl">💡</div>
          <div>
            <h4 className="text-black font-bold text-lg mb-2">Mẹo hữu ích</h4>
            <ul className="space-y-2 text-black/80 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span>Các ngành được đánh dấu <span className="font-semibold text-green-600">(+%)</span> có xu hướng trả lương cao hơn</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span>Việc làm việc từ xa có thể giúp bạn có mức lương cạnh tranh hơn</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span>Đàm phán lương thường giúp tăng 10-20% so với mức đề xuất ban đầu</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}