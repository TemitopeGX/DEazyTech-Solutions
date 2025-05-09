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

export interface Client {
  id: string;
  name: string;
  logo: string;
  website: string;
  category: "client" | "partner";
  created_at: string;
}

export interface ClientInput {
  name: string;
  website: string;
  category: "client" | "partner";
}

export const addClient = async (
  data: ClientInput,
  logoFile: File
): Promise<Client> => {
  try {
    validateImageFile(logoFile);
    const fileName = generateUniqueFileName(logoFile);
    const logoUrl = await uploadFile(logoFile, `clients/${fileName}`);

    const docRef = await addDoc(collection(db, "clients"), {
      ...data,
      logo: logoUrl,
      created_at: new Date().toISOString(),
    });

    return {
      id: docRef.id,
      ...data,
      logo: logoUrl,
      created_at: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error adding client:", error);
    throw error;
  }
};

export const updateClient = async (
  id: string,
  updates: Partial<ClientInput>,
  logoFile?: File
): Promise<void> => {
  try {
    const existingClient = await getClient(id);
    if (!existingClient) {
      throw new Error("Client not found");
    }

    // Create a complete ClientInput object
    const completeData: ClientInput = {
      name: updates.name || existingClient.name,
      website: updates.website || existingClient.website,
      category: updates.category || existingClient.category,
    };

    // Delete the old document
    await deleteDoc(doc(db, "clients", id));

    if (logoFile) {
      // If there's a new logo, use addClient with complete data
      await addClient(completeData, logoFile);
    } else {
      // If no new logo, preserve the existing one
      await addDoc(collection(db, "clients"), {
        ...completeData,
        logo: existingClient.logo,
        created_at: existingClient.created_at,
      });
    }
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
};

export const deleteClient = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "clients", id));
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};

export const getClient = async (id: string): Promise<Client | null> => {
  try {
    const docRef = doc(db, "clients", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();
    return {
      id: docSnap.id,
      name: data.name,
      logo: data.logo,
      website: data.website,
      category: data.category,
      created_at: data.created_at,
    };
  } catch (error) {
    console.error("Error getting client:", error);
    throw error;
  }
};

export const getAllClients = async (
  category?: "client" | "partner"
): Promise<Client[]> => {
  try {
    let q = query(collection(db, "clients"), orderBy("created_at", "desc"));

    if (category) {
      q = query(
        collection(db, "clients"),
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
        } as Client)
    );
  } catch (error) {
    console.error("Error getting clients:", error);
    throw error;
  }
};
