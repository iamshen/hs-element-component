import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), basicSsl({
    /** name of certification */
    name: 'test',
    /** custom trust domains */
    domains: ['*.dunhuanggold.com'],
    /** custom certification directory */
    certDir: '../devServer/cert'
  })],
  server: {
    port: 5001,
    https: {

    }
  }
})
