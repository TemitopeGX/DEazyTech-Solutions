import mongoose from "mongoose";

const expertSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    skills: [
      {
        type: String,
      },
    ],
    experience: {
      type: String,
      required: true,
    },
    projects: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Expert || mongoose.model("Expert", expertSchema);
