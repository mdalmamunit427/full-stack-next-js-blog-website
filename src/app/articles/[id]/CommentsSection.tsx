'use client';
import { useUser } from '@clerk/nextjs';
import { useState, FormEvent } from 'react';

// --- Types ---
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

// --- Component ---
export default function CommentsSection({ articleId, initialComments }: { articleId: string, initialComments: Comment[] }) {
    const { isSignedIn, user, isLoaded } = useUser()

    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [author, setAuthor] = useState('');
    const [email, setEmail] = useState('');
    const [commentText, setCommentText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Reply State
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState('');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5;

    // This function now handles both new comments and replies
    const postComment = async (payload: {articleId: string, author: string, content: string, parentId?: string}) => {
        if (!isSignedIn) {
            alert ('You must be signed in to comment.');
            return;
        }

        const res = await fetch('/api/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to post comment. Please try again.');
        return res.json();
    };

    const handleReplySubmit = async (e: FormEvent, parentId: string) => {
        e.preventDefault();
       
        if (!replyText.trim()) {
            setError('Reply cannot be empty.');
            return;
        }
        if (!isSignedIn) {
            alert ('You must be signed in to reply.');
            return;
        }

        setIsSubmitting(true);
        setError(null);
        try {
            const updatedParentComment = await postComment({
                articleId,
                author: user?.fullName || 'Anonymous',
                content: replyText,
                parentId,
            });
            // Replace the old comment with the updated one containing the new reply
            setComments(comments.map(c => c._id === updatedParentComment._id ? updatedParentComment : c));
            setReplyText('');
            setReplyingTo(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNewCommentSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isSignedIn) {
            alert ('You must be signed in to comment.');
            return;
        }
        // if (!commentText.trim() || !author.trim() || !email.trim()) {
        //     setError('Please fill in all required fields.');
        //     return;
        // }
        setIsSubmitting(true);
        setError(null);
        try {
            const newComment = await postComment({ articleId, author: user?.fullName || "Anonymous", content: commentText });
            setComments([newComment, ...comments]);
            setCommentText('');
            // Keep author/email for subsequent replies/comments
            setCurrentPage(1);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
    const pageCount = Math.ceil(comments.length / commentsPerPage);
    const paginate = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= pageCount) setCurrentPage(pageNumber);
    };

    if (!isLoaded) {
        return <div>Loading...</div>
      }
    

    return (
        <div className="mt-12">
            <div className="mb-10">
                <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
                <div className="space-y-8">
                    {currentComments.map((comment) => (
                        <div key={comment?._id}>
                            <div className="flex items-start space-x-4">
                                <img src={comment?.authorImageUrl || 'https://placehold.co/50x50/e2e8f0/4a5568?text=U'} alt="" className="w-12 h-12 rounded-full flex-shrink-0"/>
                                <div className="flex-grow">
                                    <p className="text-gray-700">{comment?.content}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <div className="flex items-center space-x-3">
                                            <h6 className="font-semibold text-gray-800">{comment?.author}</h6>
                                            <p className="text-xs text-gray-500">{new Date(comment?.createdAt).toLocaleString()}</p>
                                        </div>
                                        <button onClick={() => setReplyingTo(replyingTo === comment?._id ? null : comment._id)} className="text-sm font-semibold text-blue-600 hover:underline">
                                            {replyingTo === comment?._id ? 'Cancel' : 'Reply'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Render Nested Replies */}
                            {comment?.replyText && comment?.replyText.length > 0 && (
                                <div className="ml-12 mt-6 space-y-6 border-l-2 border-gray-200 pl-6">
                                    {comment?.replyText.map((reply, index) => (
                                        <div key={index} className="flex items-start space-x-4">
                                            <img src={'https://placehold.co/40x40/e2e8f0/4a5568?text=U'} alt={reply?.author} className="w-10 h-10 rounded-full flex-shrink-0"/>
                                            <div className="flex-grow">
                                                <p className="text-gray-700">{reply?.comment}</p>
                                                <div className="flex items-center space-x-3 mt-2">
                                                    <h6 className="font-semibold text-gray-800">{reply?.author}</h6>
                                                    <p className="text-xs text-gray-500">{new Date(reply?.createdAt).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Reply Form */}
                            {replyingTo === comment?._id && (
                                <form onSubmit={(e) => handleReplySubmit(e, comment._id)} className="ml-12 mt-6 pl-6 border-l-2 border-gray-200 space-y-4">
                                    <textarea
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        rows={3}
                                        placeholder={`Replying to ${comment.author}...`}
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        required
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button type="button" onClick={() => setReplyingTo(null)} className="px-4 py-2 text-sm bg-gray-200 font-semibold rounded-lg hover:bg-gray-300">Cancel</button>
                                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700" disabled={isSubmitting}>
                                            {isSubmitting ? 'Posting...' : 'Post Reply'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* Main Comment Form */}
            <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Leave a Reply</h3>
                <p className="text-gray-500 text-sm mb-6">Your email address will not be published. Required fields are marked *</p>
                <form onSubmit={handleNewCommentSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                        <textarea
                            id="comment"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            rows={6}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                            <input
                                id="author"
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={user?.fullName || author}
                                onChange={(e) => setAuthor(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                            <input
                                id="email"
                                type="email"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={user?.primaryEmailAddress?.emailAddress || email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                     {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 cursor-pointer disabled:bg-gray-400 transition-colors"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Post Comment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}