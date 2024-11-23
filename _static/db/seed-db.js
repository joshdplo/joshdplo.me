import 'dotenv/config';
import { writeFile, writeFileSync } from 'node:fs'
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
async function getTmdbData(opt) {
  try {
    const moviesOrTv = opt.movies ? 'movies' : 'tv';
    const favoriteOrRated = opt.favorite ? 'favorite' : 'rated';
    const jsonFile = join(`db/${moviesOrTv}_${favoriteOrRated}.json`);

    let currentPage = 1;
    let totalPages = 1;

    const tmdbData = [];
    const url = () => `/account/${accountId}/${favoriteOrRated}/${moviesOrTv}?language=en-US&page=${currentPage}&sort_by=created_at.asc`;

    console.log(url());

    const initialFavorites = await tmdbFetch(url());
    initialFavorites.results.forEach(result => tmdbData.push(result));

    totalPages = initialFavorites.total_pages;

    if (totalPages >= currentPage) {
      currentPage += 1;

      for (let i = currentPage; i <= totalPages; i++) {
        console.log(`${opt.title ? opt.title : ''} page ${currentPage}/${totalPages} (${tmdbData.length}/${initialFavorites.total_results})`);

        const pageResults = await tmdbFetch(url());
        pageResults.results.forEach(result => tmdbData.push(result));

        currentPage += 1;
      }
    }

    // write to json file (for now)
    writeFileSync(jsonFile, JSON.stringify(tmdbData), (err) => {
      if (err) {
        console.error('Error writing to json file');
        throw err;
      }
    });
  } catch (error) {
    console.error('Error with getTmdbData()', error);
  }
}

/**
 * Get Shows
 * @returns Array
 */
async function getTmdbShows() {
  try {
    return ['shows'];
  } catch (error) {
    console.error('Error with getTmdbShows()', error);
  }
}

async function seed() {
  try {
    // Sync DB
    await sequelize.sync({ force: true });

    // Get Data
    await getTmdbData({ title: 'Favorited Movies' }); // movies/favorited
    await getTmdbData({ favorite: false, title: 'Rated Movies' }); // movies/rated
    await getTmdbData({ movies: false, title: 'Favorited Shows' }); // tv/favorited
    await getTmdbData({ movies: false, favorite: false, title: 'Rated Shows' }); // tv/rated

  } catch (error) {
    console.error('error in seed()', error);
  }
}

// Run
seed();