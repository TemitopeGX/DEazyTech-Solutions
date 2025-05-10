import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
      filename: String,
    },
    imageUrl: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    link: {
      type: String,
      required: true,
    },
    features: [
      {
        type: String,
      },
    ],
    gradient: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Add a virtual property for image URL
projectSchema.virtual("displayImage").get(function () {
  if (this.imageUrl) {
    return this.imageUrl;
  }
  if (this.image && this.image.data) {
    return `data:${this.image.contentType};base64,${this.image.data.toString(
      "base64"
    )}`;
  }
  return null;
});

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
