import 'dotenv/config';

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
let accessToken = null;

// Spotify Fetch Helper
async function spotifyFetch(path) {
  const url = `https://api.spotify.com/v1${path}`;

  const fetchOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      headers: { 'Authorization': 'Bearer ' + accessToken },
    }
  };

  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      console.log(response);
      throw new Error('tmdbFetch() response fetch not ok');
    };

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('error with tmdbFetch()', error);
  }
}

/**
 * Get Spotify Access Token
 */
async function getSpotifyAccessToken() {
  console.log('> Getting Spotify Access Token');

  const tokenFetch = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
      'client_id': clientId,
      'client_secret': clientSecret
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  const token = await tokenFetch.json();

  accessToken = token.access_token;
  console.log(`-> Got Spotify Access Token: ${accessToken}`);
}

/**
 * Get Spotify Data
 */
export async function fetchSpotifyData(options) {
  try {
    await getSpotifyAccessToken();
    // const topTenTracks = await spotifyFetch('/me/top/tracks?time_range=long_term&limit=10');
    const tester = await spotifyFetch('/tracks/4cOdK2wGLETKBW3PvgPWqT')

    console.log(tester);
  } catch (error) {
    console.error('Error with fetchSpotifyData()', error);
  }
}

//BQAJforV8zGItPYyT_rR6sz38ZvP96gP5xhWOtFghrR2lrrpGk_KYJ8Q45-5KrBheWhdlJ6G7QoEg9PUjvEAfBsZ98wKLlsIynmC_NCanzyODgWrJzE

curl--request GET \
'https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V' \
--header 'Authorization: Bearer BQA58rPjxBp6x0WDJ0jGjr3ua_AFgzvybvoBm56Ds6J9JY_mjef41RylX73sUZQueAlR_3oToJZDnwFgV2e0TViWNMrHTV49SZdxfzJ3qzRTj4VNz4o'