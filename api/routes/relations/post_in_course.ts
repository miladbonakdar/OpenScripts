import { Course } from '../../models/course'
import { addItemToParent, deleteItem, deleteItemFromParent } from './helpers'

const arrayName = 'posts'

export const addPostToCourse = async (postId: any, courseId: any) =>
  addItemToParent(Course, arrayName, postId, courseId)

export const deletePostFromCourses = async (postId: any) =>
  deleteItem(Course, arrayName, postId)

export const deletePostFromCourse = async (postId: any, courseId: any) =>
  deleteItemFromParent(Course, arrayName, postId, courseId)
