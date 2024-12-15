import { dev } from "$app/environment"

export const site = {
  title: 'Josh',
  description: 'The dot me of Josh D',
  url: dev ? 'http://localhost:5173' : 'https://joshdplo.me',
}

export const globalLinks = [
  { title: 'Greets', path: '/', color: 'primary' },
  { title: 'Likes', path: '/likes', color: 'secondary' },
  { title: 'Keeps', path: '/keeps', color: 'quaternary' },
];

export const likesLinks = [
  { title: 'Everything', path: '/likes' },
  { title: 'Watching', path: '/likes/watching' },
  { title: 'Hearing', path: '/likes/hearing' },
  { title: 'Playing', path: '/likes/playing' }
];

export const footerLinks = [
  ...globalLinks,
  { title: 'Styles', path: '/styles' }
]