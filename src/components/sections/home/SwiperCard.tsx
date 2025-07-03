// components/sections/home/SwiperCard.tsx
import React from 'react';
import Image from 'next/image';
import { Article } from '@/types/article';
import PostMeta from '@/components/ui/PostMeta';

interface SwiperCardProps {
  article: Article;
}

const SwiperCard: React.FC<SwiperCardProps> = ({ article }) => {
  // console.log(article)
  return (
    <div className=" rounded-lg overflow-hidden flex flex-col justify-between items-center md:flex-row bg-[#FAFAFA]">
      {/* Content Section */}
      <div className=" p-6 md:p-8 lg:p-10 flex flex-col justify-center w-full md:w-1/2 ">
        {article.caption && (
          <div className="text-xs uppercase text-gray-500  mb-2 font-semibold tracking-wide">
            {article.caption}
          </div>
        )}
        <h2 className="text-xl sm:text-2xl hover:text-primary font-bold mb-3 leading-tight">
          <a href={`/articles/${article._id}`}>
            {article.title}
          </a>
        </h2>
        {article.excerpt && (
          <div className="text-[#0000008a] mb-4 text-base leading-relaxed">
            <p>{article.excerpt}</p>
          </div>
        )}
        <PostMeta {...article.meta} />
      </div>

      {/* Image Section - Hidden on small screens, block on medium and up */}
      <div className="w-full md:w-1/2 h-48 md:h-auto relative">
        {/* Use Next.js Image component for optimized loading */}
        {/* <Image src={article?.imageUrl} alt={article.imageAlt || 'Article image'} layout="responsive" width={500} height={300} /> */}
        <img src={article.image} alt="" />
      </div>
      {/* <div
        className="w-full md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${article.imageUrl})` }}
        aria-label={article.imageAlt}
      >
      </div> */}
    </div>
  );
};

export default SwiperCard;