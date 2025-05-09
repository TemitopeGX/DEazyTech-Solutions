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

export interface Testimonial {
  id: string;
  name: string;
  image: string;
  role: string;
  company: string;
  content: string;
  created_at: string;
}

export interface TestimonialInput {
  name: string;
  role: string;
  company: string;
  content: string;
}

export const addTestimonial = async (
  data: TestimonialInput,
  imageFile: File
): Promise<Testimonial> => {
  try {
    validateImageFile(imageFile);
    const fileName = generateUniqueFileName(imageFile);
    const imageUrl = await uploadFile(imageFile, `testimonials/${fileName}`);

    const docRef = await addDoc(collection(db, "testimonials"), {
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
    console.error("Error adding testimonial:", error);
    throw error;
  }
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "testimonials", id));
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    throw error;
  }
};

export const getTestimonial = async (
  id: string
): Promise<Testimonial | null> => {
  try {
    const docRef = doc(db, "testimonials", id);
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
      company: data.company,
      content: data.content,
      created_at: data.created_at,
    };
  } catch (error) {
    console.error("Error getting testimonial:", error);
    throw error;
  }
};

export const getAllTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const q = query(
      collection(db, "testimonials"),
      orderBy("created_at", "desc")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          created_at: doc.data().created_at,
        } as Testimonial)
    );
  } catch (error) {
    console.error("Error getting testimonials:", error);
    throw error;
  }
};
