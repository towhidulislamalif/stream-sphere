import mongoose from 'mongoose';
import config from './config/index.js';
import connectToDatabase from './database/index.js';

connectToDatabase();

/* import express from 'express';
const app = express();
(async () => {
  const PORT = config.port;
  try {
    await mongoose.connect(config.mongodbURI);
    console.log('Database connection established🚀');
    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}👂`);
    });
  } catch (error) {
    console.error('Database Error', error);
    process.exit(1);
  }
})();
 */
