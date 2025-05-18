import mongoose from "mongoose"

const uri = process.env.MONGODB_URI
if (!uri || uri.trim() === "") {
  throw new Error("Please add a valid MONGODB_URI to .env.local")
}

let isConnected = false
let connectionPromise = null

const connectDB = async () => {
  if (isConnected) {
    return mongoose.connection
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10,
        retryWrites: true,
        w: "majority",
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      })
      .then(() => {
        isConnected = true
        console.log("MongoDB connected successfully")
        return mongoose.connection
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error)
        connectionPromise = null
        isConnected = false
        throw error
      })
  }

  try {
    return await connectionPromise
  } catch (error) {
    connectionPromise = null
    isConnected = false
    throw error
  }
}

export const disconnectDB = async () => {
  if (isConnected) {
    try {
      await mongoose.disconnect()
      isConnected = false
      connectionPromise = null
      console.log("MongoDB disconnected successfully")
    } catch (error) {
      console.error("Error disconnecting from MongoDB:", error)
      throw error
    }
  }
}

export default connectDB
