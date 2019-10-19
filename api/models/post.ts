import { Document, Schema, Model, model } from 'mongoose'
import { IPost } from './interfaces/post.interface'
import { createdAt, color, name, difficulty } from './contracts'
import { TagSchema } from './tag'
import { CommentSchema } from './comment'

export interface IPostModel extends IPost, Document {}

export const PostSchema: Schema = new Schema({
  createdAt,
  createdBy: {
    type: Object,
    required: true
  },
  tags: [TagSchema],
  content: {
    type: String,
    required: true
  },
  contentMarkdown: {
    type: String,
    required: true
  },
  imageUrl: String,
  color,
  readTime: {
    type: Number,
    default: 5,
    required: true
  },
  name,
  summary: {
    type: String,
    required: true
  },
  claps: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  comments: [CommentSchema],
  postNumber: {
    type: Number,
    required: true,
    default: 1,
    min: 1
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  courseId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  published: {
    type: Boolean,
    default: false,
    required: true
  },
  publishedAt: Date,
  archived: {
    type: Boolean,
    default: false,
    required: true
  },
  archivedAt: Date,
  archivedBy: Object,
  difficulty,
  youTubeVideoUrl: String,
  aparatVideoUrl: String
})

export const Post: Model<IPostModel> = model<IPostModel>('Post', PostSchema)
