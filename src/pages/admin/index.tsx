import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  HiViewGrid,
  HiUsers,
  HiChat,
  HiOfficeBuilding,
  HiTemplate,
  HiPlus,
} from "react-icons/hi";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardStats {
  projects: number;
  experts: number;
  clients: number;
  testimonials: number;
}

interface RecentItem {
  id: string;
  title: string;
  date: string;
  type: string;
}

const AdminDashboard = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    experts: 0,
    clients: 0,
    testimonials: 0,
  });
  const [recentProjects, setRecentProjects] = useState<RecentItem[]>([]);
  const [recentExperts, setRecentExperts] = useState<RecentItem[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      console.log("No authenticated user, redirecting to login");
      router.replace("/admin/login");
      return;
    }

    if (!authLoading && user) {
      fetchStats();
      fetchRecentItems();
    }
  }, [user, authLoading, router]);

  const fetchStats = async () => {
    try {
      // TODO: Update this to use your new database
      setStats({
        projects: 0,
        experts: 0,
        clients: 0,
        testimonials: 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentItems = async () => {
    try {
      // TODO: Update this to use your new database
      setRecentProjects([]);
      setRecentExperts([]);
    } catch (error) {
      console.error("Error fetching recent items:", error);
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
      title: "Clients & Partners",
      value: stats.clients,
      icon: HiOfficeBuilding,
      color: "from-blue-500 to-cyan-500",
      link: "/admin/clients",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      icon: HiChat,
      color: "from-green-500 to-emerald-500",
      link: "/admin/testimonials",
    },
  ];

  const quickActions = [
    {
      title: "Add New Project",
      description: "Create a new project showcase",
      link: "/admin/projects/add",
      color: "from-[#ff096c] to-[#8a0faf]",
      icon: HiPlus,
    },
    {
      title: "Add Client/Partner",
      description: "Add a new client or partner logo",
      link: "/admin/clients/add",
      color: "from-[#8a0faf] to-[#4e10d3]",
      icon: HiPlus,
    },
    {
      title: "Add Team Member",
      description: "Add a new expert team member",
      link: "/admin/experts/add",
      color: "from-[#4e10d3] to-[#ff096c]",
      icon: HiPlus,
    },
  ];

  const managementSections = [
    {
      title: "Projects Management",
      description: "Manage your featured and recent projects",
      items: [
        "Add, edit, or remove projects",
        "Update project details and images",
        "Organize project categories",
        "Control project visibility",
      ],
      link: "/admin/projects",
      icon: HiViewGrid,
    },
    {
      title: "Clients & Partners",
      description: "Manage company logos and partnerships",
      items: [
        "Upload client/partner logos",
        "Update company information",
        "Organize by category",
        "Control logo display order",
      ],
      link: "/admin/clients",
      icon: HiOfficeBuilding,
    },
    {
      title: "Expert Team",
      description: "Manage your expert profiles",
      items: [
        "Add new team members",
        "Update expert information",
        "Manage expertise areas",
        "Control team visibility",
      ],
      link: "/admin/experts",
      icon: HiUsers,
    },
  ];

  if (authLoading || loading) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.title} href={stat.link} className="block group">
                <div className="bg-white rounded-xl shadow-sm p-6 transition-transform hover:scale-105">
                  <div className="flex items-center">
                    <div
                      className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {stat.title}
                      </h2>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.link}
                className="block group"
              >
                <div className="bg-white rounded-xl shadow-sm p-6 transition-transform hover:scale-105">
                  <div
                    className={`bg-gradient-to-r ${action.color} p-3 rounded-lg inline-block`}
                  >
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {action.title}
                  </h3>
                  <p className="mt-1 text-gray-600">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Management Sections */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Content Management
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {managementSections.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.title}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-[#ff096c] to-[#8a0faf] p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="ml-4 text-lg font-semibold text-gray-900">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">{section.description}</p>
                  <ul className="space-y-2 mb-4">
                    {section.items.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-600"
                      >
                        <span className="w-1.5 h-1.5 bg-[#ff096c] rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={section.link}
                    className="inline-flex items-center text-[#ff096c] hover:text-[#8a0faf]"
                  >
                    Manage Now
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
