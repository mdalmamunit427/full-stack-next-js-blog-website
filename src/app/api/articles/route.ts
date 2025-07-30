import { connectDB } from "@/lib/mongodb";
import ArticleModel, { IArticle } from "@/models/Article";
import { FilterQuery } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
      await connectDB();
  
      const { searchParams } = request.nextUrl;
      const category = searchParams.get('category');
      const query = searchParams.get('q'); 
  
      const filter: FilterQuery<IArticle> = {};
      if (category) {
        filter['meta.category'] = { $regex: `^${category}$`, $options: 'i' };
      }
      if (query) {
        filter.$or = [
          { title: { $regex: query, $options: 'i' } },
          { excerpt: { $regex: query, $options: 'i' } },
          { caption: { $regex: query, $options: 'i' } },
          { 'meta.author': { $regex: query, $options: 'i' } },
        ];
      }
      
      const pageParam = searchParams.get("page");
      const limitParam = searchParams.get("limit");
  
      if (pageParam && limitParam) {
        const page = parseInt(pageParam);
        const limit = parseInt(limitParam);
        const skip = (page - 1) * limit;
  
        const [articles, totalArticles] = await Promise.all([
          ArticleModel.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
          ArticleModel.countDocuments(filter) 
        ]);
    
        return NextResponse.json({ 
            articles, 
            totalPages: Math.ceil(totalArticles / limit) 
        });
      }
  
      const articles = await ArticleModel.find(filter)
          .sort({ createdAt: -1 })
          .lean();
  
      return NextResponse.json(articles);
  
    } catch (error: any) {
      console.error("Error fetching articles:", error);
      return NextResponse.json(
          { message: "Failed to fetch articles", error: error.message },
          { status: 500 }
      );
    }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const newArticle = new ArticleModel(body);

    await newArticle.save();

    return NextResponse.json(newArticle, {status: 201})
    
  } catch (error: any) {
     console.error("Error fetching articles:", error);
      return NextResponse.json(
          { message: "Failed to fetch articles", error: error.message },
          { status: 500 }
      );
  }
}
