import { Document, Schema, Model, model } from 'mongoose'
import { ICategory } from './interfaces/category.interface'
import { color, name, createdAt, createdById } from './contracts'

export interface ICategoryModel extends ICategory, Document {}

export const CategorySchema: Schema = new Schema({
  name,
  color,
  imageUrl: String,
  createdAt,
  createdById
})

export const Category: Model<ICategoryModel> = model<ICategoryModel>(
  'Category',
  CategorySchema
)
