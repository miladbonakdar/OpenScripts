import {
  addPostToCategory,
  deletePostFromCategories,
  deletePostFromCategory
} from './post_in_category'

import {
  addPostToCourse,
  deletePostFromCourse,
  deletePostFromCourses
} from './post_in_course'

import { addPostToTags, deletePostFromTags } from './post_in_tag'

export const addNewPost = async (
  postId: any,
  categoryId: any,
  courseId: any,
  tagIds: any[]
) =>
  Promise.all([
    addPostToCategory(postId, categoryId),
    addPostToCourse(postId, courseId),
    addPostToTags(postId, tagIds)
  ])

export const deletePostRelations = async (postId: any) =>
  Promise.all([
    deletePostFromCategories(postId),
    deletePostFromCourses(postId),
    deletePostFromTags(postId)
  ])

export const deletePostFromRelations = async (
  postId: any,
  categoryId: any,
  courseId: any,
  tagIds: any[]
) =>
  Promise.all([
    deletePostFromCategory(postId, categoryId),
    deletePostFromCourse(postId, courseId),
    deletePostFromTags(postId, tagIds)
  ])
