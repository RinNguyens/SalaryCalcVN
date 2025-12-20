'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { downloadPDF } from '@/lib/pdf/pdf-generator';
import type { SalaryResult } from '@/types/salary';
import { useToast } from '@/hooks/use-toast';
import { GlassButton } from '../ui/glass-button';

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
    <GlassButton
      onClick={handleExport}
      disabled={isExporting}
      variant='gradient'
      className='cursor-pointer px-1 py-1 text-sm text-white'
    >
      {isExporting ? (
        <div className='flex gap-2'>
          <Loader2 className="h-4 w-4 animate-spin" />
          Đang xuất...
        </div>
      ) : (
        <div className='flex gap-2 p-1 items-center'>
          <Download className="h-4 w-4" />
          Xuất PDF
        </div>
      )}
    </GlassButton>
  );
}
