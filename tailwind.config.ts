import type { Config } from 'tailwindcss'

const config: Config = {
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
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  darkMode: 'class', // 支持通过 class 控制暗黑模式
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

export default config
