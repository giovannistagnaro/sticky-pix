import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Built into the part-time-labs deployment at dist/sticky-pix/,
  // so it is served from https://part-time-labs.com/sticky-pix/
  base: "/sticky-pix/",
})
