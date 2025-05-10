import mongoose from "mongoose";

declare global {
  var mongoose:
    | {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
      }
    | undefined;
}

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (global.mongoose?.conn) {
    return global.mongoose.conn;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  if (!global.mongoose?.promise) {
    const opts = {
      bufferCommands: false,
    };

    const connection = await mongoose.connect(process.env.MONGODB_URI, opts);
    global.mongoose = {
      conn: connection.connection,
      promise: Promise.resolve(connection.connection),
    };
  }

  try {
    const conn = await global.mongoose.promise;
    global.mongoose.conn = conn;
    return conn;
  } catch (e) {
    global.mongoose.promise = null;
    throw e;
  }
}

export default connectDB;
