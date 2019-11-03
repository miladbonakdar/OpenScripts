import express from 'express'
const router = express.Router()

router.route('/').get(async (_req, res) => {
  res.success('42 is your answer :)')
})

router.route('/user').get(async (_req, res) => {
  res.success(_req.user)
})

export default { router, routePrefix: '/' }
