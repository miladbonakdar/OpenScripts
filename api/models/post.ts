import { Document, Schema, Model, model } from 'mongoose'
import { IPost } from './interfaces/post.interface'
import { createdAt, color, name, difficulty, title } from './contracts'

export interface IPostModel extends IPost, Document {}

export const PostSchema: Schema = new Schema({
  createdAt,
  createdBy: {
    type: Object,
    required: true
  },
  tags: [Object],
  content: {
    type: String,
    required: true,
    select: false
  },
  contentMarkdown: {
    type: String,
    required: true,
    select: false
  },
  imageUrl: String,
  color,
  readTime: {
    type: Number,
    default: 5,
    required: true
  },
  name,
  title,
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
  comments: [Object],
  postNumber: {
    type: Number,
    required: true,
    default: 1,
    min: 1
  },
  category: {
    type: Object,
    required: true
  },
  course: {
    type: Object,
    required: true
  },
  published: {
    type: Boolean,
    default: false,
    required: true
  },
  publishedAt: Date,
  difficulty,
  video: {
    youTubeVideoUrl: String,
    aparatVideoUrl: String,
    length: Number,
    size: Number
  },
  views: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  }
})

PostSchema.index({
  'course.title': 'text',
  'category.title': 'text',
  'course.name': 'text',
  'category.name': 'text',
  content: 'text',
  name: 'text',
  title: 'text',
  summary: 'text'
})

export const Post: Model<IPostModel> = model<IPostModel>('Post', PostSchema)
