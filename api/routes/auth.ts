import express from 'express'
import authenticate from '../services/auth/authenticate'

const router = express.Router()

router.route('/').post(async (req, res) => {
  authenticate(req, res)
})

export default { router, routePrefix: '/auth' }
