import { Document, Schema, Model, model } from 'mongoose'
import { ITag } from './interfaces/tag.interface'
import { createdAt, name, color, createdById, title } from './contracts'

export interface ITagModel extends ITag, Document {}

export const TagSchema: Schema = new Schema({
  name,
  title,
  color,
  createdAt,
  createdById,
  posts: [Schema.Types.ObjectId]
})

TagSchema.index({
  name: 'text',
  title: 'text'
})

export const Tag: Model<ITagModel> = model<ITagModel>('Tag', TagSchema)
