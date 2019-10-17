export interface IComment {
  id: string
  color: string
  name: string
  text: string
  createdAt: Date
  replys: IComment[]
}
