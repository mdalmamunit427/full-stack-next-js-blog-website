// app/api/articles/route.ts
import { NextRequest, NextResponse } from 'next/server';

import ArticleModel from '@/models/Article';
import { connectDB } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
      await connectDB();
      const { searchParams } = new URL(request.url);
      const category = searchParams.get('category');
      const query = searchParams.get('q'); 

      const filter: any = {};

      // Handle category filtering
      if (category) {
          // Add a case-insensitive filter for the nested category field
          filter['meta.category'] = { $regex: `^${category}$`, $options: 'i' };
      }

      // Handle search query filtering
      if (query) {
          // Create a case-insensitive search across multiple fields
          filter.$or = [
              { title: { $regex: query, $options: 'i' } },
              { excerpt: { $regex: query, $options: 'i' } },
              { caption: { $regex: query, $options: 'i' } },
              { 'meta.author': { $regex: query, $options: 'i' } },
          ];
      }

      const articles = await ArticleModel.find(filter).sort({ createdAt: -1 });
      
      return NextResponse.json(articles, { status: 200 });
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