import express from 'express'
import authenticate from '../services/auth/authenticate'
import authonticator from '../middlewares/passportAuthonticator'

const router = express.Router()

router.route('/').post(async (req, res) => {
  authenticate(req, res)
})

router.route('/').get(authonticator, async (req, res) => {
  if (!req.user) return res.unauthorized()
  res.success(req.user)
})

export default { router, routePrefix: '/auth' }
