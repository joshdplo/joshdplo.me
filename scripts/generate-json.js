import 'dotenv/config';
import { join, readJson, writeJson } from './util.js';
import { fetchTmdbData } from './apis/tmdb.js';
import { steamGamesInfoFile, fetchSteamData } from './apis/steam.js';

/**
 * Meta
 */
const metaFile = join(`../${process.env.STATIC_DATA_LOCATION}/meta.json`);
const metaHistoryMax = 25;
const metaDefault = {
  name: process.env.SITE_NAME,
  description: process.env.SITE_DESCRIPTION,
  generated: [Date.now()]
};

function getMetaJson() {
  return new Promise(async (resolve, reject) => {
    try {
      const currentMeta = await readJson(metaFile);
      resolve(currentMeta);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('meta.json doesnt exist: returning new values');
        resolve(metaDefault);
      } else {
        console.error('error in getMetaJson()', error);
        reject(error);
      }
    }
  });
}

function writeMetaJson(additionalJson) {
  console.log('-------------------------');
  console.log('Writing Meta JSON');
  console.log('-------------------------');

  return new Promise(async (resolve, reject) => {
    try {
      const metaJson = await getMetaJson();

      // update statics
      metaJson.name = process.env.SITE_NAME;
      metaJson.description = process.env.SITE_DESCRIPTION;

      // update history
      if (!metaJson.generated) metaJson.generated = [];
      metaJson.generated.unshift(Date.now());
      if (metaJson.generated.length > metaHistoryMax) {
        metaJson.generated = metaJson.generated.slice(0, -1);
      }

      // write
      await writeJson(metaFile, { ...metaJson, ...additionalJson });
      resolve();
    } catch (error) {
      console.error('Error in writeMetaJson()', error);
      reject(error);
    }
  });
}

/**
 * TMDB
 */
const tmdbFile = join(`../${process.env.STATIC_DATA_LOCATION}/tmdb.json`);

function getTmdbJson() {
  console.log('-------------------------');
  console.log('Fetching TMDB Data');
  console.log('-------------------------');

  return new Promise(async (resolve, reject) => {
    try {
      const watchedMovies = await fetchTmdbData({ moviesOrTv: 'movies', favoriteOrRated: 'favorite', title: 'Favorited Movies' });
      const favoriteMovies = await fetchTmdbData({ moviesOrTv: 'movies', favoriteOrRated: 'rated', title: 'Rated Movies' });
      const watchedShows = await fetchTmdbData({ moviesOrTv: 'tv', favoriteOrRated: 'favorite', title: 'Favorited Shows' });
      const favoriteShows = await fetchTmdbData({ moviesOrTv: 'tv', favoriteOrRated: 'rated', title: 'Rated Shows' });

      resolve({
        watchedMovies,
        favoriteMovies,
        watchedShows,
        favoriteShows
      });
    } catch (error) {
      console.error('error in writeTmdbJson()', error);
      reject(error);
    }
  });
}

function getFormattedTmdbJson() {
  return new Promise(async (resolve, reject) => {
    try {
      const tmdbData = await getTmdbJson();

      console.log('-------------------------');
      console.log('Formatting TMDB Data');
      console.log('-------------------------');

      const movies = tmdbData.watchedMovies.map(movie => {
        const rating = tmdbData.favoriteMovies.find(favMovie => favMovie.id === movie.id)?.rating || null;
        return { ...movie, rating };
      });

      const shows = tmdbData.watchedShows.map(show => {
        const rating = tmdbData.favoriteShows.find(favShow => favShow.id === show.id)?.rating || null;
        return { ...show, rating };
      });

      console.log('-> TMDB Data Formatted Successfully');

      resolve({
        movies,
        shows,
        meta: {
          totalMovies: movies.length,
          totalShows: shows.length,
          ratedMovies: tmdbData.favoriteMovies.length,
          ratedShows: tmdbData.favoriteShows.length,
        }
      });
    } catch (error) {
      console.log('Erorr in formatTmdbJson()', error);
      reject(error);
    }
  });
}

