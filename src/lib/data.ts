// data from vite "define" block (grabbed from db on build)
export const META = DB_META;

export const MOVIES: Movie[] = DB_MOVIES.sort((a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
});

export const SHOWS: Show[] = DB_SHOWS.sort((a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
});

export const SPOTIFY_SONGS = DB_SPOTIFY_SONGS;
export const SPOTIFY_ALBUMS = DB_SPOTIFY_ALBUMS;
export const SPOTIFY_ARTISTS = DB_SPOTIFY_ARTISTS;
export const SPOTIFY_SHOWS = DB_SPOTIFY_SHOWS;
export const STEAM_GAMES = DB_STEAM_GAMES;
