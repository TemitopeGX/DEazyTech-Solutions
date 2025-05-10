import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layouts/DashboardLayout";

interface Project {
  _id: string;
  title: string;
  description: string;
  displayImage: string;
  tags: string[];
  link: string;
  features: string[];
  gradient: string;
  createdAt: string;
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setProjects(projects.filter((project) => project._id !== id));
        }
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Manage Projects - DEAZY Tech Solutions</title>
        <meta
          name="description"
          content="Manage projects for DEAZY Tech Solutions website"
        />
      </Head>

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Manage Projects</h1>
            <Button asChild>
              <Link
                href="/dashboard_deazytech/projects/new"
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add New Project
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No projects found.</p>
              <p className="mt-2">
                <Link
                  href="/dashboard_deazytech/projects/new"
                  className="text-primary hover:underline"
                >
                  Add your first project
                </Link>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="aspect-video relative overflow-hidden">
                    {project.displayImage ? (
                      <img
                        src={project.displayImage}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex items-center gap-1"
                      >
                        <Link
                          href={`/dashboard_deazytech/projects/edit/${project._id}`}
                        >
                          <Pencil className="w-3 h-3" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(project._id)}
                        className="flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectsPage;
