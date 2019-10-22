import express from 'express'
import { Comment } from '../models/comment'
import { Post, IPostModel } from '../models/post'
import { randomColor } from '../utils/colorGenerator'
import authonticator from '../middlewares/passportAuthonticator'
import { deleteAction, getPage, changeColor } from './contracts/index'

export const name = 'Comment'
const router = express.Router()

//TODO: for users set recaptcha
router.route('/').post(async (req, res) => {
  const comment = new Comment(req.body)
  comment.color = randomColor()
  comment.createdAt = new Date()
  await comment.save()
  res.success(comment, name + ' created successfuly')
})

router.route('/not-accepted').get(authonticator, async (_req, res) => {
  const items = await Comment.find({ accepted: false })
  res.success(items)
})

router.route('/:id').delete(...deleteAction(Comment))
router.route('/:pageSize/:pageNumber').get(...getPage(Comment))
router.route('/randomizeColor').patch(...changeColor(Comment))

router.route('/accept').patch(authonticator, async (req, res) => {
  if (!req.user) return res.accessDenied()
  const id = req.body.id
  const comment = await Comment.findById(id)
  if (!comment) return res.notFound(name)
  const post = (await Post.findById(comment.postId)) as IPostModel
  if (!post) return res.notFound('post')
  comment.accepted = true
  comment.acceptedAt = new Date()
  comment.acceptedById = req.user._id
  await comment.save()

  let comments = post.comments
  comment.path.forEach((v: number) => {
    comments = comments[v].replys
  })
  comments.push(comment)
  comments = comments.sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
  )
  await post.save()
  res.success(comment, 'comment accepted')
})

export default { router, routePrefix: '/comment' }
