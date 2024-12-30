export const SITE = {
  TITLE: 'Josh',
  DESCRIPTION: 'The dot me of Josh D',
  KEEPS_PER_PAGE: 3, //@TODO: Change to proper value after testing
  MOVIES_PER_PAGE: 10,
  SONGS_PER_PAGE: 12,
  GAMES_PER_PAGE: 10,
};

export const PAGE_COLORS = [
  { path: '/', },
  { path: '/likes', color: "secondary" },
  { path: '/keeps', color: "quaternary" },
  { path: '/search', color: "tertiary" },
]

export const NAV_LINKS = [
  { path: '/', title: 'Greets' },
  { path: '/likes', title: 'Likes' },
  { path: '/keeps', title: 'Keeps' },
];

export const FOOTER_LINKS = [
  { path: '/', title: 'Greets' },
  {
    path: '/likes', title: 'Likes', children: [
      { path: '/likes/movies', title: 'Movies' },
      { path: '/likes/shows', title: 'Shows' },
      { path: '/likes/bands', title: 'Bands' },
      { path: '/likes/songs', title: 'Songs' },
      { path: '/likes/games', title: 'Games' },
    ]
  },
  {
    path: '/keeps', title: 'Keeps', children: [
      { path: '/keeps/tags', title: 'Tags' }
    ]
  },
];

export const META = _META;