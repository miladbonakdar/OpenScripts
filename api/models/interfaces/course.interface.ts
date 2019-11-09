export interface ICourse {
  _id: any
  name: string
  title: string
  color: string
  imageUrl?: string
  difficulty: number
  createdAt: Date
  createdById: any
  category: any
  views: number
  postViews: number
  posts: any[]
}
