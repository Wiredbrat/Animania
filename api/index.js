import express from "express";
import dotenv from 'dotenv';
import { dbConnection } from "./db/dbConnection.ts";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router } from "./routes/routes.ts";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: [process.env.ALLOWED_URL],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// to connect routes to server
app.use("/api/v1", router);

dbConnection()
.then(() => {
  app.listen(port, () => {
  console.log('App is running on', port)
})})
.catch((error) => {
  console.log('server not started due to db connection failure')
})