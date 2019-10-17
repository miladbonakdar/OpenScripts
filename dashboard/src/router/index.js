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

const Category = () => import('@/views/category/Category')
const CategoryList = () => import('@/views/category/CategoryList')

const Tag = () => import('@/views/tag/Tag')
const TagList = () => import('@/views/tag/TagList')

const Course = () => import('@/views/course/Course')
const CourseList = () => import('@/views/course/CourseList')

const NewsLetterList = () => import('@/views/newsLetter/NewsLetterList')

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
          path: 'category/item/:id',
          name: 'Category',
          component: Category
        },
        {
          path: 'category/list',
          name: 'Categories list',
          component: CategoryList
        },
        {
          path: 'course/item/:id',
          name: 'Course',
          component: Course
        },
        {
          path: 'course/list',
          name: 'Courses list',
          component: CourseList
        },
        {
          path: 'tag/item/:id',
          name: 'Tag',
          component: Tag
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
  document.title = `${to.name} - Milawd`
  next()
})

export default router
