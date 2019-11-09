import { Tag } from '../../models/tag'
import { deleteItem } from './helpers'

const arrayName = 'posts'

export const addPostToTags = async (postId: any, tagIds: any[]) =>
  Tag.updateMany(
    { _id: { $in: tagIds } },
    {
      $addToSet: {
        [arrayName]: postId
      }
    }
  )

export const deletePostFromTags = async (
  postId: any,
  tagIds: any[] | null = null
) => {
  if (!tagIds) return deleteItem(Tag, arrayName, postId)
  return Tag.updateMany(
    { [arrayName]: postId, _id: { $in: tagIds } },
    {
      $pull: {
        [arrayName]: postId
      }
    }
  )
}
