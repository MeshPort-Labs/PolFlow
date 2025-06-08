/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#E6007A', // Polkadot magenta (primary) - pink-600
        'primary-50': '#FDF2F8', // Very light pink (50-level shade) - pink-50
        'primary-100': '#FCE7F3', // Light pink (100-level shade) - pink-100
        'primary-500': '#EC4899', // Medium pink (500-level shade) - pink-500
        'primary-600': '#E6007A', // Polkadot magenta (600-level shade) - pink-600
        'primary-700': '#BE185D', // Dark pink (700-level shade) - pink-700
        'primary-900': '#831843', // Very dark pink (900-level shade) - pink-900

        // Secondary Colors
        'secondary': '#1E293B', // Deep slate blue (secondary) - slate-800
        'secondary-50': '#F8FAFC', // Very light slate (50-level shade) - slate-50
        'secondary-100': '#F1F5F9', // Light slate (100-level shade) - slate-100
        'secondary-200': '#E2E8F0', // Light slate (200-level shade) - slate-200
        'secondary-300': '#CBD5E1', // Medium light slate (300-level shade) - slate-300
        'secondary-400': '#94A3B8', // Medium slate (400-level shade) - slate-400
        'secondary-500': '#64748B', // Medium slate (500-level shade) - slate-500
        'secondary-600': '#475569', // Medium dark slate (600-level shade) - slate-600
        'secondary-700': '#334155', // Dark slate (700-level shade) - slate-700
        'secondary-800': '#1E293B', // Deep slate blue (800-level shade) - slate-800
        'secondary-900': '#0F172A', // Very dark slate (900-level shade) - slate-900

        // Accent Colors
        'accent': '#3B82F6', // Bright blue (accent) - blue-500
        'accent-50': '#EFF6FF', // Very light blue (50-level shade) - blue-50
        'accent-100': '#DBEAFE', // Light blue (100-level shade) - blue-100
        'accent-200': '#BFDBFE', // Light blue (200-level shade) - blue-200
        'accent-300': '#93C5FD', // Medium light blue (300-level shade) - blue-300
        'accent-400': '#60A5FA', // Medium blue (400-level shade) - blue-400
        'accent-500': '#3B82F6', // Bright blue (500-level shade) - blue-500
        'accent-600': '#2563EB', // Medium dark blue (600-level shade) - blue-600
        'accent-700': '#1D4ED8', // Dark blue (700-level shade) - blue-700
        'accent-800': '#1E40AF', // Very dark blue (800-level shade) - blue-800
        'accent-900': '#1E3A8A', // Very dark blue (900-level shade) - blue-900

        // Background Colors
        'background': '#FAFBFC', // Soft off-white (background) - gray-50
        'surface': '#FFFFFF', // Pure white (surface) - white

        // Text Colors
        'text-primary': '#0F172A', // Near-black (text primary) - slate-900
        'text-secondary': '#64748B', // Medium gray (text secondary) - slate-500

        // Status Colors
        'success': '#10B981', // Vibrant green (success) - emerald-500
        'success-50': '#ECFDF5', // Very light green (50-level shade) - emerald-50
        'success-100': '#D1FAE5', // Light green (100-level shade) - emerald-100
        'success-500': '#10B981', // Vibrant green (500-level shade) - emerald-500
        'success-600': '#059669', // Medium dark green (600-level shade) - emerald-600
        'success-700': '#047857', // Dark green (700-level shade) - emerald-700

        'warning': '#F59E0B', // Amber (warning) - amber-500
        'warning-50': '#FFFBEB', // Very light amber (50-level shade) - amber-50
        'warning-100': '#FEF3C7', // Light amber (100-level shade) - amber-100
        'warning-500': '#F59E0B', // Amber (500-level shade) - amber-500
        'warning-600': '#D97706', // Medium dark amber (600-level shade) - amber-600
        'warning-700': '#B45309', // Dark amber (700-level shade) - amber-700

        'error': '#EF4444', // Clear red (error) - red-500
        'error-50': '#FEF2F2', // Very light red (50-level shade) - red-50
        'error-100': '#FEE2E2', // Light red (100-level shade) - red-100
        'error-500': '#EF4444', // Clear red (500-level shade) - red-500
        'error-600': '#DC2626', // Medium dark red (600-level shade) - red-600
        'error-700': '#B91C1C', // Dark red (700-level shade) - red-700

        // Border Colors
        'border': '#E2E8F0', // Light slate border (border) - slate-200
        'border-light': '#F1F5F9', // Very light slate border (border-light) - slate-100
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.15s ease-out',
        'slide-down': 'slideDown 0.15s ease-out',
        'slide-up': 'slideUp 0.15s ease-out',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.8',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
      },
      zIndex: {
        '1000': '1000',
        '1100': '1100',
        '1200': '1200',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}