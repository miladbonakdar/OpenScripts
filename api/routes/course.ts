import express from 'express'
import { Course } from '../models/course'
import { ICourse } from '../models/interfaces/course.interface'
import { randomColor } from '../utils/colorGenerator'
import Pagination from '../utils/Pagination'

export const name = 'Course'
const router = express.Router()

router.route('/').post(async (req, res) => {
  const course = new Course(req.body)
  course.color = randomColor()
  course.createdAt = new Date()
  await course.save()
  res.success(course, name + ' created successfuly')
})

router.route('/').put(async (req, res) => {
  const c = req.body as ICourse
  if (!c) return res.badRequest('body')
  const course = await Course.findById(c._id)
  if (!course) return res.notFound()
  course.name = c.name
  course.color = c.color
  course.imageUrl = c.imageUrl
  course.difficulty = c.difficulty
  await course.save()
  res.success(course, name + ' updated successfuly')
})

router.route('/:id').delete(async (req, res) => {
  let course = await Course.findByIdAndDelete(req.params.id)
  if (!course) return res.notFound()
  res.success(course)
})

router.route('/').get(async (_req, res) => {
  const courses = await Course.find({})
  res.success(courses)
})

router.route('/:id').get(async (req, res) => {
  if (!req.params.id) return res.badRequest('id')
  const course = await Course.findById(req.params.id)
  if (!course) return res.notFound()
  res.success(course)
})

router.route('/:pageSize/:pageNumber').get(async (req, res) => {
  const page = new Pagination(
    Course,
    req.params.pageNumber,
    req.params.pageSize
  )
  const pageResult = await page.get()
  res.success(pageResult)
})

export default { router, routePrefix: '/course' }
