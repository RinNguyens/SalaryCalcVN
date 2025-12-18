// Chart color palette for Dark Theme UI

export const chartColors = {
  // Primary chart colors (from UI image)
  primary: [
    '#8B5CF6',  // Purple
    '#3B82F6',  // Blue
    '#10B981',  // Green
    '#F59E0B',  // Yellow
    '#EC4899',  // Pink
    '#06B6D4',  // Cyan
    '#F97316',  // Orange
    '#EF4444',  // Red
  ],

  // Dark versions
  dark: [
    '#7C3AED',  // Dark Purple
    '#2563EB',  // Dark Blue
    '#059669',  // Dark Green
    '#D97706',  // Dark Yellow
    '#DB2777',  // Dark Pink
    '#0891B2',  // Dark Cyan
    '#EA580C',  // Dark Orange
    '#DC2626',  // Dark Red
  ],

  // Gradient pairs for dark theme
  gradients: {
    purple: ['#A855F7', '#7C3AED'],
    blue: ['#60A5FA', '#2563EB'],
    green: ['#34D399', '#059669'],
    yellow: ['#FCD34D', '#F59E0B'],
    pink: ['#F472B6', '#DB2777'],
  },
};

// Recharts configuration for dark theme
export const rechartsConfig = {
  colors: chartColors.primary,

  cartesianGrid: {
    stroke: 'rgba(255, 255, 255, 0.1)',
    strokeDasharray: '3 3',
  },

  tooltip: {
    contentStyle: {
      background: 'rgba(15, 15, 30, 0.95)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(42, 42, 74, 0.5)',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
      color: '#FFFFFF',
    },
    labelStyle: {
      color: '#B8B8D0',
    },
  },

  legend: {
    wrapperStyle: {
      fontSize: '14px',
      fontWeight: 500,
      color: '#B8B8D0',
    },
  },

  // Text colors for axes
  textColor: '#B8B8D0',
  axisColor: '#8888A0',
};
