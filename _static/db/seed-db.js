import 'dotenv/config';
import { writeFileSync } from 'node:fs';
import { join } from '../util.js';
import sequelize from './db.js';
import Movie from './Movie.js';

const accessToken = process.env.TMDB_ACCESS_TOKEN;
const accountId = process.env.TMDB_ACCOUNT_ID;

// TMDB Fetch Helper
async function tmdbFetch(path) {
  const url = `https://api.themoviedb.org/3${path}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.log(response);
      throw new Error('tmdb() response fetch not ok');
    };

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('error with tmdb()', error);
  }
}

/**
 * Get Movies
 * @returns Array
 */
async function getTmdbData(options) {
  try {
    let currentPage = 1;
    const url = () => `/account/${accountId}/${options.favoriteOrRated}/${options.moviesOrTv}?language=en-US&page=${currentPage}&sort_by=created_at.asc`;
    const jsonFile = join(`db/${options.moviesOrTv}_${options.favoriteOrRated}.json`);
    const tmdbData = [];

    console.log('--------------');
    console.log(`Getting ${options.title}`);
    console.log(url());

    const initialData = await tmdbFetch(url());
    initialData.results.forEach(result => tmdbData.push(result));

    let totalPages = initialData.total_pages;

    if (totalPages >= currentPage) {
      currentPage += 1;

      for (let i = currentPage; i <= totalPages; i++) {
        console.log(`${options.title} page ${currentPage}/${totalPages} (${tmdbData.length}/${initialData.total_results})`);

        const pageResults = await tmdbFetch(url());
        pageResults.results.forEach(result => tmdbData.push(result));

        currentPage += 1;
      }
    }

    // write to json file (for now)
    try {
      writeFileSync(jsonFile, JSON.stringify(tmdbData));
      console.log(`${options.title} json file written`);
    } catch (err) {
      console.error('Error writing to json file');
      throw err;
    }
  } catch (error) {
    console.error('Error with getTmdbData()', error);
  }
}

/**
 * Seed DB
 */
async function seed() {
  try {
    // Sync DB
    await sequelize.sync({ force: true });

    // Get Data
    await getTmdbData({ moviesOrTv: 'movies', favoriteOrRated: 'favorite', title: 'Favorited Movies' });
    await getTmdbData({ moviesOrTv: 'movies', favoriteOrRated: 'rated', title: 'Rated Movies' });
    await getTmdbData({ moviesOrTv: 'tv', favoriteOrRated: 'favorite', title: 'Favorited Shows' });
    await getTmdbData({ moviesOrTv: 'tv', favoriteOrRated: 'rated', title: 'Rated Shows' });

  } catch (error) {
    console.error('error in seed()', error);
  }
}

// Run
seed();