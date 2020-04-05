import express from 'express'
import 'express-async-errors'
import configureApi from './api'
import connectionProvider from './models/index'
import authInit from './services/auth/init'
import passport from './services/auth/index'
import { cacheRepository } from './services/cache/cacheRepository'

  ; (async () => {
    const app = express()
    await connectionProvider()
    await authInit()
    await configureApi(app)
    passport()
    await cacheRepository.init()
  })()
