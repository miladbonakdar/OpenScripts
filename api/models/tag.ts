import { Document, Schema, Model, model } from 'mongoose'
import { ITag } from './interfaces/tag.interface'

export interface ITagModel extends ITag, Document {}

export const TagSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
    unique: true,
    lowercase: true
  },
  color: {
    type: String,
    required: true,
    maxlength: 10,
    lowercase: true
  }
})

export const Tag: Model<ITagModel> = model<ITagModel>('Tag', TagSchema)
