// @ts-check
import Meta from '../slurpi/db/Meta.js';
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

const meta = await Meta.findAll();

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  site: 'https://joshdplo.me',
  base: '/',
  trailingSlash: 'never',
  vite: {
    define: {
      _META: meta[0]
    }
  }
});