"use client"
import SectionTitle from '@/components/ui/SectionTitle';
import { IArticle } from '@/models/Article';
import React, { useState } from 'react';
import ArticleCardContentLeftImageRight from './ArticleCardContentLeftImageRight';
import ArticleCardHorizontal from './ArticleCardHorizontal';
import TrendingArticleItem from './TrendingArticleItem';
import Pagination from '@/components/ui/Pagination';

interface MostRecentSectionProps {
  mostRecentArticles: IArticle[];
  allMostRecentGridArticles: IArticle[];
  popularArticles: IArticle[];
}

const ARTICLES_PER_PAGE = 4; 

const MostRecentSection: React.FC<MostRecentSectionProps> = ({
  mostRecentArticles,
  allMostRecentGridArticles,
  popularArticles,
}) => {
    const [currentPage, setCurrentPage] = useState(1); 
    
    // Calculate total pages dynamically based on the full array length
    const totalPages = Math.ceil(allMostRecentGridArticles.length / ARTICLES_PER_PAGE);

    // Calculate which articles to display for the current page
    const indexOfLastArticle = currentPage * ARTICLES_PER_PAGE;
    const indexOfFirstArticle = indexOfLastArticle - ARTICLES_PER_PAGE;
    const currentGridArticles = allMostRecentGridArticles.slice(indexOfFirstArticle, indexOfLastArticle);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // console.log("Most Recent Articles:", mostRecentArticles);

  return (

    <section className="py-12 bg-white  text-gray-800 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Left Column: Most Recent Articles */}
          <div className="w-full lg:w-8/12 mb-10 lg:mb-0">
            <SectionTitle title="Most Recent" />
            <div className="space-y-8">
              {mostRecentArticles.map((article) => (
             
                <ArticleCardContentLeftImageRight key={article._id} article={article} />
              ))}
            </div>

          
            <div className="border-t border-gray-300 my-8"></div>

            {/* 2x2 Grid of Articles (now paginated) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              {currentGridArticles.map((article) => (
                <ArticleCardHorizontal key={article._id} article={article} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          {/* Right Column: Popular Articles Sidebar */}
          <div className="w-full lg:w-4/12 lg:pl-8">
            <div className="sticky top-24 lg:h-fit lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
              <SectionTitle title="Popular" />
              <ol className="list-none p-0">
                {popularArticles.map((article, index) => (
                  <TrendingArticleItem key={article._id} article={article} index={index} />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MostRecentSection;