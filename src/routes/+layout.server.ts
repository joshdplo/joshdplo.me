import meta from 'slurpiJson/meta.json';
import movies from 'slurpiJson/movies.json';
import shows from 'slurpiJson/shows.json';
import steamGames from 'slurpiJson/steamGames.json';
import spotifySongs from 'slurpiJson/spotifySongs.json';
import spotifyAlbums from 'slurpiJson/spotifyAlbums.json';
import spotifyArtists from 'slurpiJson/spotifyArtists.json';
import spotifyShows from 'slurpiJson/spotifyShows.json';

function total(...args: Array<any>): number {
  let total = 0;
  args.forEach(a => total += a.length);

  return total;
}

export function load() {
  return {
    siteHeadTitle: 'Josh',
    likesLinks: [
      { title: 'Movies & TV', path: '/likes/watching', amount: total(movies, shows) },
      { title: 'Music', path: '/likes/hearing', amount: total(spotifySongs, spotifyAlbums, spotifyArtists, spotifyShows) },
      { title: 'Games', path: '/likes/playing', amount: steamGames.length }
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