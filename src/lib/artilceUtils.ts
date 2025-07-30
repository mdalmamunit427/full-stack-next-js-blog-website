import { IArticle } from "@/models/Article";
import { SeparatedArticles } from "./data";

export function separateArticlesBySection (allArticles: IArticle[]) {
    const separated: SeparatedArticles = {
        editorPicksPrimary: {} as IArticle,
        editorPicksSecondary: [],
        sliderArticles: [],
        mostRecentArticles: [],
        allMostRecentGridArticles: [],
        trendingArticles: [],
        gridArticles:[],
        popularArticles: []
    }
    
    separated.editorPicksPrimary = allArticles.find((article) => article.meta.displaySection === 'editorPickPrimary')

    separated.editorPicksSecondary = allArticles.filter((article) => article.meta.displaySection === 'editorPickSecondary')
    separated.sliderArticles = allArticles.filter((article) => article.meta.displaySection === 'slider');
    separated.mostRecentArticles = allArticles.filter((article) => article.meta.displaySection === 'mostRecent');
    separated.allMostRecentGridArticles = allArticles.filter((article) => article.meta.displaySection === 'mostRecentGrid');
    separated.trendingArticles = allArticles.filter((article) => article.meta.displaySection === 'trending');
    separated.gridArticles = allArticles.filter((article) => article.meta.displaySection === 'gridAndAds');
    separated.popularArticles = separated.trendingArticles;

    return separated;
}