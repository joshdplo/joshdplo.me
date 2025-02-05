import path from "node:path";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import * as cheerio from 'cheerio';

console.log('Wrangling search terms from Astro HTML files...');

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
      f !== '../dist/notes/index.html' &&
      f !== '../dist/likes/index.html'
  });

// Create Search Object
const terms = {};
const categoryTerms = [
  { category: 'movie', termSelector: '.title span' },
  { category: 'show', termSelector: '.title span' },
  { category: 'song', termSelector: '.title' },
  { category: 'band', termSelector: '.title' },
  { category: 'radio', termSelector: '.title' },
  { category: 'game', termSelector: '.title' },
  { category: 'note', termSelector: 'h1' }
];

htmlFiles.forEach(f => {
  const html = readFileSync(new URL(f, import.meta.url), 'utf8');
  const $ = cheerio.load(html, { onParseError: (err) => console.error('Cheerio parse error:', err) }, false);

  categoryTerms.forEach(c => {
    $(`[data-${c.category}-id]`).each((i, el) => {
      const id = $(el).data(`${c.category}-id`);
      const term = $(el).find(`${c.termSelector}`).text();
      const details = $(el).find('[data-details]')?.text()?.replace('\n', '') || undefined;
      const link = el.tagName === 'a' ? $(el).attr('href') : $(el).find('[data-link]').attr('href');
      if (id && term) terms[term] = {
        category: c.category,
        id,
        details,
        link,
        path: f.replace('../dist', '').replace('..\\dist', '').replace('/index.html', '').replace('\\index.html', '') // unix + windows
      }
    });
  });
});

const amount = Object.keys(terms).length;
writeFileSync(new URL('./search.json', import.meta.url), JSON.stringify(terms));
console.log(`Wrangling Complete! ${amount} terms created`);