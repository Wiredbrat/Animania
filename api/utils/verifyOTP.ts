import otpGenerator from "otp-generator";
import { ApiError } from "./ApiError.ts"
import { asyncHandler } from "./asyncHandler.ts";

export const verifyOTP = asyncHandler(async(req, res): Promise<Boolean> => {
  const generatedOTP:string = otpGenerator.generate(6, {upperCaseAlphabets: false, specialChars: false})
  console.log(generatedOTP);
  
  const maxAttempt = 3;
  let attemptTaken = 0;
  const { otp } = req.body as {otp: string};

  for(let i = 0; i < maxAttempt; i++) {
    if(otp !== generatedOTP) {
      i++;
      attemptTaken++;
      console.log("Wrong OTP. Attempts left: ", (maxAttempt-attemptTaken));
    }else{
      break;
    }
  }

  if(attemptTaken === maxAttempt) {
    throw new ApiError(401 , "OTP didn't match. Maximum attempts done");
  }
  
  return true;
})