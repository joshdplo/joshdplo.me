import express from 'express';
import { getSearchStatus, postSearch } from './searchController.js';
import { testContact, postContact } from './contactController.js';
const router = express.Router();

// Search Routes
router.get('/search', getSearchStatus);
router.post('/search', postSearch);

// Contact Routes
router.get('/contact', testContact);
router.post('/contact', postContact);

export default router;