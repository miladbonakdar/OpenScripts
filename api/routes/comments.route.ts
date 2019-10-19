import express from 'express'
import { Comment } from '../models/comment'
import { Post, IPostModel } from '../models/post'
import { IChangeCommentStatus } from '../models/other/ChangeCommentStatus'
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

router.route('/:id').delete(...deleteAction(Comment))
router.route('/:pageSize/:pageNumber').get(...getPage(Comment))
router.route('/randomizeColor').patch(...changeColor(Comment))

router.route('/accept').patch(authonticator, async (req, res) => {
  if (!req.user) return res.accessDenied()
  const command = req.body as IChangeCommentStatus
  const comment = await Comment.findById(command._id)
  if (!comment) return res.notFound()
  comment.accepted = command.status
  comment.acceptedAt = new Date()
  comment.acceptedById = req.user._id
  await comment.save()

  const post = (await Post.findById(comment.postId)) as IPostModel
  let comments = post.comments
  comment.path.forEach((v: number) => {
    comments = comments[v].replys
  })
  comments.push(comment)
  comments.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
  await post.save()
  res.success(comment, 'comment accepted')
})

export default { router, routePrefix: '/comment' }
