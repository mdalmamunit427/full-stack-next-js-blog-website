import SectionTitle from '@/components/ui/SectionTitle';
import { IArticle } from '@/models/Article'
import React from 'react'
import ArticleCardPrimary from './ArticleCardPrimary';
import Link from 'next/link';
import ArticleCardSecondary from './ArticleCardSecondary';
import TrendingArticleItem from './TrendingArticleItem';
import { FaArrowRight } from 'react-icons/fa';

interface HomeContentSectionProps {
    editorPicksPrimary?: IArticle;
    editorPicksSecondary: IArticle[];
    trendingArticles: IArticle[]
}

const HomeContentSection = ({editorPicksPrimary, editorPicksSecondary, trendingArticles}: HomeContentSectionProps) => {
  return (
    <section className='py-12 bg-white text-gray-800'>
        <div className='flex flex-col md:flex-row -mx-4'>
            {/* left side */}
            <div className='w-full md:w-9/12 px-4 mb-10 md:mb-0'>
                <SectionTitle title="Editor's Picks"/>
                <div className='flex flex-col md:flex-row -mx-4'>
                    {/* main featured article */}
                    <div className='w-full md:w-1/2 px-4 mb-8 md:mb-0'>
                        {editorPicksPrimary && <ArticleCardPrimary article={editorPicksPrimary}/>}
                        <Link href="/archive" className='inline-block mt-6 px-6 py-2.5 text-sm uppercase border rounded hover:bg-primary hover:text-white'>All Featured</Link>
                    </div>

                    {/* small featured article*/}
                     <div className='w-full md:w-1/2 px-4 mb-8 md:mb-0'>
                        {editorPicksSecondary && editorPicksSecondary.map((article, index) => (
                            <ArticleCardSecondary key={index} article={article}/>
                        ))}
                    </div>

                </div>
            </div>

            {/* right side */}
            <div className='w-full md:w-3/12 px-4'>
                <SectionTitle title='Trending'/>
                <ol className='list-none p-0'>
                    {trendingArticles.map((article, index) => (
                        <TrendingArticleItem key={index} article={article} index={index}/>
                    ))}
                </ol>
                <Link href="/archive" className='inline-flex items-center text-sm uppercase text-primary hover:underline transition-colors mt-6'>
                    See all trending
                    <FaArrowRight className='ml-2' size={12}/>
                </Link>
            </div>
        </div>
    </section>
  )
}

export default HomeContentSection