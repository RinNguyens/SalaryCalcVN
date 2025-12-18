'use client';

import { useState, useEffect } from 'react';
import { PastelGlassCard } from '@/components/ui/pastel-glass-card';
import { PastelGlassButton } from '@/components/ui/pastel-glass-button';
import { Badge } from '@/components/ui/badge';
import { getHistory, deleteHistory, clearHistory } from '@/lib/storage/local-storage';
import { formatCurrency } from '@/lib/calculations/gross-to-net';
import { Trash2, Calendar, ArrowRight, Download } from 'lucide-react';
import type { CalculationHistory } from '@/types/salary';
import { downloadPDF } from '@/lib/pdf/pdf-generator';
import { useToast } from '@/hooks/use-toast';

export function HistoryList() {
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleDelete = (id: string) => {
    deleteHistory(id);
    setHistory(getHistory());
    toast({
      title: 'Đã xóa',
      description: 'Đã xóa tính toán khỏi lịch sử',
    });
  };

  const handleClearAll = () => {
    if (confirm('Xóa toàn bộ lịch sử?')) {
      clearHistory();
      setHistory([]);
      toast({
        title: 'Đã xóa tất cả',
        description: 'Lịch sử đã được xóa hoàn toàn',
      });
    }
  };

  const handleExport = async (item: CalculationHistory) => {
    try {
      await downloadPDF(item.result, item.mode);
      toast({
        title: 'Xuất PDF thành công',
        description: 'File đã được tải xuống',
      });
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể xuất PDF',
        variant: 'destructive',
      });
    }
  };

  if (history.length === 0) {
    return (
      <PastelGlassCard className="p-8 text-center">
        <p className="text-dark-secondary-text">Chưa có lịch sử tính toán</p>
        <p className="text-dark-muted-text text-sm mt-2">
          Các tính toán của bạn sẽ được lưu tự động
        </p>
      </PastelGlassCard>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-dark-text">
          Lịch sử ({history.length})
        </h2>
        <PastelGlassButton
          onClick={handleClearAll}
          variant="danger"
          size="sm"
          icon={<Trash2 className="h-4 w-4" />}
        >
          Xóa tất cả
        </PastelGlassButton>
      </div>

      {history.map((item) => (
        <PastelGlassCard key={item.id} className="p-4 hover:scale-[1.01] transition-transform">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge
                  variant={item.mode === 'gross-to-net' ? 'default' : 'secondary'}
                  className="bg-chart-purple/20 text-chart-purple border-chart-purple/30"
                >
                  {item.mode === 'gross-to-net' ? 'Gross → Net' : 'Net → Gross'}
                </Badge>
                <div className="flex items-center gap-1 text-dark-muted-text text-sm">
                  <Calendar className="h-3 w-3" />
                  {new Date(item.timestamp).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2 text-dark-text flex-wrap">
                <span className="font-mono text-sm md:text-base">
                  {formatCurrency(item.result.gross)}
                </span>
                <ArrowRight className="h-4 w-4 text-chart-green" />
                <span className="font-mono font-semibold text-sm md:text-base text-chart-green">
                  {formatCurrency(item.result.net)}
                </span>
              </div>

              <div className="mt-2 text-sm text-dark-muted-text">
                <span>Thuế: {formatCurrency(item.result.tax.tax)}</span>
                <span className="mx-2">•</span>
                <span>BH: {formatCurrency(item.result.insurance.total)}</span>
                {item.input.dependents > 0 && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{item.input.dependents} người phụ thuộc</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <PastelGlassButton
                onClick={() => handleExport(item)}
                variant="ghost"
                size="icon"
                className="text-dark-secondary-text hover:text-chart-green"
              >
                <Download className="h-4 w-4" />
              </PastelGlassButton>
              <PastelGlassButton
                onClick={() => handleDelete(item.id)}
                variant="ghost"
                size="icon"
                className="text-dark-secondary-text hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </PastelGlassButton>
            </div>
          </div>
        </PastelGlassCard>
      ))}
    </div>
  );
}
