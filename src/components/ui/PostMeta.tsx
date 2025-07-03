import Link from 'next/link';
import React from 'react';
import { FaStar } from 'react-icons/fa'; // For the star icon

interface PostMetaProps {
  author: string;
  authorHref: string;
  category: string;
  categoryHref: string;
  date: string;
  readingTime: string;
}

const PostMeta: React.FC<PostMetaProps> = ({
  author,
  authorHref,
  category,
  categoryHref,
  date,
  readingTime,
}) => {
  return (
    <div className=" text-sm text-gray-500 flex items-center flex-wrap">
      <Link href={authorHref} className="text-[#000000D6] hover:text-primary transition-colors">
        {author}
      </Link>{' '}
      <span className="mx-1">in</span>{' '}
      <a href={categoryHref} className="text-[#000000D6] hover:text-primary transition-colors">
        {category}
      </a>
     
      
        <span className="mx-1">&bull;</span>
      <span>{date}</span>
      <span className="mx-1">&bull;</span>
      <span title={readingTime}>{readingTime}</span>
      <span className="ml-2 text-gray-300">
        <FaStar size={10} />
      </span>
    </div>
  );
};

export default PostMeta;