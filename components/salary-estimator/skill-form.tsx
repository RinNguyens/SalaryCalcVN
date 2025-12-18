'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/shared/glass-card';
import {
  X,
  Plus,
  Search,
  Code,
  Database,
  Cloud,
  Palette,
  Users,
  Award,
  BookOpen
} from 'lucide-react';
import { SKILL_DATABASE, SkillCategory, ProficiencyLevel, DemandLevel } from '@/types/salary-estimator';
import type { Skill } from '@/types/salary-estimator';

interface SkillFormProps {
  skills: Skill[];
  onUpdate: (skills: Skill[]) => void;
}

const categoryIcons = {
  programming: Code,
  framework: Code,
  database: Database,
  cloud: Cloud,
  devops: Cloud,
  design: Palette,
  soft_skills: Users,
  management: Users,
  domain: BookOpen,
  certification: Award,
};

const categoryLabels = {
  programming: 'Ngôn ngữ lập trình',
  framework: 'Framework',
  database: 'Database',
  cloud: 'Cloud/DevOps',
  devops: 'DevOps',
  design: 'Thiết kế',
  soft_skills: 'Kỹ năng mềm',
  management: 'Quản lý',
  domain: 'Domain Knowledge',
  certification: 'Chứng chỉ',
};

const proficiencyLabels = {
  beginner: 'Sơ cấp',
  intermediate: 'Trung cấp',
  advanced: 'Cao cấp',
  expert: 'Chuyên gia',
};

