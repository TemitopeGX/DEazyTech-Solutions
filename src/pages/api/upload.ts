import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import {
  uploadImage,
  isValidImageType,
  isValidFileSize,
} from "@/services/uploadService";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);

    const file = files.file?.[0];
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Validate file type
    if (!isValidImageType(file)) {
      return res.status(400).json({ error: "Invalid file type" });
    }

    // Validate file size
    if (!isValidFileSize(file)) {
      return res.status(400).json({ error: "File too large" });
    }

    const folder = fields.folder?.[0] || "images";
    const result = await uploadImage(file, folder);

    res.status(200).json(result);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
}
