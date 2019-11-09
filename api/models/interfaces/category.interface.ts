export interface ICategory {
  _id: any
  name: string
  title: string
  color: string
  imageUrl?: string
  createdAt: Date
  createdById: any
  views: number
  postViews: number
  posts: any[]
  courses: any[]
}
