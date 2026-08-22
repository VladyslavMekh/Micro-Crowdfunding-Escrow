import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// Solana's web3.js / anchor libraries expect some Node globals (Buffer, process)
// that don't exist in the browser by default. This plugin polyfills them.
export default defineConfig({
  plugins: [react(), nodePolyfills({ include: ["buffer", "process", "crypto", "stream"] })],
  define: {
    "process.env": {},
  },
});
