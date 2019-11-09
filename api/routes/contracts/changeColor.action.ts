import authonticator from '../../middlewares/passportAuthonticator'
import { Request, Response } from 'express'
import { randomColor } from '../../utils/colorGenerator'

export const changeColor = (collection: any, beforeResponse: any = null) => {
  return [
    authonticator,
    async (req: Request, res: Response) => {
      const item = await collection.findById(req.body.id)
      if (!item) return res.notFound(collection.modelName)
      item.color = randomColor()
      await item.save()
      if (beforeResponse) await beforeResponse(req, res)
      res.success(item)
    }
  ]
}
