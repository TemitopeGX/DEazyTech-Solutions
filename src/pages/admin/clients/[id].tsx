import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import Image from "next/image";
import { HiUpload, HiX } from "react-icons/hi";
import { toast } from "react-hot-toast";
import {
  Client,
  ClientInput,
  addClient,
  updateClient,
  getClient,
} from "@/lib/services/clientService";

const ClientForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const isEditing = id !== "add";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [form, setForm] = useState<ClientInput>({
    name: "",
    website: "",
    category: "client",
  });

  useEffect(() => {
    if (isEditing && id) {
      fetchClient();
    } else {
      setLoading(false);
    }
  }, [id, isEditing]);

  const fetchClient = async () => {
    try {
      const client = await getClient(id as string);
      if (client) {
        setForm({
          name: client.name,
          website: client.website,
          category: client.category,
        });
        setImagePreview(client.logo);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching client:", error);
      toast.error("Failed to fetch client data");
      router.push("/admin/clients");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;

    if (!imageFile && !isEditing) {
      toast.error("Please upload a logo");
      return;
    }

    setSaving(true);

    try {
      if (isEditing) {
        await updateClient(id as string, form, imageFile || undefined);
        toast.success("Client updated successfully");
      } else {
        if (!imageFile) throw new Error("Logo is required");
        await addClient(form, imageFile);
        toast.success("Client added successfully");
      }
      router.push("/admin/clients");
    } catch (error: any) {
      console.error("Error saving client:", error);
      toast.error(error.message || "Failed to save client");
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
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {isEditing ? "Edit Client/Partner" : "Add New Client/Partner"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Logo Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Logo
            </label>
            <div className="relative">
              {imagePreview ? (
                <div className="relative h-48 w-full rounded-lg overflow-hidden bg-gray-50">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-contain p-4"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview("");
                      setImageFile(null);
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                  >
                    <HiX className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-48 w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center">
                    <HiUpload className="w-10 h-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Click to upload logo
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF
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

          {/* Client/Partner Info */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
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
                htmlFor="website"
                className="block text-sm font-medium text-gray-700"
              >
                Website
              </label>
              <input
                type="url"
                id="website"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
                required
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
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value as "client" | "partner",
                  })
                }
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-[#8a0faf] focus:border-[#8a0faf]"
                required
              >
                <option value="client">Client</option>
                <option value="partner">Partner</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white py-2 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8a0faf] disabled:opacity-50"
            >
              {saving ? "Saving..." : isEditing ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/clients")}
              className="flex-1 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ClientForm;
