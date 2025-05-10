import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  await connectDB();

  switch (req.method) {
    case "GET":
      try {
        const project = await Project.findById(id);
        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json(project);
      } catch (error) {
        res.status(500).json({ error: "Error fetching project" });
      }
      break;

    case "PUT":
      try {
        const project = await Project.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json(project);
      } catch (error) {
        res.status(500).json({ error: "Error updating project" });
      }
      break;

    case "DELETE":
      try {
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: "Error deleting project" });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
