// models/Post.ts
import  { Schema, Document, models, model } from "mongoose";

export interface IPost extends Document {
  title: string;
  author: string;
  image?: string;
  category: string;
  tags: string[];
  content: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    status: {
      type: Boolean,
      default: true, // true = Published, false = Draft
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Prevent model overwrite in Next.js hot reload
export default models.Post || model<IPost>("Post", PostSchema);
