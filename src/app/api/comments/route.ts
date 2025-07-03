// app/api/comments/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import CommentModel from '@/models/Comment';
import mongoose from 'mongoose';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { articleId, author, content, parentId } = body;

        // Modified validation: content is the most critical part. Author can be defaulted.
        if (!articleId || !content || content.trim() === '') {
            return NextResponse.json({ message: 'Missing required fields: articleId and content are required.' }, { status: 400 });
        }

        // Set a default for the author if it's not provided or is empty
        const finalAuthor = author && author.trim() !== '' ? author : 'Anonymous';

        await connectDB();

        // If a parentId is provided, it's a reply.
        if (parentId) {
            if (!mongoose.Types.ObjectId.isValid(parentId)) {
                 return NextResponse.json({ message: 'Invalid parent comment ID.' }, { status: 400 });
            }

            const newReply = {
                author: finalAuthor,
                comment: content,
                // Timestamps are handled by the schema
            };

            // Find the parent comment and push the new reply into its replyText array
            const updatedComment = await CommentModel.findByIdAndUpdate(
                parentId,
                { $push: { replyText: newReply } },
                { new: true } // Return the updated document
            );

            if (!updatedComment) {
                return NextResponse.json({ message: 'Parent comment not found.' }, { status: 404 });
            }

            return NextResponse.json(updatedComment, { status: 200 });

        } else {
            // If no parentId, it's a new top-level comment.
            const newComment = new CommentModel({
                articleId,
                author: finalAuthor,
                content,
                replyText: [], // Initialize with an empty array
            });

            await newComment.save();
            return NextResponse.json(newComment, { status: 201 });
        }

    } catch (error: any) {
        console.error('Error in POST /api/comments:', error);
        return NextResponse.json(
            { message: 'Failed to process comment.', details: error.message },
            { status: 500 }
        );
    }
}
