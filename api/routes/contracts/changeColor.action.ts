import authonticator from '../../middlewares/passportAuthonticator'
import { Request, Response } from 'express'
import { randomColor } from '../../utils/colorGenerator'

export const changeColor = (collection: any) => {
  return [
    authonticator,
    async (req: Request, res: Response) => {
      const item = await collection.findById(req.body.id)
      if (!item) return res.notFound()
      item.color = randomColor()
      await item.save()
      res.success(item)
    }
  ]
}
