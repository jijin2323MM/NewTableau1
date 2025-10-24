import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'public/axis/newbridge.js',
      name: 'NewBridge',
      fileName: 'newbridge',
      formats: ['umd', 'es'],
    },
    outDir: 'public/vendor',
    emptyOutDir: false,
    rollupOptions: {
      external: ['three'],
      output: {
        globals: {
          three: 'THREE',
        },
      },
    },
  },
});
