"use client"

import { postComment } from '@/lib/postComment';
import { Comment } from '@/types/comments';
import { useUser } from '@clerk/nextjs';
import React, { FormEvent, useState } from 'react'
import CommentItem from './CommentItem';
import Pagination from './Pagination';

interface CommentsSectionProps {
    articleId: string;
    initialComments: Comment[]
}

const CommentsSection = ({articleId, initialComments}: CommentsSectionProps) => {
    const {isSignedIn, user, isLoaded} = useUser();
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5;
    const pageCount = Math.ceil(comments.length / commentsPerPage);
    const currentComments = comments.slice((currentPage - 1) * commentsPerPage, currentPage * commentsPerPage)

    // handle reply comment
    const handleReply = async (text: string, parentId: string) => {
        if(!isSignedIn) return alert("Please sign in");
        setIsSubmitting(true);
        setError(null) 
        try {

            const updated = await postComment({
                articleId,
                author: user?.fullName || user?.username || "Anonymous",
                content: text,
                parentId
            })
            setComments(comments.map(c => c._id === updated._id ? updated._id : c));
            setReplyingTo(null)

        } catch (error: any) {
            setError(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    // handle comments
    const handleNewComment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const content = form.comment.value;

        if(!isSignedIn) {
            alert("Please signin to post a comment!");
            return;
        }

        if(!content.trim() ) {
            alert("Please write a comment properly!");
            return;
        }
        setIsSubmitting(true);
        try {
            const newComment = await postComment({
                articleId,
                author: user?.fullName || user?.username || "Anonymous",
                content,
            })
            alert("Comment posted successfull!");
            setComments([newComment, ...comments])
            setCurrentPage(1)
            form.reset()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsSubmitting(false);
        }
    }



  return (
    <div className='mt-12'>
        <h3 className='text-2xl font-bold mb-6'>Comments ({comments.length})</h3>

        {/* comments list */}
        <div>
            {currentComments.map((comment, index) => (
                <CommentItem
                    key={index}
                    comment={comment}
                    isReplying = {replyingTo === comment._id}
                    onReplyClick = {() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                    onReplySubmit = {(text: string) => handleReply(text, comment._id)}
                    isSubmitting={isSubmitting}
                />
            ))}
        </div>

        {/* Pagination */}
        <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={setCurrentPage}
        />


        {/* New comment form */}
        <div className='bg-gray-50 p-8 rounded-lg mt-12'>
            <h3 className='text-2xl font-bold mb-4'>Leave a Reply</h3>
            <p className='text-gray-500 text-sm mb-6'>Your email address will not be published.</p>
            
            <form onSubmit={handleNewComment} className='space-y-6'>
                <div>
                    <label htmlFor="comment" className='block text-sm font-medium text-gray-700 mb-1'>Comment</label>
                    <textarea name="comment" id="comment" className='w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500' rows={6} required></textarea>
                </div>
                {error && <p className='text-red-500 text-sm'>{error}</p>}
                <div>
                    <button 
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 cursor-pointer'>
                        {isSubmitting ? "Submitting..." : "Post Comment"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CommentsSection