export function SkillForm({ skills, onUpdate }: SkillFormProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all');
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({});

  const filteredSkills = Object.entries(SKILL_DATABASE)
    .filter(([category]) => selectedCategory === 'all' || category === selectedCategory)
    .flatMap(([category, skills]) =>
      skills.filter(skill =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).map(skill => ({
        ...skill,
        category: category as SkillCategory,
      }))
    );

  const addSkill = (skill: any, proficiency: ProficiencyLevel) => {
    if (skills.some(s => s.id === skill.id)) return;

    const newSkillEntry: Skill = {
      id: skill.id,
      name: skill.name,
      category: skill.category,
      proficiency,
      yearsExperience: 1,
      isPrimary: skills.length === 0,
    };

    onUpdate([...skills, newSkillEntry]);
  };

  const updateSkill = (skillId: string, updates: Partial<Skill>) => {
    onUpdate(skills.map(s => s.id === skillId ? { ...s, ...updates } : s));
  };

  const removeSkill = (skillId: string) => {
    const updated = skills.filter(s => s.id !== skillId);
    // If removing primary skill, make first remaining skill primary
    if (skills.find(s => s.id === skillId)?.isPrimary && updated.length > 0) {
      updated[0].isPrimary = true;
    }
    onUpdate(updated);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-black mb-6">
          Chọn kỹ năng của bạn
        </h2>

        {/* Selected Skills */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-black mb-4">
            Kỹ năng đã chọn ({skills.length})
          </h3>
          {skills.length === 0 ? (
            <div className="glass-subtle rounded-xl p-8 text-center">
              <Code className="h-12 w-12 text-black/50 mx-auto mb-3" />
              <p className="text-black/60">
                Chưa có kỹ năng nào được chọn. Hãy bắt đầu thêm kỹ năng bên dưới.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  variants={itemVariants}
                  className="glass-subtle rounded-xl p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const Icon = categoryIcons[skill.category];
                        return Icon ? <Icon className="h-5 w-5 text-purple-300" /> : null;
                      })()}
                      <div>
                        <h4 className="text-black font-medium">{skill.name}</h4>
                        <p className="text-black/60 text-sm">
                          {categoryLabels[skill.category]} • {skill.yearsExperience} năm kinh nghiệm
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Select
                        value={skill.proficiency}
                        onValueChange={(value: ProficiencyLevel) =>
                          updateSkill(skill.id, { proficiency: value })
                        }
                      >
                        <SelectTrigger className="w-32 bg-white/10 border-white/20 text-black">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(proficiencyLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={skill.isPrimary}
                          onCheckedChange={(checked) =>
                            updateSkill(skill.id, { isPrimary: !!checked })
                          }
                        />
                        <Label className="text-black/80 text-sm">Chính</Label>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeSkill(skill.id)}
                        className="bg-red-500/20 border-red-500/30 text-red-600 hover:bg-red-500/30"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Label className="text-black/80 text-sm">
                      Kinh nghiệm: {skill.yearsExperience} năm
                    </Label>
                    <Slider
                      value={[skill.yearsExperience]}
                      onValueChange={([value]) =>
                        updateSkill(skill.id, { yearsExperience: value })
                      }
                      max={20}
                      min={0}
                      step={0.5}
                      className="mt-1"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/50" />
            <Input
              placeholder="Tìm kiếm kỹ năng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-black placeholder:text-black/50"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' ? 'bg-purple-500 text-black' : 'bg-white/10 border-white/20 text-black hover:bg-white/20'}
            >
              Tất cả
            </Button>
            {Object.entries(categoryLabels).map(([category, label]) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category as SkillCategory)}
                className={selectedCategory === category ? 'bg-purple-500 text-black' : 'bg-white/10 border-white/20 text-black hover:bg-white/20'}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Available Skills */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-black mb-4">
            Kỹ năng có sẵn
          </h3>
          <div className="grid gap-3 max-h-96 overflow-y-auto">
            {filteredSkills.map((skill) => {
              const Icon = categoryIcons[skill.category];
              const isAdded = skills.some(s => s.id === skill.id);
              const demandColors = {
                very_low: 'text-red-400',
                low: 'text-orange-400',
                moderate: 'text-yellow-400',
                high: 'text-green-400',
                very_high: 'text-emerald-400',
              };

              return (
                <motion.div
                  key={skill.id}
                  variants={itemVariants}
                  className={`glass-subtle rounded-xl p-4 cursor-pointer transition-all ${
                    isAdded ? 'opacity-50' : 'hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {Icon && <Icon className="h-5 w-5 text-purple-300" />}
                      <div>
                        <h4 className="text-black font-medium">{skill.name}</h4>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-black/60">
                            {categoryLabels[skill.category]}
                          </span>
                          <span className={`font-medium ${demandColors[skill.demand]}`}>
                            {skill.demand === 'very_high' ? 'Rất hot' :
                             skill.demand === 'high' ? 'Hot' :
                             skill.demand === 'moderate' ? 'Bình thường' :
                             skill.demand === 'low' ? 'Thấp' : 'Rất thấp'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Select
                      value={isAdded ? 'added' : 'not_added'}
                      onValueChange={(value) => {
                        if (value !== 'added' && value !== 'not_added') {
                          addSkill(skill, value as ProficiencyLevel);
                        }
                      }}
                      disabled={isAdded}
                    >
                      <SelectTrigger className="w-40 bg-white/10 border-white/20 text-black">
                        <SelectValue placeholder="Thêm kỹ năng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not_added" disabled>
                          Chọn trình độ
                        </SelectItem>
                        <SelectItem value="beginner">
                          Sơ cấp ({Math.round(25000000 * 0.5).toLocaleString('vi-VN')}đ/tháng)
                        </SelectItem>
                        <SelectItem value="intermediate">
                          Trung cấp ({Math.round(25000000 * 0.75).toLocaleString('vi-VN')}đ/tháng)
                        </SelectItem>
                        <SelectItem value="advanced">
                          Cao cấp ({(25000000).toLocaleString('vi-VN')}đ/tháng)
                        </SelectItem>
                        <SelectItem value="expert">
                          Chuyên gia ({Math.round(25000000 * 1.5).toLocaleString('vi-VN')}đ/tháng)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tips */}
        <motion.div
          className="mt-6 p-4 glass-subtle rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-black/80 text-sm">
            <span className="font-semibold">💡 Mẹo:</span> Chọn kỹ năng chính (primary) là kỹ năng bạn làm tốt nhất
            và có nhiều kinh nghiệm nhất. Điều này giúp tính toán chính xác hơn.
          </p>
        </motion.div>
      </GlassCard>
    </motion.div>
  );
}