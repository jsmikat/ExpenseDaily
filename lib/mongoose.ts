import mongoose from "mongoose";

let isConnected: boolean = false;

export async function connectToDatabase() {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    return console.log("⚠️MISSING MONGODB_URI");
  }

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "ExpenseTracker",
    });

    isConnected = true;

    console.log("🍃MongoDB is connected");
  } catch (error) {
    console.log("⚠️MongoDB connection failed", error);
  }
}
