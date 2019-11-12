import express from 'express'
import { User } from '../models/user'
import { cacheRepository } from '../services/cache/cacheRepository'

export const name = 'User'
const router = express.Router()

router.route('/random').get(async (_req, res) => {
  const items = await User.aggregate([{ $sample: { size: 1 } }])
  if (!items[0]) return res.notFound('User')
  delete items[0].password
  res.success(items[0])
})

router.route('/').get((_req, res) => {
  const items = cacheRepository.getUsers()
  res.success(items)
})

export default { router, routePrefix: '/User' }
