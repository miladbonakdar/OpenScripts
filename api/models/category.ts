import { Document, Schema, Model, model } from 'mongoose'
import { ICategory } from './interfaces/category.interface'
import { color, name, createdAt, createdById, title } from './contracts'

export interface ICategoryModel extends ICategory, Document {}

export const CategorySchema: Schema = new Schema({
  name,
  title,
  color,
  imageUrl: String,
  createdAt,
  createdById,
  postViews: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  views: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  }
})

CategorySchema.index({
  name: 'text',
  title: 'text'
})

export const Category: Model<ICategoryModel> = model<ICategoryModel>(
  'Category',
  CategorySchema
)
