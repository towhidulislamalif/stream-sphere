import { User } from '../models/user.model.js';
import ApiError from '../utilities/ApiError.js';
import ApiResponse from '../utilities/ApiResponse.js';
import { asyncRequestHandler } from '../utilities/asyncRequestHandler.js';
import { uploadOnCloudinary } from '../utilities/cloudinary.js';

export const registerUser = asyncRequestHandler(async (req, res) => {
  /*
   steps for create user
   1. get user data or details from frontend
   2. validate user details
   3. check if user exists
   4. check user give images or not
   5. upload cloudinary check avatar upload successfully
   6. create user object -> create entry in database
   7. remove password and refresh token field from res
   8. check for user creation
   9. return res
  */
  const { username, email, password, fullName } = req.body;

  if (
    !username?.length ||
    !email?.length ||
    !password?.length ||
    !fullName?.length
  ) {
    throw new ApiError(400, 'fields is required!');
  }

  // check email validation
  if (email && !email.includes('@')) {
    throw new ApiError(400, 'Invalid email address!');
  }

  const existedUser = User.findOne({ $or: [{ username }, { email }] });

  if (existedUser) {
    throw new ApiError(409, 'User already exists!');
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, 'Avatar is required!');
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, 'Avatar is required!');
  }

  console.log(req.files);
  const user = await User.create({
    username,
    email,
    password,
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || '',
  });

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  if (!createdUser) {
    throw new ApiError(500, 'Internal server error!');
  }

  return res
    .status(201)
    .json(new ApiResponse(200, 'User registered successfully', createdUser));
});
