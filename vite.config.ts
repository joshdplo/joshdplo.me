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
		META: slurpiData.meta,
		MOVIES: slurpiData.movies,
		SHOWS: slurpiData.shows,
		SPOTIFY_SONGS: slurpiData.spotifySongs,
		SPOTIFY_ALBUMS: slurpiData.spotifyAlbums,
		SPOTIFY_ARTISTS: slurpiData.spotifyArtists,
		SPOTIFY_SHOWS: slurpiData.spotifyShows,
		STEAM_GAMES: slurpiData.steamGames
	}
});
