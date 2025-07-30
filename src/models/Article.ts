import { Article, ArticleMeta } from "@/types/article";
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IArticle extends Omit<Article, '_id'>, Document {
    _id: string;
    meta: ArticleMeta;
}

const ArticleSchema: Schema<IArticle>  = new Schema<IArticle>({
    title: { type: String, required: true },
    image: { type: String, required: true },
    excerpt: { type: String},
    caption: { type: String},
    meta: {
        author: { type: String, required: true },
        authorHref: { type: String, required: true },
        category: { type: String, required: true },
        categoryHref: { type: String, required: true },
        date: { type: String, required: true },
        readingTime: { type: String, required: true },
        displaySection: String,
        authorAvatarUrl: { type: String, required: false }
    },
    tags: { type: [String] }
}, {
    timestamps: true
})

const ArticleModel: Model<IArticle> = mongoose.models.Article || mongoose.model<IArticle>("Article", ArticleSchema);
export default ArticleModel;