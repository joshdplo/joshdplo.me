import express from 'express';
import helmet from 'helmet';
// import data from './search.json';

const app = express();
const PORT = 3034;

// Middlewares
app.use(helmet());
app.use(express.json());

// Routing
app.get('/', (req, res) => res.json({ status: ok }));
app.post('/', async (req, res) => {
  try {
    res.json({
      results: [],
      total: 69
    });
  } catch (err) {
    console.error(err);
    res.json({ error: '' });
  }
});

// Start Server
app.listen(PORT, function (err) {
  if (err) console.error(err);
  console.log(`> Search server up on port ${PORT}`);
});