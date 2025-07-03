// models/Comment.ts
import mongoose, { Schema, Document, models, Model } from 'mongoose';

// Interface for a single reply
export interface IReply extends Document {
  author: string;
  comment: string;
}

// Interface for the main comment document
export interface IComment extends Document {
  articleId: mongoose.Schema.Types.ObjectId;
  author: string;
  content: string;
  authorImageUrl?: string;
  replyText: IReply[]; // Array to hold nested replies
}

const ReplySchema: Schema<IReply> = new Schema({
    author: { type: String, required: true },
    comment: { type: String, required: true },
}, { timestamps: true }); // Adds createdAt and updatedAt to replies

const CommentSchema: Schema<IComment> = new Schema({
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
  replyText: [ReplySchema] // Embed the reply schema as an array
}, { timestamps: true }); // Adds createdAt and updatedAt to the main comment

const CommentModel: Model<IComment> = models.Comment || mongoose.model<IComment>('Comment', CommentSchema);

export default CommentModel;
