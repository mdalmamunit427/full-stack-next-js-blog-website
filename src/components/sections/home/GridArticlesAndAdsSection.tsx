import { IArticle } from '@/models/Article';
import React from 'react';
import ArticleCardHorizontal from './ArticleCardHorizontal';
import AdsBlock from './AdsBlock';
interface AdsDataType {
  adImageUrl: string;
  adImageAlt: string;
  adLink: string;
  promoText: string;
  promoButtonText: string;
  bottomImageUrl: string;
  bottomImageAlt: string;
}

interface GridArticlesAndAdsSectionProps {
  articles: IArticle[];
  adsData: AdsDataType; 
}


const GridArticlesAndAdsSection: React.FC<GridArticlesAndAdsSectionProps> = ({ articles = [], adsData }) => {
// console.log(adsData)

  return (
    <section className="pb-12 bg-white text-gray-800 font-inter"> 
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"> 
        <div className="flex flex-col lg:flex-row lg:space-x-8"> 
        
          {/* Main Articles Grid Section (lg:w-10/12) */}
          <div className="w-full lg:w-10/12 mb-10 lg:mb-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12"> 
              {articles.map((article) => (
                <ArticleCardHorizontal key={article._id} article={article} />
              ))}
            </div>
          </div>

          {/* Advertisement Section (lg:w-2/12) */}
          <div className="w-full lg:w-2/12 flex justify-center lg:block">
   
            <AdsBlock
              bottomImageUrl={adsData.bottomImageUrl}
              bottomImageAlt={adsData.bottomImageAlt}
              adLink={adsData.adLink}
            />
          </div>
        </div>
      </div>
      {/* Divider is not explicitly in the HTML sample but if needed, place here */}
      {/* <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8"></div> */}
    </section>
  );
};

export default GridArticlesAndAdsSection;