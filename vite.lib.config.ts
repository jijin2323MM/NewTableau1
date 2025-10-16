import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'public/axis/axis-bridge.js',
      name: 'AxisBridge',
      fileName: 'axis-bridge',
      formats: ['umd', 'es'],
    },
    // on place la librairie directement dans public/vendor
    outDir: 'public/vendor',
    emptyOutDir: false,
    rollupOptions: {
      external: ['axis-api'],
      output: {
        globals: {
          'axis-api': 'Axis',
        },
      },
    },
  },
});
