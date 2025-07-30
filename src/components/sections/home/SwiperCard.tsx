import PostMeta from '@/components/ui/PostMeta'
import { Article } from '@/types/article'
import Link from 'next/link'
import React from 'react'

interface SwiperCardProps {
    article: Article
}

const SwiperCard = ({article}: SwiperCardProps) => {
  return (
    <div className='rounded-lg overflow-hidden flex flex-col justify-between items-center md:flex-row bg-[#FAFAFA]'>
        <div className='p-6 md:p-8 lg:p-10 flex flex-col justify-center w-full md:w-1/2'>
            {
                article.caption && <p className='text-xs uppercase text-gray-500 mb-2 font-semibold tracking-wider'>{article.caption}</p>
            }
            <h2 className='text-xl sm:text-2xl hover:text-primary font-bold mb-3 leading-tight transition-colors'>
                <Link href={`/articles/${article._id}`}>{article.title}</Link>
            </h2>
            {
                article.excerpt && <div className='mb-4 text-base leading-relaxed text-[#0000008a]'>
                    <p>{article.excerpt}</p>
                </div>
            }
            <PostMeta {...article.meta}/>
        </div>

        <div className='w-full md:w-1/2 h-48 md:h-auto'>
        <img src={article.image} alt="" /></div>
    </div>
  )
}

export default SwiperCard