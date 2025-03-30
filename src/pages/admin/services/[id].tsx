import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import { toast } from "react-toastify";
import { FaUpload, FaSpinner, FaPlus, FaTrash } from "react-icons/fa";

interface ServiceFormValues {
  title: string;
  description: string;
  icon_url: string;
  features: string[];
}

const ServiceSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  icon_url: Yup.string().required("Required"),
  features: Yup.array()
    .of(Yup.string().required("Required"))
    .min(1, "Add at least one feature"),
});

const ServiceForm = () => {
  const router = useRouter();
  const { action, id } = router.query;
  const isEdit = action === "edit";

  const [service, setService] = useState<ServiceFormValues>({
    title: "",
    description: "",
    icon_url: "",
    features: [""],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState("");

  useEffect(() => {
    if (isEdit && id) {
      fetchService(id as string);
    }
  }, [isEdit, id]);

  const fetchService = async (serviceId: string) => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("id", serviceId)
        .single();

      if (error) throw error;

      if (data) {
        setService(data);
        setIconPreview(data.icon_url);
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

  const handleSubmit = async (values: ServiceFormValues) => {
    try {
      setIsLoading(true);

      let iconUrl = values.icon_url;
      if (iconFile) {
        iconUrl = await uploadIcon(iconFile);
      }

      const serviceData = {
        ...values,
        icon_url: iconUrl,
        features: values.features.filter((feature) => feature.trim() !== ""),
      };

      if (isEdit) {
        const { error } = await supabase
          .from("services")
          .update(serviceData)
          .eq("id", id);

        if (error) throw error;
        toast.success("Service updated successfully");
      } else {
        const { error } = await supabase.from("services").insert([serviceData]);

        if (error) throw error;
        toast.success("Service created successfully");
      }

      router.push("/admin/services");
    } catch (error: any) {
      toast.error(error.message || "Error saving service");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {isEdit ? "Edit Service" : "Add New Service"}
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <Formik
            initialValues={service}
            validationSchema={ServiceSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, errors, touched }) => (
              <Form className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Service Title
                  </label>
                  <Field
                    id="title"
                    name="title"
                    type="text"
                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
                  />
                  {errors.title && touched.title && (
                    <div className="text-red-600 text-sm mt-1">
                      {errors.title}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    rows={4}
                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
                  />
                  {errors.description && touched.description && (
                    <div className="text-red-600 text-sm mt-1">
                      {errors.description}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Service Icon
                  </label>
                  <div className="mt-1 flex items-center gap-4">
                    {iconPreview && (
                      <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={iconPreview}
                          alt="Preview"
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                    )}
                    <label className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#8a0faf] text-[#8a0faf] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <FaUpload className="w-5 h-5" />
                      <span>Choose Icon</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleIconChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  <FieldArray name="features">
                    {({ push, remove }) => (
                      <div className="space-y-3">
                        {values.features.map((_, index) => (
                          <div key={index} className="flex gap-2">
                            <Field
                              name={`features.${index}`}
                              type="text"
                              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
                              placeholder="Enter a feature"
                            />
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <FaTrash className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => push("")}
                          className="flex items-center gap-2 text-[#8a0faf] hover:text-[#ff096c] transition-colors"
                        >
                          <FaPlus className="w-4 h-4" />
                          <span>Add Feature</span>
                        </button>
                      </div>
                    )}
                  </FieldArray>
                  {errors.features && touched.features && (
                    <div className="text-red-600 text-sm mt-1">
                      {errors.features}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => router.push("/admin/services")}
                    className="px-6 py-2 border-2 border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <FaSpinner className="w-5 h-5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>Save Service</span>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ServiceForm;
