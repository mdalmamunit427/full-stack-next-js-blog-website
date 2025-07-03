// models/Article.ts
import mongoose, { Schema, Document, Model } from 'mongoose';
import { Article, ArticleMeta } from '@/types/article';


export interface IArticle extends Omit<Article, '_id'>, Document {
  _id: string;
  meta: ArticleMeta; 
}

// 2. Define the Mongoose Schema
const ArticleSchema: Schema<IArticle> = new Schema<IArticle>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  excerpt: { type: String },
  caption: { type: String },
  tags: { type: [String] }, 
  meta: {
    author: { type: String, required: true },
    authorHref: { type: String, required: true },
    category: { type: String, required: true },
    categoryHref: { type: String, required: true },
    date: { type: String, required: true },
    readingTime: { type: String, required: true },
    displaySection: { type: String },
    authorAvatarUrl: { type: String }, 
  },
}, {
  timestamps: true,
});

// 3. Create and export the Mongoose Model
const ArticleModel: Model<IArticle> = mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default ArticleModel;