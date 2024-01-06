import { asyncRequestHandler } from '../utilities/asyncRequestHandler.js';

export const registerUser = asyncRequestHandler(async (req, res) => {
  res.status(200).json({
    message: 'OK',
  });
});
