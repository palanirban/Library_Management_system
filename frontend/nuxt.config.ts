// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url'

const rootDir = fileURLToPath(new URL('./', import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined'
        }
      ]
    }
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
      autoprefixer: {},
    },
  },
  vite: {
    resolve: {
      alias: {
        '~': rootDir,
        '@': rootDir,
      },
    },
  },

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001',
    },
  },
})
