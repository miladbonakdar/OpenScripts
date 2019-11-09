import express from 'express'
import { Message } from '../models/message'
import { randomColor } from '../utils/colorGenerator'
import authonticator from '../middlewares/passportAuthonticator'
import { deleteAction, getPage, getAll, changeColor } from './contracts/index'

export const name = 'Message'
const router = express.Router()

//TODO: for users set recaptcha
router.route('/').post(async (req, res) => {
  const message = new Message(req.body)
  message.color = randomColor()
  message.createdAt = new Date()
  await message.save()
  res.success(message, name + ' created successfuly')
})

router.route('/:id').delete(...deleteAction(Message))
router.route('/').get(...getAll(Message))
router.route('/randomizeColor').patch(...changeColor(Message))
router
  .route('/:pageSize/:pageNumber')
  .get(...getPage(Message, { createdAt: -1 }))

router.route('/not-read').get(authonticator, async (_req, res) => {
  const items = await Message.find({ readed: false })
  res.success(items)
})

router.route('/read').patch(authonticator, async (req, res) => {
  const item = await Message.findById(req.body.id)
  if (!item) return res.notFound(name)
  item.readed = true
  await item.save()
  res.success(item)
})

router.route('/read-all').patch(authonticator, async (_req, res) => {
  await Message.updateMany(
    { readed: false },
    {
      $set: { readed: true }
    }
  )
  return res.success({}, 'all messages set to readed')
})

export default { router, routePrefix: '/message' }
