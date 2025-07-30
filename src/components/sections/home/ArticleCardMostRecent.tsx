
import ArticleExcerpt from '@/components/ui/ArticleExcerpt'
import PostMeta from '@/components/ui/PostMeta'
import { Article } from '@/types/article'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


interface ArticleCardMostRecentProps {
    article: Article
}

const ArticleCardMostRecent = ({article}: ArticleCardMostRecentProps) => {
  return (
    <article className="flex flex-col md:flex-row-reverse items-center md:items-start mb-8 border-b border-gray-100  pb-8 last:border-b-0 last:pb-0">
      {/* Image Column */}
      <figure className="flex-shrink-0 w-full md:w-3/12 h-40 md:h-auto overflow-hidden rounded-lg mb-4 md:mb-0 md:ml-6">
        <Link href={`/articles/${article._id}`} className="block w-full h-full aspect-square">
          <Image
            src={article.image}
            alt={article.title}
            width={250} 
            height={180} 
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
        </Link>
      </figure>

      {/* Content Column */}
      <div className="flex-grow w-full md:w-9/12">
        {article.caption && (
          <div className="text-xs uppercase text-gray-500  mb-2 font-semibold tracking-wide">
            {article.caption}
          </div>
        )}
        <h3 className="text-xl font-bold mb-3 leading-tight">
          <Link href={`/articles/${article._id}`} className="hover:text-primary transition-colors">
            {article.title}
          </Link>
        </h3>
        {article.excerpt && (
          <div className="text-[#0000008A]  text-base leading-relaxed mb-4">
            <ArticleExcerpt excerpt={article.excerpt} />

            {/* <p >{article.excerpt}</p>  */}
          </div>
        )}
        <PostMeta {...article.meta} />
      </div>
    </article>
  )
}

export default ArticleCardMostRecent