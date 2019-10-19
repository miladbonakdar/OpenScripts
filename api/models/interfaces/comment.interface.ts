export interface IComment {
  _id: any
  color: string
  name: string
  text: string
  createdAt: Date
  replys: IComment[]
  path: number[]
  acceptedAt: Date
  accepted: boolean
  acceptedById: any
  postId: any
}
