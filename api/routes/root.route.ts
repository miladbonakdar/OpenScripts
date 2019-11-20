import express from 'express'
import websiteMetadata from '../websiteMetadata'
import { Post } from '../models/post'
import { Course } from '../models/course'
import { Category } from '../models/category'
import { Tag } from '../models/tag'

const router = express.Router()

router.route('/').get(async (_req, res) => {
  res.success('42 is your answer :)')
})

router.route('/websiteMetadata').get(async (_req, res) => {
  res.success(websiteMetadata)
})

router.route('/search/:text/:size').get(async (req, res) => {
  if (!req.params.text) return res.badRequest('the text should not be empty')
  const text = req.params.text
  const size = Math.max(Math.min(Number(req.params.size), 10), 2)
  const [posts, courses, categories, tags] = await Promise.all([
    Post.find({ $text: { $search: text }, published: true })
      .sort({ createdAt: -1 })
      .limit(size),
    Course.find({ $text: { $search: text } })
      .sort({ createdAt: -1 })
      .limit(size),
    Category.find({ $text: { $search: text } })
      .sort({ createdAt: -1 })
      .limit(size),
    Tag.find({ $text: { $search: text } })
      .sort({ createdAt: -1 })
      .limit(size)
  ])
  res.success({
    posts,
    courses,
    categories,
    tags
  })
})

export default { router, routePrefix: '/' }
