import type {Request, Response, NextFunction, RequestHandler} from "express";

export const asyncHandler = 
  (responseHandler: RequestHandler): RequestHandler => async(req: Request, res: Response, next: NextFunction) => {
    try {
      await responseHandler(req, res, next);
    } catch (error) {
      console.table(`Error : ${error}`)
      next(error);
    }
}