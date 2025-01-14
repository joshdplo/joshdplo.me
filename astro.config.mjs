// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), sitemap()],
  site: 'https://your-great-unique-website.xyz',
  base: '/',
  trailingSlash: 'never',
});