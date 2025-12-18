import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			// Brand Colors (Pastel Base)
  			brand: {
  				purple: {
  					light: '#F3E8FF',
  					50: '#FAF5FF',
  					100: '#F3E8FF',
  					200: '#E9D5FF',
  					300: '#D8B4FE',
  					400: '#C084FC',
  					500: '#A855F7',
  					600: '#9333EA',
  					700: '#7E22CE',
  					800: '#6B21A8',
  					900: '#581C87',
  				},
  				blue: {
  					light: '#DBEAFE',
  					50: '#EFF6FF',
  					100: '#DBEAFE',
  					200: '#BFDBFE',
  					300: '#93C5FD',
  					400: '#60A5FA',
  					500: '#3B82F6',
  					600: '#2563EB',
  					700: '#1D4ED8',
  					800: '#1E40AF',
  					900: '#1E3A8A',
  				},
  				pink: {
  					light: '#FCE7F3',
  					50: '#FDF2F8',
  					100: '#FCE7F3',
  					200: '#FBCFE8',
  					300: '#F9A8D4',
  					400: '#F472B6',
  					500: '#EC4899',
  					600: '#DB2777',
  					700: '#BE185D',
  					800: '#9D174D',
  					900: '#831843',
  				},
  				cyan: {
  					light: '#CFFAFE',
  					50: '#ECFEFF',
  					100: '#CFFAFE',
  					200: '#A5F3FC',
  					300: '#67E8F9',
  					400: '#22D3EE',
  					500: '#06B6D4',
  					600: '#0891B2',
  					700: '#0E7490',
  					800: '#155E75',
  					900: '#164E63',
  				},
  				yellow: {
  					light: '#FEF3C7',
  					50: '#FFFBEB',
  					100: '#FEF3C7',
  					200: '#FDE68A',
  					300: '#FCD34D',
  					400: '#FBBF24',
  					500: '#F59E0B',
  					600: '#D97706',
  					700: '#B45309',
  					800: '#92400E',
  					900: '#78350F',
  				},
  			},
  			// Accent Colors (Vibrant)
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))',
  				magenta: '#E879F9',
  				pink: '#EC4899',
  				blue: '#3B82F6',
  				green: '#10B981',
  				purple: '#A855F7',
  				orange: '#F97316',
  				red: '#EF4444',
  				yellow: '#FBBF24',
  				cyan: '#06B6D4',
  				indigo: '#6366F1',
  			},
  			// Background Gradients
  			bg: {
  				'purple-light': '#F3E8FF',
  				'blue-light': '#DBEAFE',
  				'pink-light': '#FCE7F3',
  				'cyan-light': '#CFFAFE',
  				'yellow-light': '#FEF3C7',
  			},
  			// Glass Colors
  			glass: {
  				white: 'rgba(255, 255, 255, 0.7)',
  				'white-border': 'rgba(255, 255, 255, 0.3)',
  				dark: 'rgba(0, 0, 0, 0.1)',
  				'dark-border': 'rgba(0, 0, 0, 0.05)',
  			},
  			// Dark Theme Colors (from UI image)
  			dark: {
  				bg: '#0F0F1E',
  				'bg-secondary': '#1A1A2E',
  				'bg-tertiary': '#252542',
  				border: '#2A2A4A',
  				text: '#FFFFFF',
  				'secondary-text': '#B8B8D0',
  				'muted-text': '#8888A0',
  			},
  			// Chart Colors (from UI image)
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				// Numeric chart colors
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))',
  				// Named chart colors (from UI image)
  				purple: '#8B5CF6',
  				blue: '#3B82F6',
  				green: '#10B981',
  				yellow: '#F59E0B',
  				pink: '#EC4899',
  			}
  		},
  		// Background Images (Gradients)
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-pastel': 'linear-gradient(135deg, #F3E8FF 0%, #DBEAFE 25%, #CFFAFE 50%, #FEF3C7 100%)',
  			'gradient-purple-blue': 'linear-gradient(135deg, #F3E8FF 0%, #DBEAFE 100%)',
  			'gradient-blue-cyan': 'linear-gradient(135deg, #DBEAFE 0%, #CFFAFE 100%)',
  			'gradient-pink-purple': 'linear-gradient(135deg, #FCE7F3 0%, #F3E8FF 100%)',
  			'gradient-cyan-yellow': 'linear-gradient(135deg, #CFFAFE 0%, #FEF3C7 100%)',
  		},
  		// Box Shadows
  		boxShadow: {
  			'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
  			'glass-lg': '0 12px 40px 0 rgba(31, 38, 135, 0.1)',
  			'glow-purple': '0 0 40px rgba(168, 85, 247, 0.3)',
  			'glow-blue': '0 0 40px rgba(59, 130, 246, 0.3)',
  			'glow-pink': '0 0 40px rgba(236, 72, 153, 0.3)',
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  		// Border Radius
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			'4xl': '2rem',
  			'5xl': '2.5rem',
  		},
  		// Animation
  		animation: {
  			float: 'float 6s ease-in-out infinite',
  			'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'blob': 'blob 7s infinite',
  			'blob-slow': 'blob 10s infinite',
  		},
  		keyframes: {
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
  				}
  			},
  			blob: {
  				'0%': {
  					transform: 'translate(0px, 0px) scale(1)',
  				},
  				'33%': {
  					transform: 'translate(30px, -50px) scale(1.1)',
  				},
  				'66%': {
  					transform: 'translate(-20px, 20px) scale(0.9)',
  				},
  				'100%': {
  					transform: 'translate(0px, 0px) scale(1)',
  				},
  			},
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
