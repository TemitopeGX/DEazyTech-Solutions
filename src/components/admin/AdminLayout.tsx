import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  HiHome,
  HiViewGrid,
  HiUsers,
  HiChat,
  HiLogout,
  HiMenuAlt2,
  HiX,
  HiPlus,
  HiOfficeBuilding,
} from "react-icons/hi";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: HiHome,
    description: "Overview and quick actions",
  },
  {
    name: "Clients & Partners",
    href: "/admin/clients",
    icon: HiOfficeBuilding,
    description: "Manage client logos and partners",
  },
  {
    name: "Projects",
    href: "/admin/projects",
    icon: HiViewGrid,
    description: "Manage recent projects",
  },
  {
    name: "Expert Team",
    href: "/admin/experts",
    icon: HiUsers,
    description: "Manage hire expert profiles",
  },
  {
    name: "Testimonials",
    href: "/admin/testimonials",
    icon: HiChat,
    description: "Manage client testimonials",
  },
];

const quickActions = [
  {
    name: "Add Project",
    href: "/admin/projects/add",
    icon: HiPlus,
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Add Expert",
    href: "/admin/experts/add",
    icon: HiPlus,
    color: "from-purple-500 to-indigo-500",
  },
  {
    name: "Add Testimonial",
    href: "/admin/testimonials/add",
    icon: HiPlus,
    color: "from-blue-500 to-cyan-500",
  },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Redirect if not authenticated
    if (!user) {
      router.replace("/admin/login");
    }
  }, [user, router]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setSidebarOpen(window.innerWidth >= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/admin/login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out");
    }
  };

  const isActive = (href: string) => {
    if (href === "/admin") {
      return router.pathname === href;
    }
    return router.pathname.startsWith(href);
  };

  if (!user) {
    return null; // Don't render anything while checking authentication
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <Link href="/admin" className="flex items-center space-x-2">
              <Image
                src="/images/logo-2.png"
                alt="Logo"
                width={40}
                height={40}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-gray-900">Admin</span>
            </Link>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <HiX className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
            {/* Main Menu */}
            <div>
              <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Main Menu
              </h2>
              <div className="mt-3 space-y-1">
                {navigation.map((item) => {
                  const isActive = router.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg group ${
                        isActive
                          ? "text-white bg-gradient-to-r from-[#ff096c] to-[#8a0faf]"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <item.icon
                        className={`w-5 h-5 mr-3 ${
                          isActive
                            ? "text-white"
                            : "text-gray-400 group-hover:text-gray-500"
                        }`}
                      />
                      <div>
                        <span>{item.name}</span>
                        {!isActive && (
                          <p className="text-xs text-gray-500 group-hover:text-gray-600">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Quick Actions
              </h2>
              <div className="mt-3 space-y-1">
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    href={action.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg text-white bg-gradient-to-r ${action.color} hover:opacity-90`}
                  >
                    <action.icon className="w-5 h-5 mr-3" />
                    {action.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* User Info and Logout */}
          <div className="p-4 border-t">
            <div className="mb-4 px-4 py-2 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Logged in as:</p>
              <p className="text-sm font-medium text-gray-900">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50"
            >
              <HiLogout className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      {isMobile && !sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        >
          <HiMenuAlt2 className="w-6 h-6 text-gray-600" />
        </button>
      )}

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <main className="p-8">{children}</main>
      </div>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
