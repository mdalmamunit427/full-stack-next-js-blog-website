export type ArticleDisplaySection = 'editorPickPrimary' | 'editorPickSecondary' | 'trending' | 'slider' | 'mostRecent' | 'mostRecentGrid' | 'gridAndAds';


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
}