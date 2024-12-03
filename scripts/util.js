import { fileURLToPath } from 'url';
import path from 'node:path';
import { writeFileSync, readFileSync } from 'node:fs';

/**
 * Path Helpers
 * - these will resolve from the current dir (/scripts)
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const join = (str) => path.join(__dirname, str);
export const resolve = (str) => path.resolve(__dirname, str);

/**
 * FS JSON Helpers
 */
export function writeJson(file, data) {
  return new Promise((resolve, reject) => {
    try {
      writeFileSync(file, JSON.stringify(data));
      console.log(`${file} written successfully`);
      resolve();
    } catch (error) {
      console.error(`Error writing ${file} in writeJson()`);
      reject(error);
    }
  });
};

export function readJson(file) {
  return new Promise((resolve, reject) => {
    try {
      const json = JSON.parse(readFileSync(file));
      resolve(json);
    } catch (error) {
      console.error(`Error reading file ${file} in readJson()`);
      reject(error);
    }
  });
}

/**
 * Misc
 */

// Sleep timeout for API rate limiting
export function sleep(ms = 2000) {
  return new Promise((resolve, reject) => {
    let t = setTimeout(() => {
      clearTimeout(t);
      resolve();
    }, ms);
  });
}