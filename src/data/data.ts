// lib/data.ts
import ArticleModel, { IArticle } from '@/models/Article'; // Adjust path
import { separateArticlesBySection, SeparatedArticles } from '@/lib/articleUtils'; 
import { connectDB } from '@/lib/mongodb';

interface HomePageData {
  articles: SeparatedArticles;
  adsData: {
    adImageUrl: string;
    adImageAlt: string;
    adLink: string;
    promoText: string;
    promoButtonText: string;
    bottomImageUrl: string;
    bottomImageAlt: string;
  };
}

const ADS_DATA = {
  adImageUrl: 'https://via.placeholder.com/166x100/f0f0f0/333333?text=AD',
  adImageAlt: 'Advertisement',
  adLink: '/advertise',
  promoText: 'Medium clear & readable',
  promoButtonText: 'GET NOW',
  bottomImageUrl: '/images/ads-1.webp',
  bottomImageAlt: 'Ad for old painting',
};


export async function getHomePageData(): Promise<HomePageData> {
  let allFetchedArticles: IArticle[] = [];

  try {
    await connectDB();
    
     const articles = await ArticleModel.find({}).sort({ createdAt: -1 }).lean();
     allFetchedArticles = JSON.parse(JSON.stringify(articles));
  } catch (error) {
    console.error('Error fetching articles for homepage data utility:', error);
  }

  // Use the utility function to separate articles into their respective sections
  const separatedArticles = separateArticlesBySection(allFetchedArticles);

  return {
    articles: separatedArticles,
    adsData: ADS_DATA, 
  };
}