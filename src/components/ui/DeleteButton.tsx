// components/DeleteButton.tsx
"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete post");

      alert("Post deleted successfully");

      router.refresh(); // Refresh the page to show updated posts
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-600 hover:underline cursor-pointer">
      Delete
    </button>
  );
}
