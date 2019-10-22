import express from 'express'
import { Course, ICourseModel } from '../models/course'
import { randomColor } from '../utils/colorGenerator'
import authonticator from '../middlewares/passportAuthonticator'
import {
  deleteAction,
  get,
  getAll,
  getPage,
  changeColor
} from './contracts/index'

export const name = 'Course'
const router = express.Router()

router.route('/').post(authonticator, async (req, res) => {
  if (!req.user) return res.accessDenied()
  const course = new Course(req.body)
  course.color = randomColor()
  course.createdAt = new Date()
  course.createdById = req.user._id
  await course.save()
  res.success(course, name + ' created successfuly')
})

router.route('/').put(authonticator, async (req, res) => {
  const c = req.body as ICourseModel
  if (!c) return res.badRequest('body')
  const course = await Course.findById(c._id)
  if (!course) return res.notFound(name)
  course.name = c.name
  course.title = c.title
  course.color = c.color
  course.imageUrl = c.imageUrl
  course.difficulty = c.difficulty
  course.categoryId = c.categoryId
  await course.save()
  res.success(course, name + ' updated successfuly')
})

router.route('/:id').delete(...deleteAction(Course))
router.route('/').get(...getAll(Course, false))
router.route('/:id').get(...get(Course))
router.route('/randomizeColor').patch(...changeColor(Course))
router.route('/:pageSize/:pageNumber').get(...getPage(Course))

export default { router, routePrefix: '/course' }
