import type {
  CalculationHistory,
  ComparisonSet,
  SalaryResult,
} from '@/types/salary';
import { formatCurrency } from '@/lib/calculations/gross-to-net';

/**
 * Convert calculation history to CSV format
 * @param history - Array of calculation history items
 * @returns CSV string
 */
export function convertHistoryToCSV(history: CalculationHistory[]): string {
  const headers = [
    'Date',
    'Mode',
    'Gross',
    'Net',
    'Insurance (BHXH)',
    'Insurance (BHYT)',
    'Insurance (BHTN)',
    'Total Insurance',
    'Tax',
    'Effective Tax Rate (%)',
    'Region',
    'Dependents',
    'Exemptions',
  ];

  const rows = history.map((item) => [
    new Date(item.timestamp).toLocaleString('vi-VN'),
    item.mode === 'gross-to-net' ? 'Gross → Net' : 'Net → Gross',
    item.result.gross.toString(),
    item.result.net.toString(),
    item.result.insurance.bhxh.toString(),
    item.result.insurance.bhyt.toString(),
    item.result.insurance.bhtn.toString(),
    item.result.insurance.total.toString(),
    item.result.tax.tax.toString(),
    (item.result.tax.effectiveRate * 100).toFixed(2),
    item.input.region,
    item.input.dependents.toString(),
    (item.input.exemptions || 0).toString(),
  ]);

  return [headers, ...rows].map((row) => row.join(',')).join('\n');
}

/**
 * Convert comparison set to CSV format
 * @param comparisonSet - Comparison set with multiple salaries
 * @returns CSV string
 */
export function convertComparisonToCSV(comparisonSet: ComparisonSet): string {
  const headers = [
    'Salary #',
    'Gross',
    'BHXH',
    'BHYT',
    'BHTN',
    'Total Insurance',
    'Tax',
    'Net',
    'Effective Tax Rate (%)',
    'Take-home %',
    'Region',
    'Dependents',
  ];

  const rows = comparisonSet.results.map((result, index) => {
    const salary = comparisonSet.salaries[index];
    return [
      (index + 1).toString(),
      result.gross.toString(),
      result.insurance.bhxh.toString(),
      result.insurance.bhyt.toString(),
      result.insurance.bhtn.toString(),
      result.insurance.total.toString(),
      result.tax.tax.toString(),
      result.net.toString(),
      (result.tax.effectiveRate * 100).toFixed(2),
      ((result.net / result.gross) * 100).toFixed(1),
      salary.region,
      salary.dependents.toString(),
    ];
  });

  return [headers, ...rows].map((row) => row.join(',')).join('\n');
}

/**
 * Convert a single salary result to CSV format
 * @param result - Salary calculation result
 * @param mode - Calculation mode
 * @returns CSV string
 */
export function convertResultToCSV(
  result: SalaryResult,
  mode: 'gross-to-net' | 'net-to-gross'
): string {
  const data = [
    ['Mode', mode === 'gross-to-net' ? 'Gross → Net' : 'Net → Gross'],
    ['Gross', formatCurrency(result.gross)],
    ['BHXH (8%)', formatCurrency(result.insurance.bhxh)],
    ['BHYT (1.5%)', formatCurrency(result.insurance.bhyt)],
    ['BHTN (1%)', formatCurrency(result.insurance.bhtn)],
    ['Total Insurance', formatCurrency(result.insurance.total)],
    ['Personal Deduction', formatCurrency(result.deductions.personal)],
    [
      'Dependent Deduction',
      formatCurrency(result.deductions.dependents),
    ],
    ['Total Deductions', formatCurrency(result.deductions.total)],
    ['Taxable Income', formatCurrency(result.tax.taxableIncome)],
    [`Tax (Bracket ${result.tax.bracket})`, formatCurrency(result.tax.tax)],
    [
      'Effective Tax Rate',
      `${(result.tax.effectiveRate * 100).toFixed(2)}%`,
    ],
    ['Marginal Tax Rate', `${(result.tax.marginalRate * 100).toFixed(0)}%`],
    ['Net Salary', formatCurrency(result.net)],
    ['', ''],
    ['Yearly Projection', ''],
    ['Gross/Year', formatCurrency(result.yearlyProjection.grossYearly)],
    ['Net/Year', formatCurrency(result.yearlyProjection.netYearly)],
    ['Tax/Year', formatCurrency(result.yearlyProjection.totalTax)],
    [
      'Insurance/Year',
      formatCurrency(result.yearlyProjection.totalInsurance),
    ],
  ];

  return data.map((row) => row.join(',')).join('\n');
}

/**
 * Download CSV file to user's browser
 * @param csvContent - CSV content string
 * @param filename - Desired filename (without .csv extension)
 */
export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Escape special characters in CSV field
 * @param field - Field value to escape
 * @returns Escaped field value
 */
function escapeCSVField(field: string): string {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}
