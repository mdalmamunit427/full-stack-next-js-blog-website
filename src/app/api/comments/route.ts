import { connectDB } from "@/lib/mongodb";
import CommentModel from "@/models/Comment";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const body = await request.json();
        const { articleId, author, content, parentId} = body;

        if(!articleId || !content || content.trim() === '') {
            return NextResponse.json({message: "Missing required filed: articleId and comments"}, {status: 400})
        }
        const finalAuthor = author && author.trim() !== '' ? author : "Anonymous";

        await connectDB();
        if(parentId) {
            // this goes to a reply of a comment
            if(!mongoose.Types.ObjectId.isValid(parentId)) {
                return NextResponse.json({message: "Invalid parent Comment Id"}, {status: 400})
            }
            const newReply = {
                author: finalAuthor,
                comment: content
            }
            const updatedComment = await CommentModel.findByIdAndUpdate(parentId, {$push: {replyText: newReply}}, {new: true});
            
            if(!updatedComment) {
                 return NextResponse.json({message: "Parent Comment Not Found"}, {status: 404})
            }

            return NextResponse.json(updatedComment, {status: 200})

        } else {
            // this is a new comment
            const newComment = new CommentModel({
                articleId,
                author: finalAuthor,
                content,
                replyText: []
            })

            await newComment.save();
            return NextResponse.json(newComment, {status: 201})
        }

    } catch (error: any) {
        console.error("Error in Post Comment on '/api/comments': ", error);
        return NextResponse.json({message: "Failed to process commment.", details: error.message}, {status: 500})
    }
}