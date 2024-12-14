import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from "mdsvex";
import rehypeUnwrapImages from 'rehype-unwrap-images';
import rehypeSlug from 'rehype-slug';

// mdsvex
const mdsvexOptions = {
    extensions: ['.md'],
    rehypePlugins: [rehypeSlug, rehypeUnwrapImages]
};

/** @type {import('@sveltejs/kit').Config} */
export default {
    extensions: ['.svelte', '.md'],
    preprocess: [
        vitePreprocess(),
        mdsvex(mdsvexOptions),
    ],
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
    }
};
