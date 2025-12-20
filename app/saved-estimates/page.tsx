'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/shared/glass-card';
import {
  Bookmark,
  Calendar,
  DollarSign,
  MapPin,
  Trash2,
  Eye,
  ArrowLeft,
  TrendingUp,
  Target,
  Award
} from 'lucide-react';
import { formatCurrency, formatFullCurrency } from '@/lib/utils/format-currency';
import type { SalaryEstimate } from '@/types/salary-estimator';

interface SavedEstimate {
  id: string;
  title: string;
  timestamp: string;
  createdAt: string;
  summary: {
    monthlySalary: number;
    yearlySalary: number;
    marketPosition: string;
    skills: string;
    location: string;
  };
  estimate: SalaryEstimate;
  formData: any;
}

export default function SavedEstimatesPage() {
  const [savedEstimates, setSavedEstimates] = useState<SavedEstimate[]>([]);
  const [selectedEstimate, setSelectedEstimate] = useState<SavedEstimate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedEstimates();
  }, []);

  const loadSavedEstimates = () => {
    try {
      const estimates = JSON.parse(localStorage.getItem('savedEstimates') || '[]');

      // Validate and filter out corrupted estimates
      const validEstimates = estimates.filter((estimate: any) => {
        return estimate &&
               estimate.id &&
               (estimate.estimate || estimate.summary);
      });

      setSavedEstimates(validEstimates);

      // If we filtered out some estimates, update localStorage
      if (validEstimates.length !== estimates.length) {
        localStorage.setItem('savedEstimates', JSON.stringify(validEstimates));
      }

    } catch (error) {
      console.error('Error loading saved estimates:', error);
      // Clear corrupted data
      localStorage.removeItem('savedEstimates');
      setSavedEstimates([]);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEstimate = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa kết quả này?')) {
      const updatedEstimates = savedEstimates.filter(e => e.id !== id);
      setSavedEstimates(updatedEstimates);
      localStorage.setItem('savedEstimates', JSON.stringify(updatedEstimates));

      if (selectedEstimate?.id === id) {
        setSelectedEstimate(null);
      }
    }
  };

  const viewEstimateDetail = (estimate: SavedEstimate) => {
    setSelectedEstimate(estimate);
  };

  const clearAllEstimates = () => {
    if (confirm('Bạn có chắc muốn xóa tất cả kết quả đã lưu?')) {
      setSavedEstimates([]);
      setSelectedEstimate(null);
      localStorage.removeItem('savedEstimates');
    }
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

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <motion.div
          className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <motion.div
        className="max-w-6xl mx-auto mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="gap-2 bg-white/10 border-white/20 text-black hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
          <h1 className="text-4xl font-bold text-black flex items-center gap-3">
            <Bookmark className="h-8 w-8 text-yellow-400" />
            Kết quả đã lưu
          </h1>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-black/70 text-lg">
            {savedEstimates.length} kết quả đã lưu
          </p>
          {savedEstimates.length > 0 && (
            <Button
              variant="outline"
              onClick={clearAllEstimates}
              className="gap-2 bg-white/10 border-white/20 text-black hover:bg-white/20 text-sm"
            >
              <Trash2 className="h-4 w-4" />
              Xóa tất cả
            </Button>
          )}
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {savedEstimates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <Bookmark className="h-16 w-16 text-black/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">
              Chưa có kết quả nào được lưu
            </h3>
            <p className="text-black/60 mb-6">
              Hãy thực hiện ước tính lương và lưu lại để xem lại sau
            </p>
            <Button
              onClick={() => window.location.href = '/salary-estimator'}
              className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Ước tính lương ngay
            </Button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Saved Estimates List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-black mb-4">Danh sách kết quả</h2>
              {savedEstimates.map((estimate, index) => (
                <motion.div
                  key={estimate.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer transition-all ${
                      selectedEstimate?.id === estimate.id ? 'ring-2 ring-yellow-400' : ''
                    }`}
                    onClick={() => viewEstimateDetail(estimate)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg text-black">
                            {estimate.title}
                          </CardTitle>
                          <p className="text-black/60 text-sm flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(estimate.timestamp)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteEstimate(estimate.id);
                          }}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-black/70 text-sm">Lương tháng:</span>
                          <span className="text-black font-semibold">
                            {formatCurrency(estimate.summary?.monthlySalary || estimate.estimate?.totalCompensation?.median || 0)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-black/70 text-sm">Lương năm:</span>
                          <span className="text-black font-semibold">
                            {formatCurrency(estimate.summary?.yearlySalary || (estimate.estimate?.totalCompensation?.median || 0) * 12)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-black/70 text-sm">Vị trí:</span>
                          <Badge className={getMarketPositionColor(estimate.summary?.marketPosition || estimate.estimate?.marketPosition?.category || 'average')}>
                            {getMarketPositionLabel(estimate.summary?.marketPosition || estimate.estimate?.marketPosition?.category || 'average')}
                          </Badge>
                        </div>
                        {(estimate.summary?.skills || (estimate.formData?.skills && estimate.formData.skills.length > 0)) && (
                          <div className="flex items-center gap-1 mt-2">
                            <span className="text-black/70 text-sm">Kỹ năng:</span>
                            <span className="text-black/80 text-sm truncate">
                              {estimate.summary?.skills ||
                               estimate.formData?.skills?.slice(0, 3).map((s: any) => s.name || s).join(', ') ||
                               'Không có kỹ năng'}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-black/60" />
                          <span className="text-black/70 text-sm">
                            {estimate.summary?.location ||
                             estimate.formData?.location?.city ||
                             'Vietnam'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Selected Estimate Detail */}
            <div>
              {selectedEstimate ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-black">Chi tiết kết quả</h2>
                      <Button
                        onClick={() => setSelectedEstimate(null)}
                        variant="outline"
                        size="sm"
                        className="bg-white/10 border-white/20 text-black hover:bg-white/20"
                      >
                        Đóng
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {/* Salary Summary */}
                      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4">
                        <h3 className="text-black font-medium mb-3 flex items-center gap-2">
                          <DollarSign className="h-5 w-5" />
                          Tổng quan lương
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-black/60 text-sm">Lương cơ bản</p>
                            <p className="text-2xl font-bold text-orange-400">
                              {formatCurrency(selectedEstimate.estimate.baseSalary.median)}
                            </p>
                          </div>
                          <div>
                            <p className="text-black/60 text-sm">Tổng thu nhập</p>
                            <p className="text-2xl font-bold text-green-400">
                              {formatCurrency(selectedEstimate.estimate.totalCompensation.median)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Market Position */}
                      <div>
                        <h3 className="text-black font-medium mb-3 flex items-center gap-2">
                          <Target className="h-5 w-5" />
                          Vị trí thị trường
                        </h3>
                        <div className="bg-white/5 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-black/70">Phân vị</span>
                            <span className={`font-bold ${getMarketPositionColor(selectedEstimate.estimate.marketPosition.category)}`}>
                              {selectedEstimate.estimate.marketPosition.percentile}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-black/70">Xếp hạng</span>
                            <Badge className={getMarketPositionColor(selectedEstimate.estimate.marketPosition.category)}>
                              {getMarketPositionLabel(selectedEstimate.estimate.marketPosition.category)}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Skills Summary */}
                      {selectedEstimate.formData.skills && selectedEstimate.formData.skills.length > 0 && (
                        <div>
                          <h3 className="text-black font-medium mb-3 flex items-center gap-2">
                            <Award className="h-5 w-5" />
                            Kỹ năng
                          </h3>
                          <div className="bg-white/5 rounded-lg p-4">
                            <div className="flex flex-wrap gap-2">
                              {selectedEstimate.formData.skills.map((skill: any, index: number) => (
                                <Badge key={index} className="bg-white/20 text-black/80 border-white/30">
                                  {skill.name || skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={() => {
                            // Load this estimate into the salary estimator
                            const estimateData = {
                              estimate: selectedEstimate.estimate,
                              formData: selectedEstimate.formData
                            };
                            sessionStorage.setItem('loadedEstimate', JSON.stringify(estimateData));
                            window.location.href = '/salary-estimator';
                          }}
                          className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        >
                          <Eye className="h-4 w-4" />
                          Xem đầy đủ
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-subtle rounded-2xl p-12 text-center h-full flex items-center justify-center"
                >
                  <div>
                    <Eye className="h-12 w-12 text-black/30 mx-auto mb-4" />
                    <p className="text-black/70">
                      Chọn một kết quả để xem chi tiết
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}