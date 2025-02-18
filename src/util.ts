import { PAGE_COLORS, ALL_LINKS } from "@constants";

/**
 * Environment
 */
export const isDevelopment = process.env.NODE_ENV !== 'production';

/**
 * Format Date
 */
type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

export function formatDate(date: string, dateStyle: DateStyle = 'long', locales = 'en') {
  // Safari is mad about dashes in the date
  const dateToFormat = new Date(date.replaceAll('-', '/'));
  const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
  return dateFormatter.format(dateToFormat);
}

/**
 * Date Relative Time
 */
export function getRelativeTime(date: Date) {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const timeMs = new Date(date).getTime();
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];
  const units = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];

  const unitIndex = cutoffs.findIndex((cutoff) => cutoff > Math.abs(deltaSeconds));
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}

/**
 * Get CSS Clamp
 * https://clamp-generator.netlify.app/
 */
export function getCssClamp(
  minValue: number,
  maxValue: number,
  minVw: number = 500,
  maxVw: number = 1000,
  defRem: number = 16,
): string {
  let diffValues = maxValue - minValue;
  let diffVw = maxVw - minVw;
  let partialPreferred = 100 * diffValues;
  let preferredValue = partialPreferred / diffVw;

  let factor1 = minVw * maxValue;
  let factor2 = maxVw * minValue;

  let diffFactor = factor1 - factor2;
  let diffVwInverse = minVw - maxVw;
  let partialRelative = diffFactor / diffVwInverse;
  let relativeValue = partialRelative / defRem;

  let firstTerm = minValue / defRem;
  firstTerm = parseFloat(firstTerm.toFixed(3));
  let secondTerm = parseFloat(preferredValue.toFixed(3));
  let thirdTerm = parseFloat(relativeValue.toFixed(3));
  let fourthTerm = maxValue / defRem;
  fourthTerm = parseFloat(fourthTerm.toFixed(3));

  if (thirdTerm >= 0) {
    let clampFc = `clamp(${firstTerm}rem, ${secondTerm}vw + ${thirdTerm}rem, ${fourthTerm}rem)`;
    return clampFc;
  } else {
    thirdTerm = Math.abs(thirdTerm);
    let clampFc = `clamp(${firstTerm}rem, ${secondTerm}vw - ${thirdTerm}rem, ${fourthTerm}rem)`;
    return clampFc;
  }
};

/**
 * Get Single Item Collection Page
 */
export function getCollectionItemLink(itemId: string, itemIndex: number, numPerPage: number, collectionName: string) {
  let trimLastLetter = collectionName !== 'radio';

  const page = Math.floor(itemIndex / numPerPage) + 1;
  return `/likes/${collectionName}/${page}?search=${itemId}&cat=${trimLastLetter ? collectionName.substring(0, collectionName.length - 1) : collectionName}`;
}

/**
 * Get Page Color from Path
 */
export function getPageColorFromPath(path: string) {
  const pathToMatch = `/${path.split("/").splice(1)[0]}`;
  const color = Object.values(PAGE_COLORS).find(link => link.path === pathToMatch)?.color;
  return color || 'primary';
}

/**
 * Get Page Color from Category Name
 */
export function getPageColorFromCategory(c: string) {
  switch (c) {
    case 'movie':
      return 'secondary'
    case 'show':
      return 'secondary'
    case 'band':
      return 'secondary'
    case 'song':
      return 'secondary'
    case 'game':
      return 'secondary'
    case 'note':
      return 'quaternary'
    default:
      return 'primary'
  }
}

/**
 * Get Emoji from Category Name
 */
export function getEmojiFromCategory(c: string) {
  switch (c) {
    case 'movie':
    case 'movies':
      return '🍿'
    case 'show':
    case 'shows':
      return '🖥️'
    case 'band':
    case 'bands':
      return '🎸'
    case 'song':
    case 'songs':
      return '🎧'
    case 'game':
    case 'games':
      return '🎮'
    case 'note':
    case 'notes':
      return '📋'
    case 'radio':
    case 'radios':
      return '📡';
    default:
      return ''
  }
}

export function capitalizeRomanNumerals(s: string) {
  const matches = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii', 'xiii', 'xiv', 'xv'];
  const matchesWithColons = matches.map(m => `${m}:`);
  const allMatches = [...matches, ...matchesWithColons];

  return s.split(' ').map(word => allMatches.includes(word) ? word.toUpperCase() : word).join(' ');
}

/**
 * Get Page Menu Links from Path
 */
export function getPageMenuLinksFromPath(path: string) {
  const linkParent = [...ALL_LINKS].filter((l) => l.path === path);
  return [{ path, title: linkParent[0].allTitle }, ...linkParent[0].children];
}
