import app from './app.js';
import config from './config/index.js';
import connectToDatabase from './database/index.js';

const startServer = () => {
  const PORT = config.port || 8080;
  app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}👂`);
  });
};

const main = async () => {
  try {
    await connectToDatabase();
    startServer();
  } catch (error) {
    console.error(
      'Error connecting to the database or starting the server:',
      error
    );
    process.exit(1);
  }
};

main().catch((error) => {
  console.error('Unhandled error during startup:', error);
  process.exit(1);
});

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
