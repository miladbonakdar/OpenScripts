export interface IMessage {
  _id: any
  email: string
  phone: number
  color: string
  name: string
  createdAt: Date
  text: string
  telegramUsername?: string
  readed: boolean
}
