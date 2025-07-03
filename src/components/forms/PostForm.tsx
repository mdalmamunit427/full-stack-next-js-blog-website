"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import QuillEditor from "./QuillEditor";
import Image from "next/image";

export type PostFormType = {
  title: string;
  author: string;
  category: "Tech" | "Lifestyle" | "Education" | "Health" | "Design" | "Startups" | "Culture" | "Politics" | "";
  excerpt: string;
  image?: string;
  status: boolean;
  tags?: string;
};

type PostFormProps = {
  onSubmit: (data: PostFormType, imageFile: File | null) => void;
  initialData?: PostFormType;
};

export default function PostForm({ onSubmit, initialData }: PostFormProps) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PostFormType>({
    defaultValues: initialData || {
      title: "",
      author: "",
      category: "",
      excerpt: "",
      status: true,
      tags: "",
      image: "",
    },
  });

  // For new image file upload
  const [imageFile, setImageFile] = useState<File | null>(null);
  // For previewing existing image when editing
  const [existingImage, setExistingImage] = useState<string | null>(null);

  useEffect(() => {
    // If editing and initialData has image URL, set preview
    if (initialData?.image) {
      setExistingImage(initialData.image);
    }
  }, [initialData]);

  function onFormSubmit(data: PostFormType) {
    onSubmit(data, imageFile);
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 max-w-3xl">
      {/* Title */}
      <div>
        <label className="block font-semibold mb-1" htmlFor="title">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          {...register("title", { required: "Title is required" })}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter post title"
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Author */}
      <div>
        <label className="block font-semibold mb-1" htmlFor="author">
          Author <span className="text-red-500">*</span>
        </label>
        <input
          id="author"
          type="text"
          {...register("author", { required: "Author is required" })}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter author name"
        />
        {errors.author && (
          <p className="text-red-600 text-sm mt-1">{errors.author.message}</p>
        )}
      </div>
      {/* Category */}
      <div>
        <label className="block font-semibold mb-1" htmlFor="category">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          {...register("category", { required: "Category is required" })}
          className="w-full border rounded px-3 py-2"
          defaultValue={initialData?.category || ""}
        >
          <option value="" disabled>
            Select category
          </option>
          <option value="tech">Tech</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="education">Education</option>
          <option value="health">Health</option>
          <option value="design">Design</option>
          <option value="startups">Startups</option>
          <option value="culture">Culture</option>
          <option value="politics">Politics</option>
        </select>
        {errors.category && (
          <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      {/* Content */}
      <div>
        <label className="block font-semibold mb-1" htmlFor="content">
          Content <span className="text-red-500">*</span>
        </label>

        <QuillEditor
          value={watch("excerpt")}
          onChange={(html) => setValue("excerpt", html, { shouldValidate: true })}
          placeholder="Write the article..."
        />

        {errors.excerpt && (
          <p className="text-red-600 text-sm mt-1">{errors.excerpt.message}</p>
        )}
      </div>

      {/* Tags */}
      <div>
        <label className="block font-semibold mb-1" htmlFor="tags">
          Tags (comma separated)
        </label>
        <input
          id="tags"
          type="text"
          {...register("tags")}
          className="w-full border rounded px-3 py-2"
          placeholder="e.g. react, javascript, tutorial"
        />
      </div>

      {/* Status */}
      <div className=" space-x-2">
                <label htmlFor="status" className="block font-semibold mb-1">Status</label>
                <select 
                    id="status"
                    {...register("status")}
                    defaultChecked={initialData?.status ?? true}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="true">Published</option>
                    <option value="false">Draft</option>
                </select>
      </div>


      {/* Image Upload */}
      <div>
        <label className="block font-semibold mb-1" htmlFor="image">
          Upload Image
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setImageFile(e.target.files[0]);
              setExistingImage(null); // clear existing image preview if new image chosen
            }
          }}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 cursor-pointer file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
        />
        {imageFile && (
          <Image
            src={URL.createObjectURL(imageFile)}
            alt="Image Preview"
            className="mt-2 max-h-40 rounded border object-contain"
            width={200}
            height={200}
            priority
          />
        )}
        {!imageFile && existingImage && (
          <Image
            width={200}
            height={200}
            src={existingImage}
            alt="Existing Image"
            className="mt-2 max-h-40 rounded border object-contain"
          />
        )}
      </div>

      {/* Submit button */}
      <div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
