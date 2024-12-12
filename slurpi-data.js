import Meta from '../slurpi/db/Meta';
import Movie from '../slurpi/db/Movie';
import Show from '../slurpi/db/Show';
import SpotifySong from '../slurpi/db/SpotifySong';
import SpotifyAlbum from '../slurpi/db/SpotifyAlbum';
import SpotifyArtist from '../slurpi/db/SpotifyArtist';
import SpotifyShow from '../slurpi/db/SpotifyShow';
import SteamGame from '../slurpi/db/SteamGame';

const meta = await Meta.findAll({ raw: true });
const movies = await Movie.findAll({ raw: true });
const shows = await Show.findAll({ raw: true });
const spotifySongs = await SpotifySong.findAll({ raw: true });
const spotifyAlbums = await SpotifyAlbum.findAll({ raw: true });
const spotifyArtists = await SpotifyArtist.findAll({ raw: true });
const spotifyShows = await SpotifyShow.findAll({ raw: true });
const steamGames = await SteamGame.findAll({ raw: true });

export default {
  meta,
  movies,
  shows,
  spotifySongs,
  spotifyAlbums,
  spotifyArtists,
  spotifyShows,
  steamGames
}