import { Express } from 'express'
import bodyParser from 'body-parser'
import logger from 'morgan'
import { API_PORT } from './config'
import cookieParser from 'cookie-parser'
import router from './routes/index'
import customResponse from './middlewares/response'
import defaultRoute from './middlewares/defaultRoute'
import errorHandler from './middlewares/expressErrorHandler'
import cors from './middlewares/cors'

export default async (app: Express) => {
  app.use(cors)
  app.use(customResponse)
  app.use(logger('common'))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use('/', router) //* api here
  app.use(defaultRoute)
  app.use(errorHandler)
  app.listen(API_PORT, () =>
    console.log(`Server is up and running on port ${API_PORT}`)
  )
}
