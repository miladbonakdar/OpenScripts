import { Request, Response, NextFunction } from 'express'

export default (err: any, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }
  res.error(err.message || err || 'somthing bad happend', 500)
}
