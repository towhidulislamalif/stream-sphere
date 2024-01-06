import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config/index.js';

const app = express();

app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);

app.use(express.json({ limit: '16kb' }));
app.use(express.static('public'));
app.use(express.urlencoded({ limit: '16kb' }));

app.use(cookieParser());

// routes
import userRoutes from './routes/user.routes.js';

app.use('/api/v1/users', userRoutes);

export default app;
