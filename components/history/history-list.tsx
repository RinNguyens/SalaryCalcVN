'use client';

import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/shared/glass-card';
import { Button } from '@/components/ui/button';
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
      <GlassCard className="p-8 text-center">
        <p className="text-white/70">Chưa có lịch sử tính toán</p>
        <p className="text-white/50 text-sm mt-2">
          Các tính toán của bạn sẽ được lưu tự động
        </p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          Lịch sử ({history.length})
        </h2>
        <Button
          onClick={handleClearAll}
          variant="outline"
          size="sm"
          className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Trash2 className="h-4 w-4" />
          Xóa tất cả
        </Button>
      </div>

      {history.map((item) => (
        <GlassCard key={item.id} className="p-4 hover:bg-white/15 transition-all">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge
                  variant={item.mode === 'gross-to-net' ? 'default' : 'secondary'}
                  className="bg-white/20 text-white border-white/30"
                >
                  {item.mode === 'gross-to-net' ? 'Gross → Net' : 'Net → Gross'}
                </Badge>
                <div className="flex items-center gap-1 text-white/60 text-sm">
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

              <div className="flex items-center gap-2 text-white flex-wrap">
                <span className="font-mono text-sm md:text-base">
                  {formatCurrency(item.result.gross)}
                </span>
                <ArrowRight className="h-4 w-4" />
                <span className="font-mono font-semibold text-sm md:text-base text-green-400">
                  {formatCurrency(item.result.net)}
                </span>
              </div>

              <div className="mt-2 text-sm text-white/70">
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
              <Button
                onClick={() => handleExport(item)}
                variant="ghost"
                size="icon"
                className="text-white hover:text-green-400 hover:bg-white/10"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => handleDelete(item.id)}
                variant="ghost"
                size="icon"
                className="text-white hover:text-red-400 hover:bg-white/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
