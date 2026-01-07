// type responseType = {
//   statusCode: number,
//   message: string,
//   data: unknown
// }

export class ApiResponse{
  statusCode: number;
  message: string;
  success: boolean;
  data: unknown

  constructor(statusCode: number, message: string, data?: unknown) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = true;
    this.data = data;
  }
}