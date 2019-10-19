import authonticator from '../../middlewares/passportAuthonticator'
import { Request, Response } from 'express'

export const deleteAction = (collection: any) => {
  return [
    authonticator,
    async (req: Request, res: Response) => {
      let item = await collection.findByIdAndDelete(req.params.id)
      if (!item) return res.notFound()
      res.success(item)
    }
  ]
}
