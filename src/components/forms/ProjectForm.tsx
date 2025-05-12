import { useState } from "react";
import { useRouter } from "next/router";
import { projectsApi } from "@/lib/api";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface ProjectFormProps {
  initialData?: {
    id?: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
  };
  mode: "create" | "edit";
}

export default function ProjectForm({ initialData, mode }: ProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    tags: initialData?.tags?.join(", ") || "",
    link: initialData?.link || "",
    image: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append(
        "tags",
        JSON.stringify(formData.tags.split(",").map((t) => t.trim()))
      );
      form.append("link", formData.link);

      if (formData.image) {
        // Check file size (10MB = 10 * 1024 * 1024 bytes)
        if (formData.image.size > 10 * 1024 * 1024) {
          toast.error("Image size must be less than 10MB");
          setIsLoading(false);
          return;
        }
        form.append("image", formData.image);
      }

      if (mode === "create") {
        await projectsApi.create(form);
        toast.success("Project created successfully");
      } else if (initialData?.id) {
        await projectsApi.update(initialData.id, form);
        toast.success("Project updated successfully");
      }

      router.push("/dashboard_deazytech");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tags (comma separated)
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Link</label>
        <input
          type="url"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Image (max 10MB)
        </label>
        <input
          type="file"
          accept="image/*"
          className="mt-1 block w-full"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files?.[0] || null })
          }
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard_deazytech")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : mode === "create" ? "Create" : "Update"}
        </Button>
      </div>
    </form>
  );
}
