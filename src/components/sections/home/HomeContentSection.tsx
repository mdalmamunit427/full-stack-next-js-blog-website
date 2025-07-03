import React from 'react';
import Link from 'next/link'; 
import { FaArrowRight } from 'react-icons/fa';
import ArticleCardPrimary from './ArticleCardPrimary';
import ArticleCardSecondary from './ArticleCardSecondary';
import TrendingArticleItem from './TrendingArticleItem';
import { IArticle } from '@/models/Article'; 
import SectionTitle from '@/components/ui/SectionTitle';


interface HomeContentSectionProps {
  editorPicksPrimary?: IArticle;
  editorPicksSecondary: IArticle[];
  trendingArticles: IArticle[];
}

const HomeContentSection: React.FC<HomeContentSectionProps> = ({
  editorPicksPrimary,
  editorPicksSecondary,
  trendingArticles,
}) => {
  return (
    <section className="py-12 bg-white  text-gray-800">
      <div className="flex flex-col md:flex-row -mx-4">
          {/* Editor's Picks Section (Left Column) */}
          <div className="w-full md:w-9/12 px-4 mb-10 md:mb-0">
            <SectionTitle title="Editor's Picks" />
            <div className="flex flex-col md:flex-row -mx-4">
              {/* Main Featured Article */}
              <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
                
                {editorPicksPrimary && <ArticleCardPrimary article={editorPicksPrimary} />}
                <Link
                  href="/archive"
        
                  className="inline-block mt-6 px-6 py-3 text-sm uppercase border border-accent-green text-accent-green rounded hover:bg-primary hover:text-white transition-colors"
                >
                  All Featured
                </Link>
              </div>

              {/* Smaller Featured Articles */}
              <div className="w-full md:w-1/2 px-4">
                {editorPicksSecondary.map((article, i) => (
                  <ArticleCardSecondary key={i} article={article} />
                ))}
              </div>
            </div>
          </div>

          {/* Trending Section (Right Column) */}
          <div className="w-full md:w-3/12 px-4">
            <SectionTitle title="Trending" />
            <ol className="list-none p-0">
              {trendingArticles.map((article, index) => (
                <TrendingArticleItem key={index} article={article} index={index} />
              ))}
            </ol>
            <Link
              href="/archive"
  
              className="inline-flex items-center text-sm uppercase text-primary hover:underline transition-colors mt-6"
            >
              See all trending
              <FaArrowRight size={12} className="ml-2" />
            </Link>
          </div>
        </div>
      {/* Optional: A divider at the bottom if needed globally */}
      <div className="border-t border-gray-200  mt-12 pt-8"></div> 
    </section>
  );
};

export default HomeContentSection;