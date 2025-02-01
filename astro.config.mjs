// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Likes Data
import Meta from '../slurpi/db/Meta.js';
import Movie from '../slurpi/db/Movie.js';
import Show from '../slurpi/db/Show.js';
import SpotifySong from '../slurpi/db/SpotifySong.js';
import SpotifyArtist from '../slurpi/db/SpotifyArtist.js';
import SteamGame from '../slurpi/db/SteamGame.js';
import RadioStation from '../slurpi/db/RadioStation.js';
const meta = await Meta.findAll();
const movies = await Movie.findAll();
const shows = await Show.findAll();
const songs = await SpotifySong.findAll();
const bands = await SpotifyArtist.findAll();
const games = await SteamGame.findAll();
const radios = await RadioStation.findAll();

const totals = {
  movies: movies.length,
  shows: shows.length,
  songs: songs.length,
  bands: bands.length,
  games: games.length,
  radios: radios.length
};

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
      _META: meta[0],
      _TOTALS: totals,
    }
  }
});
