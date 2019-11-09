import { Category } from '../../models/category'
import { addItemToParent, deleteItem, deleteItemFromParent } from './helpers'

const arrayName = 'posts'

export const addPostToCategory = async (postId: any, categoryId: any) =>
  addItemToParent(Category, arrayName, postId, categoryId)

export const deletePostFromCategories = async (postId: any) =>
  deleteItem(Category, arrayName, postId)

export const deletePostFromCategory = async (postId: any, categoryId: any) =>
  deleteItemFromParent(Category, arrayName, postId, categoryId)
