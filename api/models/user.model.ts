import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { AnimeList } from "./anime.model.ts";
import { ApiError } from "../utils/ApiError.ts";

interface AnimeListItems {
  animeId?: Types.ObjectId;
  episodesWatched: Number;
  userStatus: 'Watching'| 'Plan to watch'| 'On hold'| 'Completed'| 'Dropped';
}

interface UserType extends Document {
  username: string;
  email: string;
  password: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  animeList: AnimeListItems[];
  generateAccessToken(): string;
  generateRefreshToken(): string;
  verifyPassword(password: string): boolean;
}

const userSchema = new Schema<UserType>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email'],
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  animeList: [{
    animeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AnimeList",
      required: true
    },
    episodesWatched: {
      type: Number,
      default: 0,
      min: 0,
    },
    userStatus: {
      type: String,
      enum: ['Watching', 'Plan to watch', 'On hold', 'Completed', 'Dropped'],
      default: "Plan to watch"
    }
  }],
  refreshToken: {
    type: String,
    select: false,
  }
}, {timestamps: true})

// user password encryption

userSchema.pre("save", async function() {
  try {
    if(!this.isModified("password")) return;  
  
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds)
    
  } catch (error) {
    throw new ApiError(500, "error while password encryption");
  }
})

userSchema.methods.verifyPassword = function(password: string): boolean {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    {userId: this._id},
    process.env.JWT_ACCESS_TOKEN_SECRET! as string,
    {expiresIn: process.env.JWT_ACCESS_EXPIRY} as SignOptions
  )
}

userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    {userId: this._id},
    process.env.JWT_REFRESH_TOKEN_SECRET! as string,
    {expiresIn: process.env.JWT_REFRESH_EXPIRY} as SignOptions
  )
}

const User = mongoose.model<UserType>("User", userSchema);

export { User };
export type { UserType, AnimeListItems };