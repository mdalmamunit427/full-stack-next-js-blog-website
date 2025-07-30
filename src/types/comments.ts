import mongoose from "mongoose";
export interface Reply {
    author: string;
    comment: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface Comment {
    _id: string;
    articleId: mongoose.Types.ObjectId | string;
    author: string;
    content: string;
    authorImageUrl?: string;
    parentId?: string;
    replyText: Reply[];
    createdAt?: string | Date;
    updatedAt?: string | Date;
}