import express from 'express'
import { Tag } from '../models/tag'
import { ITag } from '../models/interfaces/tag.interface'
import { randomColor } from '../utils/colorGenerator'
import authonticator from '../middlewares/passportAuthonticator'
import {
  deleteAction,
  getAll,
  get,
  getPage,
  changeColor
} from './contracts/index'

export const name = 'Tag'
const router = express.Router()

router.route('/').post(authonticator, async (req, res) => {
  if (!req.user) return res.accessDenied()
  const tag = new Tag(req.body)
  tag.color = randomColor()
  tag.createdAt = new Date()
  tag.createdById = req.user._id
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

router.route('/:id').delete(...deleteAction(Tag))

router.route('/').get(...getAll(Tag))

router.route('/:id').get(...get(Tag))

router.route('/randomColor').patch(...changeColor(Tag))

router.route('/:pageSize/:pageNumber').get(...getPage(Tag))

export default { router, routePrefix: '/tag' }
