import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'axis-bridge.js',
      name: 'AxisBridge',
      fileName: 'axis-bridge',
      formats: ['umd','es']
    },
    // ⚠️ On met la lib directement dans public/vendor
    outDir: 'public/vendor',
    emptyOutDir: false
  }
});
