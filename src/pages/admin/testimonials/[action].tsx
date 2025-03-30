import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import { toast } from "react-toastify";
import { FaUpload, FaSpinner, FaStar } from "react-icons/fa";

interface TestimonialFormValues {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image_url: string;
}

const TestimonialSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
  company: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
  rating: Yup.number().required("Required").min(1).max(5),
  image_url: Yup.string().required("Required"),
});

const TestimonialForm = () => {
  const router = useRouter();
  const { action, id } = router.query;
  const isEdit = action === "edit";

  const [testimonial, setTestimonial] = useState<TestimonialFormValues>({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
    image_url: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (isEdit && id) {
      fetchTestimonial(id as string);
    }
  }, [isEdit, id]);

  const fetchTestimonial = async (testimonialId: string) => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("id", testimonialId)
        .single();

      if (error) throw error;

      if (data) {
        setTestimonial(data);
        setImagePreview(data.image_url);
      }
    } catch (error: any) {
      toast.error(error.message || "Error fetching testimonial");
      router.push("/admin/testimonials");
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
    const filePath = `testimonial-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("public")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("public").getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (values: TestimonialFormValues) => {
    try {
      setIsLoading(true);

      let imageUrl = values.image_url;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const testimonialData = {
        ...values,
        image_url: imageUrl,
      };

      if (isEdit) {
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
        toast.success("Testimonial created successfully");
      }

      router.push("/admin/testimonials");
    } catch (error: any) {
      toast.error(error.message || "Error saving testimonial");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {isEdit ? "Edit Testimonial" : "Add New Testimonial"}
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <Formik
            initialValues={testimonial}
            validationSchema={TestimonialSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
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
                      htmlFor="role"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Role
                    </label>
                    <Field
                      id="role"
                      name="role"
                      type="text"
                      className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
                    />
                    {errors.role && touched.role && (
                      <div className="text-red-600 text-sm mt-1">
                        {errors.role}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company
                    </label>
                    <Field
                      id="company"
                      name="company"
                      type="text"
                      className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
                    />
                    {errors.company && touched.company && (
                      <div className="text-red-600 text-sm mt-1">
                        {errors.company}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Rating
                    </label>
                    <div className="mt-1 flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFieldValue("rating", star)}
                          className="focus:outline-none"
                        >
                          <FaStar
                            className={`w-8 h-8 ${
                              star <= values.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Testimonial Content
                  </label>
                  <Field
                    as="textarea"
                    id="content"
                    name="content"
                    rows={4}
                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
                  />
                  {errors.content && touched.content && (
                    <div className="text-red-600 text-sm mt-1">
                      {errors.content}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Profile Image
                  </label>
                  <div className="mt-1 flex items-center gap-4">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-24 w-24 object-cover rounded-full"
                      />
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

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => router.push("/admin/testimonials")}
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
                      <span>Save Testimonial</span>
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

export default TestimonialForm;
