import { Category } from '../../models/category'
import { addItemToParent, deleteItem, deleteItemFromParent } from './helpers'

const arrayName = 'courses'

export const addCourseToCategory = async (courseId: any, categoryID: any) =>
  addItemToParent(Category, arrayName, courseId, categoryID)

export const deleteCourseFromCategories = async (courseId: any) =>
  deleteItem(Category, arrayName, courseId)

export const deleteCourseFromCategory = async (
  courseId: any,
  categoryID: any
) => deleteItemFromParent(Category, arrayName, courseId, categoryID)
