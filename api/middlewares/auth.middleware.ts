import { asyncHandler } from "../utils/asyncHandler.ts";
import { User } from '../models/user.model.ts'
import { ApiError } from "../utils/ApiError.ts";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";


export const userAuth = asyncHandler(async(req, res, next) => {
  const token = req.cookies.accessToken;

  if(!token) {
    throw new ApiError(401, "access token not found")
  }
  
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET!);
  } catch (error) {
    const refreshToken = req.cookies?.refreshToken;

    if(!refreshToken) {
      throw new ApiError(401, "refresh token not found")
    }

    let decodedRefreshToken;

    try {
      decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET!) as JwtPayload

    } catch (error) {
      throw new ApiError(401, "unauthorized user")
    }
    const user = await User.findById(decodedRefreshToken._id)

    if(!user) {
      throw new ApiError(404, "User not found");
    }

    const updatedRefreshToken = user.generateRefreshToken();
    const updatedAccessToken = user.generateAccessToken();

    user.accessToken = updatedAccessToken;
    user.refreshToken = updatedRefreshToken;
    user.save();

    res.cookie("accessToken", updatedAccessToken, {
      httpOnly: true,
      secure: true
    })

    res.cookie("refreshToken", updatedRefreshToken, {
      httpOnly: true,
      secure: true
    })
    req.user = user;
    next();
  }
}) 