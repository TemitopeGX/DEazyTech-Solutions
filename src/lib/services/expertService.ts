import { storage, db } from "../firebase";
import {
  uploadFile,
  generateUniqueFileName,
  validateImageFile,
} from "../utils";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

export interface Expert {
  id: string;
  name: string;
  image: string;
  role: string;
  bio: string;
  created_at: string;
}

export interface ExpertInput {
  name: string;
  role: string;
  bio: string;
}

export const addExpert = async (
  data: ExpertInput,
  imageFile: File
): Promise<Expert> => {
  try {
    validateImageFile(imageFile);
    const fileName = generateUniqueFileName(imageFile);
    const imageUrl = await uploadFile(imageFile, `experts/${fileName}`);

    const docRef = await addDoc(collection(db, "experts"), {
      ...data,
      image: imageUrl,
      created_at: new Date().toISOString(),
    });

    return {
      id: docRef.id,
      ...data,
      image: imageUrl,
      created_at: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error adding expert:", error);
    throw error;
  }
};

export const deleteExpert = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "experts", id));
  } catch (error) {
    console.error("Error deleting expert:", error);
    throw error;
  }
};

export const getExpert = async (id: string): Promise<Expert | null> => {
  try {
    const docRef = doc(db, "experts", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();
    return {
      id: docSnap.id,
      name: data.name,
      image: data.image,
      role: data.role,
      bio: data.bio,
      created_at: data.created_at,
    };
  } catch (error) {
    console.error("Error getting expert:", error);
    throw error;
  }
};

export const getAllExperts = async (): Promise<Expert[]> => {
  try {
    const q = query(collection(db, "experts"), orderBy("created_at", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          created_at: doc.data().created_at,
        } as Expert)
    );
  } catch (error) {
    console.error("Error getting experts:", error);
    throw error;
  }
};
