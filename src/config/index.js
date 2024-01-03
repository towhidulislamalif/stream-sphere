import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config = {
  port: process.env.PORT,
  mongodbURI: process.env.MONGODB_URI,
  corsOrigin: process.env.CORS_ORIGIN,
};

export default config;
