import Meta from 'slurpiDB/Meta';
import Movie from 'slurpiDB/Movie';
import Show from 'slurpiDB/Show';
import SpotifySong from 'slurpiDB/SpotifySong';
import SpotifyAlbum from 'slurpiDB/SpotifyAlbum';
import SpotifyArtist from 'slurpiDB/SpotifyArtist';
import SpotifyShow from 'slurpiDB/SpotifyShow';
import SteamGame from 'slurpiDB/SteamGame';

export async function load() {
  const meta = await Meta.findAll({ raw: true });
  const movies = await Movie.findAll({ raw: true });
  const shows = await Show.findAll({ raw: true });
  const spotifySongs = await SpotifySong.findAll({ raw: true });
  const spotifyAlbums = await SpotifyAlbum.findAll({ raw: true });
  const spotifyArtists = await SpotifyArtist.findAll({ raw: true });
  const spotifyShows = await SpotifyShow.findAll({ raw: true });
  const steamGames = await SteamGame.findAll({ raw: true });

  return {
    siteHeadTitle: 'Josh',
    likesLinks: [
      { title: 'Things', path: '/likes' },
      { title: 'Watching', path: '/likes/watching' },
      { title: 'Hearing', path: '/likes/hearing' },
      { title: 'Playing', path: '/likes/playing' }
    ],
    globalLinks: [
      { title: 'Greets', path: '/' },
      { title: 'Likes', path: '/likes', append: 'things' },
      { title: 'Keeps', path: '/keeps', append: 'things' },
      { title: 'Styles', path: '/styles', footerOnly: true },
    ],
    meta,
    movies,
    shows,
    spotifySongs,
    spotifyAlbums,
    spotifyArtists,
    spotifyShows,
    steamGames,
  }
}

export const prerender = "auto";