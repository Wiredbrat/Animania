import { AnimeList } from "../models/anime.model.ts";
import { User } from "../models/user.model.ts" 
import type {AnimeListItems } from "../models/user.model.ts"
import { ApiError } from "../utils/ApiError.ts";
import { asyncHandler } from "../utils/asyncHandler.ts"
import { ApiResponse } from "../utils/responseHandler.ts";
import { verifyOTP } from "../utils/verifyOTP.ts";


// to create new user
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
  .json(new ApiResponse(201, "User signup successfully", newUser))
})

// to login user 
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
  .json(new ApiResponse(200,
    "User login successful",
    user
  )
)})

// to log user out of session
const userLogOut = asyncHandler(async(req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  })

  return res.status(200).json(
    new ApiResponse(200, "User Logged Out Successfully", )
  )
})

// to fetch user details 
const userInfo =asyncHandler(async(req, res) => {
  const user = req.user!;

  const existingUser = await User.findById(user._id).populate("animeList.animeId");

  if(!existingUser) {
    throw new ApiError(401, "unauthorized user");
  }

  return res.status(200).json(
    new ApiResponse(200, "User data fetched succssfully", existingUser)
  )
})

// to delete user 
const deleteUser = asyncHandler(async(req, res) => {
  const user = req.user!;

  const isVerified = verifyOTP;

  if(!isVerified) {
    throw new ApiError(401, "unautorized request")
  }

  const deletedUser = await User.findByIdAndDelete(user._id);

  if(!deletedUser) {
    throw new ApiError(404, "User not deleted as no such user exist.")
  }

  return res.status(200).json(
    new ApiResponse(200, "User Deleted Successfully", deletedUser)
  )
})

// to add new anime in user list
const addNewAnimeToList = asyncHandler(async(req, res) => {
  let user = req.user;
  if(!user) {
    throw new ApiError(401, "Unauthorized User")
  }
  const userId = user._id;
  const existingUser = await User.findById(userId).populate("animeList.animeId");

  if(!existingUser) {
    throw new ApiError(404, "User not Found");
  }

  const { anime } = req.body;
  const { 
    name,
    malId,
    cover,
    totalEpisodes,
    status,
    year,
    genre,
    rating,
    score
  } = anime;

  let newAnime = AnimeList.findOne({malId})
  if(!newAnime) {
     await AnimeList.create({
      name,
      malId,
      cover,
      totalEpisodes,
      status,
      year,
      genre,
      rating,
      score,
    })
  }
  const existingAnimeInList = existingUser.animeList.some((anime: AnimeListItems) => {
    const animeDoc = anime.animeId!;
    return animeDoc.malId.toString() === malId
  }) 

  if(existingAnimeInList) {
    throw new ApiError(409, "Anime already added to the user anime list");
  }

  existingUser.animeList.push({
    episodesWatched: 0,
    userStatus: "Plan to watch"
  })

  await existingUser.save();

  return res.status(200).json(
    new ApiResponse(200, `Anime: ${name} added to user list`, existingUser)
  )
})

// to update anime status in user list
const updateAnimeStatusToList = asyncHandler(async(req, res) => {
  const {anime} = req.body;
  const { animeId, status } = anime;
  const user = req.user;
  if(!user) {
    throw new ApiError(401, "Unauthorized User")
  }

  const existingUser = await User.findById(user._id).populate("animeList.animeId");

  if(!existingUser) {
    throw new ApiError(404, "user not found");
  }
  
  const existingAnimeInList = existingUser.animeList.find((anime) => {
    return anime.animeId === animeId;
  })

  if(!existingAnimeInList) {
    throw new ApiError(404, "Anime not found")
  }

  existingAnimeInList.userStatus = status;
  
  await existingUser.save();

  return res.status(200.).json(
    new ApiResponse(200, "anime status updated successfully", existingAnimeInList)
  )
})

// to update anime episodes watched in user list
const updateAnimeEpisodeToList = asyncHandler(async(req, res) => {
  const {anime} = req.body;
  const { animeId, episodesWatched } = anime;
  const user = req.user;
  if(!user) {
    throw new ApiError(401, "Unauthorized User")
  }

  const existingUser = await User.findById(user._id).populate("animeList.animeId");

  if(!existingUser) {
    throw new ApiError(404, "user not found");
  }
  
  const existingAnimeInList = existingUser.animeList.find((anime) => {
    return anime.animeId === animeId;
  })

  if(!existingAnimeInList) {
    throw new ApiError(404, "Anime not found")
  }

  existingAnimeInList.episodesWatched = episodesWatched;
  
  await existingUser.save();

  return res.status(200.).json(
    new ApiResponse(200, "anime status updated successfully", existingAnimeInList)
  )
})

// to delete anime from user list
const deleteAnimeFromList = asyncHandler(async(req, res) => {
  const {anime} = req.body;
  const { animeId } = anime;
  const user = req.user;
  if(!user) {
    throw new ApiError(401, "Unauthorized User")
  }

  const existingUser = await User.updateOne(
    {_id: user._id}, 
    {
      $pull: {
        animeList: {animeId: animeId}
      }
    }
  );

  return res.status(200.).json(
    new ApiResponse(200, "anime status updated successfully", existingUser)
  )
})

export { userSignUp, userLogin, userLogOut, userInfo, addNewAnimeToList, updateAnimeStatusToList, updateAnimeEpisodeToList, deleteAnimeFromList, deleteUser }