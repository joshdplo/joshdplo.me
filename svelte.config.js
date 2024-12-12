import { mdsvex } from "mdsvex";
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [vitePreprocess(), mdsvex()],
    kit: {
        adapter: adapter({
            // default options
            pages: 'build',
            assets: 'build',
            fallback: undefined,
            precompress: false,
            strict: true
        }),
        alias: {
            'slurpiDB': '../slurpi/db',
            'slurpiImages': '../slurpi/public/images'
        }
    },

    extensions: [".svelte", ".svx"]
};

export default config;
