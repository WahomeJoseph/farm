import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Please add MONGODB_URI to .env");
}

let isConnected = false;
let connectionPromise = null;

const connectDB = async () => {
  if (isConnected) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10,
      })
      .then(() => {
        isConnected = true;
        console.log("MongoDB connected successfully");
        return mongoose.connection;
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        connectionPromise = null;
        throw error;
      });
  }

  return connectionPromise;
};

export default connectDB;