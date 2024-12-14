import { dev } from "$app/environment"

export const site = {
  title: 'Josh',
  description: 'The dot me of Josh D',
  url: dev ? 'http://localhost:5173' : 'https://joshdplo.me',
}

export const globalLinks = [
  { title: 'Greets', path: '/' },
  { title: 'Likes', path: '/likes', append: 'things' },
  { title: 'Keeps', path: '/keeps', append: 'things' },
  { title: 'Styles', path: '/styles', footerOnly: true },
];

export const likesLinks = [
  { title: 'Everything', path: '/likes' },
  { title: 'Watching', path: '/likes/watching' },
  { title: 'Hearing', path: '/likes/hearing' },
  { title: 'Playing', path: '/likes/playing' }
];
