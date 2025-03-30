import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/lib/supabase";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { HiUpload, HiX, HiStar } from "react-icons/hi";

interface TestimonialForm {
  client_name: string;
  company: string;
  role: string;
  image: string;
  review: string;
  rating: number;
}

const TestimonialForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const isEditing = id !== "add";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [form, setForm] = useState<TestimonialForm>({
    client_name: "",
    company: "",
    role: "",
    image: "",
    review: "",
    rating: 5,
  });

  useEffect(() => {
    if (isEditing && id) {
      fetchTestimonial();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchTestimonial = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) {
        setForm(data);
        setImagePreview(data.image);
      }
    } catch (error) {
      console.error("Error fetching testimonial:", error);
      toast.error("Failed to load testimonial");
      router.push("/admin/testimonials");
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
    const filePath = `testimonials/${fileName}`;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = form.image;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const testimonialData = {
        ...form,
        image: imageUrl,
      };

      if (isEditing) {
        const { error } = await supabase
          .from("testimonials")
          .update(testimonialData)
          .eq("id", id);
        if (error) throw error;
        toast.success("Testimonial updated successfully");
      } else {
        const { error } = await supabase
          .from("testimonials")
          .insert([testimonialData]);
        if (error) throw error;
        toast.success("Testimonial added successfully");
      }

      router.push("/admin/testimonials");
    } catch (error) {
      console.error("Error saving testimonial:", error);
      toast.error("Failed to save testimonial");
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
              {isEditing ? "Edit Testimonial" : "Add New Testimonial"}
            </h1>
            <p className="mt-1 text-gray-600">
              {isEditing
                ? "Update client testimonial details"
                : "Add a new client testimonial"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Client Photo
            </label>
            <div className="relative">
              {imagePreview ? (
                <div className="relative h-32 w-32 rounded-full overflow-hidden">
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
                    className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                  >
                    <HiX className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-32 w-32 border-2 border-gray-300 border-dashed rounded-full cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center">
                    <HiUpload className="w-8 h-8 text-gray-400" />
                    <p className="mt-1 text-xs text-gray-500">Upload photo</p>
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

          {/* Client Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="client_name"
                className="block text-sm font-medium text-gray-700"
              >
                Client Name
              </label>
              <input
                type="text"
                id="client_name"
                value={form.client_name}
                onChange={(e) =>
                  setForm({ ...form, client_name: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
                required
              />
            </div>
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

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setForm({ ...form, rating })}
                  className="focus:outline-none"
                >
                  <HiStar
                    className={`w-8 h-8 ${
                      rating <= form.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review */}
          <div>
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700"
            >
              Review
            </label>
            <textarea
              id="review"
              rows={4}
              value={form.review}
              onChange={(e) => setForm({ ...form, review: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => router.push("/admin/testimonials")}
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
                ? "Update Testimonial"
                : "Add Testimonial"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default TestimonialForm;
