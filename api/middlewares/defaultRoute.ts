import { Request, Response } from 'express'

export default (req: Request, res: Response) => {
  res.status(404)
  // respond with json
  if (req.accepts('json')) {
    res.json({ error: 'Not found' })
    return
  }
  // default to plain-text. send()
  res.type('txt').send('Not found')
}
