import authonticator from '../../middlewares/passportAuthonticator'
import { Request, Response } from 'express'

export const get = (collection: any) => {
  return [
    authonticator,
    async (req: Request, res: Response) => {
      const item = await collection.findById(req.params.id)
      if (!item) return res.notFound(collection.modelName)
      res.success(item)
    }
  ]
}
