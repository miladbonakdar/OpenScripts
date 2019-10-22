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

export interface ICourseModel extends ICourse, Document {}

export const CourseSchema: Schema = new Schema({
  name,
  title,
  color,
  imageUrl: String,
  difficulty,
  createdAt,
  createdById,
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

export const Course: Model<ICourseModel> = model<ICourseModel>(
  'Course',
  CourseSchema
)
