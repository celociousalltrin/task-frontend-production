import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build", // Specify the output directory for the build files
    assetsDir: "assets", // Specify the directory for static assets (e.g., images, fonts)
    sourcemap: true, // Enable source maps for easier debugging
  },
});