function writeTmdbJson(tmdbFormattedData) {
  console.log('-------------------------');
  console.log('Writing TMDB JSON');
  console.log('-------------------------');

  return new Promise(async (resolve, reject) => {
    try {
      await writeJson(tmdbFile, tmdbFormattedData);
      resolve();
    } catch (error) {
      console.error('Erorr in writeTmdbJson()', error);
      reject(error);
    }
  });
}

/**
 * Steam
 */
const steamFile = join(`../${process.env.STATIC_DATA_LOCATION}/steam.json`);

function getSteamJson() {
  console.log('-------------------------');
  console.log('Fetching Steam Data');
  console.log('-------------------------');

  return new Promise(async (resolve, reject) => {
    try {
      const steamJson = await fetchSteamData();
      resolve(steamJson);
    } catch (error) {
      console.error('Error in getSteamJson()', error);
      reject(error);
    }
  });
}

function getFormattedSteamJson() {
  return new Promise(async (resolve, reject) => {
    // Make sure we have game info json
    try {
      const gamesInfoJson = await readJson(steamGamesInfoFile);
      const steamJson = await getSteamJson();
      const formattedSteamJson = {
        games: [],
        meta: {
          totalSteamGames: steamJson.ownedGames.game_count,
          recentSteamGames: steamJson.recentGames.total_count
        }
      };

      console.log('-------------------------');
      console.log('Formatting Steam Data');
      console.log('-------------------------');
      for (let i = 0; i < steamJson.ownedGames.games.length; i++) {
        const game = steamJson.ownedGames.games[i];
        const appId = game.appid;
        const recentlyPlayed = steamJson.recentGames.games.find(g => g.appid === appId) !== undefined;
        const gameInfo = gamesInfoJson.find(g => g.steam_appid === appId);

        if (gameInfo) {
          formattedSteamJson.games.push({
            appId,
            recentlyPlayed,
            name: gameInfo.name,
            isFree: gameInfo.is_free,
            description: gameInfo.short_description,
            website: gameInfo.website,
            supportedLanguages: gameInfo.supported_languages,
            headerImage: gameInfo.header_image,
            developers: gameInfo.developers,
            publishers: gameInfo.publishers,
            platforms: gameInfo.platforms,
            categories: gameInfo.categories,
            genres: gameInfo.genres,
            released: gameInfo.release_date.date,
          });
        } else {
          console.log(`Steam appId ${appId} is missing.`);
          console.log('This is either because we need to refresh our steam games info or, most likely, because the game has been removed from steam or has incomplete data.');
        }
      }

      resolve(formattedSteamJson);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.error('> Steam games info json not found - make sure to generate game info json first!');
        reject(error);
      } else {
        console.error('error getting games info json in getFormattedSteamJson()', error);
        reject(error);
      }
    }
  });
}

function writeSteamJson(steamFormattedData) {
  console.log('-------------------------');
  console.log('Writing Steam JSON');
  console.log('-------------------------');

  return new Promise(async (resolve, reject) => {
    try {
      await writeJson(steamFile, steamFormattedData);
      resolve();
    } catch (error) {
      console.error('Erorr in writeSteamJson()', error);
      reject(error);
    }
  });
}

/**
 * Generate JSON
 */
async function generateJson() {
  try {
    // TMDB
    const formattedTmdbJson = await getFormattedTmdbJson();
    await writeTmdbJson(formattedTmdbJson);

    // Steam
    const formattedSteamJson = await getFormattedSteamJson();
    await writeSteamJson(formattedSteamJson);

    // Meta
    await writeMetaJson({ ...formattedTmdbJson.meta, ...formattedSteamJson.meta });
  } catch (error) {
    console.error('Erorr in generateJson()', error);
  }
}

// Run
generateJson();