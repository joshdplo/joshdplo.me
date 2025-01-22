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

export const ALL_LINKS = [
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
      { path: '/notes/tags', title: 'Tags' },
      { path: '/notes/authors', title: 'Authors' }
    ]
  },
  { path: '/search', title: 'Search' },
];

export const NAV_LINKS = [
  { path: '/', title: 'Home' },
  { path: '/notes', title: 'Notes' },
  { path: '/likes', title: 'Likes' },
];

export const FOOTER_LINKS = [
  {
    heading: 'Likes',
    links: [
      { path: '/likes', title: 'Top Likes' },
      { path: '/likes/movies', title: 'Movies' },
      { path: '/likes/shows', title: 'Shows' },
      { path: '/likes/bands', title: 'Bands' },
      { path: '/likes/songs', title: 'Songs' },
      { path: '/likes/games', title: 'Games' },
    ]
  },
  {
    heading: 'Notes',
    links: [
      { path: '/notes', title: 'All Notes' },
      { path: '/notes/tags', title: 'Tags' },
      { path: '/notes/authors', title: 'Authors' }
    ]
  },
  {
    heading: 'Site',
    links: [
      { path: '/', title: 'Home' },
      { path: '/search', title: 'Search' },
    ]
  },
];

export const META = _META;
export const TOTALS = _TOTALS;