import { defineConfig } from 'vite';

export default defineConfig({
  // Tout ce qui est dans /public sera copié dans /dist
  publicDir: 'public',
  build: {
    outDir: 'dist'
  }
});
