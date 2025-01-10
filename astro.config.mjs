// @ts-check
import Meta from '../slurpi/db/Meta.js';
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

const meta = await Meta.findAll();

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), sitemap()],
  site: 'https://joshdplo.me',
  base: '/',
  vite: {
    define: {
      _META: meta[0]
    }
  }
});