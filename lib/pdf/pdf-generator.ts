import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { SalaryResult } from '@/types/salary';
import { formatCurrency } from '@/lib/calculations/gross-to-net';

// Helper to convert Vietnamese text to ASCII-safe representation
function toAsciiSafe(text: string): string {
  const vietnameseMap: { [key: string]: string } = {
    'à': 'a', 'á': 'a', 'ạ': 'a', 'ả': 'a', 'ã': 'a',
    'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a', 'ẫ': 'a',
    'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a',
    'è': 'e', 'é': 'e', 'ẹ': 'e', 'ẻ': 'e', 'ẽ': 'e',
    'ê': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
    'ì': 'i', 'í': 'i', 'ị': 'i', 'ỉ': 'i', 'ĩ': 'i',
    'ò': 'o', 'ó': 'o', 'ọ': 'o', 'ỏ': 'o', 'õ': 'o',
    'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ộ': 'o', 'ổ': 'o', 'ỗ': 'o',
    'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o', 'ở': 'o', 'ỡ': 'o',
    'ù': 'u', 'ú': 'u', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u',
    'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u',
    'ỳ': 'y', 'ý': 'y', 'ỵ': 'y', 'ỷ': 'y', 'ỹ': 'y',
    'đ': 'd', 'Đ': 'D',
  };

  return text.split('').map(char => vietnameseMap[char] || char).join('');
}

