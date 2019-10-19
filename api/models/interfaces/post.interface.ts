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
  summary: string
  claps: number
  comments: IComment[]
  postNumber: number
  categoryId: any
  courseId: any
  published: boolean
  publishedAt: Date
  archived: boolean
  archivedAt: Date
  archivedBy: any
  difficulty: number
  youTubeVideoUrl?: string
  aparatVideoUrl?: string
}
