import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs/promises";

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
    const form = formidable({
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    const [fields, files] = await new Promise<
      [formidable.Fields, formidable.Files]
    >((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve([fields, files]);
      });
    });

    const file =
      files.image &&
      (Array.isArray(files.image) ? files.image[0] : files.image);

    if (!file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Read the file as a buffer
    const imageBuffer = await fs.readFile(file.filepath);

    // Clean up the temporary file
    await fs.unlink(file.filepath);

    return res.status(200).json({
      success: true,
      file: {
        buffer: imageBuffer,
        mimetype: file.mimetype,
        originalFilename: file.originalFilename,
        size: file.size,
      },
    });
  } catch (error) {
    console.error("Error processing image upload:", error);
    return res.status(500).json({ error: "Failed to process image upload" });
  }
}
