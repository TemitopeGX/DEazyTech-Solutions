import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  features: string[];
  gradient: string;
}

const EditProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Project>({
    _id: "",
    title: "",
    description: "",
    image: "",
    tags: [],
    link: "",
    features: [],
    gradient: "",
  });
  const [currentTag, setCurrentTag] = useState("");
  const [currentFeature, setCurrentFeature] = useState("");

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${id}`);
      const data = await response.json();
      setFormData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching project:", error);
      alert("Failed to fetch project details. Please try again.");
      router.push("/dashboard_deazytech/projects");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/dashboard_deazytech/projects");
      } else {
        throw new Error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const addFeature = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentFeature.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, currentFeature.trim()],
      }));
      setCurrentFeature("");
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((feature) => feature !== featureToRemove),
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-2xl mx-auto text-center">
          Loading project details...
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Edit Project - DEAZY Tech Solutions</title>
        <meta
          name="description"
          content="Edit project details for DEAZY Tech Solutions portfolio"
        />
      </Head>

      <div className="min-h-screen bg-background p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Link
              href="/dashboard_deazytech/projects"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
            <h1 className="text-3xl font-bold">Edit Project</h1>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Image URL
              </label>
              <Input
                name="image"
                value={formData.image}
                onChange={handleChange}
                type="url"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Project Link
              </label>
              <Input
                name="link"
                value={formData.link}
                onChange={handleChange}
                type="url"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <Input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={addTag}
                placeholder="Type a tag and press Enter"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Features</label>
              <div className="flex flex-col gap-2 mb-2">
                {formData.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center justify-between p-2 bg-slate-50 rounded-lg"
                  >
                    <span>{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(feature)}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <Input
                value={currentFeature}
                onChange={(e) => setCurrentFeature(e.target.value)}
                onKeyDown={addFeature}
                placeholder="Type a feature and press Enter"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Gradient</label>
              <Input
                name="gradient"
                value={formData.gradient}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </>
  );
};

export default EditProjectPage;
