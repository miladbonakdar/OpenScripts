import express from 'express'
import { NewsLetter } from '../models/newsLetter'
import Pagination from '../utils/Pagination'

export const name = 'NewsLetter'
const router = express.Router()

router.route('/').post(async (req, res) => {
  const client = new NewsLetter(req.body)
  client.createdAt = new Date()
  await client.save()
  res.success(client, name + ' created successfuly')
})

router.route('/delete-by-email/:email').delete(async (req, res) => {
  if (!req.params.email) return res.badRequest('email')
  let client = await NewsLetter.deleteOne({ email: req.params.email })
  if (!client.deletedCount) return res.notFound()
  res.success(client)
})

router.route('/:id').delete(async (req, res) => {
  if (!req.params.id) return res.badRequest('id')
  let client = await NewsLetter.findByIdAndDelete(req.params.id)
  if (!client) return res.notFound()
  res.success(client)
})

router.route('/').get(async (_req, res) => {
  const courses = await NewsLetter.find({})
  res.success(courses)
})

router.route('/:pageSize/:pageNumber').get(async (req, res) => {
  const page = new Pagination(
    NewsLetter,
    req.params.pageNumber,
    req.params.pageSize
  )
  const pageResult = await page.get()
  res.success(pageResult)
})

export default { router, routePrefix: '/news-letter' }
