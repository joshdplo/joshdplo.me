import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { readFileSync } from 'node:fs';
import astroConfig from '../astro.config.mjs';

const app = express();
const PORT = 3034;

// Set up Search
const searchResultsPerPage = 10;
const searchData = JSON.parse(readFileSync(new URL('./search.json', import.meta.url), 'utf8'));
const preprocessSearchIndex = (index) => {
  const processedIndex = {};
  for (const [key, value] of Object.entries(index)) {
    processedIndex[key.toLowerCase()] = value;
  }
  return processedIndex;
};
const searchIndex = preprocessSearchIndex(searchData);

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:4321', astroConfig.site],
  methods: ['GET', 'POST']
}))

// Routing
app.get('/search', (req, res) => res.json({ online: true }));
app.post('/search', (req, res) => {
  const { query, page = 1 } = req.body;
  if (query.length < 3) return res.json({ info: 'insufficient character length' });

  const lowerQuery = query.trim().toLowerCase();

  // Filter all matches
  const matchedResults = Object.entries(searchIndex)
    .filter(([key]) => key.includes(lowerQuery));

  // Total number of matches
  const total = matchedResults.length;

  // Paginated results
  const results = matchedResults
    .slice((page - 1) * searchResultsPerPage, page * searchResultsPerPage)
    .map(([key, value]) => ({ phrase: key, ...value }));

  res.json({ results, total });
});

// Start Server
app.listen(PORT, function (err) {
  if (err) console.error(err);
  console.log(`> Search server up on port ${PORT}`);
});