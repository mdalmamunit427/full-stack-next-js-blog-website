import MostRecentSection from "@/components/sections/home/MostRecentSection";
import { IArticle } from "@/models/Article";
import Link from "next/link";


  
  // Data fetching function that runs on the server
  async function getArticlesByCategory(categoryName: string): Promise<IArticle[]> {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/articles?category=${categoryName}`;
      // We add { cache: 'no-store' } to ensure the data is fresh on every request.
      const res = await fetch(apiUrl, { cache: 'no-store' });
  
      if (!res.ok) {
        throw new Error('Failed to fetch articles');
      }
      return res.json();
    } catch (error) {
      console.error("Error fetching articles by category:", error);
      return []; // Return an empty array on error
    }
  }
  
  // The page is an async Server Component
  export default async function CategoryPage({ params }: { params: Promise<{ categoryName: string }> }) {
    const { categoryName } = await params;
    // Decode the category name from the URL (e.g., "web%20development" becomes "web development")
    const decodedCategoryName = decodeURIComponent(categoryName);
    
    const articles = await getArticlesByCategory(decodedCategoryName);
  
    return (
      <div className=" min-h-screen">
        <div className="container  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-lg font-semibold text-blue-600">Category</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 capitalize">
              {decodedCategoryName}
            </h1>
          </div>
  
          {articles.length > 0 ? (
            <div className="">
              <MostRecentSection
                mostRecentArticles={articles[0] ? [articles[0]] : []} 
                allMostRecentGridArticles={articles.slice(1)} 
                popularArticles={articles.slice(1, 4)} 
            />
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-700">No articles found</h2>
              <p className="text-gray-500 mt-2">There are no articles in the "{decodedCategoryName}" category yet.</p>
              <Link href="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
  