import { IComment } from './comment.interface'
import { Schema } from 'mongoose'
export interface IPost {
  _id: any
  createdAt: Date
  tags: []
  content: string
  contentMarkdown: string
  imageUrl?: string
  color: string
  readTime: number
  posts: []
  name: string
  info: string
  claps: number
  comments: IComment[]
  postNumber: number
  category: Schema.Types.ObjectId
  course?: Schema.Types.ObjectId
  published: boolean
  archived: boolean
  difficulty: number
  youTubeVideoUrl: string
  aparatVideoUrl: string
}
