// app/api/articles/route.ts
import { NextRequest, NextResponse } from 'next/server';

import ArticleModel, { IArticle } from '@/models/Article';
import { connectDB } from '@/lib/mongodb';
import { FilterQuery } from "mongoose";

export async function GET(request: NextRequest) {
    try {
      await connectDB();
  
      const { searchParams } = request.nextUrl;
      const category = searchParams.get('category');
      const query = searchParams.get('q'); 
  
      // --- 1. Build the filter object ---
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
      
      // --- 2. Check if pagination is requested ---
      const pageParam = searchParams.get("page");
      const limitParam = searchParams.get("limit");
  
      // **IF PAGINATION PARAMS EXIST (for infinite scroll)**
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
  
      // **IF NO PAGINATION (for your simple SearchPage)**
      const articles = await ArticleModel.find(filter)
          .sort({ createdAt: -1 })
          .lean();
  
      // Return a simple array, which is what SearchPage expects
      return NextResponse.json(articles);
  
    } catch (error: any) {
      console.error("Error fetching articles:", error);
      return NextResponse.json(
          { message: "Failed to fetch articles", error: error.message },
          { status: 500 }
      );
    }
  }

export async function POST(request: Request) {
  try {
      await connectDB();
      const body = await request.json();
    //   console.log(body)
      
      // You can add more robust validation here
      const newArticle = new ArticleModel(body);
      
      await newArticle.save();
      
      return NextResponse.json(newArticle, { status: 201 });
  } catch (error: any) {
      console.error("Error creating article:", error);
      return NextResponse.json(
          { message: "Failed to create article", error: error.message },
          { status: 500 }
      );
  }
}