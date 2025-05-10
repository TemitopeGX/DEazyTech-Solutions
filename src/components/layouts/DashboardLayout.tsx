import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Layout,
  LayoutDashboard,
  Users,
  FolderEdit,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter();

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      href: "/dashboard_deazytech",
    },
    {
      id: "projects",
      label: "Manage Projects",
      icon: FolderEdit,
      href: "/dashboard_deazytech/projects",
    },
    {
      id: "experts",
      label: "Manage Experts",
      icon: Users,
      href: "/dashboard_deazytech/experts",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/dashboard_deazytech/settings",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <Layout className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">DEazy Tech</span>
          </Link>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
              AD
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Admin User</h4>
              <p className="text-sm text-muted-foreground">
                admin@deazytech.com
              </p>
            </div>
            <Button variant="ghost" size="icon">
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <nav className="p-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Logout Button */}
          <div className="mt-8">
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50">{children}</div>
    </div>
  );
};

export default DashboardLayout;
