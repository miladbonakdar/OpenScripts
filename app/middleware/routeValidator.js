const validRouteNames = ['about', 'index', 'contact', 'page-page']

const checkArray = (array, value, allObject) =>
  value === 'all' ? allObject : array.filter((t) => t.name === value)[0]

const allCategorries = {
  title: 'تمامی دسته بندی ها',
  name: 'all'
}
const allCourses = {
  title: 'تمامی آموزش ها',
  name: 'all'
}

const redirectToNotFound = (redirect) => redirect('/not-found')

export default function({ store, redirect, route }) {
  if (validRouteNames.includes(route.name)) return
  let category = null
  let course = null
  switch (route.name) {
    case 'category-category':
      category = checkArray(
        store.state.allCategories,
        route.params.category,
        allCategorries
      )
      if (!category) return redirectToNotFound(redirect, route)
      store.commit('SET_BREADCRUMB_ITEMS', [
        {
          text: category.title,
          href: `/category/${category.name}`
        }
      ])
      break
    case 'category-category-section-course':
      category = checkArray(
        store.state.allCategories,
        route.params.category,
        allCategorries
      )
      course = checkArray(
        store.state.allCourses,
        route.params.course,
        allCourses
      )
      if (!category || !course) return redirectToNotFound(redirect, route)
      store.commit('SET_BREADCRUMB_ITEMS', [
        {
          text: category.title,
          href: `/category/${category.name}`
        },
        {
          text: course.title,
          href: `/category/${category.name}/section/${course.name}`
        }
      ])
      break
    case 'category-category-section-course-post':
      category = checkArray(
        store.state.allCategories,
        route.params.category,
        allCategorries
      )
      course = checkArray(
        store.state.allCourses,
        route.params.course,
        allCourses
      )
      if (!category || !course) return redirectToNotFound(redirect, route)
      store.commit('SET_BREADCRUMB_ITEMS', [
        {
          text: category.title,
          href: `/category/${category.name}`
        },
        {
          text: course.title,
          href: `/category/${category.name}/section/${course.name}`
        }
      ])
      break
    default:
      return redirectToNotFound(redirect, route)
  }
}
