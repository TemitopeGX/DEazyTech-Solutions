import { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import fs from "fs";

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
      multiples: true,
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

    // Read the file
    const imageData = fs.readFileSync(file.filepath);

    // Create response with image data
    const response = {
      data: imageData,
      contentType: file.mimetype,
      filename: file.originalFilename,
    };

    // Clean up the temp file
    fs.unlinkSync(file.filepath);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error processing image upload:", error);
    res.status(500).json({ error: "Error processing image upload" });
  }
}
