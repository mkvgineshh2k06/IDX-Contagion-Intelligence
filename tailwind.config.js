/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'surface-bg': '#030712',
        'surface-secondary': '#050B18',
        'surface-panel': '#081225',
        'surface-elevated': '#0C1730',
        'border-color': 'rgba(96,165,250,0.16)',
        'text-main': '#F8FAFC',
        'text-sub': '#A5B4FC',
        'text-muted': '#64748B',
        'fin-blue': '#00A8FF',
        'electric-blue': '#00F5FF',
        'ai-indigo': '#8B5CF6',
        'ai-violet': '#A855F7',
        'trend-up': '#00FF9C',
        'trend-down': '#FF3B5C',
        'status-warn': '#FFD166',
        'status-cyan': '#00F5FF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace'],
      },
      animation: {
        'marquee-infinite': 'marquee 30s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'floatSlow 10s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }, // using duplicative items technique for seamless loop
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '33%': { transform: 'translateY(-10px) translateX(10px)' },
          '66%': { transform: 'translateY(10px) translateX(-5px)' },
        }
      },
      backgroundImage: {
        'fin-grid': 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
        'ai-glow': 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
        'market-glow': 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 60%)',
      }
    },
  },
  plugins: [],
}
