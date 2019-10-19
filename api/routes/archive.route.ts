import express from 'express'
import { Archive } from '../models/archive'
import { deleteAction, getPage } from './contracts/index'

export const name = 'Archive'
const router = express.Router()

router.route('/:id').delete(...deleteAction(Archive))
router.route('/:pageSize/:pageNumber').get(...getPage(Archive))

export default { router, routePrefix: '/archive' }
