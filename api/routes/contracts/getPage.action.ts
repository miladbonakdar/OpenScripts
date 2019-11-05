import authonticator from '../../middlewares/passportAuthonticator'
import { Request, Response } from 'express'
import Pagination from '../../utils/Pagination'

export const getPage = (collection: any, beforeResponse: any = null) => {
  return [
    authonticator,
    async (req: Request, res: Response) => {
      const page = new Pagination(
        collection,
        req.params.pageNumber,
        req.params.pageSize
      )
      const pageResult = await page.get()
      if (beforeResponse) await beforeResponse()
      res.success(pageResult)
    }
  ]
}
