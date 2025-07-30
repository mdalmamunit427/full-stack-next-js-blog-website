"use client"
import PostForm, { PostFormType } from '@/components/form/PostForm'
import { uploadImageToCloudinary } from '@/lib/uploadImageToCloudinary'
import { useRouter } from 'next/navigation'
import React from 'react'

const AddPostPage = () => {

  const router = useRouter();

  const handleAddPost =async (data: PostFormType, imageFile: File | null) => {
      try {
        let imageUrl = "";
      if(imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }
      const postData = {
        ...data,
        status: data.status ? data.status === true : data.status === false,
        image: imageUrl,
        caption: data.title,
        tags: data.tags ? data.tags.split(",").map(tag => tag.trim()) : [],
        meta: {
          author: data.author || "Unknown Author", 
          authorHref: "/",
          category: data.category || "Uncategorized",
          categoryHref: "/",
          date: new Date().toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"}),
          readingTime: `${Math.ceil(data.excerpt.split(' ').length/200)} min read`,
        }
      }

      const res = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      })
      if(!res.ok) {
        throw new Error("Failed to add post");
      }

      router.push("/dashboard/manage-posts");
      } catch (error) {
        alert("Failed to add post. Please try again.");
        console.error("Error adding post:", error);
      }
      
  }
  return (
    <section>
      <h1 className='text-3xl font-bold mb-6'>Add New Article</h1>
      <PostForm onSubmit={handleAddPost}/>
    </section>
  )
}

export default AddPostPage