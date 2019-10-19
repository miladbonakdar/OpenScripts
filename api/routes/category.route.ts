import express from 'express'
import { Category } from '../models/category'
import { ICategory } from '../models/interfaces/category.interface'
import { randomColor } from '../utils/colorGenerator'
import authonticator from '../middlewares/passportAuthonticator'
import { deleteAction, get, getAll, changeColor } from './contracts/index'

export const name = 'Category'
const router = express.Router()

router.route('/').post(authonticator, async (req, res) => {
  if (!req.user) return res.accessDenied()
  const category = new Category(req.body)
  category.color = randomColor()
  category.createdAt = new Date()
  category.createdById = req.user._id
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

router.route('/:id').delete(...deleteAction(Category))

router.route('/').get(...getAll(Category, false))

router.route('/randomColor').patch(...changeColor(Category))

router.route('/:id').get(...get(Category))

export default { router, routePrefix: '/category' }
