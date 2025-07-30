"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

const DeleteButton = ({id}:{ id: string}) => {
    const router = useRouter();
    const handleDelete = async() => {
        if(!confirm("Are you sure you want to delete this article?")) return;
        try {
            const res = await fetch(`/api/articles/${id}`, {
                method: "DELETE"
            })

            if(!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to delete article.");
            }

            alert("Article deleted successfully.");

            router.refresh();
        } catch (err: any) {
            console.error("Failed to delete article:", err);
            alert(err.message || "An error occurred while deleting the article.");
            
        }
    }
  return (
    <button 
    onClick={handleDelete}
     className='text-red-500 hover:underline cursor-pointer'>Delete</button>
  )
}

export default DeleteButton