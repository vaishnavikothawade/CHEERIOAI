/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F7F8FA', surface: '#FFFFFF', sidebar: '#0B1B17', 'sidebar-hover': '#13302A',
        primary: { DEFAULT: '#10B981', 600: '#059669' },
        accent: { DEFAULT: '#8B5CF6', 2: '#06B6D4' },
        warning: '#F59E0B', danger: '#EF4444', ink: '#0F172A', muted: '#64748B', line: '#E5E7EB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      borderRadius: { card: '16px', btn: '10px', modal: '20px' },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,0.04), 0 4px 16px rgba(16,24,40,0.06)',
        hover: '0 8px 30px rgba(16,24,40,0.10)',
        glow: '0 0 0 1px rgba(139,92,246,0.25), 0 8px 40px rgba(139,92,246,0.18)',
      },
      keyframes: {
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        pulseRing: { '0%': { transform: 'scale(1)', opacity: '0.6' }, '100%': { transform: 'scale(1.6)', opacity: '0' } },
        blob: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '33%': { transform: 'translate(40px,-30px) scale(1.15)' }, '66%': { transform: 'translate(-30px,30px) scale(0.9)' } },
        bounceDot: { '0%,80%,100%': { transform: 'translateY(0)', opacity: '.4' }, '40%': { transform: 'translateY(-4px)', opacity: '1' } },
        twinkle: { '0%,80%,100%': { transform: 'scale(1) rotate(0)' }, '90%': { transform: 'scale(1.35) rotate(20deg)' } },
      },
      animation: {
        shimmer: 'shimmer 1.4s linear infinite', pulseRing: 'pulseRing 1.8s ease-out infinite',
        blob: 'blob 18s ease-in-out infinite', bounceDot: 'bounceDot 1.2s ease-in-out infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
