import meta from 'slurpiJson/meta.json';
import movies from 'slurpiJson/movies.json';
import shows from 'slurpiJson/shows.json';
import steamGames from 'slurpiJson/steamGames.json';
import spotifySongs from 'slurpiJson/spotifySongs.json';
import spotifyAlbums from 'slurpiJson/spotifyAlbums.json';
import spotifyArtists from 'slurpiJson/spotifyArtists.json';
import spotifyShows from 'slurpiJson/spotifyShows.json';

export function load() {
  return {
    siteHeadTitle: 'Josh',
    likesLinks: [
      { title: 'Movies & TV', path: '/likes/watching' },
      { title: 'Music', path: '/likes/hearing' },
      { title: 'Games', path: '/likes/playing' }
    ],
    landingPageLinks: [
      { title: 'Yo!', path: '/' },
      { title: 'Likes', path: '/likes' },
      { title: 'Keeps', path: '/keeps' },
    ],
    meta,
    movies,
    shows,
    steamGames,
    spotifySongs,
    spotifyAlbums,
    spotifyArtists,
    spotifyShows
  }
}

export const prerender = "auto";