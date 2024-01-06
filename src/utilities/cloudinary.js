import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import config from '../config/index.js';
import ApiError from './ApiError.js';

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiKeySecret,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new ApiError(404, 'File not found.');
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    // Log the success and return the Cloudinary response
    console.log('File uploaded successfully to Cloudinary.', response);
    return response;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error uploading file to Cloudinary:', error);

    // Handle the error gracefully, such as deleting the local file
    fs.unlinkSync(localFilePath);

    // Return null to indicate an error
    return null;
  }
};
