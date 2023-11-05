import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Reactjs-Nurses-Assignment-Sheet/',
  optimizeDeps: {
    include: ['*.ts', '*.d.ts', '*.tsx', '*.js', '*.jsx'],
  },
})
