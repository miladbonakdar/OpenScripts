import express from 'express'
import { Category } from '../models/category'
import { ICategory } from '../models/interfaces/category.interface'
import { randomColor } from '../utils/colorGenerator'
import authonticator from '../middlewares/passportAuthonticator'

export const name = 'Category'
const router = express.Router()

router.route('/').post(authonticator, async (req, res) => {
  const category = new Category(req.body)
  category.color = randomColor()
  await category.save()
  res.success(category, name + ' created successfuly')
})

router.route('/').put(authonticator, async (req, res) => {
  const c = req.body as ICategory
  if (!c) return res.badRequest('body')
  const cat = await Category.findById(c._id)
  if (!cat) return res.notFound()
  cat.name = c.name
  cat.color = c.color
  cat.imageUrl = c.imageUrl
  await cat.save()
  res.success(cat, name + ' updated successfuly')
})

router.route('/:id').delete(authonticator, async (req, res) => {
  let cat = await Category.findByIdAndDelete(req.params.id)
  if (!cat) return res.notFound()
  res.success(cat)
})

router.route('/').get(async (_req, res) => {
  const categories = await Category.find({})
  res.success(categories)
})

router.route('/:id').get(authonticator, async (req, res) => {
  if (!req.params.id) return res.badRequest('id')
  const category = await Category.findById(req.params.id)
  if (!category) return res.notFound()
  res.success(category)
})

export default { router, routePrefix: '/category' }
