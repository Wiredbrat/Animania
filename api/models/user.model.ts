import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

interface userType extends Document {
  username: string;
  email: string;
  password: string;
  accessToken?: string | null;
  refreshToken?: string | null;

  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const userSchema = new Schema<userType>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: String,
  refreshToken: String,
}, {timestamps: true})

const User = mongoose.model("User", userSchema);


// user password encryption

userSchema.pre("save", async function() {
  if(!this.isModified("password")) return;  

  const saltRounds: number = 10;
  this.password = await bcrypt.hash(this.password, saltRounds)
})

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

export { User, userType };