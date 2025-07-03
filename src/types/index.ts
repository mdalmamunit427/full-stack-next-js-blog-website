// Define the shape of the post
export type PostType = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image?: string;
  tags?: string[]; // 
  content: string;
  status: "draft" | "published";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v?: number; // Version key from Mongoose
};