import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-expect-error This was an error I incounter but I couldn't resolve it

import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()]
});
