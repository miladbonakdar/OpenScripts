import express from 'express'
import { NewsLetter } from '../models/newsLetter'
import { deleteAction, getPage, getAll } from './contracts/index'

export const name = 'NewsLetter'
const router = express.Router()

//TODO: for users set recaptcha
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

router.route('/:id').delete(...deleteAction(NewsLetter))

router.route('/').get(...getAll(NewsLetter))

router.route('/:pageSize/:pageNumber').get(...getPage(NewsLetter))

export default { router, routePrefix: '/news-letter' }
