export const site = {
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
}

// data from vite "define" block
// - this is grabbed from db on build
export const meta = META;
export const movies = MOVIES;
export const shows = SHOWS;
export const spotifySongs = SPOTIFY_SONGS;
export const spotifyAlbums = SPOTIFY_ALBUMS;
export const spotifyArtists = SPOTIFY_ARTISTS;
export const spotifyShows = SPOTIFY_SHOWS;
export const steamGames = STEAM_GAMES;