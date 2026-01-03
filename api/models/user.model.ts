import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

const userSchema = new Schema({
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
  }
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

export { User };