import express from 'express'
import { Post, IPostModel } from '../models/post'
import { randomColor } from '../utils/colorGenerator'
import authonticator from '../middlewares/passportAuthonticator'
import { deleteAction, get, getPage, changeColor } from './contracts/index'

export const name = 'Post'
const router = express.Router()

router.route('/').post(authonticator, async (req, res) => {
  const post = new Post(req.body)
  post.color = randomColor()
  post.createdAt = new Date()
  await post.save()
  res.success(post, name + ' created successfuly')
})

router.route('/').put(authonticator, async (req, res) => {
  const c = req.body as IPostModel
  if (!c) return res.badRequest('body')
  const post = await Post.findById(c._id)
  if (!post) return res.notFound()
  //   post.name = c.name
  //   post.color = c.color
  await post.save()
  res.success(post, name + ' updated successfuly')
})

router.route('/:id').delete(...deleteAction(Post))
router.route('/:id').get(...get(Post))
router.route('/randomizeColor').patch(...changeColor(Post))
router.route('/:pageSize/:pageNumber').get(...getPage(Post))

export default { router, routePrefix: '/post' }
