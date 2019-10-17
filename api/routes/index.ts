import express from 'express'
import root from './root'
import auth from './auth'
import category from './category'
import course from './course'
import tag from './tag'
import newsLetter from './newsLetter'
import post from './post'

const router = express.Router()

router.use(root.routePrefix, root.router)
router.use(auth.routePrefix, auth.router)
router.use(category.routePrefix, category.router)
router.use(course.routePrefix, course.router)
router.use(tag.routePrefix, tag.router)
router.use(newsLetter.routePrefix, newsLetter.router)
router.use(post.routePrefix, post.router)

export default router
