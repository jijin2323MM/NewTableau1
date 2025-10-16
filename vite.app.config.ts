import { defineConfig } from 'vite';

export default defineConfig({
  // Tout ce qui est dans /public sera copie dans /dist
  publicDir: 'public',
  build: {
    outDir: 'dist',
  },
});
