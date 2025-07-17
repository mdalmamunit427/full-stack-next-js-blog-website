// file: app/articles/page.js

import ArticleList from "@/components/ui/ArticleList";
import { connectDB } from "@/lib/mongodb";
import ArticleModel from "@/models/Article";
import React from "react";

const ArticlePage = async () => {
  await connectDB();

  // Fetch only the first 8 articles for the initial server render
  const initialArticles = await ArticleModel.find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();
  
  // The MongoDB _id field is an object, so we need to serialize it to a string
  // for it to be passed from a Server to a Client Component.
  const serializedArticles = initialArticles.map(article => ({
      ...article,
      _id: article._id.toString(),
  }));

  return (
    <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Latest Articles</h1>
      
      {/* Render the client component with the initial articles */}
      <ArticleList initialArticles={serializedArticles} />
    </section>
  );
};

export default ArticlePage;