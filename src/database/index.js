import mongoose from 'mongoose';
import config from '../config/index.js';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.mongodbURI);
    console.log('\n Database connection established🚀 \n');
  } catch (error) {
    console.error('\n Database connection error🥲 \n');
    process.exit(1);
  }
};

export default connectToDatabase;
