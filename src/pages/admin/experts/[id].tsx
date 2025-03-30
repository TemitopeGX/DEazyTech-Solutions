import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/lib/supabase";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { HiUpload, HiX, HiPlus } from "react-icons/hi";

interface ExpertForm {
  name: string;
  role: string;
  expertise: string[];
  image: string;
  bio: string;
  experience: string;
  email: string;
  linkedin?: string;
  github?: string;
}

const ExpertForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const isEditing = id !== "add";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [newSkill, setNewSkill] = useState("");
  const [form, setForm] = useState<ExpertForm>({
    name: "",
    role: "",
    expertise: [],
    image: "",
    bio: "",
    experience: "",
    email: "",
    linkedin: "",
    github: "",
  });

  useEffect(() => {
    if (isEditing && id) {
      fetchExpert();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchExpert = async () => {
    try {
      const { data, error } = await supabase
        .from("experts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) {
        setForm(data);
        setImagePreview(data.image);
      }
    } catch (error) {
      console.error("Error fetching expert:", error);
      toast.error("Failed to load expert");
      router.push("/admin/experts");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `experts/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !form.expertise.includes(newSkill.trim())) {
      setForm({
        ...form,
        expertise: [...form.expertise, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setForm({
      ...form,
      expertise: form.expertise.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = form.image;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const expertData = {
        ...form,
        image: imageUrl,
      };

      if (isEditing) {
        const { error } = await supabase
          .from("experts")
          .update(expertData)
          .eq("id", id);
        if (error) throw error;
        toast.success("Expert updated successfully");
      } else {
        const { error } = await supabase.from("experts").insert([expertData]);
        if (error) throw error;
        toast.success("Expert added successfully");
      }

      router.push("/admin/experts");
    } catch (error) {
      console.error("Error saving expert:", error);
      toast.error("Failed to save expert");
    } finally {
      setSaving(false);
    }
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? "Edit Expert" : "Add New Expert"}
            </h1>
            <p className="mt-1 text-gray-600">
              {isEditing ? "Update expert details" : "Add a new team member"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <div className="relative">
              {imagePreview ? (
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview("");
                      setImageFile(null);
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                  >
                    <HiX className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <HiUpload className="w-12 h-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Click or drag and drop to upload image
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <input
                type="text"
                id="role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
                required
              />
            </div>
          </div>

          {/* Expertise */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expertise
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-50 text-[#8a0faf]"
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
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                className="flex-1 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#ff096c] to-[#8a0faf] rounded-lg hover:opacity-90"
              >
                <HiPlus className="w-5 h-5 mr-1" />
                Add
              </button>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <textarea
              id="bio"
              rows={4}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
              required
            />
          </div>

          {/* Experience and Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-gray-700"
              >
                Years of Experience
              </label>
              <input
                type="number"
                id="experience"
                value={form.experience}
                onChange={(e) =>
                  setForm({ ...form, experience: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
                required
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="linkedin"
                className="block text-sm font-medium text-gray-700"
              >
                LinkedIn Profile (Optional)
              </label>
              <input
                type="url"
                id="linkedin"
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
              />
            </div>
            <div>
              <label
                htmlFor="github"
                className="block text-sm font-medium text-gray-700"
              >
                GitHub Profile (Optional)
              </label>
              <input
                type="url"
                id="github"
                value={form.github}
                onChange={(e) => setForm({ ...form, github: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => router.push("/admin/experts")}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#ff096c] to-[#8a0faf] rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : isEditing
                ? "Update Expert"
                : "Add Expert"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ExpertForm;
