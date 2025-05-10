import React, { useState, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, X, Upload, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NewProjectPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    imageUrl: "",
    tags: [] as string[],
    link: "",
    features: [] as string[],
    gradient: "from-[#ff096c] to-[#8a0faf]",
  });
  const [currentTag, setCurrentTag] = useState("");
  const [currentFeature, setCurrentFeature] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageData = null;

      // If there's a file selected, upload it first
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadResponse = await fetch("/api/projects/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }

        imageData = await uploadResponse.json();
      }

      // Create project with image data or URL
      const projectData = {
        ...formData,
        image: imageData
          ? {
              data: imageData.data,
              contentType: imageData.contentType,
              filename: imageData.filename,
            }
          : null,
        imageUrl: formData.imageUrl || null,
      };

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        router.push("/dashboard_deazytech/projects");
      } else {
        throw new Error("Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project. Please try again.");
    } finally {
      setLoading(false);
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

  return (
    <>
      <Head>
        <title>Add New Project - DEAZY Tech Solutions</title>
        <meta
          name="description"
          content="Add a new project to DEAZY Tech Solutions portfolio"
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
            <h1 className="text-3xl font-bold">Add New Project</h1>
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
              <label className="block text-sm font-medium mb-2">Image</label>
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger
                    value="upload"
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </TabsTrigger>
                  <TabsTrigger value="url" className="flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    Image URL
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="upload">
                  <div className="space-y-4">
                    <div
                      className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                    {imagePreview && (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                          onClick={() => {
                            setSelectedImage(null);
                            setImagePreview(null);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = "";
                            }
                          }}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="url">
                  <Input
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    type="url"
                    placeholder="Enter image URL"
                  />
                </TabsContent>
              </Tabs>
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
              <Button type="submit" disabled={loading}>
                <Plus className="w-4 h-4 mr-2" />
                {loading ? "Creating..." : "Create Project"}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </>
  );
};

export default NewProjectPage;
