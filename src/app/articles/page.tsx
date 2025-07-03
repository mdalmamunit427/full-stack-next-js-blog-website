import { connectDB } from "@/lib/mongodb";
import ArticleModel from "@/models/Article";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const ArticlePage = async () => {
  await connectDB();

  const articles = await ArticleModel.find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  return (
    <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Latest Articles</h1>

      <div className="grid md:grid-cols-4 gap-8">
        {articles.map((article) => (
          <Link key={article._id} href={`/articles/${article._id}`}>
            <div className="group bg-white shadow-md hover:shadow-lg transition rounded-xl overflow-hidden">
              {article.image && (
                <div className="relative aspect-video w-full">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>{article.meta?.category}</span>
                  <span>•</span>
                  <span>{article.meta?.date}</span>
                </div>

                <h2 className="text-xl line-clamp-2 font-semibold text-gray-900 group-hover:text-primary">
                  {article.title}
                </h2>

               

                <div className="mt-4 text-sm text-gray-500">
                  By <span className="font-medium">{article.meta?.author}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ArticlePage;
