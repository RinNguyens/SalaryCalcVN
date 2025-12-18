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
    setWorkHistory([...workHistory, newExp]);
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
    setEducation([...education, newEdu]);
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
      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold text-black mb-6">
          Tóm tắt kinh nghiệm
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="text-black mb-2 block">
              Tổng số năm kinh nghiệm: {experienceData.totalYears} năm
            </Label>
            <Slider
              value={[experienceData.totalYears]}
              onValueChange={([value]) => updateExperience('totalYears', value)}
              max={30}
              min={0}
              step={0.5}
              className="w-full"
            />
          </div>
          <div>
            <Label className="text-black mb-2 block">
              Số năm kinh nghiệm liên quan: {experienceData.relevantYears} năm
            </Label>
            <Slider
              value={[experienceData.relevantYears]}
              onValueChange={([value]) => updateExperience('relevantYears', value)}
              max={experienceData.totalYears}
              min={0}
              step={0.5}
              className="w-full"
            />
          </div>
          <div>
            <Label className="text-black mb-2 block">
              Số năm kinh nghiệm quản lý: {experienceData.managementYears} năm
            </Label>
            <Slider
              value={[experienceData.managementYears]}
              onValueChange={([value]) => updateExperience('managementYears', value)}
              max={experienceData.totalYears}
              min={0}
              step={0.5}
              className="w-full"
            />
          </div>
          <div>
            <Label className="text-black mb-2 block">
              Số năm làm việc ở nước ngoài: {experienceData.overseasYears} năm
            </Label>
            <Slider
              value={[experienceData.overseasYears]}
              onValueChange={([value]) => updateExperience('overseasYears', value)}
              max={experienceData.totalYears}
              min={0}
              step={0.5}
              className="w-full"
            />
          </div>
        </div>
      </GlassCard>

      {/* Work History */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-black">
            Lịch sử làm việc
          </h3>
          <Button
            onClick={addWorkExperience}
            size="sm"
            className="bg-white/10 border-white/20 text-black hover:bg-white/20"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm kinh nghiệm
          </Button>
        </div>

        {workHistory.length === 0 ? (
          <div className="glass-subtle rounded-xl p-8 text-center">
            <Briefcase className="h-12 w-12 text-black/50 mx-auto mb-3" />
            <p className="text-black/60">
              Chưa có kinh nghiệm làm việc nào. Thêm để tăng độ chính xác.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {workHistory.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-subtle rounded-xl p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-black mb-1 block">Chức danh</Label>
                      <Input
                        value={exp.title}
                        onChange={(e) => updateWorkExperience(index, 'title', e.target.value)}
                        className="bg-white/10 border-white/20 text-black"
                        placeholder="Ví dụ: Senior Developer"
                      />
                    </div>
                    <div>
                      <Label className="text-black mb-1 block">Công ty</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                        className="bg-white/10 border-white/20 text-black"
                        placeholder="Ví dụ: FPT Software"
                      />
                    </div>
                    <div>
                      <Label className="text-black mb-1 block">Ngành</Label>
                      <Select
                        value={exp.industry}
                        onValueChange={(value) => updateWorkExperience(index, 'industry', value)}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-black">
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
                    <div>
                      <Label className="text-black mb-1 block">Cấp bậc</Label>
                      <Select
                        value={exp.level}
                        onValueChange={(value: ExperienceLevel) =>
                          updateWorkExperience(index, 'level', value)
                        }
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-black">
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
                    <div className="md:col-span-2">
                      <Label className="text-black mb-1 block">
                        Số năm làm việc: {exp.years} năm
                      </Label>
                      <Slider
                        value={[exp.years]}
                        onValueChange={([value]) => updateWorkExperience(index, 'years', value)}
                        max={20}
                        min={0.1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeWorkExperience(index)}
                    className="bg-red-500/20 border-red-500/30 text-red-600 hover:bg-red-500/30 ml-4"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-black font-medium">Thành tựu</Label>
                    <Button
                      size="sm"
                      onClick={() => addAchievement(index)}
                      className="bg-white/10 border-white/20 text-black hover:bg-white/20"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Thêm
                    </Button>
                  </div>
                  {exp.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex gap-2 mb-2">
                      <Input
                        value={achievement}
                        onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                        className="bg-white/10 border-white/20 text-black flex-1"
                        placeholder="Mô tả thành tựu của bạn..."
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeAchievement(index, achIndex)}
                        className="bg-red-500/20 border-red-500/30 text-red-600 hover:bg-red-500/30"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </GlassCard>

      {/* Education */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-black">
            Học vấn
          </h3>
          <Button
            onClick={addEducation}
            size="sm"
            className="bg-white/10 border-white/20 text-black hover:bg-white/20"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm học vấn
          </Button>
        </div>

        {education.length === 0 ? (
          <div className="glass-subtle rounded-xl p-8 text-center">
            <GraduationCap className="h-12 w-12 text-black/50 mx-auto mb-3" />
            <p className="text-black/60">
              Thêm thông tin học vấn để tăng uy tín và mức lương dự kiến.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-subtle rounded-xl p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-black mb-1 block">Bằng cấp</Label>
                      <Select
                        value={edu.type}
                        onValueChange={(value: any) => updateEducation(index, 'type', value)}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-black">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high_school">Trung học</SelectItem>
                          <SelectItem value="bachelor">Cử nhân</SelectItem>
                          <SelectItem value="master">Thạc sĩ</SelectItem>
                          <SelectItem value="phd">Tiến sĩ</SelectItem>
                          <SelectItem value="professional">Chuyên môn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-black mb-1 block">Lĩnh vực</Label>
                      <Input
                        value={edu.field}
                        onChange={(e) => updateEducation(index, 'field', e.target.value)}
                        className="bg-white/10 border-white/20 text-black"
                        placeholder="Ví dụ: Computer Science"
                      />
                    </div>
                    <div>
                      <Label className="text-black mb-1 block">Trường</Label>
                      <Input
                        value={edu.school}
                        onChange={(e) => updateEducation(index, 'school', e.target.value)}
                        className="bg-white/10 border-white/20 text-black"
                        placeholder="Ví dụ: Đại học Bách khoa Hà Nội"
                      />
                    </div>
                    <div>
                      <Label className="text-black mb-1 block">GPA (tùy chọn)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        max="4"
                        value={edu.gpa || ''}
                        onChange={(e) => updateEducation(index, 'gpa', parseFloat(e.target.value))}
                        className="bg-white/10 border-white/20 text-black"
                        placeholder="3.5"
                      />
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeEducation(index)}
                    className="bg-red-500/20 border-red-500/30 text-red-600 hover:bg-red-500/30 ml-4"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}