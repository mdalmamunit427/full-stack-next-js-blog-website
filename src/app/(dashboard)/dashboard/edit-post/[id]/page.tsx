"use client"

import PostForm, { PostFormType } from '@/components/form/PostForm'
import { uploadImageToCloudinary } from '@/lib/uploadImageToCloudinary';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const EditPostPage = () => {
    const router = useRouter();
    const {id} = useParams();
    const [initialData, setInitialData] = React.useState<PostFormType | undefined>(undefined);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        if(!id) return;
        async function fetchPost() {
            try {
                const res = await fetch(`/api/articles/${id}`);
                if(!res.ok) {
                    throw new Error("Failed to fetch post data");
                }

                const post = await res.json();
                setInitialData({
                    title: post.title,
                    author: post.meta.author,
                    category: post.meta.category,
                    excerpt: post.excerpt,
                    status: post.status,
                    tags: post.tags,
                    image: post.image || "",
                })

                setLoading(false);

            } catch (error) {
                setLoading(false);
                console.error("Error fetching post data:", error);
            }
        }
        fetchPost();
    }, [id])

    // console.log(initialData)

    if(loading) return <p>Loading...</p>;

    if(!initialData) return <p className='text-red-500'>Post not found</p>;


    const handleUpdatePost = async(data: PostFormType, imageFile: File | null) => {
         try {
                let imageUrl = "";
              if(imageFile) {
                imageUrl = await uploadImageToCloudinary(imageFile);
              }
              const postData = {
                ...data,
                status: data.status ? data.status === true : data.status === false,
               ...(imageUrl && { image: imageUrl }),
                caption: data.title,
                tags: data.tags,
                meta: {
                  author: data.author || "Unknown Author", 
                  authorHref: "/",
                  category: data.category || "Uncategorized",
                  categoryHref: "/",
                  date: new Date().toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"}),
                  readingTime: `${Math.ceil(data.excerpt.split(' ').length/200)} min read`,
                }
              }
        
              const res = await fetch(`/api/articles/${id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(postData)
              })
              if(!res.ok) {
                throw new Error("Failed to add post");
              }

              alert("Post updated successfully!");
        
              router.push("/dashboard/manage-posts");
              } catch (error) {
                alert("Failed to update post. Please try again.");
                console.error("Error adding post:", error);
              }
    }
  return (
    <section className='max-w-4xl'>
        <h1 className='text-3xl font-bold mb-6'>Edit Post </h1>
        <PostForm onSubmit={handleUpdatePost} initialData={initialData}/>
    </section>
  )
}

export default EditPostPage