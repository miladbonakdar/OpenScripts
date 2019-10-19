import express from 'express'
import root from './root.route'
import auth from './auth.route'
import category from './category.route'
import course from './course.route'
import tag from './tag.route'
import newsLetter from './newsLetter.route'
import post from './post.route'

const router = express.Router()

router.use(root.routePrefix, root.router)
router.use(auth.routePrefix, auth.router)
router.use(category.routePrefix, category.router)
router.use(course.routePrefix, course.router)
router.use(tag.routePrefix, tag.router)
router.use(newsLetter.routePrefix, newsLetter.router)
router.use(post.routePrefix, post.router)

export default router
