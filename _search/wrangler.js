import path from "node:path";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import * as cheerio from 'cheerio';

/**
 * Generates Search JSON from Astro dist HTML files
 */
console.log('@@@ WRANGLING ASTRO HTML INTO SEARCHABLE JSON @@@@');//REMOVE

// Get ALL files from directory
function readdirRecursiveSync(directory) {
  const files = [];

  const entries = readdirSync(new URL(directory, import.meta.url), { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...readdirRecursiveSync(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

// Filter HTML files for searching
const files = readdirRecursiveSync('../dist');
const htmlFiles = files
  .filter(f => {
    const s = f.split('/');
    const grandparentDir = s[s.length - 3];
    const parentDir = s[s.length - 2];
    const name = s[s.length - 1];

    return path.extname(f) === '.html' &&
      parentDir !== '1' &&
      parentDir !== 'search' &&
      parentDir !== 'tags' &&
      grandparentDir !== 'tags' &&
      parentDir !== 'dist' &&
      f !== '../dist/keeps/index.html' &&
      f !== '../dist/likes/index.html'
  });

// Create Search Object
const terms = {};
const categoryTerms = [
  { category: 'movie', termSelector: '.title span' },
  { category: 'show', termSelector: '.title span' },
  { category: 'song', termSelector: '.title' },
  { category: 'band', termSelector: '.title' },
  { category: 'game', termSelector: '.title' },
  { category: 'keep', termSelector: 'h1 .title' }
];
htmlFiles.forEach(f => {
  const html = readFileSync(new URL(f, import.meta.url), 'utf8');
  const $ = cheerio.load(html, { onParseError: (err) => console.error('Cheerio parse error:', err) }, false);

  categoryTerms.forEach(c => {
    const el = $(`[data-${c.category}-id]`);
    if (el) {
      console.log(`[data-${c.category}-id] ${c.termSelector}`);
      const term = $(`[data-${c.category}-id] ${c.termSelector}`).text();
      console.log(`${c.category}-id`, term);
    }
  });
});

// console.log(terms);

// writeFileSync(new URL('./data/htmlfiles.json', import.meta.url), JSON.stringify(extracted));



console.log('@@@ WRANGLING COMPLETE! @@@@');//REMOVE