import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import { toast } from "react-toastify";
import { FaUpload, FaSpinner, FaPlus, FaTrash } from "react-icons/fa";

interface IndustryFormValues {
  name: string;
  description: string;
  image_url: string;
  expertise: string[];
}

const IndustrySchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  image_url: Yup.string().required("Required"),
  expertise: Yup.array()
    .of(Yup.string().required("Required"))
    .min(1, "Add at least one area of expertise"),
});

const IndustryForm = () => {
  const router = useRouter();
  const { action, id } = router.query;
  const isEdit = action === "edit";

  const [industry, setIndustry] = useState<IndustryFormValues>({
    name: "",
    description: "",
    image_url: "",
    expertise: [""],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (isEdit && id) {
      fetchIndustry(id as string);
    }
  }, [isEdit, id]);

  const fetchIndustry = async (industryId: string) => {
    try {
      const { data, error } = await supabase
        .from("industries")
        .select("*")
        .eq("id", industryId)
        .single();

      if (error) throw error;

      if (data) {
        setIndustry(data);
        setImagePreview(data.image_url);
      }
    } catch (error: any) {
      toast.error(error.message || "Error fetching industry");
      router.push("/admin/industries");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `industry-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("public")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("public").getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (values: IndustryFormValues) => {
    try {
      setIsLoading(true);

      let imageUrl = values.image_url;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const industryData = {
        ...values,
        image_url: imageUrl,
        expertise: values.expertise.filter((item) => item.trim() !== ""),
      };

      if (isEdit) {
        const { error } = await supabase
          .from("industries")
          .update(industryData)
          .eq("id", id);

        if (error) throw error;
        toast.success("Industry updated successfully");
      } else {
        const { error } = await supabase
          .from("industries")
          .insert([industryData]);

        if (error) throw error;
        toast.success("Industry created successfully");
      }

      router.push("/admin/industries");
    } catch (error: any) {
      toast.error(error.message || "Error saving industry");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {isEdit ? "Edit Industry" : "Add New Industry"}
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <Formik
            initialValues={industry}
            validationSchema={IndustrySchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, errors, touched }) => (
              <Form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Industry Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-600 text-sm mt-1">
                      {errors.name}
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
                    Industry Image
                  </label>
                  <div className="mt-1 flex items-center gap-4">
                    {imagePreview && (
                      <div className="w-32 h-24 relative rounded-lg overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <label className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#8a0faf] text-[#8a0faf] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <FaUpload className="w-5 h-5" />
                      <span>Choose Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Areas of Expertise
                  </label>
                  <FieldArray name="expertise">
                    {({ push, remove }) => (
                      <div className="space-y-3">
                        {values.expertise.map((_, index) => (
                          <div key={index} className="flex gap-2">
                            <Field
                              name={`expertise.${index}`}
                              type="text"
                              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
                              placeholder="Enter an area of expertise"
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
                          <span>Add Area of Expertise</span>
                        </button>
                      </div>
                    )}
                  </FieldArray>
                  {errors.expertise && touched.expertise && (
                    <div className="text-red-600 text-sm mt-1">
                      {errors.expertise}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => router.push("/admin/industries")}
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
                      <span>Save Industry</span>
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

export default IndustryForm;
