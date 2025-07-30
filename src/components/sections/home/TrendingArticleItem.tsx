import PostMeta from '@/components/ui/PostMeta';
import { IArticle } from '@/models/Article'
import Link from 'next/link';
import React from 'react'

interface TrendingArticleItemProps {
    article: IArticle;
    index: number;
}

const TrendingArticleItem = ({article, index}: TrendingArticleItemProps) => {
  return (
    <li className='flex items-start mb-6'>
        <div className='shrink-0 text-3xl font-semibold text-gray-300 mr-4'>
            {`0${index+1}`}
        </div>
        <div>
             <h5 className='text-base font-bold mb-2 leading-tight'>
                <Link href={`/articles/${article._id}`} className='text-[#2E2E2E] hover:text-primary transition-colors'>{article.title}</Link>
            </h5>
            <PostMeta {...article.meta}/>
        </div>
    </li>
  )
}

export default TrendingArticleItem