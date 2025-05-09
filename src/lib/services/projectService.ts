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
  where,
  orderBy,
} from "firebase/firestore";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link?: string;
  github?: string;
  created_at: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export const addProject = async (
  data: ProjectInput,
  imageFile: File
): Promise<Project> => {
  try {
    validateImageFile(imageFile);
    const fileName = generateUniqueFileName(imageFile);
    const imageUrl = await uploadFile(imageFile, `projects/${fileName}`);

    const docRef = await addDoc(collection(db, "projects"), {
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
    console.error("Error adding project:", error);
    throw error;
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "projects", id));
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

export const getProject = async (id: string): Promise<Project | null> => {
  try {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();
    return {
      id: docSnap.id,
      title: data.title,
      description: data.description,
      image: data.image,
      category: data.category,
      technologies: data.technologies,
      link: data.link,
      github: data.github,
      created_at: data.created_at,
    };
  } catch (error) {
    console.error("Error getting project:", error);
    throw error;
  }
};

export const getAllProjects = async (category?: string): Promise<Project[]> => {
  try {
    let q = query(collection(db, "projects"), orderBy("created_at", "desc"));

    if (category) {
      q = query(
        collection(db, "projects"),
        where("category", "==", category),
        orderBy("created_at", "desc")
      );
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          created_at: doc.data().created_at,
        } as Project)
    );
  } catch (error) {
    console.error("Error getting projects:", error);
    throw error;
  }
};
