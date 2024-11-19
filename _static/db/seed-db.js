import 'dotenv/config';
import sequelize from './db.js';
import Movie from './Movie.js';

const accountId = process.env.TMDB_ACCOUNT_ID;
async function tmdb(path) {
  const joinStr = path.includes('?') ? '&' : '?';
  const url = `https://api.themoviedb.org/3/${path}${joinStr}api_key=${process.env.TMDB_KEY}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.log(response);
      throw new Error('Network response was not ok');
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
async function getTmdbMovies() {
  try {
    const movies = [];
    // const favorites = await tmdb(`account/${accountId}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`);
    const favorites = await tmdb('movie/11');
    console.log(favorites);

    return movies;
  } catch (error) {
    console.error('Error with getTmdbMovies()', error);
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
    await sequelize.sync({ force: true });

    const movies = await getTmdbMovies();
    const shows = await getTmdbShows();

    console.log('---- Movies ----');
    console.log(movies);

    console.log('---- Shows ----');
    console.log(shows);
  } catch (error) {
    console.error('error in seed()', error);
  }
}

// Run
seed();