import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

// Multi-pages : chaque fichier HTML = une page buildée dans dist/
export default defineConfig({
  base: './', // chemins relatifs (compatible GitHub Pages)
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        accueil: resolve(__dirname, 'index.html'),
        mentionsLegales: resolve(__dirname, 'mentions-legales.html'),
      },
    },
  },
})
