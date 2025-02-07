import { readFileSync } from 'node:fs';

// Set up Search
const searchResultsPerPage = 10;
const searchData = JSON.parse(readFileSync(new URL('../_search/search.json', import.meta.url), 'utf8'));
const preprocessSearchIndex = (index) => {
  const processedIndex = {};
  for (const [key, value] of Object.entries(index)) {
    processedIndex[key.toLowerCase()] = value;
  }
  return processedIndex;
};
const searchIndex = preprocessSearchIndex(searchData);

// Search Routes
export const getSearchStatus = (req, res) => res.json({ online: true });
export const postSearch = (req, res) => {
  const { query, page = 1 } = req.body;
  if (query.length < 2) return res.json({ info: 'insufficient character length' });

  const lowerQuery = query.trim().toLowerCase();

  // Filter all matches
  const matchedResults = Object.entries(searchIndex)
    .filter(([key]) => key.includes(lowerQuery));

  // Check for exact match
  let exactMatches = [];
  matchedResults.forEach(r => {
    if (r[0].trim() === lowerQuery) {
      exactMatches.push({ phrase: r[0], ...r[1] });
    }
  });

  // Total number of matches
  const total = matchedResults.length;

  // Total number of pages
  const totalPages = Math.ceil(total / searchResultsPerPage);

  // Paginated results
  const results = matchedResults
    .slice((page - 1) * searchResultsPerPage, page * searchResultsPerPage)
    .map(([key, value]) => ({ phrase: key, ...value }));

  const finalJson = { results, total, totalPages };
  if (exactMatches.length) finalJson.exactMatches = exactMatches;

  res.json(finalJson);
};