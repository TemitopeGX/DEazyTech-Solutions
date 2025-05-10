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

const DashboardPage = () => {
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

  useEffect(() => {
    fetchDashboardStats();
  }, []);

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

  if (loading) {
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
    </DashboardLayout>
  );
};

export default DashboardPage;
