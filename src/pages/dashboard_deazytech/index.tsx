import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Database,
  Users,
  FolderGit2,
  Activity,
  Plus,
  Settings,
  Bell,
  MessageSquare,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useRouter } from "next/router";
import { projectsApi, expertsApi, authApi } from "@/lib/api";
import { toast } from "react-hot-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Project } from "@/lib/api";

interface DashboardStats {
  overview: {
    label: string;
    value: string;
    change: string;
    trend: "up" | "down";
  }[];
  recentActivity: {
    type: string;
    message: string;
    time: string;
  }[];
}

interface Expert {
  id: number;
  name: string;
  role: string;
  image: string;
  is_active: boolean;
}

const DashboardPage = () => {
  const router = useRouter();
  const [dbStatus, setDbStatus] = useState<{
    success?: boolean;
    message?: string;
    state?: string;
    database?: string;
  } | null>(null);
  const [testing, setTesting] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experts, setExperts] = useState<Expert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await authApi.getProfile();
        loadData();
      } catch (error) {
        router.push("/dashboard_deazytech/login");
      }
    };

    checkAuth();
  }, [router]);

  const loadData = async () => {
    try {
      const [projectsData, expertsData] = await Promise.all([
        projectsApi.getAll(),
        expertsApi.getAll(),
      ]);
      setProjects(projectsData.data);
      setExperts(expertsData.data);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      router.push("/dashboard_deazytech/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await projectsApi.delete(id);
      setProjects(projects.filter((p) => p.id !== id));
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const handleDeleteExpert = async (id: number) => {
    if (!confirm("Are you sure you want to delete this expert?")) return;

    try {
      await expertsApi.delete(id);
      setExperts(experts.filter((e) => e.id !== id));
      toast.success("Expert deleted successfully");
    } catch (error) {
      toast.error("Failed to delete expert");
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("/api/dashboard/stats");
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard statistics");
      }
      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
      setError("Failed to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    setTesting(true);
    setDbStatus(null);

    try {
      const response = await fetch("/api/test-connection");
      const data = await response.json();
      setDbStatus(data);
    } catch (error) {
      setDbStatus({
        success: false,
        message: "Failed to test connection",
      });
    } finally {
      setTesting(false);
    }
  };

  const getIconForActivity = (type: string) => {
    switch (type) {
      case "project":
        return Plus;
      case "expert":
        return Users;
      default:
        return Settings;
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-8">Loading dashboard data...</div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-8 text-red-600">{error}</div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard - DEAZY Tech Solutions</title>
        <meta
          name="description"
          content="Admin dashboard for DEAZY Tech Solutions"
        />
      </Head>

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with Welcome Message and Quick Actions */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Dashboard Overview</h2>
              <p className="text-muted-foreground mt-2">
                Welcome back! Here's what's happening today.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon">
                <MessageSquare className="w-5 h-5" />
              </Button>
              <Button onClick={fetchDashboardStats}>Refresh Data</Button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {stats?.overview.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-2 rounded-lg ${
                      stat.trend === "up" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {stat.label.includes("Projects") ? (
                      <FolderGit2
                        className={`w-6 h-6 ${
                          stat.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      />
                    ) : (
                      <Users
                        className={`w-6 h-6 ${
                          stat.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      />
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Database Status */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    System Status
                  </h3>
                  <Button
                    onClick={testConnection}
                    disabled={testing}
                    variant={dbStatus?.success ? "outline" : "default"}
                  >
                    {testing ? "Testing..." : "Test Connection"}
                  </Button>
                </div>

                {dbStatus && (
                  <div
                    className={`mt-4 p-4 rounded-lg ${
                      dbStatus.success
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    <p className="font-medium">{dbStatus.message}</p>
                    {dbStatus.success && (
                      <p className="text-sm mt-1">
                        Connected to database: {dbStatus.database}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button asChild variant="outline" className="h-24 flex-col">
                    <Link href="/dashboard_deazytech/projects/new">
                      <Plus className="w-6 h-6 mb-2" />
                      Add New Project
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-24 flex-col">
                    <Link href="/dashboard_deazytech/experts/new">
                      <Users className="w-6 h-6 mb-2" />
                      Add New Expert
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {stats?.recentActivity.map((activity, index) => {
                    const Icon = getIconForActivity(activity.type);
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                      >
                        <div className="p-2 rounded-lg bg-gray-100">
                          <Icon className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            {activity.message}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  {(!stats?.recentActivity ||
                    stats.recentActivity.length === 0) && (
                    <p className="text-muted-foreground text-sm text-center py-4">
                      No recent activity
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="experts">Experts</TabsTrigger>
            </TabsList>

            <TabsContent value="projects">
              <div className="bg-white shadow rounded-lg">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Projects
                    </h2>
                    <Link href="/dashboard_deazytech/projects/create">
                      <Button>Add New Project</Button>
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="bg-white border rounded-lg overflow-hidden"
                      >
                        <img
                          src={`http://localhost:8000/storage/${project.image}`}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 mt-2">
                            {project.description}
                          </p>
                          <div className="mt-4 flex justify-end space-x-2">
                            <Link
                              href={`/dashboard_deazytech/projects/edit/${project.id}`}
                            >
                              <Button variant="outline">Edit</Button>
                            </Link>
                            <Button
                              variant="destructive"
                              onClick={() => handleDeleteProject(project.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="experts">
              <div className="bg-white shadow rounded-lg">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Experts
                    </h2>
                    <Link href="/dashboard_deazytech/experts/create">
                      <Button>Add New Expert</Button>
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {experts.map((expert) => (
                      <div
                        key={expert.id}
                        className="bg-white border rounded-lg overflow-hidden"
                      >
                        <img
                          src={`http://localhost:8000/storage/${expert.image}`}
                          alt={expert.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold">
                            {expert.name}
                          </h3>
                          <p className="text-gray-600">{expert.role}</p>
                          <div className="mt-4 flex justify-end space-x-2">
                            <Link
                              href={`/dashboard_deazytech/experts/edit/${expert.id}`}
                            >
                              <Button variant="outline">Edit</Button>
                            </Link>
                            <Button
                              variant="destructive"
                              onClick={() => handleDeleteExpert(expert.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
