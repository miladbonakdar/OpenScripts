import { IComment } from './comment.interface'
export interface IPost {
  _id: any
  createdAt: Date
  createdBy: any
  tags: []
  content: string
  contentMarkdown: string
  imageUrl?: string
  color: string
  readTime: number
  name: string
  title: string
  summary: string
  claps: number
  comments: IComment[]
  postNumber: number
  category: any
  course: any
  published: boolean
  publishedAt: Date
  difficulty: number
  youTubeVideoUrl?: string
  aparatVideoUrl?: string
  views: number
}
