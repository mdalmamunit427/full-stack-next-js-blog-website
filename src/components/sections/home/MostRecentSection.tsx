"use client"

import SectionTitle from '@/components/ui/SectionTitle';
import { IArticle } from '@/models/Article'
import React, { useState } from 'react' 
import ArticleCardMostRecent from './ArticleCardMostRecent';
import MostRecentGridArticles from './MostRecentGridArticles';
import Pagination from '@/components/ui/Pagination';
import TrendingArticleItem from './TrendingArticleItem';

interface MostRecentSectionProps {
    mostRecentArticles: IArticle[];
    allMostRecentGridArticles: IArticle[];
    popularArticles: IArticle[]
}
const ARTICLES_PER_PAGE = 4;
const MostRecentSection = ({mostRecentArticles, allMostRecentGridArticles, popularArticles}: MostRecentSectionProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(allMostRecentGridArticles.length / ARTICLES_PER_PAGE);
    
    const indexOfLastArticle = currentPage * ARTICLES_PER_PAGE;
    const indexOfFirstArticle = indexOfLastArticle - ARTICLES_PER_PAGE; 
    const currentGridArticles = allMostRecentGridArticles.slice(indexOfFirstArticle, indexOfLastArticle)


    const handlePageChange = (page: number) => {
        if(page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

  return (
    <section className='py-2 bg-white text-gray-800'>
        <div className='px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col lg:flex-row lg:space-x-8'>
                {/* left side */}
                <div className='w-full lg:w-8/12 mb-8 lg:mb-0'>
                    <SectionTitle title='Most Recent'/>
                    <div>
                        {mostRecentArticles.map((article) => (
                            <ArticleCardMostRecent key={article._id} article={article}/>
                        ))}
                    </div>

                    {/* divider line */}
                    <div className='border-t border-gray-300 my-8'></div>

                    {/* 2x2 all most recent grid articles */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 '>
                        {currentGridArticles.map((article) => (
                            <MostRecentGridArticles key={article._id} article={article}/>
                        ))}
                    </div>

                    {/* Pagination */}
                    <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    />
                </div>


                {/* right side */}
                <div className='w-full lg:w-4/12 lg:pl-8'>
                    <div className='sticky top-24 lg:h-fit lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto'>
                        <SectionTitle title='Popular'/>
                        <div className='list-none p-0'>
                             {popularArticles.map((article, index) => (
                                 <TrendingArticleItem key={index} article={article} index={index}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default MostRecentSection