import express from 'express'
const router = express.Router()

router.route('/').get(async (_req, res) => {
  res.send('42 is your answer :)')
})

export default { router, routePrefix: '/' }
