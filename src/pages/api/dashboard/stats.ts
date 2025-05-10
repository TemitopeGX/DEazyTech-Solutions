import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import Expert from "@/models/Expert";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();

    // Get total projects count
    const totalProjects = await Project.countDocuments();
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title createdAt");

    // Get total experts count
    const totalExperts = await Expert.countDocuments();
    const recentExperts = await Expert.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name createdAt");

    // Calculate month-over-month growth
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const projectsLastMonth = await Project.countDocuments({
      createdAt: { $gte: lastMonth },
    });

    const expertsLastMonth = await Expert.countDocuments({
      createdAt: { $gte: lastMonth },
    });

    // Get recent activity
    const recentActivity = [
      ...recentProjects.map((project) => ({
        type: "project",
        message: `New project '${project.title}' was added`,
        time: project.createdAt,
      })),
      ...recentExperts.map((expert) => ({
        type: "expert",
        message: `New expert '${expert.name}' was added`,
        time: expert.createdAt,
      })),
    ]
      .sort((a, b) => b.time.getTime() - a.time.getTime())
      .slice(0, 5)
      .map((activity) => ({
        ...activity,
        time: formatTimeAgo(activity.time),
      }));

    const stats = {
      overview: [
        {
          label: "Total Projects",
          value: totalProjects.toString(),
          change: `+${projectsLastMonth}`,
          trend: "up",
        },
        {
          label: "Team Experts",
          value: totalExperts.toString(),
          change: `+${expertsLastMonth}`,
          trend: "up",
        },
      ],
      recentActivity,
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Failed to fetch dashboard statistics" });
  }
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
}
