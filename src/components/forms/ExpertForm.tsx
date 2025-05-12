import { useState } from "react";
import { useRouter } from "next/router";
import { expertsApi } from "@/lib/api";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface ExpertFormProps {
  initialData?: {
    id?: number;
    name: string;
    role: string;
    image: string;
    skills: string[];
    experience: string;
    projects_count: number;
    description: string;
    linkedin?: string;
    github?: string;
  };
  mode: "create" | "edit";
}

export default function ExpertForm({ initialData, mode }: ExpertFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    role: initialData?.role || "",
    skills: initialData?.skills?.join(", ") || "",
    experience: initialData?.experience || "",
    projects_count: initialData?.projects_count || 0,
    description: initialData?.description || "",
    linkedin: initialData?.linkedin || "",
    github: initialData?.github || "",
    image: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("role", formData.role);
      form.append(
        "skills",
        JSON.stringify(formData.skills.split(",").map((s) => s.trim()))
      );
      form.append("experience", formData.experience);
      form.append("projects_count", formData.projects_count.toString());
      form.append("description", formData.description);
      form.append("linkedin", formData.linkedin);
      form.append("github", formData.github);

      if (formData.image) {
        form.append("image", formData.image);
      }

      if (mode === "create") {
        await expertsApi.create(form);
        toast.success("Expert created successfully");
      } else if (initialData?.id) {
        await expertsApi.update(initialData.id, form);
        toast.success("Expert updated successfully");
      }

      router.push("/dashboard_deazytech");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save expert");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Skills (comma separated)
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Experience
        </label>
        <input
          type="text"
          required
          placeholder="e.g., 5+ years"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.experience}
          onChange={(e) =>
            setFormData({ ...formData, experience: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Projects Count
        </label>
        <input
          type="number"
          required
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.projects_count}
          onChange={(e) =>
            setFormData({
              ...formData,
              projects_count: parseInt(e.target.value),
            })
          }
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
          LinkedIn URL
        </label>
        <input
          type="url"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.linkedin}
          onChange={(e) =>
            setFormData({ ...formData, linkedin: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          GitHub URL
        </label>
        <input
          type="url"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.github}
          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
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
