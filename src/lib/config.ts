import { dev } from "$app/environment"

export const site = {
  title: 'Josh',
  description: 'The dot me of Josh D',
  url: dev ? 'http://localhost:5173' : 'https://joshdplo.me',
}

export const globalLinks = [
  { title: 'Greets', path: '/', color: 'primary' },
  { title: 'Likes', path: '/likes', color: 'secondary', titleSuffix: 'everything' },
  { title: 'Keeps', path: '/keeps', color: 'quaternary', titleSuffix: 'everything' },
];

export const likesLinks = [
  { title: 'Everything', path: '/likes', titleSuffix: 'everything' },
  { title: 'Watching', path: '/likes/watching', titleSuffix: '...' },
  { title: 'Hearing', path: '/likes/hearing', titleSuffix: '...' },
  { title: 'Playing', path: '/likes/playing', titleSuffix: '...' }
];

export const footerLinks = [
  ...globalLinks,
  { title: 'Styles', path: '/styles' }
]