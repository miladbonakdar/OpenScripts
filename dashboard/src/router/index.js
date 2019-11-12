import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')
const Authentication = () => import('@/containers/Authentication')

// Views
const Dashboard = () => import('@/views/Dashboard')
// Views - Pages
const Page404 = () => import('@/views/Page404')
const Login = () => import('@/views/Login')

const Post = () => import('@/views/post/Post')
const PostList = () => import('@/views/post/PostList')

const CategoryList = () => import('@/views/category/CategoryList')
const TagList = () => import('@/views/tag/TagList')
const CourseList = () => import('@/views/course/CourseList')
const NewsLetterList = () => import('@/views/newsLetter/NewsLetterList')
const Message = () => import('@/views/message/Message')
const Comment = () => import('@/views/comment/Comment')
const Archive = () => import('@/views/archive/Archive')

Vue.use(Router)

const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/auth/login',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'post/item/:id',
          name: 'Post',
          component: Post
        },
        {
          path: 'post/list',
          name: 'Posts list',
          component: PostList
        },
        {
          path: 'category/list',
          name: 'Categories list',
          component: CategoryList
        },
        {
          path: 'course/list',
          name: 'Courses list',
          component: CourseList
        },
        {
          path: 'tag/list',
          name: 'Tags list',
          component: TagList
        },
        {
          path: 'news-letter/list',
          name: 'News letters list',
          component: NewsLetterList
        },
        {
          path: 'archive/list',
          name: 'Archived',
          component: Archive
        },
        {
          path: 'message/list',
          name: 'Messages',
          component: Message
        },
        {
          path: 'comment/list',
          name: 'Comments',
          component: Comment
        },
        {
          path: '404',
          name: '',
          component: Page404
        }
      ]
    },
    {
      path: '/auth',
      redirect: '/auth/login',
      name: 'Authentication',
      component: Authentication,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        }
      ]
    },
    { path: '*', redirect: '/auth/login' }
  ]
})

router.beforeEach((to, from, next) => {
  window.currentRoute = to.name
  window.lastRoute = from.name
  document.title = `${to.name} - OpenScripts`
  next()
})

export default router
