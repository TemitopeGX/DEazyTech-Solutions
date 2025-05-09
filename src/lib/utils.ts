import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const uploadFile = async (file: File, path: string): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const generateUniqueFileName = (file: File): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = file.name.split(".").pop();
  return `${timestamp}-${randomString}.${extension}`;
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const validateImageFile = (file: File): boolean => {
  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    throw new Error(
      "Invalid file type. Please upload an image file (JPG, PNG, GIF, or SVG)."
    );
  }

  if (file.size > maxSize) {
    throw new Error("File size too large. Maximum size is 5MB.");
  }

  return true;
};
