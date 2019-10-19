import { Document, Schema, Model, model } from 'mongoose'
import { INewsLetter } from './interfaces/newsLetter.interface'
import { createdAt, email } from './contracts'

export interface INewsLetterModel extends INewsLetter, Document {}

export const NewsLetterSchema: Schema = new Schema({
  email: {
    ...email,
    unique: true
  },
  createdAt
})

export const NewsLetter: Model<INewsLetterModel> = model<INewsLetterModel>(
  'NewsLetter',
  NewsLetterSchema
)
