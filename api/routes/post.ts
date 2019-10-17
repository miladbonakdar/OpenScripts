import express from 'express'
import { Post } from '../models/post'
import { IPost } from '../models/interfaces/post.interface'
import { randomColor } from '../utils/colorGenerator'
import Pagination from '../utils/Pagination'

export const name = 'Post'
const router = express.Router()

router.route('/').post(async (req, res) => {
  const post = new Post(req.body)
  post.color = randomColor()
  post.createdAt = new Date()
  await post.save()
  res.success(post, name + ' created successfuly')
})

router.route('/').put(async (req, res) => {
  const c = req.body as IPost
  if (!c) return res.badRequest('body')
  const post = await Post.findById(c._id)
  if (!post) return res.notFound()
//   post.name = c.name
//   post.color = c.color
  await post.save()
  res.success(post, name + ' updated successfuly')
})

router.route('/:id').delete(async (req, res) => {
  let post = await Post.findByIdAndDelete(req.params.id)
  if (!post) return res.notFound()
  res.success(post)
})

router.route('/').get(async (_req, res) => {
  const post = await Post.find({})
  res.success(post)
})

router.route('/:id').get(async (req, res) => {
  if (!req.params.id) return res.badRequest('id')
  const post = await Post.findById(req.params.id)
  if (!post) return res.notFound()
  res.success(post)
})

router.route('/:pageSize/:pageNumber').get(async (req, res) => {
  const page = new Pagination(
    Post,
    req.params.pageNumber,
    req.params.pageSize
  )
  const pageResult = await page.get()
  res.success(pageResult)
})

export default { router, routePrefix: '/post' }
