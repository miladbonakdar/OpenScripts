import express from 'express'
const router = express.Router()

router.route('/').get(async (_req, res) => {
  res.send('dashboard')
})

export default { router, routePrefix: '/' }
