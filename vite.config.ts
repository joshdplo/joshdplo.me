import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';
import slurpiData from './slurpi-data';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit()
	],
	css: {
		preprocessorOptions: {
			scss: { api: 'modern' }
		}
	},
	define: {
		DB_META: slurpiData.meta,
		DB_MOVIES: slurpiData.movies,
		DB_SHOWS: slurpiData.shows,
		DB_SPOTIFY_SONGS: slurpiData.spotifySongs,
		DB_SPOTIFY_ALBUMS: slurpiData.spotifyAlbums,
		DB_SPOTIFY_ARTISTS: slurpiData.spotifyArtists,
		DB_SPOTIFY_SHOWS: slurpiData.spotifyShows,
		DB_STEAM_GAMES: slurpiData.steamGames
	}
});
