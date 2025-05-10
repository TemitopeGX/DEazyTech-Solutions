import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Try to connect to MongoDB
    const conn = await connectDB();

    // Get connection state
    const connectionState = conn.connection.readyState;

    const states = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };

    if (connectionState === 1) {
      res.status(200).json({
        success: true,
        message: "Successfully connected to MongoDB",
        state: states[connectionState],
        database: conn.connection.db.databaseName,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Not connected to MongoDB",
        state: states[connectionState],
      });
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to connect to MongoDB",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
