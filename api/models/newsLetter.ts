import { Document, Schema, Model, model } from 'mongoose'
import { INewsLetter } from './interfaces/newsLetter.interface'

export interface INewsLetterModel extends INewsLetter, Document {}

export const NewsLetterSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    maxlength: 40,
    unique: true,
    lowercase: true
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true
  }
})

export const NewsLetter: Model<INewsLetterModel> = model<INewsLetterModel>('NewsLetter', NewsLetterSchema)
