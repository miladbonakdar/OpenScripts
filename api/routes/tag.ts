import express from 'express'
import { Tag } from '../models/tag'
import { ITag } from '../models/interfaces/tag.interface'
import { randomColor } from '../utils/colorGenerator'
import Pagination from '../utils/Pagination'
import authonticator from '../middlewares/passportAuthonticator'

export const name = 'Tag'
const router = express.Router()

router.route('/').post(authonticator, async (req, res) => {
  const tag = new Tag(req.body)
  tag.color = randomColor()
  await tag.save()
  res.success(tag, name + ' created successfuly')
})

router.route('/').put(authonticator, async (req, res) => {
  const c = req.body as ITag
  if (!c) return res.badRequest('body')
  const tag = await Tag.findById(c._id)
  if (!tag) return res.notFound()
  tag.name = c.name
  tag.color = c.color
  await tag.save()
  res.success(tag, name + ' updated successfuly')
})

router.route('/:id').delete(authonticator, async (req, res) => {
  let tag = await Tag.findByIdAndDelete(req.params.id)
  if (!tag) return res.notFound()
  res.success(tag)
})

router.route('/').get(async (_req, res) => {
  const courses = await Tag.find({})
  res.success(courses)
})

router.route('/:id').get(authonticator, async (req, res) => {
  if (!req.params.id) return res.badRequest('id')
  const tag = await Tag.findById(req.params.id)
  if (!tag) return res.notFound()
  res.success(tag)
})

router.route('/:pageSize/:pageNumber').get(authonticator, async (req, res) => {
  const page = new Pagination(Tag, req.params.pageNumber, req.params.pageSize)
  const pageResult = await page.get()
  res.success(pageResult)
})

export default { router, routePrefix: '/tag' }
