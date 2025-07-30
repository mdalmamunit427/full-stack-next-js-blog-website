
import { ArticleMeta } from '@/types/article'
import Link from 'next/link'
import React from 'react'
import { FaStar } from 'react-icons/fa'

const PostMeta = ({author, authorHref, category, date, readingTime}: ArticleMeta) => {
  return (
    <div className='text-sm text-gray-500 flex items-center flex-wrap'>
        <Link href={authorHref} className='text-gray-600 hover:text-primary transition-colors'>
            {author}
        </Link>
        <span className='mx-1'>in</span>
         <Link href={authorHref} className='text-gray-600 hover:text-primary transition-colors capitalize'>
            {category}
        </Link>
        <span className='mx-1'>&bull;</span>
        <span>{date}</span>
        <span className='mx-1'>&bull;</span>
        <span>{readingTime}</span>
        <span className='ml-2 text-gray-300'>
            <FaStar size={10}/>
        </span>
    </div>
  )
}

export default PostMeta