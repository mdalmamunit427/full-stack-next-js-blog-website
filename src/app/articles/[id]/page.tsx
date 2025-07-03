import { ArticleMeta } from "@/types/article";
import Link from "next/link";
import { FaFacebook, FaHeart, FaShare, FaStar, FaTwitter } from "react-icons/fa";
import CommentsSection from "./CommentsSection";

interface Reply {
    author: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

interface Comment {
    _id: string;
    author: string;
    content: string;
    createdAt: string;
    authorImageUrl?: string;
    parentId?: string;
    replyText: Reply[];
}

// Define the structure of an Article object
interface Article {
  _id: string;
  title: string;
  caption: string;
  author: string;
  createdAt: string;
  image?: string; 
  excerpt: string;
  authorImageUrl?: string;
  meta: ArticleMeta;
    comments: Comment[];
}

async function getArticle(id: string): Promise<Article | null> {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/articles/${id}`;
      const res = await fetch(apiUrl, { next: { revalidate: 10 } }); // Revalidate to get new comments
      if (!res.ok) {
        return null;
      }
      const articleData = await res.json();
      return {
          ...articleData,
          imageUrl: articleData.imageUrl || 'https://placehold.co/1240x700/e2e8f0/4a5568?text=Featured+Image',
          authorImageUrl:  'https://placehold.co/120x120/e2e8f0/4a5568?text=Author',
          comments: articleData.comments || [],
      };
    } catch (error) {
      console.error("Error fetching article:", error);
      return null;
    }
  }



// The page is now an async Server Component
export default async function ArticlePage({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params;
  const article = await getArticle(id);
//   console.log(article)

  if (!article) {
    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">404</h1>
                <p className="text-xl text-gray-600">Article Not Found</p>
            </div>
        </div>
    );
  }

  // Render the article details
  return (
    <main className="bg-white text-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            {/* Article Header */}
            <div className="pt-12 pb-8">
                <div className="mb-5 text-left">
                    <h1 className="text-4xl font-lora font-bold mb-6">{article.title}</h1>
                    <div className="flex justify-start items-center space-x-2 text-gray-500">
                        <img alt="author avatar" src={article?.authorImageUrl || 'https://placehold.co/120x120/e2e8f0/4a5568?text=Author'} className="w-12 h-12 rounded-full " />
                        <a href="#" className="hover:underline">{article.meta.author || 'Dave Gershgorn'}</a>
                        <span>in</span>
                        <a href="#" className="hover:underline">{article.meta.category}</a>
                    </div>
                    <div className="text-gray-500 text-sm mt-2">
                        <span>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                        <span className="mx-2">&middot;</span>
                        <span title="5 min read">5 min read</span>
                        <a href="#">
                          <FaStar className="inline-block ml-2 text-yellow-500" />
                          <span className="ml-1">5.0</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            <figure className="mb-8 zoom aspect-video">
                <img alt={article.title} src={article.image} className="w-full h-auto rounded-lg" />
            </figure>

            {/* Article Body */}
            <article className="relative">
                <div className="flex md:space-x-4">
                    {/* Sticky Social Bar */}
                    <div className="hidden md:block w-20 flex-shrink-0 ">
                        <div className="sticky top-32 flex flex-col items-center md:items-start space-y-4 text-gray-500">
                            <Link href="#" className="hover:text-blue-600 border p-2 rounded-full hover:bg-gray-100  transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"><FaFacebook /></Link>
                            <Link href="#" className="hover:text-sky-500 border p-2 rounded-full hover:bg-gray-100  transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"><FaTwitter /></Link>
                            <Link href="#" className="hover:text-red-500 border p-2 rounded-full hover:bg-gray-100  transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"><FaHeart /></Link>
                            <Link href="#" className="hover:text-gray-800 border p-2 rounded-full hover:bg-gray-100  transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"><FaShare /></Link>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-grow space-y-4 prose lg:prose-xl max-w-none [&>p:first-of-type]:first-letter:text-7xl [&>p:first-of-type]:first-letter:font-bold [&>p:first-of-type]:first-letter:mr-4 [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:leading-none">

                       {article?.excerpt  && <p dangerouslySetInnerHTML={{ __html: article?.excerpt }} />} 

                        {/* Static Content Example */}
                        <p>Gosh jaguar ostrich quail one excited dear hello and <a href="#">bound</a><sup><a href="#">[1]</a></sup>and the and bland moral misheard roadrunner flapped lynx far that and jeepers giggled far and far bald that roadrunner python inside held shrewdly the manatee.</p>
                        <p>Thanks sniffed in hello after in foolhardy and some far purposefully much one at the much conjointly leapt skimpily that quail sheep some goodness <a href="#">nightingale</a> the instead exited expedient up far ouch mellifluous altruistic and and lighted more instead much when ferret but the.</p>
                        <hr className="my-8 text-gray-200" />
                        <p>Yet more some certainly yet alas abandonedly whispered <a href="#">intriguingly</a><sup><a href="#">[2]</a></sup>well extensive one howled talkative admonishingly below a rethought overlaid dear gosh activated less <a href="#">however</a> hawk yet oh scratched ostrich some outside crud irrespective lightheartedly and much far amenably that the elephant since when.</p>
                        <h2>The Guitar Legends</h2>
                        <p>Furrowed this in the upset <a href="#">some across</a><sup><a href="#">[3]</a></sup>tiger oh loaded house gosh whispered <a href="#">faltering alas</a><sup><a href="#">[4]</a></sup>ouch cuckoo coward in scratched undid together bit fumblingly so besides salamander heron during the jeepers hello fitting jauntily much smoothly globefish darn blessedly far so along bluebird leopard and.</p>
                        <blockquote><p>Integer eu faucibus <a href="#">dolor</a><sup><a href="#">[5]</a></sup>. Ut venenatis tincidunt diam elementum imperdiet. Etiam accumsan semper nisl eu congue. Sed aliquam magna erat, ac eleifend lacus rhoncus in.</p></blockquote>
                        
                        {/* Newsletter Signup */}
                        <div className="border px-8 py-12  bg-[#e8f3ec] rounded-lg my-10">
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                <div className="md:w-2/5 mb-4 md:mb-0 mr-5">
                                    <h5 className="font-bold text-lg mb-2">Become a member</h5>
                                    <p className="text-sm text-gray-600">Get the latest news right in your inbox. <br /> We never spam!</p>
                                </div>
                                <div className="w-full md:w-3/5">
                                    <div className="flex flex-col space-y-2">
                                        <input placeholder="Enter your e-mail address" className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" type="text" />
                                        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md">Subscribe</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <div className="mt-12 py-4 border-t border-b border-gray-100">
                    <div className="flex flex-wrap gap-2">
                        <a href="#" className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1 px-3 rounded-full">fashion</a>
                        <a href="#" className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1 px-3 rounded-full">lifestyle</a>
                        <a href="#" className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1 px-3 rounded-full">news</a>
                        <a href="#" className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1 px-3 rounded-full">style</a>
                    </div>
                </div>

                {/* Author Box */}
                <div className="my-12 p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-6">
                        <img alt="author avatar" src={article.authorImageUrl} className="w-24 h-24 rounded-full" />
                        <div className="flex-grow">
                            <h5 className="text-xl font-bold"><a href="#" className="hover:underline">{article?.meta.author || 'Dave Gershgorn'}</a></h5>
                            <p className="text-gray-600 mt-2 hidden md:block">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet ut ligula et semper. Aenean consectetur, est id gravida venenatis.</p>
                            <div className="mt-3 flex flex-wrap space-x-4">
                                <a href="#" className="text-blue-600 hover:underline">Facebook</a>
                                <a href="#" className="text-sky-500 hover:underline">Twitter</a>
                                <a href="#" className="text-pink-600 hover:underline">Instagram</a>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

               {/* Comments Section */}
               <CommentsSection articleId={article._id} initialComments={article.comments} />
        </div>
    </main>
  );
}
