import express, { Request, Response } from 'express'
import { Post, IPostModel } from '../models/post'
import { Course } from '../models/course'
import { randomColor } from '../utils/colorGenerator'
import authonticator from '../middlewares/passportAuthonticator'
import { deleteAction, get, getPage, changeColor } from './contracts/index'
import { cacheRepository } from '../services/cache/cacheRepository'
import {
  getPosts,
  randomPosts,
  popularPosts,
  mostViewes
} from './controllers/post'

export const name = 'Post'
const router = express.Router()

router.route('/').post(authonticator, async (req, res) => {
  const post = new Post(req.body)
  post.color = randomColor()
  post.createdAt = new Date()
  post.createdBy = req.user
  await post.save()
  res.success(post, name + ' created successfuly')
})

router.route('/').put(authonticator, async (req, res) => {
  const c = req.body as IPostModel
  if (!c) return res.badRequest('body')
  const post = await Post.findById(c._id)
  if (!post) return res.notFound(name)
  post.name = c.name
  post.title = c.title
  post.tags = c.tags
  post.content = c.content
  post.contentMarkdown = c.contentMarkdown
  post.aparatVideoUrl = c.aparatVideoUrl
  post.youTubeVideoUrl = c.youTubeVideoUrl
  post.category = c.category
  post.course = c.course
  post.imageUrl = c.imageUrl
  post.readTime = c.readTime
  post.summary = c.summary
  post.postNumber = c.postNumber
  post.difficulty = c.difficulty
  await post.save()
  cacheRepository.deletePost(post._id)
  res.success(post, name + ' updated successfuly')
})

router.route('/:id').delete(...deleteAction(Post), (req, _res, next) => {
  cacheRepository.deletePost(req.params.id)
  next()
})

router.route('/appPosts/mostViewes/:size').get(mostViewes)
router.route('/appPosts/random/:size').get(randomPosts)
router.route('/appPosts/popular/:size').get(popularPosts)
router.route('/appPosts/:pageSize/:pageNumber').get(getPosts)

router.route('/:id').get(...get(Post))
router.route('/randomizeColor').patch(...changeColor(Post))

router
  .route('/course-details/:courseId')
  .get(authonticator, async (req, res) => {
    if (!req.params.courseId) return res.badRequest('courseId')
    const course = await Course.findById(req.params.courseId)
    if (!course) return res.notFound('course')
    const lastpPost = (await Post.find({ 'course._id': req.params.courseId })
      .sort({ postNumber: -1 })
      .limit(1))[0]

    const details = {
      postNumber: 1,
      categoryId: course.categoryId,
      difficulty: course.difficulty
    }

    if (lastpPost) details.postNumber = lastpPost.postNumber + 1

    res.success(details, name + ' created successfuly')
  })

router.route('/:pageSize/:pageNumber').get(...getPage(Post))

router.route('/clap').patch(async (req, res) => {
  if (!req.body.claps) return res.badRequest('claps')
  if (!req.body.postId) return res.badRequest('postId')
  await Post.updateOne(
    { _id: req.body.postId },
    { $inc: { claps: req.body.claps } }
  )
  res.success()
})

router.route('/publish').patch(async (req, res) => {
  await changePublishStatus(req, res, post => {
    post.published = true
    post.publishedAt = new Date()
  })
})

router.route('/unpublish').patch(async (req, res) => {
  await changePublishStatus(req, res, post => {
    post.published = false
  })
})

const changePublishStatus = async (
  req: Request,
  res: Response,
  strategy: (model: IPostModel) => void
) => {
  if (!req.body.postId) return res.badRequest('postId')
  if (!req.user) return res.unauthorized()
  const post = await await Post.findById(req.body.postId)
  if (!post) return res.notFound(name)
  if (post.createdBy._id != req.user._id)
    res.error('you cannot change others post publish status', 401)
  strategy(post)
  await post.save()
  res.success()
}

export default { router, routePrefix: '/post' }
