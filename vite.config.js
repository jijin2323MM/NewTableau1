import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'axis-bridge.js',
      name: 'AxisBridge',
      fileName: 'axis-bridge',
    },
    outDir: './dist',
  }
});
