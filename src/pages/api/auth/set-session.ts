import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { event, session } = req.body;

    if (event !== "SIGNED_IN" || !session) {
      return res.status(400).json({ error: "Invalid request" });
    }

    // Create a Supabase client with the request and response
    const supabase = createServerSupabaseClient({ req, res });

    // Set the auth cookie
    await supabase.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });

    return res.status(200).json({ message: "Session set successfully" });
  } catch (error) {
    console.error("Error setting session:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