export async function generatePDF(
  result: SalaryResult,
  mode: 'gross-to-net' | 'net-to-gross'
): Promise<Blob> {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Add header
  pdf.setFontSize(24);
  pdf.setTextColor(102, 126, 234);
  pdf.text('SalaryLens', pageWidth / 2, 20, { align: 'center' });

  pdf.setFontSize(12);
  pdf.setTextColor(100);
  pdf.text(toAsciiSafe('Kết quả tính lương'), pageWidth / 2, 28, { align: 'center' });

  // Add date
  const today = new Date().toLocaleDateString('vi-VN');
  pdf.setFontSize(10);
  pdf.text(toAsciiSafe(`Ngày: ${today}`), pageWidth / 2, 35, { align: 'center' });

  // Separator
  pdf.setDrawColor(200);
  pdf.line(20, 40, pageWidth - 20, 40);

  let yPos = 50;

  // Main result
  pdf.setFontSize(16);
  pdf.setTextColor(0);
  const mainLabel =
    mode === 'gross-to-net' ? 'Lương thực nhận (Net)' : 'Lương Gross cần thiết';
  const mainValue = mode === 'gross-to-net' ? result.net : result.gross;

  pdf.text(toAsciiSafe(mainLabel), 20, yPos);
  pdf.setFontSize(20);
  pdf.setTextColor(16, 185, 129);
  pdf.text(formatCurrency(mainValue), pageWidth - 20, yPos, {
    align: 'right',
  });

  yPos += 15;
  pdf.setDrawColor(200);
  pdf.line(20, yPos, pageWidth - 20, yPos);

  yPos += 10;

  // Breakdown
  pdf.setFontSize(14);
  pdf.setTextColor(0);
  pdf.text(toAsciiSafe('Chi tiết tính toán'), 20, yPos);
  yPos += 10;

  const items = [
    { label: toAsciiSafe('Lương Gross'), value: result.gross, color: [0, 0, 0] as [number, number, number] },
    { label: 'BHXH (8%)', value: -result.insurance.bhxh, color: [59, 130, 246] as [number, number, number] },
    { label: 'BHYT (1.5%)', value: -result.insurance.bhyt, color: [59, 130, 246] as [number, number, number] },
    { label: 'BHTN (1%)', value: -result.insurance.bhtn, color: [59, 130, 246] as [number, number, number] },
    {
      label: toAsciiSafe('Tổng bảo hiểm'),
      value: -result.insurance.total,
      color: [59, 130, 246] as [number, number, number],
      bold: true,
    },
    {
      label: toAsciiSafe('Giảm trừ bản thân'),
      value: -result.deductions.personal,
      color: [147, 51, 234] as [number, number, number],
    },
  ];

  if (result.deductions.dependents > 0) {
    items.push({
      label: toAsciiSafe('Giảm trừ người phụ thuộc'),
      value: -result.deductions.dependents,
      color: [147, 51, 234] as [number, number, number],
    });
  }

  items.push(
    {
      label: toAsciiSafe(`Thuế TNCN (Bậc ${result.tax.bracket})`),
      value: -result.tax.tax,
      color: [245, 158, 11] as [number, number, number],
      bold: true,
    },
    {
      label: toAsciiSafe('Lương thực nhận (Net)'),
      value: result.net,
      color: [16, 185, 129] as [number, number, number],
      bold: true,
    }
  );

  pdf.setFontSize(11);
  items.forEach((item) => {
    if (item.bold) {
      pdf.setFont('helvetica', 'bold');
    }
    pdf.setTextColor(...item.color);
    pdf.text(item.label, 25, yPos);
    pdf.text(formatCurrency(Math.abs(item.value)), pageWidth - 20, yPos, {
      align: 'right',
    });
    pdf.setFont('helvetica', 'normal');
    yPos += 7;
  });

  yPos += 5;
  pdf.setDrawColor(200);
  pdf.line(20, yPos, pageWidth - 20, yPos);

  // Tax info
  yPos += 10;
  pdf.setFontSize(12);
  pdf.setTextColor(0);
  pdf.text(toAsciiSafe('Thông tin thuế'), 20, yPos);
  yPos += 8;

  pdf.setFontSize(10);
  pdf.text(
    toAsciiSafe(`Thu nhập tính thuế: ${formatCurrency(result.tax.taxableIncome)}`),
    25,
    yPos
  );
  yPos += 6;
  pdf.text(
    toAsciiSafe(`Thuế suất hiệu dụng: ${(result.tax.effectiveRate * 100).toFixed(2)}%`),
    25,
    yPos
  );
  yPos += 6;
  pdf.text(
    toAsciiSafe(`Thuế suất biên: ${(result.tax.marginalRate * 100).toFixed(0)}%`),
    25,
    yPos
  );

  // Yearly projection
  yPos += 10;
  pdf.setFontSize(12);
  pdf.setTextColor(0);
  pdf.text(toAsciiSafe('Dự đoán cả năm (12 tháng)'), 20, yPos);
  yPos += 8;

  pdf.setFontSize(10);
  pdf.text(
    toAsciiSafe(`Gross/năm: ${formatCurrency(result.yearlyProjection.grossYearly)}`),
    25,
    yPos
  );
  yPos += 6;
  pdf.text(
    toAsciiSafe(`Net/năm: ${formatCurrency(result.yearlyProjection.netYearly)}`),
    25,
    yPos
  );
  yPos += 6;
  pdf.text(
    toAsciiSafe(`Tổng thuế/năm: ${formatCurrency(result.yearlyProjection.totalTax)}`),
    25,
    yPos
  );
  yPos += 6;
  pdf.text(
    toAsciiSafe(`Tổng bảo hiểm/năm: ${formatCurrency(result.yearlyProjection.totalInsurance)}`),
    25,
    yPos
  );

  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(150);
  pdf.text(
    toAsciiSafe('Tạo bởi SalaryLens - Công cụ tính lương chính xác'),
    pageWidth / 2,
    pageHeight - 10,
    { align: 'center' }
  );

  return pdf.output('blob');
}

export async function downloadPDF(
  result: SalaryResult,
  mode: 'gross-to-net' | 'net-to-gross'
) {
  const blob = await generatePDF(result, mode);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `salary-calculation-${Date.now()}.pdf`;
  link.style.display = 'none';

  // Add to document body to ensure click works in all browsers
  document.body.appendChild(link);
  link.click();

  // Clean up after a short delay
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}
