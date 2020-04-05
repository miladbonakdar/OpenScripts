import { Document, Schema, Model, model } from 'mongoose'
import { ICourse } from './interfaces/course.interface'
import {
  color,
  name,
  createdAt,
  createdById,
  difficulty,
  title
} from './contracts'

export interface ICourseModel extends ICourse, Document { }

export const CourseSchema: Schema = new Schema({
  name,
  title,
  color,
  imageUrl: {
    type: String,
    required: true
  },
  difficulty,
  createdAt,
  createdById,
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  },
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
  },
  posts: [Schema.Types.ObjectId]
})

CourseSchema.index({
  name: 'text',
  title: 'text'
})

export const Course: Model<ICourseModel> = model<ICourseModel>(
  'Course',
  CourseSchema
)
