import { Comment, Reply } from "@/types/comments";
import mongoose, { Document, Model, models, Schema } from "mongoose";


interface IReply extends Reply, Document {}
interface IComment extends Omit<Comment, '_id' | 'replyText'>, Document {
    replyText: IReply[]
}

const ReplySchema = new Schema<IReply>({
    author: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

const CommentSchema = new Schema<IComment>({
    articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    authorImageUrl: {
         type: String,
         default: 'https://placehold.co/50x50/e2e8f0/4a5568?text=User'
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
       default: null,
    },
    replyText: [ReplySchema]
}, {timestamps: true});

const CommentModel: Model<IComment> = models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default CommentModel;