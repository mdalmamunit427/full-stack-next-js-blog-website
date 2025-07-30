import FeaturedSliderSection from "@/components/sections/home/FeaturedSliderSection";
import GridAndAds from "@/components/sections/home/GridAndAds";
import HomeContentSection from "@/components/sections/home/HomeContentSection";
import MostRecentSection from "@/components/sections/home/MostRecentSection";
import { getHomePageData } from "@/lib/data";



export default async  function Home() {
    const {articles} = await getHomePageData();

    const {editorPicksPrimary, editorPicksSecondary, trendingArticles, sliderArticles, gridArticles, mostRecentArticles, allMostRecentGridArticles, popularArticles} = articles

  return (
    <div className="blog-container">
      {
        editorPicksPrimary && editorPicksSecondary.length> 0 && trendingArticles.length > 0 && (
          <HomeContentSection
          editorPicksPrimary={editorPicksPrimary}
          editorPicksSecondary={editorPicksSecondary}
          trendingArticles={trendingArticles}
          />
        )
      }

      {
        sliderArticles.length > 0 && <FeaturedSliderSection articles={sliderArticles}/>
      }

      {
        gridArticles.length > 0 && <GridAndAds articles={gridArticles}/>
      } 

      {
        mostRecentArticles.length > 0 && allMostRecentGridArticles.length > 0 && popularArticles.length > 0 && (
          <MostRecentSection mostRecentArticles={mostRecentArticles} allMostRecentGridArticles={allMostRecentGridArticles} popularArticles={popularArticles}/>
        )
      }


    </div>
  );
}
