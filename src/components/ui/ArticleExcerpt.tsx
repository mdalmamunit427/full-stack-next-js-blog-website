
import React from "react";

interface Props {
  excerpt: string;
}

const ArticleExcerpt: React.FC<Props> = ({ excerpt }) => {
  return (
    <div
      className="line-clamp-3 text-[#0000008A] text-base font-light leading-relaxed mb-4"
      dangerouslySetInnerHTML={{ __html: excerpt }}
    />
  );
};

export default ArticleExcerpt;
