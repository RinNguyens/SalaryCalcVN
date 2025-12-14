export const PAYMENT_CONFIG = {
  // Update with your actual payment details
  momo: {
    phoneNumber: '0987654321', // Your Momo phone number
    qrCodeUrl: '/qr/momo-qr.png', // Static QR code image
    deepLink: 'momo://payment?amount=50000&note=SalaryCalcVN', // Dynamic amount
  },
  bank: {
    bank: 'Vietcombank',
    accountNumber: '1234567890',
    accountName: 'NGUYEN VAN A',
    qrCodeUrl: '/qr/bank-qr.png',
  },
  zalopay: {
    phoneNumber: '0987654321',
    qrCodeUrl: '/qr/zalopay-qr.png',
  },
  buymeacoffee: 'https://www.buymeacoffee.com/yourusername', // Update with your BMC URL
  kofi: 'https://ko-fi.com/yourusername', // Update with your Ko-fi URL
};

export function generateMomoLink(amount: number) {
  return `momo://transfer?phone=${PAYMENT_CONFIG.momo.phoneNumber}&amount=${amount * 23000}&note=SalaryCalcVN%20Donation`;
}

export function generateZaloPayLink(amount: number) {
  return `zalopay://payment?amount=${amount * 23000}&note=SalaryCalcVN`;
}

// Generate VietQR dynamic QR code (if API is available)
export async function generateVietQR(amount: number) {
  // This would use VietQR API if available
  // For now, return static QR code URL
  return {
    qrDataURL: PAYMENT_CONFIG.bank.qrCodeUrl,
    accountInfo: {
      bank: PAYMENT_CONFIG.bank.bank,
      account: PAYMENT_CONFIG.bank.accountNumber,
      name: PAYMENT_CONFIG.bank.accountName,
      amount: amount * 23000, // Convert USD to VND
      note: 'SalaryCalcVN Donation',
    }
  };
}

// Convert USD to VND (approximate rate)
export function usdToVnd(usd: number): number {
  return usd * 23000;
}

// Format currency
export function formatCurrency(amount: number, currency: 'USD' | 'VND' = 'USD'): string {
  if (currency === 'VND') {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}