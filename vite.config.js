import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api':{
        target:'http://159.75.169.224:1235',
        changeOrigin:true
      }
  }
  }
})
