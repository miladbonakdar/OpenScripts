import { Document, Schema, Model, model } from 'mongoose'
import { ICourse } from './interfaces/course.interface'

export interface ICourseModel extends ICourse, Document {}

export const CourseSchema: Schema = new Schema({
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
  imageUrl: String,
  difficulty: {
    type: Number,
    min: 0,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true
  }
})

export const Course: Model<ICourseModel> = model<ICourseModel>(
  'Course',
  CourseSchema
)
