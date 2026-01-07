import type {Request, Response, NextFunction, RequestHandler} from "express";

export const asyncHandler = 
  (ApiResponse: RequestHandler): RequestHandler => async(req: Request, res: Response, next: NextFunction) => {
    try {
      await ApiResponse(req, res, next);
    } catch (error) {
      console.table(`Error : ${error}`)
      next(error);
    }
}