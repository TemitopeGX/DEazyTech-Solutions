import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  switch (req.method) {
    case "GET":
      try {
        const projects = await Project.find({}).sort({ createdAt: -1 });
        res.status(200).json(projects);
      } catch (error) {
        res.status(500).json({ error: "Error fetching projects" });
      }
      break;

    case "POST":
      try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
      } catch (error) {
        res.status(500).json({ error: "Error creating project" });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
