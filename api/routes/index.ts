import express from 'express'
import root from './root.route'
import auth from './auth.route'
import category from './category.route'
import course from './course.route'
import tag from './tag.route'
import newsLetter from './newsLetter.route'
import post from './post.route'
import message from './message.route'
import comment from './comments.route'

const router = express.Router()

router.use(root.routePrefix, root.router)
router.use(auth.routePrefix, auth.router)
router.use(category.routePrefix, category.router)
router.use(course.routePrefix, course.router)
router.use(tag.routePrefix, tag.router)
router.use(newsLetter.routePrefix, newsLetter.router)
router.use(post.routePrefix, post.router)
router.use(message.routePrefix, message.router)
router.use(comment.routePrefix, comment.router)

export default router
