import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import { toast } from "react-toastify";
import { FaUpload, FaSpinner, FaPlus, FaTrash } from "react-icons/fa";
import {
  getServiceById,
  updateService,
  createService,
  uploadServiceImage,
  deleteServiceImage,
  Service,
} from "@/services/serviceService";
import Image from "next/image";

interface ServiceFormValues {
  title: string;
  description: string;
  icon_url: string;
  features: string[];
  benefits: string[];
}

const ServiceSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  icon_url: Yup.string().required("Required"),
  features: Yup.array()
    .of(Yup.string().required("Required"))
    .min(1, "Add at least one feature"),
  benefits: Yup.array()
    .of(Yup.string().required("Required"))
    .min(1, "Add at least one benefit"),
});

const ServiceForm = () => {
  const router = useRouter();
  const { action, id } = router.query;
  const isEdit = action === "edit";
  const isNew = id === "new";

  const [service, setService] = useState<ServiceFormValues>({
    title: "",
    description: "",
    icon_url: "",
    features: [""],
    benefits: [""],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && id) {
      fetchService(id as string);
    }
  }, [isEdit, id]);

  const fetchService = async (serviceId: string) => {
    try {
      const service = await getServiceById(serviceId);
      if (service) {
        const { title, description, icon_url, features, benefits } = service;
        setService({ title, description, icon_url, features, benefits });
        setIconPreview(icon_url);
        setImagePreview(icon_url);
      }
    } catch (error: any) {
      toast.error(error.message || "Error fetching service");
      router.push("/admin/services");
    }
  };

  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIconFile(file);
      setIconPreview(URL.createObjectURL(file));
    }
  };

  const uploadIcon = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `service-icons/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("public")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("public").getPublicUrl(filePath);

    return publicUrl;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values: ServiceFormValues) => {
    try {
      setIsLoading(true);

      let iconUrl = values.icon_url;
      if (iconFile) {
        iconUrl = await uploadIcon(iconFile);
      }

      let imageUrl = values.icon_url;
      if (imageFile) {
        // Delete old image if it exists
        if (values.icon_url) {
          await deleteServiceImage(values.icon_url);
        }
        // Upload new image
        imageUrl = await uploadServiceImage(imageFile);
      }

      const serviceData = {
        ...values,
        icon_url: iconUrl,
        imageUrl,
        features: values.features.filter((feature) => feature.trim() !== ""),
        benefits: values.benefits.filter((benefit) => benefit.trim() !== ""),
      };

      if (isEdit) {
        await updateService(id as string, serviceData);
        toast.success("Service updated successfully");
      } else {
        await createService(serviceData);
        toast.success("Service created successfully");
      }

      router.push("/admin/services");
    } catch (error: any) {
      toast.error(error.message || "Error saving service");
    } finally {
      setIsLoading(false);
    }
  };

  const renderArrayInputs = (field: "features" | "benefits", label: string) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {service[field].map((item, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            value={item}
            onChange={(e) => {
              const { value } = e.target;
              setService((prev) => ({
                ...prev,
                [field]: prev[field].map((item, i) =>
                  i === index ? value : item
                ),
              }));
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder={`Enter ${field} item`}
          />
          <button
            type="button"
            onClick={() => {
              setService((prev) => ({
                ...prev,
                [field]: prev[field].filter((_, i) => i !== index),
              }));
            }}
            className="px-3 py-2 text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          setService((prev) => ({
            ...prev,
            [field]: [...prev[field], ""],
          }));
        }}
        className="text-blue-600 hover:text-blue-800"
      >
        Add {label}
      </button>
    </div>
  );

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          {isNew ? "Create New Service" : "Edit Service"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl bg-white shadow-md rounded-lg p-6"
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={service.title}
              onChange={(e) => {
                const { value } = e.target;
                setService((prev) => ({ ...prev, title: value }));
              }}
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
              value={service.description}
              onChange={(e) => {
                const { value } = e.target;
                setService((prev) => ({ ...prev, description: value }));
              }}
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
                  alt="Service preview"
                  width={200}
                  height={200}
                  className="rounded-md"
                />
              </div>
            )}
          </div>

          {renderArrayInputs("features", "Features")}
          {renderArrayInputs("benefits", "Benefits")}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push("/admin/services")}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Service"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ServiceForm;
