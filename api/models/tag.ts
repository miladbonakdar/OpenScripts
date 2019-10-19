import { Document, Schema, Model, model } from 'mongoose'
import { ITag } from './interfaces/tag.interface'
import { createdAt, name, color, createdById } from './contracts'

export interface ITagModel extends ITag, Document {}

export const TagSchema: Schema = new Schema({
  name,
  color,
  createdAt,
  createdById
})

export const Tag: Model<ITagModel> = model<ITagModel>('Tag', TagSchema)
