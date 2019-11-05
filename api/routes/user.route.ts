import express from 'express'
import { User } from '../models/user'

export const name = 'User'
const router = express.Router()

router.route('/random').get(async (_req, res) => {
  const items = await User.aggregate([{ $sample: { size: 1 } }])
  if (!items[0]) return res.notFound("User")
  res.success(items[0])
})

router.route('/').get(async (_req, res) => {
  const items = await User.find({}).select('-password')
  res.success(items)
})

export default { router, routePrefix: '/User' }
