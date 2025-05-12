import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, X, Upload } from "lucide-react";
import { toast } from "react-hot-toast";
import { expertsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/components/layouts/DashboardLayout";

interface Expert {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  specialties: string[];
  social_links: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

interface FormData {
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  linkedin?: string;
  github?: string;
  twitter?: string;
}

const EditExpertPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    role: "",
    bio: "",
    specialties: [],
    linkedin: "",
    github: "",
    twitter: "",
  });
  const [newSpecialty, setNewSpecialty] = useState("");

  useEffect(() => {
    if (id) {
      fetchExpert(Number(id));
    }
  }, [id]);

  const fetchExpert = async (expertId: number) => {
    try {
      const expert = await expertsApi.get(expertId);
      console.log("Expert data:", expert);

      if (!expert) {
        throw new Error("Expert not found");
      }

      setFormData({
        name: expert.name || "",
        role: expert.role || "",
        bio: expert.bio || "",
        specialties: expert.specialties || [],
        linkedin: expert.social_links?.linkedin || "",
        github: expert.social_links?.github || "",
        twitter: expert.social_links?.twitter || "",
      });

      if (expert.image) {
        setImagePreview(`http://localhost:8000/storage/${expert.image}`);
      }
    } catch (error) {
      console.error("Error fetching expert:", error);
      toast.error("Failed to fetch expert details");
      router.push("/dashboard_deazytech/experts");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSpecialtyAdd = () => {
    if (newSpecialty.trim()) {
      setFormData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()],
      }));
      setNewSpecialty("");
    }
  };

  const handleSpecialtyRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setLoading(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("position", formData.role);
      form.append("bio", formData.bio);
      form.append("skills", JSON.stringify(formData.specialties));
      form.append("github_link", formData.github || "");
      form.append("linkedin_link", formData.linkedin || "");
      form.append("twitter_link", formData.twitter || "");

      const imageInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (imageInput.files?.[0]) {
        form.append("image", imageInput.files[0]);
      }

      await expertsApi.update(Number(id), form);
      toast.success("Expert updated successfully");
      router.push("/dashboard_deazytech/experts");
    } catch (error) {
      console.error("Error updating expert:", error);
      toast.error("Failed to update expert");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Edit Expert - DEAZY Tech Solutions Dashboard</title>
      </Head>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/dashboard_deazytech/experts"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Expert</h1>
            <p className="text-gray-600 mt-1">
              Update the expert's profile information.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <div className="space-y-4">
            <Label>Profile Image</Label>
            <div className="flex items-center gap-6">
              <div
                className={`relative w-32 h-32 rounded-xl overflow-hidden border-2 border-dashed ${
                  imagePreview ? "border-transparent" : "border-gray-300"
                }`}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <Upload className="h-8 w-8 mb-2" />
                    <span className="text-sm">Upload</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">
                  Upload a professional photo
                </p>
                <p className="text-xs text-gray-500">
                  Recommended: Square image, at least 300x300px
                </p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role / Position</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, role: e.target.value }))
                }
                required
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bio: e.target.value }))
              }
              required
              className="min-h-[120px]"
            />
          </div>

          {/* Specialties */}
          <div className="space-y-4">
            <Label>Specialties</Label>
            <div className="flex gap-3">
              <Input
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                placeholder="Add a specialty"
                onKeyPress={(e) => e.key === "Enter" && handleSpecialtyAdd()}
              />
              <Button
                type="button"
                onClick={handleSpecialtyAdd}
                variant="outline"
                className="shrink-0"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.specialties.map((specialty, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium flex items-center gap-2"
                >
                  {specialty}
                  <button
                    type="button"
                    onClick={() => handleSpecialtyRemove(index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <Label>Social Links</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  value={formData.linkedin}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      linkedin: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  type="url"
                  placeholder="https://github.com/..."
                  value={formData.github}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, github: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  type="url"
                  placeholder="https://twitter.com/..."
                  value={formData.twitter}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      twitter: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white"
            >
              {loading ? "Updating Expert..." : "Update Expert"}
            </Button>
            <Link href="/dashboard_deazytech/experts">
              <Button variant="outline">Cancel</Button>
            </Link>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditExpertPage;
