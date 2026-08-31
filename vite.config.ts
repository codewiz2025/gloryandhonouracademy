import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

// Vercel deployment: nitro emits the Build Output API v3 directory (.vercel/output),
// which Vercel picks up automatically. Override with NITRO_PRESET if you deploy elsewhere.
export default defineConfig({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      // Route the bundled server entry through src/server.ts (SSR error wrapper).
      server: { entry: "server" },
    }),
    nitro({ preset: process.env["NITRO_PRESET"] || "vercel" }),
    viteReact(),
  ],
  server: { port: 3000 },
});
