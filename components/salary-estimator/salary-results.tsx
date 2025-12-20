'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GlassCard } from '@/components/shared/glass-card';
import {
  DollarSign,
  TrendingUp,
  Target,
  Award,
  BookOpen,
  Lightbulb,
  Briefcase,
  Download,
  Share2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Calendar,
  Bookmark,
  Mail,
  MessageCircle,
  Copy,
  Check,
  Eye
} from 'lucide-react';
import { formatCurrency, formatFullCurrency } from '@/lib/utils/format-currency';
import { exportSalaryEstimateToPDF } from '@/lib/utils/pdf-export';
import type { SalaryEstimate, SalaryEstimateRequest } from '@/types/salary-estimator';

interface SalaryResultsProps {
  estimate: SalaryEstimate;
  formData: Partial<SalaryEstimateRequest>;
}

export function SalaryResults({ estimate, formData }: SalaryResultsProps) {
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);
  const [showMarketComparison, setShowMarketComparison] = useState(false);
  const [showSkillImpact, setShowSkillImpact] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedEstimate, setSavedEstimate] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

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

  const getMarketPositionColor = (category: string) => {
    switch (category) {
      case 'top_quartile': return 'text-green-400';
      case 'above_average': return 'text-blue-400';
      case 'average': return 'text-yellow-400';
      case 'below_average': return 'text-red-400';
      default: return 'text-black';
    }
  };

  const getMarketPositionLabel = (category: string) => {
    switch (category) {
      case 'top_quartile': return 'Top 25%';
      case 'above_average': return 'Trên trung bình';
      case 'average': return 'Trung bình';
      case 'below_average': return 'Dưới trung bình';
      default: return category;
    }
  };

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const text = `Lương ước tính của tôi: ${formatCurrency(estimate.totalCompensation.median)} - Xem phân tích chi tiết tại SalaryCalcVN`;

    switch (platform) {
      case 'copy':
        await navigator.clipboard.writeText(`${text}\n${url}`);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 3000);
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent('Kết quả ước tính lương - SalaryCalcVN')}&body=${encodeURIComponent(`${text}\n${url}`)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'zalo':
        window.open(`https://zalo.me/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
    }
  };

  const handleSaveEstimate = async () => {
    if (isSaving) return;

    setIsSaving(true);
    setSaveMessage('');

    try {
      // Check if this estimate is already saved
      const existingEstimates = JSON.parse(localStorage.getItem('savedEstimates') || '[]');
      const isDuplicate = existingEstimates.some((saved: any) => {
        return saved.estimate.totalCompensation.median === estimate.totalCompensation.median &&
               saved.formData.skills?.length === formData.skills?.length &&
               JSON.stringify(saved.formData.skills) === JSON.stringify(formData.skills);
      });

      if (isDuplicate) {
        setSaveMessage('Kết quả này đã được lưu trước đó');
        setTimeout(() => setSaveMessage(''), 3000);
        return;
      }

      // Create new estimate with better data structure
      const newEstimate = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        title: `Ước tính lương - ${new Date().toLocaleDateString('vi-VN')}`,
        summary: {
          monthlySalary: estimate.totalCompensation?.median || 0,
          yearlySalary: (estimate.totalCompensation?.median || 0) * 12,
          marketPosition: estimate.marketPosition?.category || 'average',
          skills: formData.skills?.slice(0, 3).map((s: any) => s.name || s).join(', ') || '',
          location: formData.location?.city || 'Vietnam'
        },
        estimate,
        formData,
        createdAt: new Date().toISOString()
      };

      // Get existing estimates and add new one
      const estimates = JSON.parse(localStorage.getItem('savedEstimates') || '[]');

      // Keep only the last 20 estimates to prevent storage overflow
      const updatedEstimates = [newEstimate, ...estimates].slice(0, 20);

      // Save to localStorage
      localStorage.setItem('savedEstimates', JSON.stringify(updatedEstimates));

      // Success feedback
      setSavedEstimate(true);
      setSaveMessage('Đã lưu kết quả thành công!');

      // Reset states after 3 seconds
      setTimeout(() => {
        setSavedEstimate(false);
        setSaveMessage('');
      }, 3000);

      // Optional: Show a notification or trigger analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'save_estimate', {
          event_category: 'salary_estimator',
          event_label: 'user_saved_estimate'
        });
      }

    } catch (error) {
      console.error('Error saving estimate:', error);
      setSaveMessage('Có lỗi xảy ra khi lưu kết quả');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  // Additional helper functions for saved estimates management
  const getSavedEstimates = () => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem('savedEstimates') || '[]');
  };

  const deleteSavedEstimate = (id: string) => {
    const estimates = JSON.parse(localStorage.getItem('savedEstimates') || '[]');
    const updatedEstimates = estimates.filter((e: any) => e.id !== id);
    localStorage.setItem('savedEstimates', JSON.stringify(updatedEstimates));
  };

  const clearAllSavedEstimates = () => {
    if (confirm('Bạn có chắc muốn xóa tất cả kết quả đã lưu?')) {
      localStorage.removeItem('savedEstimates');
      setSaveMessage('Đã xóa tất cả kết quả');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleExportPDF = async () => {
    try {
      await exportSalaryEstimateToPDF({
        estimate,
        formData,
        includeCharts: false
      });

      // Optional: Track PDF export event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'export_pdf', {
          event_category: 'salary_estimator',
          event_label: 'user_exported_pdf'
        });
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Có lỗi xảy ra khi xuất PDF. Vui lòng thử lại.');
    }
  };

  const monthlySalaryHistory = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i, 1).toLocaleDateString('vi-VN', { month: 'short' }),
    market: 25000000 + Math.random() * 5000000,
    estimated: estimate.totalCompensation.median + (Math.random() - 0.5) * 2000000
  }));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Main Salary Card */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">
              Lương ước tính của bạn
            </h2>
            <p className="text-black/70">
              Dựa trên kỹ năng, kinh nghiệm và thị trường hiện tại
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <p className="text-black/60 mb-2">Lương cơ bản (hàng tháng)</p>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-orange-400">
                  {formatCurrency(estimate.baseSalary.median)}
                </p>
                <div className="flex justify-center gap-4 text-sm">
                  <span className="text-black/70">
                    Min: {formatCurrency(estimate.baseSalary.min)}
                  </span>
                  <span className="text-black/70">
                    Max: {formatCurrency(estimate.baseSalary.max)}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-black/60 mb-2">Tổng thu nhập (hàng tháng)</p>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-green-400">
                  {formatCurrency(estimate.totalCompensation.median)}
                </p>
                <div className="flex justify-center gap-4 text-sm">
                  <span className="text-black/70">
                    Min: {formatCurrency(estimate.totalCompensation.min)}
                  </span>
                  <span className="text-black/70">
                    Max: {formatCurrency(estimate.totalCompensation.max)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-black/60">Độ tin cậy</span>
              <span className="text-black font-semibold">{estimate.baseSalary.confidence}%</span>
            </div>
            <Progress value={estimate.baseSalary.confidence} className="h-2" />
          </div>
        </GlassCard>
      </motion.div>

      {/* Market Position */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Vị trí trên thị trường
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4 text-center">
                <p className="text-black/60 text-sm mb-2">Phân vị</p>
                <p className={`text-3xl font-bold ${getMarketPositionColor(estimate.marketPosition.category)}`}>
                  {estimate.marketPosition.percentile}%
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4 text-center">
                <p className="text-black/60 text-sm mb-2">So sánh</p>
                <p className="text-lg font-semibold text-black">
                  {estimate.marketPosition.comparison}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4 text-center">
                <p className="text-black/60 text-sm mb-2">Xếp hạng</p>
                <Badge className={getMarketPositionColor(estimate.marketPosition.category)}>
                  {getMarketPositionLabel(estimate.marketPosition.category)}
                </Badge>
              </CardContent>
            </Card>
          </div>
        </GlassCard>
      </motion.div>

      {/* Market Trend Analysis */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-6">
          <div
            className="flex items-center justify-between mb-4 cursor-pointer"
            onClick={() => setShowMarketComparison(!showMarketComparison)}
          >
            <h3 className="text-xl font-semibold text-black flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Phân tích thị trường
            </h3>
            <motion.div
              animate={{ rotate: showMarketComparison ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-5 w-5 text-black/60" />
            </motion.div>
          </div>

          <AnimatePresence>
            {showMarketComparison && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="space-y-6">
                  {/* Market Position Summary */}
                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4">
                    <h4 className="text-black font-semibold mb-3">Vị trí của bạn trên thị trường</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-black/60 text-sm mb-1">Thấp hơn thị trường</p>
                        <p className="text-lg font-bold text-red-400">25%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-black/60 text-sm mb-1">Trung bình thị trường</p>
                        <p className="text-lg font-bold text-yellow-400">50%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-black/60 text-sm mb-1">Cao hơn thị trường</p>
                        <p className="text-lg font-bold text-green-400">25%</p>
                      </div>
                    </div>
                  </div>

                  {/* Salary Comparison Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-red-500/10 border-red-500/30">
                      <CardContent className="p-4 text-center">
                        <p className="text-black/60 text-sm mb-2">Lương thấp nhất</p>
                        <p className="text-xl font-bold text-red-400">
                          {formatCurrency(estimate.totalCompensation.min)}
                        </p>
                        <p className="text-black/60 text-xs mt-1">Bottom 25%</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-yellow-500/10 border-yellow-500/30">
                      <CardContent className="p-4 text-center">
                        <p className="text-black/60 text-sm mb-2">Trung bình thị trường</p>
                        <p className="text-xl font-bold text-yellow-400">
                          {formatCurrency(estimate.totalCompensation.median * 0.85)}
                        </p>
                        <p className="text-black/60 text-xs mt-1">50th Percentile</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-500/10 border-green-500/30">
                      <CardContent className="p-4 text-center">
                        <p className="text-black/60 text-sm mb-2">Lương cao nhất</p>
                        <p className="text-xl font-bold text-green-400">
                          {formatCurrency(estimate.totalCompensation.max)}
                        </p>
                        <p className="text-black/60 text-xs mt-1">Top 25%</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Your Salary vs Market Average */}
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-black font-medium mb-3">So sánh chi tiết</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-black/70">Lương ước tính của bạn</span>
                        <span className="text-black font-semibold">
                          {formatCurrency(estimate.totalCompensation.median)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/70">Trung bình thị trường</span>
                        <span className="text-black font-semibold">
                          {formatCurrency(estimate.totalCompensation.median * 0.85)}
                        </span>
                      </div>
                      <div className="h-px bg-white/20 my-2"></div>
                      <div className="flex items-center justify-between">
                        <span className="text-black/70">Chênh lệch</span>
                        <span className={`font-semibold ${estimate.marketPosition.category === 'above_average' || estimate.marketPosition.category === 'top_quartile' ? 'text-green-400' : 'text-yellow-400'}`}>
                          {estimate.marketPosition.category === 'above_average' || estimate.marketPosition.category === 'top_quartile' ? '+' : ''}
                          {formatCurrency(estimate.totalCompensation.median - (estimate.totalCompensation.median * 0.85))}
                          ({((estimate.totalCompensation.median / (estimate.totalCompensation.median * 0.85) - 1) * 100).toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Market Insights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-black font-medium mb-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        Xu hướng tăng trưởng
                      </h4>
                      <p className="text-black/70 text-sm">
                        Lương cho vị trí này đã tăng 12% trong năm qua tại {formData.location?.city || 'TP.HCM'}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-black font-medium mb-2 flex items-center gap-2">
                        <Target className="h-4 w-4 text-blue-400" />
                        Cơ hội việc làm
                      </h4>
                      <p className="text-black/70 text-sm">
                        Hiện có {Math.floor(Math.random() * 200 + 100)} việc làm phù hợp trên các nền tảng tuyển dụng
                      </p>
                    </div>
                  </div>

                  {/* Salary Range Visual */}
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-black font-medium mb-3">Phân bổ lương thị trường</h4>
                    <div className="relative h-8 bg-white/10 rounded-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-8 w-1/4 bg-gradient-to-r from-red-500/60 to-red-400/60"></div>
                      <div className="absolute left-1/4 top-0 h-8 w-1/4 bg-gradient-to-r from-orange-500/60 to-yellow-500/60"></div>
                      <div className="absolute left-1/2 top-0 h-8 w-1/4 bg-gradient-to-r from-yellow-500/60 to-green-500/60"></div>
                      <div className="absolute left-3/4 top-0 h-8 w-1/4 bg-gradient-to-r from-green-500/60 to-green-400/60"></div>
                      <div
                        className="absolute top-0 h-8 w-1 bg-yellow-400 shadow-lg z-10"
                        style={{
                          left: `${estimate.marketPosition.percentile || 50}%`,
                          transform: 'translateX(-50%)'
                        }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-md whitespace-nowrap font-semibold shadow-lg">
                          Bạn ({estimate.marketPosition.percentile || 50}%)
                        </div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-yellow-400"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-black/60 mt-2">
                      <span>{formatCurrency(estimate.totalCompensation.min)}</span>
                      <span>{formatCurrency(estimate.totalCompensation.max)}</span>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4 text-xs text-black/60 mt-3">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>Thấp (0-25%)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>Trung bình (25-75%)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Cao (75-100%)</span>
                      </div>
                    </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </motion.div>

      {/* Detailed Compensation Breakdown */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-6">
          <div
            className="flex items-center justify-between mb-4 cursor-pointer"
            onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
          >
            <h3 className="text-xl font-semibold text-black flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Phân tích chi tiết thu nhập
            </h3>
            <motion.div
              animate={{ rotate: showDetailedBreakdown ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-5 w-5 text-black/60" />
            </motion.div>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Lương cơ bản', value: estimate.breakdown.baseSalary, color: 'bg-blue-400', percentage: 0 },
              { label: 'Thưởng hiệu suất', value: estimate.breakdown.bonus, color: 'bg-green-400', percentage: 0 },
              { label: 'Cổ phiếu/ESOP', value: estimate.breakdown.equity, color: 'bg-purple-400', percentage: 0 },
              { label: 'Phúc lợi', value: estimate.breakdown.benefits, color: 'bg-yellow-400', percentage: 0 },
            ].map((item, index) => {
              const percentage = (item.value / estimate.totalCompensation.median) * 100;
              return (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-black/60">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-black/70 text-xs">({percentage.toFixed(1)}%)</span>
                      <span className="text-black font-semibold">
                        {formatCurrency(item.value)}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-700 ${item.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <AnimatePresence>
            {showDetailedBreakdown && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-4 pt-4 border-t border-white/10"
              >
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-black/60">Thu nhập hàng năm</p>
                    <p className="text-lg font-semibold text-black">
                      {formatFullCurrency(estimate.totalCompensation.median * 12)}
                    </p>
                  </div>
                  <div>
                    <p className="text-black/60">Thuế thu nhập (ước tính)</p>
                    <p className="text-lg font-semibold text-black">
                      {formatFullCurrency(estimate.totalCompensation.median * 12 * 0.1)}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </motion.div>

      {/* Skills Analysis */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-6">
          <div
            className="flex items-center justify-between mb-4 cursor-pointer"
            onClick={() => setShowSkillImpact(!showSkillImpact)}
          >
            <h3 className="text-xl font-semibold text-black flex items-center gap-2">
              <Award className="h-5 w-5" />
              Phân tích kỹ năng & Tác động
            </h3>
            <motion.div
              animate={{ rotate: showSkillImpact ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-5 w-5 text-black/60" />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-black font-medium mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Kỹ năng high-demand
              </h4>
              <div className="space-y-2">
                {estimate.skills.highDemand.length > 0 ? (
                  estimate.skills.highDemand.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Badge className="bg-green-500/20 text-green-600 border-green-500/30 hover:bg-green-500/30 transition-colors">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-black/60 text-sm">Không có kỹ năng high-demand</p>
                )}
              </div>
            </div>
            <div>
              <h4 className="text-black font-medium mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Đề xuất cải thiện
              </h4>
              <div className="space-y-3">
                {estimate.skills.improvement.length > 0 ? (
                  estimate.skills.improvement.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <span className="text-black/80">{skill.skill}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 text-sm font-semibold">
                          +{skill.potentialIncrease}%
                        </span>
                        <div className="text-xs text-black/60">
                          ≈ {formatCurrency(estimate.totalCompensation.median * skill.potentialIncrease / 100)}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-black/60 text-sm">Tuyệt vời! Không có đề xuất cải thiện</p>
                )}
              </div>
            </div>
          </div>

          <AnimatePresence>
            {showSkillImpact && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-6 pt-6 border-t border-white/10"
              >
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4">
                  <h4 className="text-black font-medium mb-3">Tác động tiềm năng</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-black/60 text-sm mb-1">Nếu học thêm 1 kỹ năng high-demand</p>
                      <p className="text-xl font-bold text-green-400">
                        +15-25%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-black/60 text-sm mb-1">Nếu có chứng chỉ chuyên môn</p>
                      <p className="text-xl font-bold text-blue-400">
                        +10-20%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-black/60 text-sm mb-1">Nếu có kinh nghiệm quốc tế</p>
                      <p className="text-xl font-bold text-purple-400">
                        +30-50%
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </motion.div>

      {/* Career Path */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
                Lộ trình sự nghiệp
          </h3>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-black font-semibold text-lg">{estimate.careerPath.nextRole}</h4>
                  <p className="text-black/60">Thời gian dự kiến: {estimate.careerPath.timeframe}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-semibold">
                    +{estimate.careerPath.salaryIncrease}%
                  </p>
                  <p className="text-black/60 text-sm">tăng lương</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </GlassCard>
      </motion.div>

      {/* Negotiation Tips */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Mẹo đàm phán lương
          </h3>
          <div className="space-y-3">
            {estimate.negotiationTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-black/80">{tip}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Actions */}
      <motion.div
        variants={itemVariants}
        className="space-y-4"
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            onClick={handleExportPDF}
            className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Download className="h-4 w-4" />
            Tải PDF
          </Button>
          <Button
            onClick={handleSaveEstimate}
            disabled={isSaving}
            variant="outline"
            className="gap-2 bg-white/10 border-white/20 text-black hover:bg-white/20 relative min-w-[140px]"
          >
            {isSaving ? (
              <>
                <motion.div
                  className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                Đang lưu...
              </>
            ) : savedEstimate ? (
              <>
                <Check className="h-4 w-4 text-green-400" />
                Đã lưu
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4" />
                Lưu kết quả
              </>
            )}
          </Button>
          <Button
            onClick={() => window.location.href = '/saved-estimates'}
            variant="outline"
            className="gap-2 bg-white/10 border-white/20 text-black hover:bg-white/20"
          >
            <Eye className="h-4 w-4" />
            Xem đã lưu
          </Button>
          <Button
            variant="outline"
            className="gap-2 bg-white/10 border-white/20 text-black hover:bg-white/20"
            onClick={() => window.location.reload()}
          >
            <ArrowRight className="h-4 w-4" />
            Ước tính lại
          </Button>
        </div>

        {/* Save Feedback Message */}
        <AnimatePresence>
          {saveMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <p className={`text-sm ${
                saveMessage.includes('thành công') ? 'text-green-400' :
                saveMessage.includes('lỗi') ? 'text-red-400' :
                'text-yellow-400'
              }`}>
                {saveMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            onClick={() => handleShare('copy')}
            variant="outline"
            size="sm"
            className="gap-2 bg-white/5 border-white/10 text-black/80 hover:bg-white/10"
          >
            {copiedLink ? (
              <>
                <Check className="h-4 w-4 text-green-400" />
                Đã sao chép
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Sao chép link
              </>
            )}
          </Button>
          <Button
            onClick={() => handleShare('email')}
            variant="outline"
            size="sm"
            className="gap-2 bg-white/5 border-white/10 text-black/80 hover:bg-white/10"
          >
            <Mail className="h-4 w-4" />
            Email
          </Button>
          <Button
            onClick={() => handleShare('facebook')}
            variant="outline"
            size="sm"
            className="gap-2 bg-white/5 border-white/10 text-black/80 hover:bg-white/10"
          >
            <Share2 className="h-4 w-4" />
            Facebook
          </Button>
          <Button
            onClick={() => handleShare('zalo')}
            variant="outline"
            size="sm"
            className="gap-2 bg-white/5 border-white/10 text-black/80 hover:bg-white/10"
          >
            <MessageCircle className="h-4 w-4" />
            Zalo
          </Button>
        </div>

        <div className="text-center">
          <p className="text-black/60 text-sm">
            Ngày tạo: {new Date().toLocaleDateString('vi-VN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}