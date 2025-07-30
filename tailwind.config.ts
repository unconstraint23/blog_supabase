import type { Config } from 'tailwindcss'

export default {
  content: [
     './app/**/*.{ts,tsx}',       // Next.js 13+ app directory
    './pages/**/*.{ts,tsx}',     // Next.js pages directory
    './components/**/*.{ts,tsx}',// 组件目录
    './src/**/*.{ts,tsx}',       // 如果你用 src 目录结构
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',   // 自定义主题色
        secondary: '#f97316',
        dark: '#0f172a',
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      borderColor: {
        border: "var(--border)",
      },
      outlineColor: {
        ring: "var(--ring)",
        "ring-50": "hsl(var(--ring) / 0.5)",
      },
    },
  },
  darkMode: 'class',  
  plugins: [
     require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
} satisfies Config

