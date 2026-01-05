import { User } from "../models/user.model.ts" 
import type {userType } from "../models/user.model.ts"
import { ApiError } from "../utils/ApiError.ts";
import { asyncHandler } from "../utils/asyncHandler.ts"
import { responseHandler } from "../utils/responseHandler.ts";
import { verifyOTP } from "../utils/verifyOTP.ts";

const userSignUp = asyncHandler(async(req, res) => {
  const {username, email, password} = req.body;

  if(!username || !email || !password) {
    throw new ApiError(400, "Enter valid user details")
  }

  const user = await User.findOne(
    {$or: [{ username }, { email }]}
  )

  if(user) {
    return new ApiError(409, "user already exists")
  }
  const isVerified = verifyOTP;  

  if(!isVerified) {
    throw new ApiError(401, "User verfication failed");
  }

  const newUser = await User.create({
    username,
    email,
    password,
  })
  
  if(!newUser) {
    throw new ApiError(500, "error while user signup");
  }

  return res
  .status(201)
  .json(new responseHandler(201, "User signup successfully", newUser))
})

const userLogin = asyncHandler(async(req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({username})

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  const isPasswordCorrect = user.verifyPassword(password);

  if(!isPasswordCorrect) {
    throw new ApiError(401, "password not correct");
  }

  const refreshToken = user.generateRefreshToken();
  const accessToken = user.generateAccessToken();
  
  user.accessToken = accessToken;
  user.refreshToken = refreshToken;
  user.save();

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true
  })

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true
  })

  return res
  .status(200)
  .json(new responseHandler(200,
    "User login successful",
    user
  )
)})

const userLogOut = asyncHandler((req, res) => {

})

export { userSignUp, userLogin, userLogOut, }