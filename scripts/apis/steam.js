import 'dotenv/config';
import { join, sleep, readJson, writeJson } from '../util.js';

const apiKey = process.env.STEAM_API_KEY;
const steamId64 = process.env.STEAM_ID_64;

const ownedGamesUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId64}`;
const recentGamesUrl = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey}&steamid=${steamId64}`
const gameInfoUrl = (appId) => `https://store.steampowered.com/api/appdetails/?key=${apiKey}&appids=${appId}`

// Steam Fetch Helper
async function steamFetch(url, title) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.log(response);
      throw new Error('steamFetch() response fetch not ok');
    };

    console.log(`> Steam Fetching ${title}`);
    console.log(`-> URL: ${url}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('error with steamFetch()', error);
  }
}

/**
 * Get Steam Data
 */
export async function fetchSteamData() {
  try {
    const ownedGames = await steamFetch(ownedGamesUrl, 'Owned Games');
    const recentGames = await steamFetch(recentGamesUrl, 'Recent Games');

    return {
      ownedGames: ownedGames.response,
      recentGames: recentGames.response
    }
  } catch (error) {
    console.error('Error with getTmdbData()', error);
  }
}

/**
 * Get Steam Games Info
 * - API is rate limited, so this must be run separately
 * - we'll store 
 */
const tempJsonFile = join('temp/steam-gameinfo.json');
export const steamGamesInfoFile = join(`../${process.env.STATIC_DATA_LOCATION}/steam-gameinfo.json`);

export async function fetchSteamGamesInfo() {
  console.log('-------------------------');
  console.log('Get Steam Games Info Start');
  console.log('-------------------------');

  let partialJson = [];

  // 1. Get Partial JSON data from file
  console.log('> Checking for partial JSON data');
  try {
    const tempJson = await readJson(tempJsonFile);
    partialJson = tempJson;
    console.log(`-> Got partial JSON`);
    if (partialJson.length) {
      console.log(`-> resuming from last game (${partialJson[partialJson.length - 1].name})`);
    } else {
      console.log('-> partial JSON is empty - all games info will be fetched');
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('-> Partial JSON doesn\'t exist: file will be created and all games info will be fetched');
    } else {
      console.error('error in fetchSteamGamesInfo()', error);
    }
  }

  // 2. Get Owned Games
  let ownedGames = await steamFetch(ownedGamesUrl, 'Owned Games');
  ownedGames = ownedGames.response.games;

  // 3. Start API Calls
  console.log('> Starting Game Info API Calls');
  for (let i = 0; i < ownedGames.length; i++) {
    const appId = ownedGames[i].appid;
    const isExcluded = partialJson.find(t => t.steam_appid === appId) !== undefined;

    if (!isExcluded) {
      const url = gameInfoUrl(appId);
      const info = await steamFetch(url, `${appId}`);

      if (info === undefined) {
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXX');
        console.log(`Steam Games Info Terminated Early`);
        console.log(`We are probably rate limited (429)`);
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXX');
        await writeJson(tempJsonFile, partialJson);
        break;
      } else {
        if (info[`${appId}`].success) partialJson.push(info[`${appId}`].data);

        if (i === ownedGames.length - 1) {
          console.log('-------------------------');
          console.log('Steam Games Info Finished!');
          console.log('-------------------------');
          await writeJson(tempJsonFile, []);
          await writeJson(steamGamesInfoFile, partialJson);
        } else {
          await sleep();
        }
      }
    }
  }
}