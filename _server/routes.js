import express from 'express';
import { getSearchStatus, postSearch } from './searchController.js';
import { testContact } from './contactController.js';
const router = express.Router();

// Search Routes
router.get('/search', getSearchStatus);
router.post('/search', postSearch);

// Contact Routes
router.get('/contact', testContact);

export default router;