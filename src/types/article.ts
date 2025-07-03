// types/article.ts

// Define the possible string literal values for displaySection
export type ArticleDisplaySection =
  'editorPickPrimary' |
  'editorPickSecondary' |
  'trending' |
  'slider' |
  'mostRecent' |
  'mostRecentGrid' |
  'gridAndAds';

// Define the structure of the nested 'meta' object
export interface ArticleMeta {
  author: string;
  authorHref: string;
  category: string;
  categoryHref: string;
  date: string;
  readingTime: string;
  displaySection?: ArticleDisplaySection;
  authorAvatarUrl?: string; 
}

export interface Article {
  _id: string; 
  title: string;
  image: string;
  excerpt?: string;
  caption?: string;
  meta: ArticleMeta;
  tags?: string[];
  // createdAt?: string; // These are also part of Mongoose's Document
  // updatedAt?: string; // We'll let Document define them.
}