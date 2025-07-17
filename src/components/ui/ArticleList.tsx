// file: components/ArticleList.js

"use client";

import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import { IArticle } from "@/models/Article";

// A spinner component to show while loading
const Loader = () => (
    <div className="flex justify-center items-center p-4 col-span-full">
        <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-primary"></div>
    </div>
);

const ArticleList = ({ initialArticles }: { initialArticles: IArticle[] }) => {
  const [articles, setArticles] = useState(initialArticles);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // 1. Add isLoading state
  const { ref, inView } = useInView();

  const loadMoreArticles = async () => {
    // 2. Prevent new fetches if already loading
    if (isLoading) return;

    setIsLoading(true);
    try {
        const response = await fetch(`/api/articles?page=${page}&limit=8`);
        const { articles: newArticles, totalPages } = await response.json();

        if (newArticles.length > 0) {
            setArticles((prev) => [...prev, ...newArticles]);
            setPage((prev) => prev + 1);
        }

        // Check if we've reached the last page
        if (page >= totalPages) {
            setHasMore(false);
        }
    } catch (error) {
        console.error("Failed to load more articles:", error);
        // Optionally, handle the error in the UI
    } finally {
        setIsLoading(false); // 3. Reset loading state
    }
  };

  useEffect(() => {
    // 4. Also check for isLoading in the effect
    if (inView && hasMore && !isLoading) {
      loadMoreArticles();
    }
  }, [inView, hasMore, isLoading]); // Add isLoading to dependency array

  return (
    <>
      <div className="grid md:grid-cols-4 gap-10">
        {articles.map((article:IArticle, index:number) => (
          <Link key={index} href={`/articles/${article._id}`} className="block h-80">
            <div className="group bg-white shadow-md hover:shadow-lg transition rounded-xl overflow-hidden">
              {article.image && (
                <div className="relative aspect-video w-full">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}

              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>{article.meta?.category}</span>
                  <span>•</span>
                  <span>{article.meta?.date}</span>
                </div>

                <h2 className="text-base line-clamp-2 font-semibold text-gray-900 group-hover:text-primary">
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
      
      {/* Show loader only when it's actively loading more */}
      {isLoading && <Loader />}
      
      {/* The ref for the intersection observer is now on a simple div at the end */}
      {!isLoading && hasMore && <div ref={ref} />}
    </>
  );
};

export default ArticleList;