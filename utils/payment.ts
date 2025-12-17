export const PAYMENT_CONFIG = {
  // Update with your actual payment details
  momo: {
    phoneNumber: '0987654321', // Your Momo phone number
    qrCodeUrl: '/images/donate/momo.jpg', // Static QR code image
    deepLink: 'momo://payment?amount=50000&note=SalaryCalcVN', // Dynamic amount
  },
  bank: {
    bank: 'Techcombank',
    accountNumber: '19033857395014',
    accountName: 'NGUYEN VAN RIN',
    qrCodeUrl: '/images/donate/techcombank.jpg',
  },
  zalopay: {
    phoneNumber: '0987654321',
    qrCodeUrl: '/images/donate/zalopay.jpg',
  },
  buymeacoffee: 'https://www.buymeacoffee.com/yourusername', // Update with your BMC URL
  kofi: 'https://ko-fi.com/yourusername', // Update with your Ko-fi URL
};

export function generateMomoLink(amount: number) {
  return `momo://transfer?phone=${PAYMENT_CONFIG.momo.phoneNumber}&amount=${amount * 27000}&note=SalaryCalcVN%20Donation`;
}

export function generateZaloPayLink(amount: number) {
  return `zalopay://payment?amount=${amount * 27000}&note=SalaryCalcVN`;
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
      amount: amount * 27000, // Convert USD to VND
      note: 'SalaryCalcVN Donation',
    }
  };
}

// Convert USD to VND (approximate rate)
export function usdToVnd(usd: number): number {
  return usd * 27000;
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