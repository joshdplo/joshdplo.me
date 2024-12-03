import 'dotenv/config';

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
      throw new Error('tmdbFetch() response fetch not ok');
    };

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('error with tmdbFetch()', error);
  }
}

/**
 * Get TMDB Data
 */
export async function fetchTmdbData(options) {
  try {
    let currentPage = 1;
    const tmdbData = [];
    const url = () => `/account/${accountId}/${options.favoriteOrRated}/${options.moviesOrTv}?language=en-US&page=${currentPage}&sort_by=created_at.asc`;

    console.log(`> Fetching ${options.title}`);
    console.log(`-> URL: ${url()}`);

    // Initial fetch - get total pages
    const initialData = await tmdbFetch(url());
    const totalPages = initialData.total_pages;
    const totalResults = initialData.total_results;

    initialData.results.forEach(result => tmdbData.push(result));
    console.log(`--> ${options.title} page ${currentPage}/${totalPages} (${tmdbData.length}/${totalResults})`);

    // If total pages > 1, get all pages
    if (totalPages >= currentPage) {
      currentPage++;

      for (let i = currentPage; i <= totalPages; i++) {
        const pageResults = await tmdbFetch(url());
        pageResults.results.forEach(result => tmdbData.push(result));

        console.log(`--> ${options.title} page ${currentPage}/${totalPages} (${tmdbData.length}/${totalResults})`);
        currentPage += 1;
      }
    }

    return tmdbData;
  } catch (error) {
    console.error('Error with fetchTmdbData()', error);
  }
}