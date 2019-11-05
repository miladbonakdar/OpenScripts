import chalk from 'chalk'
import cache from './index'
import types from './types'
import { Tag } from '../../models/tag'
import { Course } from '../../models/course'
import { Category } from '../../models/category'
import { User } from '../../models/user'
import { Post } from '../../models/post'

export const cacheRepository = {
  async init() {
    Promise.all([
      this.updateUsers(),
      this.updateTags(),
      this.updateCourses(),
      this.updateCategories()
    ])
    console.log(chalk.bgGreen(`init completed at ${new Date()}`))
  },

  get(key: string) {
    console.log(chalk.green(`key ${key} has been retrived at ${new Date()}`))
    return cache.get(key)
  },
  getUsers() {
    return this.get(types.users)
  },
  getTags() {
    return this.get(types.tags)
  },
  getCourses() {
    return this.get(types.courses)
  },
  getCategories() {
    return this.get(types.categories)
  },
  async getPostAndUpdateCache(postId: any) {
    const result = await this.insertIfNotExist(
      postId.toString(),
      async () => await Post.findById(postId),
      500
    )
    return result ? result : null
  },
  async update(key: string, aggregate: () => Promise<any>) {
    console.log(chalk.yellow(`key ${key} has been updated at ${new Date()}`))
    const items = await aggregate()
    cache.del(key)
    return cache.set(key, items)
  },
  async updateUsers() {
    return this.update(
      types.users,
      async () => await User.find({}).select('-password')
    )
  },
  async updateTags() {
    return this.update(types.tags, async () => await Tag.find({}))
  },
  async updateCourses() {
    return this.update(
      types.courses,
      async () => await Course.find({}).populate('category')
    )
  },
  async updateCategories() {
    return this.update(types.categories, async () => await Category.find({}))
  },
  async deletePost(postId: any) {
    return cache.del(postId.toString())
  },
  async insertIfNotExist(
    key: string,
    asyncGetter: () => Promise<any>,
    ttl: number = -1
  ) {
    if (cache.has(key)) return cache.get(key)
    const item = await asyncGetter()
    if (!item) return false
    const cached = cache.set(key, item, ttl)
    return cached ? item : false
  }
}

export default cacheRepository
