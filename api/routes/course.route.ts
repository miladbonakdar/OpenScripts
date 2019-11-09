import express from 'express'
import { Course, ICourseModel } from '../models/course'
import { randomColor } from '../utils/colorGenerator'
import authonticator from '../middlewares/passportAuthonticator'
import { deleteAction, get, getPage, changeColor } from './contracts/index'
import { cacheRepository } from '../services/cache/cacheRepository'
import {
  addCourseToCategory,
  deleteCourseFromCategories,
  deleteCourseFromCategory
} from './relations/course_in_category'

export const name = 'Course'

const router = express.Router()

router.route('/').post(authonticator, async (req, res) => {
  if (!req.user) return res.accessDenied()
  const course = new Course(req.body)
  course.color = randomColor()
  course.createdAt = new Date()
  course.createdById = req.user._id
  await course.save()
  await cacheRepository.updateCourses()
  await addCourseToCategory(course._id, course.category)
  res.success(course, name + ' created successfuly')
})

router.route('/').put(authonticator, async (req, res) => {
  const c = req.body as ICourseModel
  if (!c) return res.badRequest('body')
  const course = await Course.findById(c._id)
  if (!course) return res.notFound(name)
  await deleteCourseFromCategory(course._id, course.category)
  course.name = c.name
  course.title = c.title
  course.color = c.color
  course.imageUrl = c.imageUrl
  course.difficulty = c.difficulty
  course.category = c.category
  await course.save()
  await cacheRepository.updateCourses()
  await addCourseToCategory(course._id, course.category)
  res.success(course, name + ' updated successfuly')
})

router.route('/:id').delete(
  ...deleteAction(Course, async (req: any, _res: any) => {
    await deleteCourseFromCategories(req.params.id)
    await cacheRepository.updateCourses()
  })
)

router.route('/').get((_req, res) => {
  const items = cacheRepository.getCourses()
  res.success(items)
})

router.route('/:id').get(...get(Course))

router
  .route('/randomizeColor')
  .patch(
    ...changeColor(Course, async () => await cacheRepository.updateCourses())
  )
router
  .route('/:pageSize/:pageNumber')
  .get(...getPage(Course, { createdAt: -1 }))

export default { router, routePrefix: '/course' }
