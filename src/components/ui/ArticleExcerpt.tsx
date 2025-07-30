import React from 'react'

interface ArticleExcerptProps {
    excerpt: string;
}

const ArticleExcerpt = ({excerpt}: ArticleExcerptProps) => {
  return (
    <div className='line-clamp-3 text-[#0000008A] text-base font-light leading-relaxed mb-4'>{excerpt}</div>
  )
}

export default ArticleExcerpt