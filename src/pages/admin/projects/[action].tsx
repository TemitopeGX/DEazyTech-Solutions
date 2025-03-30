import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";
import { toast } from "react-toastify";
import Image from "next/image";

interface ProjectFormData {
  title: string;
  description: string;
  image_url: string;
  category: string;
  link?: string;
}

const ProjectAction = () => {
  const router = useRouter();
  const { action } = router.query;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    image_url: "",
    category: "web", // default category
    link: "",
  });

  useEffect(() => {
    // If editing, fetch project data
    const fetchProject = async () => {
      if (action === "edit" && router.query.id) {
        try {
          const { data, error } = await supabase
            .from("projects")
            .select("*")
            .eq("id", router.query.id)
            .single();

          if (error) throw error;
          if (data) setFormData(data);
        } catch (error: any) {
          toast.error(error.message || "Error fetching project");
          router.push("/admin/projects");
        }
      }
    };

    fetchProject();
  }, [action, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (action === "add") {
        const { error } = await supabase.from("projects").insert([formData]);

        if (error) throw error;
        toast.success("Project added successfully!");
      } else if (action === "edit" && router.query.id) {
        const { error } = await supabase
          .from("projects")
          .update(formData)
          .eq("id", router.query.id);

        if (error) throw error;
        toast.success("Project updated successfully!");
      }

      router.push("/admin/projects");
    } catch (error: any) {
      toast.error(error.message || "Error saving project");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {action === "add" ? "Add New Project" : "Edit Project"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Project Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
            >
              <option value="web">Web Development</option>
              <option value="mobile">Mobile App</option>
              <option value="desktop">Desktop Application</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="image_url"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
            />
          </div>

          <div>
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700"
            >
              Project Link (Optional)
            </label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : action === "add"
                ? "Add Project"
                : "Update Project"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/projects")}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectAction;
