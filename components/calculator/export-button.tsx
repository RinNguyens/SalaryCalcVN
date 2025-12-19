'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { downloadPDF } from '@/lib/pdf/pdf-generator';
import type { SalaryResult } from '@/types/salary';
import { useToast } from '@/hooks/use-toast';

interface ExportButtonProps {
  result: SalaryResult;
  mode: 'gross-to-net' | 'net-to-gross';
}

export function ExportButton({ result, mode }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    try {
      setIsExporting(true);

      await downloadPDF(result, mode);

      toast({
        title: 'Xuất PDF thành công',
        description: 'File đã được tải xuống',
      });
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể xuất PDF. Vui lòng thử lại.',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      variant="outline"
      className="gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-400/50 text-black font-semibold hover:from-blue-500/20 hover:to-purple-500/20 hover:border-blue-500 hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      {isExporting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Đang xuất...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Xuất PDF
        </>
      )}
    </Button>
  );
}
