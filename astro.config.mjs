// @ts-check
import Meta from '../slurpi/db/Meta.js';
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

const meta = await Meta.findAll();

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), sitemap(), mdx({
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'dark-plus' },
  })],
  site: 'https://joshdplo.me',
  base: '/',
  trailingSlash: 'never',
  vite: {
    define: {
      _META: meta[0]
    }
  }
});
