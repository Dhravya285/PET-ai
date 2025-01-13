import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  //  server: {
  //   https:true,
  //   host: 'localhost', // or '0.0.0.0' for external access
  //   port: 5173,
  //  },
});
