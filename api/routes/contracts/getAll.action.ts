import authonticator from '../../middlewares/passportAuthonticator'
import { Request, Response } from 'express'

export const getAll = (
  collection: any,
  auth = true,
  beforeResponse: any = null
) => {
  const middlewares = [
    async (_req: Request, res: Response) => {
      const items = await collection.find({})
      if (beforeResponse) await beforeResponse()
      res.success(items)
    }
  ]
  if (auth) middlewares.unshift(authonticator)
  return middlewares
}
