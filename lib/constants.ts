// SalaryLens App Configuration

export const APP_CONFIG = {
  name: 'SalaryLens',
  tagline: 'Crystal Clear Salary Insights',
  description: 'Công cụ tính lương và phân tích thu nhập chính xác nhất cho người lao động Việt Nam',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://salarylens.cc',
  domain: 'salarylens.com',
  email: 'support@salarylens.com',

  social: {
    twitter: 'https://twitter.com/salarylens',
    facebook: 'https://facebook.com/salarylens',
    linkedin: 'https://linkedin.com/company/salarylens',
    github: 'https://github.com/yourusername/salarylens',
  },

  seo: {
    title: 'SalaryLens - Crystal Clear Salary Insights',
    description: 'Công cụ tính lương thông minh với AI. Phân tích thu nhập, tối ưu thuế, và tư vấn tài chính cho người Việt Nam.',
    keywords: [
      'tính lương',
      'salary calculator',
      'vietnam salary',
      'tax calculator',
      'salarylens',
      'lương net',
      'thu nhập',
      'gross to net',
      'thuế TNCN',
      'bảo hiểm xã hội',
    ],
  },

  features: {
    aiAssistant: true,
    blog: true,
    about: true,
    calculator: true,
    pdfExport: true,
    salaryEstimator: true,
    offerComparison: true,
  },
} as const;

export const BRAND_COLORS = {
  primary: '#1E40AF',    // Deep Blue
  secondary: '#10B981',  // Emerald
  accent: '#8B5CF6',     // Purple
  dark: '#0F172A',       // Slate 900
  light: '#F8FAFC',      // Slate 50
} as const;

export const VERSION = '2.0.0';
