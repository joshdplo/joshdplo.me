export const site = {
  title: 'Josh',
  description: 'The dot me of Josh D',
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
}

// data from vite "define" block (grabbed from db on build)
export const META = DB_META;
export const MOVIES = DB_MOVIES;
export const SHOWS = DB_SHOWS;
export const SPOTIFY_SONGS = DB_SPOTIFY_SONGS;
export const SPOTIFY_ALBUMS = DB_SPOTIFY_ALBUMS;
export const SPOTIFY_ARTISTS = DB_SPOTIFY_ARTISTS;
export const SPOTIFY_SHOWS = DB_SPOTIFY_SHOWS;
export const STEAM_GAMES = DB_STEAM_GAMES;