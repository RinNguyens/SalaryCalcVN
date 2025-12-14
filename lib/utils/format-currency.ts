export function formatCurrency(amount: number, currency: string = 'VND'): string {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // For VND and other currencies
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}tr đ`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)}k đ`;
  }

  return `${amount.toLocaleString('vi-VN')} đ`;
}

export function formatFullCurrency(amount: number, currency: string = 'VND'): string {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}

export function parseCurrency(value: string, currency: string = 'VND'): number {
  // Remove all non-numeric characters except dots and commas
  const cleanValue = value.replace(/[^\d.,]/g, '');

  // Convert to number
  const number = parseFloat(cleanValue.replace(/\./g, '').replace(',', '.'));

  if (isNaN(number)) return 0;

  // Handle different formats
  if (value.toLowerCase().includes('k')) {
    return number * 1000;
  } else if (value.toLowerCase().includes('tr') || value.toLowerCase().includes('m')) {
    return number * 1000000;
  } else if (value.toLowerCase().includes('b')) {
    return number * 1000000000;
  }

  return number;
}