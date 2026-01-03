// type ApiErrors = {
//   statusCode: number,
//   message: string,
//   errors: [],
//   stack: string
// }

export class ApiError extends Error{
  statusCode: number;
  errors: [] | undefined;
  success: boolean;
  data: null;

  constructor(statusCode: number, message: string, errors?: [], stack?: string) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;
    this.data = null;
    stack ? this.stack = stack : Error.captureStackTrace(this, this.constructor);
  }
}