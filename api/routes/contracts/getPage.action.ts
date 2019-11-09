import authonticator from '../../middlewares/passportAuthonticator'
import { Request, Response } from 'express'
import Pagination from '../../utils/Pagination'

export const getPage = (
  collection: any,
  sort: object | undefined = undefined,
  beforeResponse: any = null
) => {
  return [
    authonticator,
    async (req: Request, res: Response) => {
      const page = new Pagination(
        collection,
        req.params.pageNumber,
        req.params.pageSize,
        {},
        sort
      )
      const pageResult = await page.get()
      if (beforeResponse) await beforeResponse(req, res)
      res.success(pageResult)
    }
  ]
}
