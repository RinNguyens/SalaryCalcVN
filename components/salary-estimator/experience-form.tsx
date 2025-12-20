'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
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
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/shared/glass-card';
import {
  Plus,
  X,
  Building,
  GraduationCap,
  Briefcase,
  Globe,
  Calendar
} from 'lucide-react';
import {
  EducationLevel,
  WorkExperience,
  ExperienceLevel,
  SalaryEstimateRequest
} from '@/types/salary-estimator';

interface ExperienceFormProps {
  data: Partial<SalaryEstimateRequest>;
  onUpdate: (updates: Partial<SalaryEstimateRequest>) => void;
}

export function ExperienceForm({ data, onUpdate }: ExperienceFormProps) {
  const [workHistory, setWorkHistory] = useState<WorkExperience[]>(data.workHistory || []);
  const [education, setEducation] = useState<EducationLevel[]>(data.education || []);

  const experienceData = data.experience || {
    totalYears: 0,
    relevantYears: 0,
    managementYears: 0,
    overseasYears: 0,
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

  const addWorkExperience = () => {
    const newExp: WorkExperience = {
      title: '',
      company: '',
      industry: '',
      level: ExperienceLevel.JUNIOR,
      years: 1,
      achievements: [],
    };
    const updated = [...workHistory, newExp];
    setWorkHistory(updated);
    onUpdate({ workHistory: updated });
  };

  const updateWorkExperience = (index: number, field: string, value: any) => {
    const updated = workHistory.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setWorkHistory(updated);
    onUpdate({ workHistory: updated });
  };

  const removeWorkExperience = (index: number) => {
    const updated = workHistory.filter((_, i) => i !== index);
    setWorkHistory(updated);
    onUpdate({ workHistory: updated });
  };

  const addEducation = () => {
    const newEdu: EducationLevel = {
      type: 'bachelor',
      field: '',
      school: '',
    };
    const updated = [...education, newEdu];
    setEducation(updated);
    onUpdate({ education: updated });
  };

  const updateEducation = (index: number, field: string, value: any) => {
    const updated = education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setEducation(updated);
    onUpdate({ education: updated });
  };

  const removeEducation = (index: number) => {
    const updated = education.filter((_, i) => i !== index);
    setEducation(updated);
    onUpdate({ education: updated });
  };

  const addAchievement = (workIndex: number) => {
    const updated = workHistory.map((exp, i) =>
      i === workIndex ? { ...exp, achievements: [...exp.achievements, ''] } : exp
    );
    setWorkHistory(updated);
    onUpdate({ workHistory: updated });
  };

  const updateAchievement = (workIndex: number, achIndex: number, value: string) => {
    const updated = workHistory.map((exp, i) =>
      i === workIndex
        ? {
          ...exp,
          achievements: exp.achievements.map((a, j) =>
            j === achIndex ? value : a
          ),
        }
        : exp
    );
    setWorkHistory(updated);
    onUpdate({ workHistory: updated });
  };

  const removeAchievement = (workIndex: number, achIndex: number) => {
    const updated = workHistory.map((exp, i) =>
      i === workIndex
        ? {
          ...exp,
          achievements: exp.achievements.filter((_, j) => j !== achIndex),
        }
        : exp
    );
    setWorkHistory(updated);
    onUpdate({ workHistory: updated });
  };

  const updateExperience = (field: string, value: any) => {
    const updated = { ...experienceData, [field]: value };
    onUpdate({ experience: updated });
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Experience Summary */}
      <GlassCard className="p-6 pointer-events-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
          <h3 className="text-2xl font-bold text-black">
            Tóm tắt kinh nghiệm
          </h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4 relative z-10">
          {/* Total Years */}
          <div className="p-4 rounded-lg border-2 border-white/20 bg-white/5 hover:border-purple-400/40 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-black font-semibold text-sm">
                Tổng số năm kinh nghiệm
              </Label>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {experienceData.totalYears}
              </span>
            </div>
            <Slider
              value={[experienceData.totalYears]}
              onValueChange={([value]) => updateExperience('totalYears', value)}
              max={30}
              min={0}
              step={0.5}
              className="w-full cursor-pointer border-slate-300"
            />
            <div className="flex justify-between mt-2 text-xs text-black/50">
              <span>0 năm</span>
              <span>30 năm</span>
            </div>
          </div>

          {/* Relevant Years */}
          <div className="p-4 rounded-lg border-2 border-white/20 bg-white/5 hover:border-blue-400/40 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-black font-semibold text-sm">
                Kinh nghiệm liên quan
              </Label>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {experienceData.relevantYears}
              </span>
            </div>
            <Slider
              value={[experienceData.relevantYears]}
              onValueChange={([value]) => updateExperience('relevantYears', value)}
              max={experienceData.totalYears}
              min={0}
              step={0.5}
              className="w-full cursor-pointer !border-slate-300"
            />
            <div className="flex justify-between mt-2 text-xs text-black/50">
              <span>0 năm</span>
              <span>{experienceData.totalYears} năm</span>
            </div>
          </div>

          {/* Management Years */}
          <div className="p-4 rounded-lg border-2 border-white/20 bg-white/5 hover:border-orange-400/40 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-black font-semibold text-sm">
                Kinh nghiệm quản lý
              </Label>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {experienceData.managementYears}
              </span>
            </div>
            <Slider
              value={[experienceData.managementYears]}
              onValueChange={([value]) => updateExperience('managementYears', value)}
              max={experienceData.totalYears}
              min={0}
              step={0.5}
              className="w-full cursor-pointer border-slate-300"
            />
            <div className="flex justify-between mt-2 text-xs text-black/50">
              <span>0 năm</span>
              <span>{experienceData.totalYears} năm</span>
            </div>
          </div>

          {/* Overseas Years */}
          <div className="p-4 rounded-lg border-2 border-white/20 bg-white/5 hover:border-green-400/40 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-black font-semibold text-sm flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Làm việc nước ngoài
              </Label>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {experienceData.overseasYears}
              </span>
            </div>
            <Slider
              value={[experienceData.overseasYears]}
              onValueChange={([value]) => updateExperience('overseasYears', value)}
              max={experienceData.totalYears}
              min={0}
              step={0.5}
              className="w-full cursor-pointer border-slate-300"
            />
            <div className="flex justify-between mt-2 text-xs text-black/50">
              <span>0 năm</span>
              <span>{experienceData.totalYears} năm</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Work History */}
      <GlassCard className="p-6 pointer-events-auto overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-black">
              Lịch sử làm việc
            </h3>
          </div>
          <Button
            onClick={addWorkExperience}
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm kinh nghiệm
          </Button>
        </div>

        {workHistory.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-2xl p-12 text-center overflow-hidden border-2 border-dashed border-black/20 bg-gradient-to-br from-white/30 to-white/10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mb-4">
                <Briefcase className="h-10 w-10 text-blue-600" />
              </div>
              <p className="text-black/70 text-lg font-medium">
                Chưa có kinh nghiệm làm việc nào
              </p>
              <p className="text-black/50 text-sm mt-2">
                Thêm kinh nghiệm để tăng độ chính xác của ước tính
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="relative space-y-6">
            {/* Timeline connector */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-500/40 via-cyan-500/40 to-transparent hidden md:block"></div>

            {workHistory.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-[18px] top-6 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-4 border-white shadow-lg hidden md:block z-10"></div>

                <div className="md:ml-12 group">
                  <div className="relative rounded-2xl p-6 bg-white/40 border-2 border-white/40 hover:border-blue-400/60 hover:bg-white/60 transition-all duration-300 shadow-sm hover:shadow-xl">
                    {/* Header section with title, company, and remove button */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1 space-y-4">
                        {/* Title and Company row */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-black/70 text-xs font-semibold mb-2 block uppercase tracking-wide">
                              Chức danh
                            </Label>
                            <Input
                              value={exp.title}
                              onChange={(e) => updateWorkExperience(index, 'title', e.target.value)}
                              className="bg-white/60 border-slate-300 text-black font-semibold text-lg hover:bg-white/80 focus:bg-white transition-colors"
                              placeholder="Ví dụ: Senior Developer"
                            />
                          </div>
                          <div>
                            <Label className="text-black/70 text-xs font-semibold mb-2 block uppercase tracking-wide flex items-center gap-2">
                              <Building className="h-3.5 w-3.5" />
                              Công ty
                            </Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                              className="bg-white/60 border-slate-300 text-black font-medium hover:bg-white/80 focus:bg-white transition-colors"
                              placeholder="Ví dụ: FPT Software"
                            />
                          </div>
                        </div>

                        {/* Level, Industry, and Years badges */}
                        <div className="flex flex-wrap gap-3 items-center">
                          <div className="flex-1 min-w-[200px]">
                            <Label className="text-black/70 text-xs font-semibold mb-2 block uppercase tracking-wide">
                              Cấp bậc
                            </Label>
                            <Select
                              value={exp.level}
                              onValueChange={(value: ExperienceLevel) =>
                                updateWorkExperience(index, 'level', value)
                              }
                            >
                              <SelectTrigger className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-300/40 text-black font-semibold hover:from-purple-500/30 hover:to-pink-500/30 transition-all">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="intern">Intern</SelectItem>
                                <SelectItem value="junior">Junior</SelectItem>
                                <SelectItem value="mid_level">Mid-level</SelectItem>
                                <SelectItem value="senior">Senior</SelectItem>
                                <SelectItem value="lead">Lead</SelectItem>
                                <SelectItem value="manager">Manager</SelectItem>
                                <SelectItem value="director">Director</SelectItem>
                                <SelectItem value="vp">VP</SelectItem>
                                <SelectItem value="c_level">C-level</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex-1 min-w-[200px]">
                            <Label className="text-black/70 text-xs font-semibold mb-2 block uppercase tracking-wide">
                              Ngành
                            </Label>
                            <Select
                              value={exp.industry}
                              onValueChange={(value) => updateWorkExperience(index, 'industry', value)}
                            >
                              <SelectTrigger className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-300/40 text-black font-semibold hover:from-blue-500/30 hover:to-cyan-500/30 transition-all">
                                <SelectValue placeholder="Chọn ngành" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="tech">Công nghệ</SelectItem>
                                <SelectItem value="finance">Tài chính</SelectItem>
                                <SelectItem value="ecommerce">E-commerce</SelectItem>
                                <SelectItem value="fintech">Fintech</SelectItem>
                                <SelectItem value="consulting">Tư vấn</SelectItem>
                                <SelectItem value="manufacturing">Sản xuất</SelectItem>
                                <SelectItem value="education">Giáo dục</SelectItem>
                                <SelectItem value="healthcare">Y tế</SelectItem>
                                <SelectItem value="other">Khác</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Years slider */}
                        <div className="pt-2">
                          <div className="flex items-center justify-between mb-3">
                            <Label className="text-black/70 text-xs font-semibold uppercase tracking-wide flex items-center gap-2">
                              <Calendar className="h-3.5 w-3.5" />
                              Thời gian
                            </Label>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                {exp.years}
                              </span>
                              <span className="text-sm text-black/60 font-medium">năm</span>
                            </div>
                          </div>
                          <Slider
                            value={[exp.years]}
                            onValueChange={([value]) => updateWorkExperience(index, 'years', value)}
                            max={20}
                            min={0.1}
                            step={0.1}
                            className="w-full cursor-pointer border-slate-300"
                          />
                          <div className="flex justify-between mt-1 text-xs text-black/40">
                            <span>0.1 năm</span>
                            <span>20 năm</span>
                          </div>
                        </div>
                      </div>

                      {/* Remove button */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeWorkExperience(index)}
                        className="ml-4 bg-red-500/10 border-red-300/40 text-red-600 hover:bg-red-500/20 hover:border-red-400/60 transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Achievements section */}
                    <div className="border-t-2 border-white/40 pt-5 mt-2">
                      <div className="flex items-center justify-between mb-4">
                        <Label className="text-black/70 text-xs font-semibold uppercase tracking-wide">
                          Thành tựu nổi bật
                        </Label>
                        <Button
                          size="sm"
                          onClick={() => addAchievement(index)}
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 hover:from-emerald-600 hover:to-teal-600 shadow-sm hover:shadow-md transition-all duration-300 h-7"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Thêm
                        </Button>
                      </div>

                      {exp.achievements.length === 0 ? (
                        <div className="text-center py-4 px-6 rounded-lg bg-white/30 border border-dashed border-black/20">
                          <p className="text-black/50 text-sm">
                            Thêm thành tựu để tăng ấn tượng
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <motion.div
                              key={achIndex}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex gap-2 items-start group/achievement"
                            >
                              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-500/30 flex items-center justify-center mt-2">
                                <div className="w-2 h-2 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600"></div>
                              </div>
                              <Input
                                value={achievement}
                                onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                                className="bg-white/50 border-slate-300 text-black flex-1 hover:bg-white/70 focus:bg-white transition-colors"
                                placeholder="Mô tả thành tựu của bạn..."
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeAchievement(index, achIndex)}
                                className="bg-red-500/10 border-red-300/40 text-red-600 hover:bg-red-500/20 opacity-0 group-hover/achievement:opacity-100 transition-all duration-300"
                              >
                                <X className="h-3.5 w-3.5" />
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </GlassCard>

      {/* Education */}
      <GlassCard className="p-6 pointer-events-auto overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-black">
              Học vấn
            </h3>
          </div>
          <Button
            onClick={addEducation}
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm học vấn
          </Button>
        </div>

        {education.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-2xl p-12 text-center overflow-hidden border-2 border-dashed border-black/20 bg-gradient-to-br from-white/30 to-white/10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]"></div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4">
                <GraduationCap className="h-10 w-10 text-purple-600" />
              </div>
              <p className="text-black/70 text-lg font-medium">
                Chưa có thông tin học vấn
              </p>
              <p className="text-black/50 text-sm mt-2">
                Thêm học vấn để tăng uy tín và mức lương dự kiến
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="relative space-y-6">
            {/* Timeline connector */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-purple-500/40 via-pink-500/40 to-transparent hidden md:block"></div>

            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-[18px] top-6 w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-4 border-white shadow-lg hidden md:block z-10"></div>

                <div className="md:ml-12 group">
                  <div className="relative rounded-2xl p-6 bg-white/40 border-2 border-white/40 hover:border-purple-400/60 hover:bg-white/60 transition-all duration-300 shadow-sm hover:shadow-xl">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1 space-y-4">
                        {/* Degree Type and Field */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-black/70 text-xs font-semibold mb-2 block uppercase tracking-wide flex items-center gap-2">
                              <GraduationCap className="h-3.5 w-3.5" />
                              Bằng cấp
                            </Label>
                            <Select
                              value={edu.type}
                              onValueChange={(value: any) => updateEducation(index, 'type', value)}
                            >
                              <SelectTrigger className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-300/40 text-black font-semibold hover:from-purple-500/30 hover:to-pink-500/30 transition-all">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="high_school">🎓 Trung học</SelectItem>
                                <SelectItem value="bachelor">🎓 Cử nhân</SelectItem>
                                <SelectItem value="master">🎓 Thạc sĩ</SelectItem>
                                <SelectItem value="phd">🎓 Tiến sĩ</SelectItem>
                                <SelectItem value="professional">🎓 Chuyên môn</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label className="text-black/70 text-xs font-semibold mb-2 block uppercase tracking-wide">
                              Lĩnh vực
                            </Label>
                            <Input
                              value={edu.field}
                              onChange={(e) => updateEducation(index, 'field', e.target.value)}
                              className="bg-white/60 border-slate-300 text-black font-semibold hover:bg-white/80 focus:bg-white transition-colors"
                              placeholder="Ví dụ: Computer Science"
                            />
                          </div>
                        </div>

                        {/* School and GPA */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-black/70 text-xs font-semibold mb-2 block uppercase tracking-wide flex items-center gap-2">
                              <Building className="h-3.5 w-3.5" />
                              Trường
                            </Label>
                            <Input
                              value={edu.school}
                              onChange={(e) => updateEducation(index, 'school', e.target.value)}
                              className="bg-white/60 border-slate-300 text-black font-medium hover:bg-white/80 focus:bg-white transition-colors"
                              placeholder="Ví dụ: Đại học Bách khoa Hà Nội"
                            />
                          </div>

                          <div>
                            <Label className="text-black/70 text-xs font-semibold mb-2 block uppercase tracking-wide">
                              GPA (tùy chọn)
                            </Label>
                            <div className="relative">
                              <Input
                                type="number"
                                step="0.1"
                                min="0"
                                max="4"
                                value={edu.gpa || ''}
                                onChange={(e) => updateEducation(index, 'gpa', parseFloat(e.target.value))}
                                className="bg-white/60 border-slate-300 text-black font-semibold hover:bg-white/80 focus:bg-white transition-colors"
                                placeholder="3.5"
                              />
                              {edu.gpa && edu.gpa >= 3.5 && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-xs">
                                    Xuất sắc
                                  </Badge>
                                </div>
                              )}
                            </div>
                            <div className="flex justify-between mt-1 text-xs text-black/40">
                              <span>0.0</span>
                              <span>4.0</span>
                            </div>
                          </div>
                        </div>

                        {/* Education level badge */}
                        <div className="flex items-center gap-2 pt-2">
                          {edu.type === 'phd' && (
                            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                              🎓 Học vị cao nhất
                            </Badge>
                          )}
                          {edu.type === 'master' && (
                            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
                              🎓 Bằng thạc sĩ
                            </Badge>
                          )}
                          {edu.type === 'bachelor' && (
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                              🎓 Bằng đại học
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Remove button */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeEducation(index)}
                        className="ml-4 bg-red-500/10 border-red-300/40 text-red-600 hover:bg-red-500/20 hover:border-red-400/60 transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}