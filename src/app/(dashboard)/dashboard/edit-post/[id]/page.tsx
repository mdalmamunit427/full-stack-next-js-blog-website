"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import PostForm, { PostFormType } from "@/components/forms/PostForm";

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams(); // get post id from route param

  const [initialData, setInitialData] = useState<PostFormType | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch post by id and pre-fill form
  useEffect(() => {
    if (!id) return;

    async function fetchPost() {
      try {
        const res = await fetch(`/api/articles/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const post = await res.json();

        // Map fetched data to PostFormType
        setInitialData({
          title: post.title,
          author: post.meta.author,
          category: post.meta.category,
          excerpt: post.excerpt,
          status: post.status,
          tags: post.tags,
          // Note: image handled separately in PostForm through preview
        });

        setLoading(false);
      } catch (error) {
        alert((error as Error).message);
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  async function uploadImageToCloudinary(imageFile: File) {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "blog-posts"); // Replace with your preset
    // console.log(formData)

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, // Replace YOUR_CLOUD_NAME
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) throw new Error("Image upload failed");

    const data = await res.json();

    return data.secure_url as string;
  }

  async function handleUpdatePost(data: PostFormType, imageFile: File | null) {
    try {
      let imageUrl = "";

      // If new image uploaded, upload it
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      // Prepare update payload
      const postData = {
        ...data,
        status: data.status === true ,
        ...(imageUrl && { image: imageUrl }), // only send if new image uploaded
        caption: data.title,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
        meta: {
          author: data.author || "Unknown Author",
          authorHref: `/author/${data.author.toLowerCase().replace(/\s+/g, '-')}`,
          category: data.category,
          categoryHref: `/category/${data.category.toLowerCase()}`,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          readingTime: `${Math.ceil(data.excerpt.split(' ').length / 200)} min read`,
        }
      };

      const res = await fetch(`/api/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) throw new Error("Failed to update post");

      alert("Post updated successfully!");

      router.push(`/articles/${id}`);
    } catch (error) {
      alert((error as Error).message);
    }
  }

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!initialData) {
    return <div className="text-center p-4">Post not found</div>;
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <PostForm onSubmit={handleUpdatePost} initialData={initialData} />
    </div>
  );
}
