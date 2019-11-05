import express from 'express'
import { Category, ICategoryModel } from '../models/category'
import { randomColor } from '../utils/colorGenerator'
import authonticator from '../middlewares/passportAuthonticator'
import { deleteAction, get, changeColor } from './contracts/index'
import { cacheRepository } from '../services/cache/cacheRepository'

export const name = 'Category'
const router = express.Router()

router.route('/').post(authonticator, async (req, res) => {
  if (!req.user) return res.accessDenied()
  const category = new Category(req.body)
  category.color = randomColor()
  category.createdAt = new Date()
  category.createdById = req.user._id
  await category.save()
  await cacheRepository.updateCategories()
  res.success(category, name + ' created successfuly')
})

router.route('/').put(authonticator, async (req, res) => {
  const c = req.body as ICategoryModel
  if (!c) return res.badRequest('body')
  const cat = await Category.findById(c._id)
  if (!cat) return res.notFound(name)
  cat.name = c.name
  cat.title = c.title
  cat.color = c.color
  cat.imageUrl = c.imageUrl
  await cat.save()
  await cacheRepository.updateCategories()
  res.success(cat, name + ' updated successfuly')
})

router
  .route('/:id')
  .delete(
    ...deleteAction(
      Category,
      async () => await cacheRepository.updateCategories()
    )
  )
router.route('/').get((_req, res) => {
  const items = cacheRepository.getCategories()
  res.success(items)
})
router
  .route('/randomizeColor')
  .patch(
    ...changeColor(
      Category,
      async () => await cacheRepository.updateCategories()
    )
  )
router.route('/:id').get(...get(Category))

export default { router, routePrefix: '/category' }
