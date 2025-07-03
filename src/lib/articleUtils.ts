
import { IArticle } from '../models/Article';


// Define the structure of the separated articles object
export interface SeparatedArticles {
  editorPicksPrimary?: IArticle; 
  editorPicksSecondary: IArticle[];
  trendingArticles: IArticle[];
  sliderArticles: IArticle[];
  mostRecentArticles: IArticle[];
  allMostRecentGridArticles: IArticle[];
  gridArticles: IArticle[];
  popularArticles: IArticle[]; 
}

export function separateArticlesBySection(allArticles: IArticle[]): SeparatedArticles {
  const separated: SeparatedArticles = {
    editorPicksSecondary: [],
    trendingArticles: [],
    sliderArticles: [],
    mostRecentArticles: [],
    allMostRecentGridArticles: [],
    gridArticles: [],
    popularArticles: [],
  };

  // Find the single primary editor pick
  separated.editorPicksPrimary = allArticles.find(
    (article) => article.meta.displaySection === 'editorPickPrimary'
  );

  // Filter for all other sections
  separated.editorPicksSecondary = allArticles.filter(
    (article) => article.meta.displaySection === 'editorPickSecondary'
  );
  separated.trendingArticles = allArticles.filter(
    (article) => article.meta.displaySection === 'trending'
  );
  separated.sliderArticles = allArticles.filter(
    (article) => article.meta.displaySection === 'slider'
  );
  separated.mostRecentArticles = allArticles.filter(
    (article) => article.meta.displaySection === 'mostRecent'
  );
  separated.allMostRecentGridArticles = allArticles.filter(
    (article) => article.meta.displaySection === 'mostRecentGrid'
  );
  separated.gridArticles = allArticles.filter(
    (article) => article.meta.displaySection === 'gridAndAds'
  );

  // As per previous discussions, 'popular' articles are the same as 'trending'
  separated.popularArticles = separated.trendingArticles;

  return separated;
}