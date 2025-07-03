import React from 'react';
import Image from 'next/image';
import { IArticle } from '@/models/Article';
import PostMeta from '@/components/ui/PostMeta';
import Link from 'next/link';


interface ArticleCardPrimaryProps {
  article: IArticle;
}

const ArticleCardPrimary: React.FC<ArticleCardPrimaryProps> = ({ article }) => {
  return (
    <article className="mb-8 md:mb-0">
      <figure className="mb-4">
        <Link href={`/articles/${article._id}`}>
          <Image
            src={article.image}
            alt={article.title}
            width={700} // Increased width for better quality on large screens
            height={400} // Increased height for better quality on large screens
            className="w-full h-auto object-cover rounded-lg"
            loading="lazy"
          />
        </Link>
      </figure>
      <h3 className="text-xl font-bold mb-3 leading-tight">
        <Link href={`/articles/${article._id}`} className="text-[#2E2E2E] hover:text-primary  transition-colors">
          {article.title}
        </Link>
      </h3>
      {article.excerpt && (
        <div className="text-[#0000008a] mb-4 text-base leading-relaxed">
          <p>{article.excerpt}</p>
        </div>
      )}
      <PostMeta {...article.meta} />
    </article>
  );
};

export default ArticleCardPrimary;