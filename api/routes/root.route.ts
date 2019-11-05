import express from 'express'
import websiteMetadata from '../websiteMetadata'
import { Post } from '../models/post'
import { Course } from '../models/course'
import { Category } from '../models/category'

const router = express.Router()

router.route('/').get(async (_req, res) => {
  res.success('42 is your answer :)')
})

router.route('/websiteMetadata').get(async (_req, res) => {
  res.success(websiteMetadata)
})

router.route('/search/:text').get(async (req, res) => {
  if (!req.params.text) return res.badRequest('the text should not be empty')
  const text = req.params.text
  const [posts, courses, categories] = await Promise.all([
    Post.find({ $text: { $search: text } })
      .sort({ createdAt: -1 })
      .limit(5),
    Course.find({ $text: { $search: text } })
      .sort({ createdAt: -1 })
      .limit(5),
    Category.find({ $text: { $search: text } })
      .sort({ createdAt: -1 })
      .limit(5)
  ])
  res.success({
    posts,
    courses,
    categories
  })
})

export default { router, routePrefix: '/' }
