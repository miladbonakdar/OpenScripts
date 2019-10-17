import { Document, Schema, Model, model } from 'mongoose'
import { ICategory } from './interfaces/category.interface'

export interface ICategoryModel extends ICategory, Document {}

export const CategorySchema: Schema = new Schema({
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
  },
  imageUrl: String
})

export const Category: Model<ICategoryModel> = model<ICategoryModel>(
  'Category',
  CategorySchema
)
