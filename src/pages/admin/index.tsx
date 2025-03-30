import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  FaProjectDiagram,
  FaUsers,
  FaIndustry,
  FaComments,
} from "react-icons/fa";
import Link from "next/link";
import {
  HiUsers,
  HiViewGrid,
  HiTemplate,
  HiSupport,
  HiChat,
} from "react-icons/hi";
import Image from "next/image";

interface DashboardStats {
  projects: number;
  experts: number;
  testimonials: number;
}

interface RecentItem {
  id: string;
  title: string;
  image: string;
  created_at: string;
}

const AdminDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    experts: 0,
    testimonials: 0,
  });
  const [recentProjects, setRecentProjects] = useState<RecentItem[]>([]);
  const [recentExperts, setRecentExperts] = useState<RecentItem[]>([]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        console.log(
          "Admin Dashboard - Session check:",
          session ? "Session exists" : "No session"
        );

        if (!session) {
          console.log("Admin Dashboard - No session, redirecting to login");
          router.replace("/admin/login");
          return;
        }

        setLoading(false);
      } catch (error) {
        console.error("Admin Dashboard - Error checking session:", error);
        router.replace("/admin/login");
      }
    };

    checkSession();
  }, [router]);

  useEffect(() => {
    fetchStats();
    fetchRecentItems();
  }, []);

  const fetchStats = async () => {
    try {
      const fetchCounts = async (table: string) => {
        const { count, error } = await supabase
          .from(table)
          .select("*", { count: "exact", head: true });

        if (error) throw error;
        return count || 0;
      };

      const [projects, experts, testimonials] = await Promise.all([
        fetchCounts("projects"),
        fetchCounts("experts"),
        fetchCounts("testimonials"),
      ]);

      setStats({ projects, experts, testimonials });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentItems = async () => {
    try {
      // Fetch recent projects
      const { data: projects, error: projectsError } = await supabase
        .from("projects")
        .select("id, title, image, created_at")
        .order("created_at", { ascending: false })
        .limit(3);

      if (projectsError) throw projectsError;
      setRecentProjects(projects || []);

      // Fetch recent experts
      const { data: experts, error: expertsError } = await supabase
        .from("experts")
        .select("id, title, image, created_at")
        .order("created_at", { ascending: false })
        .limit(3);

      if (expertsError) throw expertsError;
      setRecentExperts(experts || []);
    } catch (error) {
      console.error("Error fetching recent items:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Projects",
      value: stats.projects,
      icon: HiViewGrid,
      color: "from-pink-500 to-rose-500",
      link: "/admin/projects",
    },
    {
      title: "Expert Team",
      value: stats.experts,
      icon: HiUsers,
      color: "from-purple-500 to-indigo-500",
      link: "/admin/experts",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      icon: HiChat,
      color: "from-blue-500 to-cyan-500",
      link: "/admin/testimonials",
    },
  ];

  const quickActions = [
    {
      title: "Add New Project",
      description: "Create a new project showcase",
      link: "/admin/projects/add",
      color: "from-[#ff096c] to-[#8a0faf]",
    },
    {
      title: "Add Service",
      description: "Add a new service offering",
      link: "/admin/services/add",
      color: "from-[#8a0faf] to-[#4e10d3]",
    },
    {
      title: "Add Team Member",
      description: "Add a new team member profile",
      link: "/admin/team/add",
      color: "from-[#4e10d3] to-[#ff096c]",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#8a0faf]"></div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="mt-1 text-gray-600">
            Here's what's happening with your website
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.title} href={stat.link} className="block group">
                <div className="bg-white rounded-xl shadow-sm p-6 transition-transform hover:scale-105">
                  <div className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color}`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">
                        {stat.title}
                      </h3>
                      <div className="mt-1 text-2xl font-semibold text-gray-900">
                        {loading ? "..." : stat.value}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Items Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Projects
              </h2>
              <Link
                href="/admin/projects"
                className="text-sm font-medium text-[#ff096c] hover:text-[#8a0faf]"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {loading ? (
                <p>Loading...</p>
              ) : recentProjects.length > 0 ? (
                recentProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/admin/projects/${project.id}`}
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image
                        src={project.image || "/images/placeholder.png"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        {project.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Added{" "}
                        {new Date(project.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500">No recent projects</p>
              )}
            </div>
          </div>

          {/* Recent Experts */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Experts
              </h2>
              <Link
                href="/admin/experts"
                className="text-sm font-medium text-[#ff096c] hover:text-[#8a0faf]"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {loading ? (
                <p>Loading...</p>
              ) : recentExperts.length > 0 ? (
                recentExperts.map((expert) => (
                  <Link
                    key={expert.id}
                    href={`/admin/experts/${expert.id}`}
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image
                        src={expert.image || "/images/placeholder.png"}
                        alt={expert.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        {expert.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Added {new Date(expert.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500">No recent experts</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
