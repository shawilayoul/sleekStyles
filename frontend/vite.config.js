import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // This plugin enables JSX support
  server: {
    port: 8000, // Change to your desired port
  },
});
