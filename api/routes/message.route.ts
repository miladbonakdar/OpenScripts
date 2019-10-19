import express from 'express'
import { Message } from '../models/message'
import { randomColor } from '../utils/colorGenerator'
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

router.route('/randomColor').patch(...changeColor(Message))

router.route('/:pageSize/:pageNumber').get(...getPage(Message))

export default { router, routePrefix: '/message' }
