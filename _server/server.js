import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import astroConfig from '../astro.config.mjs';
import routes from './routes.js';

const app = express();
const PORT = 3035;

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:4321', astroConfig.site],
  methods: ['GET', 'POST']
}));

// Routing
app.use('/', routes);

// Start Server
app.listen(PORT, function (err) {
  if (err) console.error(err);
  console.log(`> Search server up on port ${PORT}`);
});