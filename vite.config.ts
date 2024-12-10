import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import meta from '../slurpi/json/meta.json';
import movies from '../slurpi/json/movies.json';
import shows from '../slurpi/json/shows.json';
import steamGames from '../slurpi/json/steamGames.json';
import spotifySongs from '../slurpi/json/spotifySongs.json';
import spotifyAlbums from '../slurpi/json/spotifyAlbums.json';
import spotifyArtists from '../slurpi/json/spotifyArtists.json';
import spotifyShows from '../slurpi/json/spotifyShows.json';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			scss: { api: 'modern' }
		}
	},
	// Static Data from Slurpi
	define: {
		meta,
		movies,
		shows,
		steamGames,
		spotifySongs,
		spotifyAlbums,
		spotifyArtists,
		spotifyShows
	}
});
