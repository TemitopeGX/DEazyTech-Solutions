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
    const conn = await connectDB();

    if (!conn) {
      return res.status(500).json({
        success: false,
        message: "Failed to establish database connection",
      });
    }

    // Get connection state
    const connectionState = conn.readyState;

    const states = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };

    const stateMessage =
      states[connectionState as keyof typeof states] || "unknown";

    return res.status(200).json({
      success: connectionState === 1,
      message: `Database ${stateMessage}`,
      state: stateMessage,
      database: conn.name,
    });
  } catch (error) {
    console.error("Database connection test error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to test database connection",
    });
  }
}
