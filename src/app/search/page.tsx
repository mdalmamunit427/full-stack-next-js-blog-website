import { IArticle } from "@/models/Article";
import Link from "next/link";


  
  // Data fetching function that runs on the server
  async function searchArticles(query: string): Promise<IArticle[]> {
    try {
      // Construct the API URL with the search query
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/articles?q=${encodeURIComponent(query)}`;
      const res = await fetch(apiUrl, { cache: 'no-store' });
  
      if (!res.ok) {
        throw new Error('Failed to fetch search results');
      }
      return res.json();
    } catch (error) {
      console.error("Error searching articles:", error);
      return []; // Return an empty array on error
    }
  }
  
  // The page is an async Server Component
  export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string }> }) {
    // Get the search query 'q' from the URL search parameters
    const params = await searchParams;
    const query = typeof params?.q === 'string' ? params.q : '';
    
    const articles = await searchArticles(query);
  
    return (
      <div className=" min-h-screen">
        <div className="container max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-lg font-semibold text-primary">Search Results</p>
            <h1 className="text-4xl font-bold text-gray-800">
              Results for: "{query}"
            </h1>
          </div>
  
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <div key={article._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                  <Link href={`/articles/${article._id}`} className="block">
                      <img src={article.image} alt={article.title} className="w-full h-56 object-cover" />
                  </Link>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 h-14 overflow-hidden">
                      <Link href={`/articles/${article._id}`} className="hover:text-blue-600 transition-colors">
                        {article.title}
                      </Link>
                    </h2>
                    <div className="text-sm text-gray-500">
                      <span>By {article.meta.author}</span>
                      <span className="mx-2">&bull;</span>
                      <span>{article.meta.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-700">No articles found</h2>
              <p className="text-gray-500 mt-2">Your search for "{query}" did not match any articles.</p>
              <Link href="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
  