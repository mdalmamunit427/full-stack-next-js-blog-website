import PostMeta from '@/components/ui/PostMeta'
import { Article } from '@/types/article'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface MostRecentGridArticlesProps {
    article: Article
}

const MostRecentGridArticles = ({article}: MostRecentGridArticlesProps) => {
  return (
    <article className="flex flex-col sm:flex-row mb-6 items-start"> 
      <figure className="flex-shrink-0 w-full sm:w-5/12 h-40 sm:h-auto overflow-hidden rounded-lg mb-4 sm:mb-0 sm:mr-6">
        <Link href={`/articles/${article._id}`} className="block w-full h-full aspect-square">
          <Image
            src={article.image}
            alt={article.title}
            width={180} 
            height={180} 
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
        </Link>
      </figure>
      <div className="flex-grow w-full sm:w-7/12">
        <h5 className="text-lg font-bold mb-2 leading-tight">
          <Link href={`/articles/${article._id}`} className="hover:text-primary transition-colors">
            {article.title}
          </Link>
        </h5>
        {article.excerpt && (
          <div className="text-gray-500 text-sm mb-3">
            <p className="line-clamp-2">{article.excerpt}</p> 
          </div>
        )}
        <PostMeta {...article.meta} />
      </div>
    </article>
  )
}

export default MostRecentGridArticles