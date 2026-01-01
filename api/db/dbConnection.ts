import mongoose, { connection, mongo } from "mongoose"

export const dbConnection = async(): Promise<void> => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: process.env.DB_NAME,
      autoIndex: process.env.ENV !== "Production"
    })
    const dbConnection = mongoose.connection;
    dbConnection.on('connected', () => {
      console.log("database connected", )
    })

    dbConnection.on('error', (err) => {
      console.log('error while connecting database', err)
    })

    dbConnection.on('disconnected', () => {
      console.log("database diconnected")
    })
  } catch (error: any | unknown) {
    console.log("Database connection failed", error.message)
    process.exit(1);
  }
}