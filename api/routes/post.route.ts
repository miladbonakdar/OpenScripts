import express, { Request, Response } from 'express'
import { Post, IPostModel } from '../models/post'
import { Course } from '../models/course'
import { randomColor } from '../utils/colorGenerator'
import authonticator from '../middlewares/passportAuthonticator'
import { deleteAction, getPage, changeColor } from './contracts/index'
import { cacheRepository } from '../services/cache/cacheRepository'
import {
  getPosts,
  randomPosts,
  popularPosts,
  mostViewes,
  pagePosts
} from './controllers/post'

import {
  addNewPost,
  deletePostRelations,
  deletePostFromRelations
} from './relations/postRealtions'

export const name = 'Post'
const router = express.Router()

router.route('/').post(authonticator, async (req, res) => {
  const post = new Post(req.body)
  post.color = randomColor()
  post.createdAt = new Date()
  post.createdBy = req.user
  await post.save()
  await addNewPost(
    post._id,
    post.category,
    post.course,
    post.tags.map((t) => t._id)
  )
  res.success(post, name + ' created successfuly')
})

router.route('/').put(authonticator, async (req, res) => {
  const c = req.body as IPostModel
  if (!c) return res.badRequest('body')
  const post = await Post.findById(c._id)
  if (!post) return res.notFound(name)
  await deletePostFromRelations(
    post._id,
    post.category,
    post.course,
    post.tags.map((t) => t._id)
  )
  post.name = c.name
  post.title = c.title
  post.tags = c.tags
  post.content = c.content
  post.contentMarkdown = c.contentMarkdown
  post.video.aparatVideoUrl = c.video.aparatVideoUrl
  post.video.youTubeVideoUrl = c.video.youTubeVideoUrl
  post.video.youTubeVideoUrl = c.video.youTubeVideoUrl
  post.video.size = c.video.size
  post.video.length = c.video.length
  post.category = c.category
  post.course = c.course
  post.imageUrl = c.imageUrl
  post.readTime = c.readTime
  post.summary = c.summary
  post.postNumber = c.postNumber
  post.difficulty = c.difficulty
  await post.save()
  await addNewPost(
    post._id,
    post.category,
    post.course,
    post.tags.map((t) => t._id)
  )
  cacheRepository.deletePost(post._id)
  res.success(post, name + ' updated successfuly')
})

router.route('/:id').delete(
  ...deleteAction(Post, async (req: any, _res: any) => {
    await Promise.all([
      (cacheRepository.deletePost(req.params.id),
        deletePostRelations(req.params.id))
    ])
    await Promise.all([
      cacheRepository.updateCategories(),
      cacheRepository.updateCourses(),
      cacheRepository.updateTags()
    ])
  })
)
router.route('/page/:number/:size').get(pagePosts)
router.route('/appPosts/mostViewes/:size').get(mostViewes)
router.route('/appPosts/random/:size').get(randomPosts)
router.route('/appPosts/popular/:size').get(popularPosts)
router.route('/appPosts/:pageSize/:pageNumber').get(getPosts)
router.route('/appPost/:name').get(async (req: Request, res: Response) => {
  const item = await Post.findOne({ name: req.params.name, published: true })
    .select('+content')
    .select('+contentMarkdown')

  if (!item) return res.notFound(Post.modelName)

  const [next, prev] = await Promise.all([
    Post.findOne({
      course: item.course,
      category: item.category,
      postNumber: { $gt: item.postNumber }
    }),
    Post.findOne({
      course: item.course,
      category: item.category,
      postNumber: { $lt: item.postNumber }
    })
  ])

  res.success({
    post: item,
    next: next,
    prev: prev
  })

  setImmediate(
    async (id) => await Post.updateOne({ _id: id }, { $inc: { views: 1 } }),
    item._id
  )
})

router.route('/:id').get(authonticator, async (req: Request, res: Response) => {
  const item = await Post.findById(req.params.id)
    .select('+content')
    .select('+contentMarkdown')
  if (!item) return res.notFound(Post.modelName)
  res.success(item)
})
router.route('/randomizeColor').patch(...changeColor(Post))

router
  .route('/course-details/:courseId')
  .get(authonticator, async (req, res) => {
    if (!req.params.courseId) return res.badRequest('courseId')
    const course = await Course.findById(req.params.courseId)
    if (!course) return res.notFound('course')
    const lastpPost = (
      await Post.find({ 'course._id': req.params.courseId })
        .sort({ postNumber: -1 })
        .limit(1)
    )[0]

    const details = {
      postNumber: 1,
      category: course.category,
      difficulty: course.difficulty
    }

    if (lastpPost) details.postNumber = lastpPost.postNumber + 1

    res.success(details, name + ' created successfuly')
  })

router.route('/:pageSize/:pageNumber').get(...getPage(Post, { createdAt: -1 }))

router.route('/clap').patch(async (req, res) => {
  if (!req.body.claps) return res.badRequest('claps')
  if (!req.body.postId) return res.badRequest('postId')
  await Post.updateOne(
    { _id: req.body.postId },
    { $inc: { claps: req.body.claps } }
  )
  res.success()
})

router.route('/publish').patch(authonticator, async (req, res) => {
  return await changePublishStatus(req, res, (post) => {
    post.published = true
    post.publishedAt = new Date()
  })
})

router.route('/unpublish').patch(authonticator, async (req, res) => {
  return await changePublishStatus(req, res, (post) => {
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
  const post = await Post.findById(req.body.postId)
  if (!post) return res.notFound(name)
  strategy(post)
  await post.save()
  res.success()
}

export default { router, routePrefix: '/post' }
