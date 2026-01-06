// type responseType = {
//   statusCode: number,
//   message: string,
//   data: unknown
// }

export class responseHandler{
  statusCode: number;
  message: string;
  data: unknown

  constructor(statusCode: number, message: string, data?: unknown) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}