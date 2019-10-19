import authonticator from '../../middlewares/passportAuthonticator'
import { Request, Response } from 'express'
import Pagination from '../../utils/Pagination'

export const getPage = (collection: any) => {
  return [
    authonticator,
    async (req: Request, res: Response) => {
      const page = new Pagination(
        collection,
        req.params.pageNumber,
        req.params.pageSize
      )
      const pageResult = await page.get()
      res.success(pageResult)
    }
  ]
}
