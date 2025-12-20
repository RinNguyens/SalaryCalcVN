import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { SalaryEstimate, SalaryEstimateRequest } from '@/types/salary-estimator';
import { formatCurrency, formatFullCurrency } from './format-currency';

export interface PDFExportOptions {
  estimate: SalaryEstimate;
  formData: Partial<SalaryEstimateRequest>;
  includeCharts?: boolean;
}

/**
 * Exports salary estimate data to PDF
 */
export async function exportSalaryEstimateToPDF(options: PDFExportOptions): Promise<void> {
  const { estimate, formData, includeCharts = false } = options;

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace: number = 10) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Helper function to add text with word wrap
  const addText = (text: string, x: number, y: number, options?: {
    fontSize?: number;
    fontStyle?: 'normal' | 'bold' | 'italic';
    align?: 'left' | 'center' | 'right';
    maxWidth?: number;
  }) => {
    const fontSize = options?.fontSize || 10;
    const fontStyle = options?.fontStyle || 'normal';
    const align = options?.align || 'left';
    const maxWidth = options?.maxWidth || contentWidth;

    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', fontStyle);

    const lines = pdf.splitTextToSize(text, maxWidth);

    if (align === 'center') {
      x = pageWidth / 2;
    } else if (align === 'right') {
      x = pageWidth - margin;
    }

    pdf.text(lines, x, y, { align });

    return lines.length * fontSize * 0.35; // Return height used
  };

  // Header
  pdf.setFillColor(147, 51, 234); // Purple
  pdf.rect(0, 0, pageWidth, 40, 'F');

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Bao Cao Uoc Tinh Luong', pageWidth / 2, 20, { align: 'center' });

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text('SalaryCalcVN - Tinh luong chinh xac cho ban', pageWidth / 2, 30, { align: 'center' });

  yPosition = 50;
  pdf.setTextColor(0, 0, 0);

  // Date
  const currentDate = new Date().toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  addText(`Ngay tao: ${currentDate}`, margin, yPosition, { fontSize: 9, align: 'right' });
  yPosition += 10;

  // Main Salary Information
  checkNewPage(40);
  pdf.setFillColor(248, 250, 252);
  pdf.rect(margin, yPosition, contentWidth, 35, 'F');

  yPosition += 10;
  addText('LUONG UOC TINH CUA BAN', margin + 5, yPosition, { fontSize: 16, fontStyle: 'bold' });
  yPosition += 8;

  addText('Luong co ban (hang thang)', margin + 5, yPosition, { fontSize: 10 });
  yPosition += 6;
  addText(formatCurrency(estimate.baseSalary.median), margin + 5, yPosition, { fontSize: 14, fontStyle: 'bold' });
  yPosition += 8;

  addText(`Min: ${formatCurrency(estimate.baseSalary.min)} | Max: ${formatCurrency(estimate.baseSalary.max)}`,
    margin + 5, yPosition, { fontSize: 9 });
  yPosition += 12;

  // Total Compensation
  checkNewPage(40);
  pdf.setFillColor(220, 252, 231);
  pdf.rect(margin, yPosition, contentWidth, 35, 'F');

  yPosition += 10;
  addText('Tong thu nhap (hang thang)', margin + 5, yPosition, { fontSize: 10 });
  yPosition += 6;
  addText(formatCurrency(estimate.totalCompensation.median), margin + 5, yPosition, { fontSize: 14, fontStyle: 'bold' });
  yPosition += 8;

  addText(`Min: ${formatCurrency(estimate.totalCompensation.min)} | Max: ${formatCurrency(estimate.totalCompensation.max)}`,
    margin + 5, yPosition, { fontSize: 9 });
  yPosition += 12;

  // Confidence
  checkNewPage(15);
  addText(`Do tin cay: ${estimate.baseSalary.confidence}%`, margin, yPosition, { fontSize: 10 });
  yPosition += 10;

  // Market Position
  checkNewPage(40);
  pdf.setDrawColor(200, 200, 200);
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;

  addText('VI TRI TREN THI TRUONG', margin, yPosition, { fontSize: 14, fontStyle: 'bold' });
  yPosition += 8;

  const marketPositionLabel = getMarketPositionLabel(estimate.marketPosition.category);
  addText(`Phan vi: ${estimate.marketPosition.percentile}%`, margin, yPosition, { fontSize: 10 });
  yPosition += 6;
  addText(`Xep hang: ${marketPositionLabel}`, margin, yPosition, { fontSize: 10 });
  yPosition += 6;
  addText(`So sanh: ${estimate.marketPosition.comparison}`, margin, yPosition, { fontSize: 10 });
  yPosition += 10;

  // Compensation Breakdown
  checkNewPage(50);
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;

  addText('PHAN TICH CHI TIET THU NHAP', margin, yPosition, { fontSize: 14, fontStyle: 'bold' });
  yPosition += 8;

  const breakdownItems = [
    { label: 'Luong co ban', value: estimate.breakdown.baseSalary },
    { label: 'Thuong hieu suat', value: estimate.breakdown.bonus },
    { label: 'Co phieu/ESOP', value: estimate.breakdown.equity },
    { label: 'Phuc loi', value: estimate.breakdown.benefits },
  ];

  breakdownItems.forEach(item => {
    checkNewPage(8);
    const percentage = (item.value / estimate.totalCompensation.median) * 100;
    addText(`${item.label}: ${formatCurrency(item.value)} (${percentage.toFixed(1)}%)`,
      margin, yPosition, { fontSize: 10 });
    yPosition += 6;
  });
  yPosition += 5;

  // Annual calculations
  checkNewPage(15);
  addText(`Thu nhap hang nam: ${formatFullCurrency(estimate.totalCompensation.median * 12)}`,
    margin, yPosition, { fontSize: 10 });
  yPosition += 6;
  addText(`Thue thu nhap (uoc tinh): ${formatFullCurrency(estimate.totalCompensation.median * 12 * 0.1)}`,
    margin, yPosition, { fontSize: 10 });
  yPosition += 10;

  // Skills Analysis
  checkNewPage(40);
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;

  addText('PHAN TICH KY NANG', margin, yPosition, { fontSize: 14, fontStyle: 'bold' });
  yPosition += 8;

  if (estimate.skills.highDemand.length > 0) {
    addText('Ky nang high-demand:', margin, yPosition, { fontSize: 10, fontStyle: 'bold' });
    yPosition += 6;
    estimate.skills.highDemand.forEach(skill => {
      checkNewPage(6);
      addText(`• ${skill}`, margin + 5, yPosition, { fontSize: 9 });
      yPosition += 5;
    });
    yPosition += 3;
  }

  if (estimate.skills.improvement.length > 0) {
    checkNewPage(10);
    addText('De xuat cai thien:', margin, yPosition, { fontSize: 10, fontStyle: 'bold' });
    yPosition += 6;
    estimate.skills.improvement.forEach(skill => {
      checkNewPage(6);
      const potentialValue = formatCurrency(estimate.totalCompensation.median * skill.potentialIncrease / 100);
      addText(`• ${skill.skill}: +${skill.potentialIncrease}% (~${potentialValue})`,
        margin + 5, yPosition, { fontSize: 9 });
      yPosition += 5;
    });
    yPosition += 5;
  }

  // Career Path
  checkNewPage(30);
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;

  addText('LO TRINH SU NGHIEP', margin, yPosition, { fontSize: 14, fontStyle: 'bold' });
  yPosition += 8;

  addText(`Vi tri ke tiep: ${estimate.careerPath.nextRole}`, margin, yPosition, { fontSize: 10 });
  yPosition += 6;
  addText(`Thoi gian du kien: ${estimate.careerPath.timeframe}`, margin, yPosition, { fontSize: 10 });
  yPosition += 6;
  addText(`Tang luong du kien: +${estimate.careerPath.salaryIncrease}%`, margin, yPosition, { fontSize: 10 });
  yPosition += 10;

  // Negotiation Tips
  checkNewPage(40);
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;

  addText('MEO DAM PHAN LUONG', margin, yPosition, { fontSize: 14, fontStyle: 'bold' });
  yPosition += 8;

  estimate.negotiationTips.forEach((tip, index) => {
    checkNewPage(12);
    const tipHeight = addText(`${index + 1}. ${tip}`, margin, yPosition, { fontSize: 9, maxWidth: contentWidth });
    yPosition += tipHeight + 3;
  });

  // Footer
  const footerY = pageHeight - 15;
  pdf.setFontSize(8);
  pdf.setTextColor(128, 128, 128);
  pdf.text('Bao cao nay duoc tao boi SalaryCalcVN', pageWidth / 2, footerY, { align: 'center' });
  pdf.text('https://salarycalcvn.com', pageWidth / 2, footerY + 4, { align: 'center' });

  // Save PDF
  const fileName = `Uoc-tinh-luong-${new Date().getTime()}.pdf`;
  pdf.save(fileName);
}

/**
 * Helper function to get market position label
 */
function getMarketPositionLabel(category: string): string {
  switch (category) {
    case 'top_quartile': return 'Top 25%';
    case 'above_average': return 'Tren trung binh';
    case 'average': return 'Trung binh';
    case 'below_average': return 'Duoi trung binh';
    default: return category;
  }
}

/**
 * Alternative: Export using html2canvas (captures visual appearance)
 */
export async function exportSalaryEstimateAsImage(elementId: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff'
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');

  const imgWidth = 210; // A4 width in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

  const fileName = `Uoc-tinh-luong-${new Date().getTime()}.pdf`;
  pdf.save(fileName);
}
