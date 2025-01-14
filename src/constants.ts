export const SITE = {
  TITLE: 'New',
  DESCRIPTION: 'A new site on the web ',
  POSTS_PER_PAGE: 6,
};

export const PAGE_COLORS = [
  { path: '/', },
  { path: '/posts', color: "quaternary" },
  { path: '/about', color: "secondary" },
]

export const NAV_LINKS = [
  { path: '/', title: 'Welcome' },
  { path: '/posts', title: 'Posts' },
  { path: '/about', title: 'About' },
];

export const FOOTER_LINKS = [
  { path: '/', title: 'Welcome' },
  {
    path: '/about', title: 'About', allTitle: 'About', children: [
      { path: '/about/contact', title: 'Contact' },
    ]
  },
  {
    path: '/posts', title: 'Posts', allTitle: 'All Posts', children: [
      { path: '/posts/tags', title: 'Tags' }
    ]
  },
];