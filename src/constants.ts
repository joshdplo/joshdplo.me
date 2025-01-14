export const SITE = {
  TITLE: 'Josh D',
  DESCRIPTION: 'The dot me of Josh D',
  NOTES_PER_PAGE: 6,
  MOVIES_PER_PAGE: 10,
  SONGS_PER_PAGE: 12,
  GAMES_PER_PAGE: 10,
};

export const PAGE_COLORS = [
  { path: '/', },
  { path: '/likes', color: "secondary" },
  { path: '/notes', color: "quaternary" },
  { path: '/search', color: "tertiary" },
]

export const NAV_LINKS = [
  { path: '/', title: 'Home' },
  { path: '/likes', title: 'Likes' },
  { path: '/notes', title: 'Notes' },
];

export const FOOTER_LINKS = [
  { path: '/', title: 'Home' },
  {
    path: '/likes', title: 'Likes', allTitle: 'Top Likes', children: [
      { path: '/likes/movies', title: 'Movies' },
      { path: '/likes/shows', title: 'Shows' },
      { path: '/likes/bands', title: 'Bands' },
      { path: '/likes/songs', title: 'Songs' },
      { path: '/likes/games', title: 'Games' },
    ]
  },
  {
    path: '/notes', title: 'Notes', allTitle: 'All Notes', children: [
      { path: '/notes/tags', title: 'Tags' }
    ]
  },
  { path: '/search', title: 'Search' },
];

export const META = _META;