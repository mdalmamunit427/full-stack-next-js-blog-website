// app/api/articles/[id]/route.ts
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongodb';
import ArticleModel from '@/models/Article';
import CommentModel from '@/models/Comment';
import { Types } from "mongoose";

interface ArticleRouteParams {
  id: string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{id: string}> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid article ID format.' }, { status: 400 });
    }

    await connectDB();

    // Find the article and its associated comments in parallel
    const [article, comments] = await Promise.all([
        ArticleModel.findById(id).lean(), // Use .lean() for faster, plain JS objects
        CommentModel.find({ articleId: id }).sort({ createdAt: -1 }).lean()
    ]);


    if (!article) {
      return NextResponse.json({ message: 'Article not found.' }, { status: 404 });
    }

    // Combine the article and its comments into a single response object
    const responseData = {
        ...article,
        comments: comments || [],
    };

    return NextResponse.json(responseData, { status: 200 });

  } catch (error: any) {
    console.error(`Error fetching article and comments`, error);
    return NextResponse.json(
      {
        message: 'Failed to fetch article and comments.',
        details: error.message,
      },
      { status: 500 }
    );
  }
}


export async function DELETE(req: Request, { params }: { params: Promise<{id: string}> }) {
  try {
    await connectDB();

    const { id } = await params;

    // Validate ObjectId
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid article ID" }, { status: 400 });
    }

    const deleted = await ArticleModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Article deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{id: string}> }
) {
  try {
    await connectDB();

   
    const { id } = await params;


    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid article ID" }, { status: 400 });
    }

    const body = await req.json();


    const updatedPost = await ArticleModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    

    if (!updatedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Update post error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}