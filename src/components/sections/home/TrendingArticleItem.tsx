import PostMeta from '@/components/ui/PostMeta';
import { Article } from '@/types/article';
import Link from 'next/link';
import React from 'react';


interface TrendingArticleItemProps {
  article: Article;
  index: number;
}

const TrendingArticleItem: React.FC<TrendingArticleItemProps> = ({ article, index }) => {
  return (
    <li className="flex items-start mb-6">
      <div className="flex-shrink-0 text-3xl font-semibold text-gray-300 mr-4">
        {`0${index + 1}`}
      </div>
      <div className="flex-grow">
        <h5 className="text-base font-bold mb-2 leading-tight">
          <Link href={`/articles/${article._id}`} className=" hover:text-primary transition-colors">
            {article.title}
          </Link>
        </h5>
        <PostMeta {...article.meta} />
      </div>
    </li>
  );
};

export default TrendingArticleItem;