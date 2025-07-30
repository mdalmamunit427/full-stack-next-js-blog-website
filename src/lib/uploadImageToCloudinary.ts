export async function uploadImageToCloudinary(imageFile: File) {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "blog-posts")

  const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  })

  if(!res.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await res.json();
  return data.secure_url as string;

}