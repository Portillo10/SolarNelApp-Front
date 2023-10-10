import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        icons: [
          {
            src: "/icons/icon_logo_512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/icon_logo_512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icons/icon_logo_192x192.png",
            sizes: "192x19s2",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/icon_logo_192x192.png",
            sizes: "192x19s2",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        name: "SolarNelApp",
        short_name: "SolarNel",
        description: "App to repairs gestion",
      },
      workbox: {
        globPatterns: ["**/*.{js,jsx,css,html,ico,png,svg}"],
        sourcemap: true,
        clientsClaim: true,
      },
    }),
  ],
});
