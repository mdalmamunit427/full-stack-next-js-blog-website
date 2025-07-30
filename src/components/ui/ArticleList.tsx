"use client"

import { IArticle } from '@/models/Article'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const Loader = () => {
    return (
        <div className='flex justify-center items-center p-4 col-span-full'>
        <div className='w-8 h-8 border-4 border-dashed rounded-full animate-spin border-primary'></div>
    </div>
    )
}

const ArticleList = ({initialArticles}: {initialArticles: IArticle[]}) => {
    const [articles, setArticles] = useState(initialArticles)
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const {ref, inView} = useInView();

 

    useEffect(() => {
         const loadMoreArticles = async ()=> {
        if(isLoading) return;
        setIsLoading(true);
        try {
            const response = await fetch(`/api/articles?page=${page}&limit=8`);
            const {articles: newArticles, totalPages} = await response.json();

            if(newArticles.length > 0) {
               setArticles((prev) => [...prev, ...newArticles]);
               setPage((prev) => prev + 1)
            }

            if(page >= totalPages) {
                setHasMore(false)
            }
        } catch (error) {
            console.error("Failed to load more articles", error)
        } finally {
            setIsLoading(false)
        }
    }
        if(inView && hasMore && !isLoading) {
           loadMoreArticles() 
        }
    }, [inView, hasMore, isLoading, page])


  return (
    <>
    <div className='grid md:grid-cols-4 gap-10'>
        {
            articles.map((article: IArticle, index: number) => (
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
            ))
        }
    </div>

    {/* loader */}
    {isLoading && <Loader/>}

    {/* load data based on scroll */} 
    {!isLoading && hasMore && <div ref={ref}/>}
    </>
  )
}

export default ArticleList