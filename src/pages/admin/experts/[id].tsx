import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import { db, storage } from "@/lib/firebase";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { HiUpload, HiX, HiPlus } from "react-icons/hi";

interface Expert {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  image: string;
  bio: string;
  experience: string;
  created_at: string;
}

interface ExpertInput {
  name: string;
  role: string;
  expertise: string[];
  bio: string;
  experience: string;
}

const ExpertForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expert, setExpert] = useState<Expert | null>(null);
  const [formData, setFormData] = useState<ExpertInput>({
    name: "",
    role: "",
    expertise: [],
    bio: "",
    experience: "",
  });
  const [newSkill, setNewSkill] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (id) {
      fetchExpert();
    }
  }, [id]);

  const fetchExpert = async () => {
    try {
      if (typeof id !== "string") return;

      const docRef = doc(db, "experts", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        toast.error("Expert not found");
        router.push("/admin/experts");
        return;
      }

      const expertData = { id: docSnap.id, ...docSnap.data() } as Expert;
      setExpert(expertData);
      setFormData({
        name: expertData.name,
        role: expertData.role,
        expertise: expertData.expertise,
        bio: expertData.bio,
        experience: expertData.experience,
      });
      setImagePreview(expertData.image);
    } catch (error) {
      console.error("Error fetching expert:", error);
      toast.error("Failed to load expert");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `experts/${fileName}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (typeof id !== "string") return;

      let imageUrl = expert?.image || "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const expertData = {
        ...formData,
        image: imageUrl,
        updated_at: new Date().toISOString(),
      };

      await setDoc(doc(db, "experts", id), expertData, { merge: true });
      toast.success("Expert updated successfully");
      router.push("/admin/experts");
    } catch (error) {
      console.error("Error updating expert:", error);
      toast.error("Failed to update expert");
    } finally {
      setSaving(false);
    }
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    setFormData({
      ...formData,
      expertise: [...formData.expertise, newSkill.trim()],
    });
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      expertise: formData.expertise.filter((skill) => skill !== skillToRemove),
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#8a0faf]"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Expert</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image
            </label>
            <div className="relative h-48 w-48 mb-4">
              <Image
                src={imagePreview || "/images/placeholder.png"}
                alt="Profile preview"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#ff096c] to-[#8a0faf] rounded-lg hover:opacity-90 cursor-pointer"
            >
              <HiUpload className="w-5 h-5 mr-2" />
              Upload Image
            </label>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
              required
            />
          </div>

          {/* Expertise */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expertise
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
                placeholder="Add a skill"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 text-white bg-gradient-to-r from-[#ff096c] to-[#8a0faf] rounded-lg hover:opacity-90"
              >
                <HiPlus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-[#8a0faf]"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-[#8a0faf] hover:text-[#ff096c]"
                  >
                    <HiX className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years of Experience
            </label>
            <input
              type="text"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 text-white bg-gradient-to-r from-[#ff096c] to-[#8a0faf] rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ExpertForm;
