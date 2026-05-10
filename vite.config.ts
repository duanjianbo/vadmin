import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isPreview = mode === 'preview'

  return {
    base: '/vadmin/', // 建议独立域名部署时改为 '/'。当前为了 github pages 子目录预览
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    define: {
      // 兼容旧代码里直接使用 process.env.NODE_ENV / VUE_APP_API_URL 的写法
      'process.env.NODE_ENV': JSON.stringify(isPreview ? 'production' : mode),
      'process.env.VUE_APP_API_URL': JSON.stringify(env.VITE_API_URL)
    },
    build: {
      sourcemap: false,
      // 去掉生产环境的 console
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 8080,
      open: false
    }
  }
})
