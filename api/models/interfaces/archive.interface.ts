import { IUser } from './user.interface'
export interface IArchive {
  _id: any
  archivedAt: Date
  archivedBy: IUser
  itemId: string
  item: any
  collectionName: string
}
