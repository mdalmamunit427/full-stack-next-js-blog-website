import ArticleModel, { IArticle } from "@/models/Article";
import { connectDB } from "./mongodb";
import { separateArticlesBySection } from "./artilceUtils";

export interface SeparatedArticles {
    editorPicksPrimary?: IArticle;
    editorPicksSecondary: IArticle[];
    trendingArticles: IArticle[];
    sliderArticles: IArticle[];
    gridArticles: IArticle[];
    mostRecentArticles: IArticle[];
    allMostRecentGridArticles: IArticle[];
    popularArticles: IArticle[]
}


interface HomePageData {
    articles: SeparatedArticles;
}

export async function getHomePageData(): Promise<HomePageData> {
    let allFetchedArticles: IArticle[] = [];
    try {
        await connectDB();
        const articles = await ArticleModel.find({}).sort({creaatedAt: -1}).lean();
        allFetchedArticles = JSON.parse(JSON.stringify(articles))
    } catch (error) {
        console.error("Error fetching articles for home page", error)
    }

    const separatedArticles = separateArticlesBySection(allFetchedArticles);

    return {
        articles: separatedArticles
    }

}