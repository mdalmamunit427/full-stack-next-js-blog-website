import FeaturedSliderSection from "@/components/sections/home/FeaturedSliderSection";
import GridArticlesAndAdsSection from "@/components/sections/home/GridArticlesAndAdsSection";
import HomeContentSection from "@/components/sections/home/HomeContentSection";
import MostRecentSection from "@/components/sections/home/MostRecentSection";
import { getHomePageData } from "@/data/data";

export default async function Home() {

  const { articles, adsData } = await getHomePageData();

  const {
    editorPicksPrimary,
    editorPicksSecondary,
    trendingArticles,
    sliderArticles,
    gridArticles,
    mostRecentArticles,        
    allMostRecentGridArticles,
    popularArticles,         
  } = articles;

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Apply font here if not in layout.tsx */}
      {/* Home Content Section */}
      {editorPicksPrimary && editorPicksSecondary.length > 0 && trendingArticles.length > 0 && (
        <HomeContentSection
          editorPicksPrimary={editorPicksPrimary}
          editorPicksSecondary={editorPicksSecondary}
          trendingArticles={trendingArticles}
        />
      )}

      {/* Featured Slider Section */}
      {sliderArticles.length > 0 && (
        // FIX: Correct prop name 'articles'
        <FeaturedSliderSection articles={sliderArticles} />
      )}

      {/* Grid Articles and Ads Section */}
      {gridArticles.length > 0 && (
        // FIX: Correct prop name 'articles' and pass 'adsData'
        <GridArticlesAndAdsSection articles={gridArticles} adsData={adsData} />
      )}

      {mostRecentArticles.length > 0 && allMostRecentGridArticles.length > 0 && popularArticles.length > 0 && (
        <MostRecentSection
          mostRecentArticles={mostRecentArticles}
          allMostRecentGridArticles={allMostRecentGridArticles}
          popularArticles={popularArticles}
        />
      )}
    </div>
  );
}