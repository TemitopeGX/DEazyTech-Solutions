import fs from "fs";
import path from "path";

const UPLOAD_DIR =
  process.env.NODE_ENV === "production"
    ? "/home/user/public_html/uploads" // Update this with your cPanel path
    : path.join(process.cwd(), "public", "uploads");

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export interface UploadedFile {
  filename: string;
  path: string;
  url: string;
}

export async function uploadImage(
  file: File,
  folder: string = "images"
): Promise<UploadedFile> {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replace(
      /[^a-zA-Z0-9.-]/g,
      ""
    )}`;
    const relativePath = path.join(folder, filename);
    const absolutePath = path.join(UPLOAD_DIR, relativePath);

    // Ensure folder exists
    const folderPath = path.dirname(absolutePath);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Write file
    fs.writeFileSync(absolutePath, buffer);

    // Generate URL
    const url =
      process.env.NODE_ENV === "production"
        ? `/uploads/${relativePath}` // Update this with your production URL structure
        : `/uploads/${relativePath}`;

    return {
      filename,
      path: relativePath,
      url,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload file");
  }
}

export async function deleteImage(filepath: string): Promise<void> {
  try {
    const absolutePath = path.join(UPLOAD_DIR, filepath);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Failed to delete file");
  }
}

// Helper to validate file type
export function isValidImageType(file: File): boolean {
  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  return validTypes.includes(file.type);
}

// Helper to validate file size (max 5MB)
export function isValidFileSize(
  file: File,
  maxSize: number = 5 * 1024 * 1024
): boolean {
  return file.size <= maxSize;
}
