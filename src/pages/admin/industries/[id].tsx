import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import AdminLayout from "@/components/admin/AdminLayout";
import { toast } from "react-hot-toast";
import { FaUpload, FaSpinner, FaPlus, FaTrash } from "react-icons/fa";
import Image from "next/image";
import {
  getIndustryById,
  updateIndustry,
  createIndustry,
  uploadIndustryImage,
  deleteIndustryImage,
  Industry,
} from "@/lib/services/industryService";

type FormData = {
  name: string;
  description: string;
  image_url: string;
};

const IndustrySchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  image_url: Yup.string().required("Required"),
  expertise: Yup.array()
    .of(Yup.string().required("Required"))
    .min(1, "Add at least one area of expertise"),
});

export default function IndustryForm() {
  const router = useRouter();
  const { id } = router.query;
  const isNew = id === "new";

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    image_url: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!isNew && id && typeof id === "string") {
      fetchIndustry(parseInt(id, 10));
    }
  }, [id, isNew]);

  const fetchIndustry = async (industryId: number) => {
    try {
      const industry = await getIndustryById(industryId);
      if (industry) {
        const { name, description, image_url } = industry;
        setFormData({ name, description, image_url });
        setImagePreview(image_url);
      }
    } catch (error) {
      console.error("Error fetching industry:", error);
      toast.error("Failed to fetch industry details");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let image_url = formData.image_url;

      if (imageFile) {
        // Delete old image if it exists
        if (formData.image_url) {
          await deleteIndustryImage(formData.image_url);
        }
        // Upload new image
        image_url = await uploadIndustryImage(imageFile);
      }

      const industryData: FormData = {
        name: formData.name,
        description: formData.description,
        image_url,
      };

      if (isNew) {
        await createIndustry(industryData);
        toast.success("Industry created successfully");
      } else if (typeof id === "string") {
        await updateIndustry(parseInt(id, 10), industryData);
        toast.success("Industry updated successfully");
      }

      router.push("/admin/industries");
    } catch (error) {
      console.error("Error saving industry:", error);
      toast.error("Failed to save industry");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          {isNew ? "Create New Industry" : "Edit Industry"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl bg-white shadow-md rounded-lg p-6"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {imagePreview && (
              <div className="mt-2">
                <Image
                  src={imagePreview}
                  alt="Industry preview"
                  width={200}
                  height={200}
                  className="rounded-md"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push("/admin/industries")}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Industry"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
