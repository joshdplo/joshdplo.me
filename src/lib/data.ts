//@ts-nocheck
/**
 * Export Data coming through vite's "define" block
 */

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
export const NUM_MOVIES: number = DB_MOVIES.length;

export const SHOWS: Show[] = DB_SHOWS.sort((a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
});
export const NUM_SHOWS: number = DB_SHOWS.length;

export const SPOTIFY_SONGS = DB_SPOTIFY_SONGS;
export const NUM_SPOTIFY_SONGS = DB_SPOTIFY_SONGS.length;

export const SPOTIFY_ALBUMS = DB_SPOTIFY_ALBUMS;
export const NUM_SPOTIFY_ALBUMS = DB_SPOTIFY_ALBUMS.length;

export const SPOTIFY_ARTISTS = DB_SPOTIFY_ARTISTS;
export const NUM_SPOTIFY_ARTISTS = DB_SPOTIFY_ARTISTS.length;

export const SPOTIFY_SHOWS = DB_SPOTIFY_SHOWS;
export const NUM_SPOTIFY_SHOWS = DB_SPOTIFY_SHOWS.length;

export const STEAM_GAMES = DB_STEAM_GAMES;
export const NUM_STEAM_GAMES = DB_STEAM_GAMES.length;
