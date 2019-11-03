import express from 'express'
import { Archive, IArchiverModel } from '../models/archive'
import authonticator from '../middlewares/passportAuthonticator'
import { deleteAction, getPage } from './contracts/index'
import mongoose from 'mongoose'

export const name = 'Archive'
const router = express.Router()

const recycle = (document: IArchiverModel) => {
  return new Promise((resolve, reject) => {
    mongoose.connection.db.collection(
      (document.collectionName).toLowerCase(),
      async (err, collection) => {
        if (!collection || err || !document)
          return reject(err.message || 'cannot recycle the object')
        await collection.insertOne(document.item)
        resolve('object recycled')
      }
    )
  })
}

router.route('/recycle').patch(authonticator, async (req, res) => {
  let document = await Archive.findByIdAndDelete(req.body.id)
  if (!document) return res.notFound('Archive')
  try {
    const result = await recycle(document)
    return res.success(result)
  } catch (error) {
    return res.error(error, 400)
  }
})

router.route('/:id').delete(...deleteAction(Archive))
router.route('/:pageSize/:pageNumber').get(...getPage(Archive))

export default { router, routePrefix: '/archive' }
