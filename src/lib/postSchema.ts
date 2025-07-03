// postSchema.ts
import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  image: z.string().url("Image must be a valid URL").optional(),
  category: z.enum(["Tech", "Lifestyle", "Education", "Health"]),
  tags: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  status: z.boolean(), // required boolean
});

export type PostForm = z.infer<typeof postSchema>;
