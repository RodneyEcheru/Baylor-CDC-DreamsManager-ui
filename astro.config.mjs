import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), svelte()],
  output: "server",
  server: {
    port: 5002,
    //host: "62.171.141.19",
    host: "localhost",
  },
  adapter: node({
    mode: "standalone"
  })
});