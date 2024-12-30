import path from "node:path";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import * as cheerio from 'cheerio';

/**
 * Generates Search JSON from Astro dist HTML files
 */
console.log('@@@ WRANGLING ASTRO HTML INTO SEARCHABLE JSON @@@@');//REMOVE

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
      (parentDir !== 'keeps' && name === 'index.html') &&
      (parentDir !== 'likes' && name === 'index.html')
  });

htmlFiles.forEach(f => {
  const html = readFileSync(new URL(f, import.meta.url), 'utf8');
  const $ = cheerio.load(html);
  const movies = $.extract({
    movie: '[data-movie] .title span'
  });
  console.log(movies);
});

// writeFileSync(new URL('./data/htmlfiles.json', import.meta.url), JSON.stringify(htmlFiles));



console.log('@@@ WRANGLING COMPLETE! @@@@');//REMOVE