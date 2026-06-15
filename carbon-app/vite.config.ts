import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Carbon's @use graph imports from node_modules; loadPaths lets it resolve.
        loadPaths: ['node_modules'],
        // Carbon v11 SCSS still trips Dart Sass deprecation warnings — silence the noise
        // so a real error is actually visible in the terminal.
        quietDeps: true,
        // Carbon v11 SCSS still uses @import + global built-ins under Dart Sass.
        silenceDeprecations: ['global-builtin', 'import'],
      },
    },
  },
})
