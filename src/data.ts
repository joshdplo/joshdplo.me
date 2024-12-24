//@ts-nocheck
/**
 * Export Data coming through vite's "define" block
 */
export const META = DB_META;

export const MOVIES: Movie[] = DB_MOVIES.sort((a, b) => a.title.localeCompare(b.title));
export const NUM_MOVIES: number = DB_MOVIES.length;

export const SHOWS: Show[] = DB_SHOWS.sort((a, b) => a.name.localeCompare(b.name));
export const NUM_SHOWS: number = DB_SHOWS.length;

export const SPOTIFY_SONGS: SpotifySong[] = DB_SPOTIFY_SONGS.sort((a, b) => a.name.localeCompare(b.name));
export const NUM_SPOTIFY_SONGS: number = DB_SPOTIFY_SONGS.length;

export const SPOTIFY_ALBUMS: SpotifyAlbum[] = DB_SPOTIFY_ALBUMS.sort((a, b) => a.name.localeCompare(b.name));
export const NUM_SPOTIFY_ALBUMS: number = DB_SPOTIFY_ALBUMS.length;

export const SPOTIFY_ARTISTS: SpotifyArtist[] = DB_SPOTIFY_ARTISTS.sort((a, b) => a.name.localeCompare(b.name));
export const NUM_SPOTIFY_ARTISTS: number = DB_SPOTIFY_ARTISTS.length;

export const SPOTIFY_SHOWS: SpotifyAlbum[] = DB_SPOTIFY_SHOWS.sort((a, b) => a.name.localeCompare(b.name));
export const NUM_SPOTIFY_SHOWS: number = DB_SPOTIFY_SHOWS.length;

export const STEAM_GAMES: SteamGame[] = DB_STEAM_GAMES.sort((a, b) => a?.name?.localeCompare(b.name));
export const NUM_STEAM_GAMES: number = DB_STEAM_GAMES.length;
