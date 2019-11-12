const validRouteNames = ['about', 'index', 'contact', 'page-page']

const checkArray = (array, value) => array.filter((t) => t.name === value)[0]

export default function({ store, redirect, route }) {
  if (validRouteNames.includes(route.name)) return
  let category = null
  let course = null
  console.log(route)
  switch (route.name) {
    case 'category-category':
      category = checkArray(store.state.allCategories, route.params.category)
      if (!category) return redirect('/not-found')
      store.commit('SET_BREADCRUMB_ITEMS', [
        {
          text: category.title,
          href: `/${category.name}`
        }
      ])
      break
    case 'category-category-section-course':
      category = checkArray(store.state.allCategories, route.params.category)
      course = checkArray(store.state.allCourses, route.params.course)
      if (!category || !course) return redirect('/not-found')
      store.commit('SET_BREADCRUMB_ITEMS', [
        {
          text: category.title,
          href: `/${category.name}`
        },
        {
          text: course.title,
          href: `/${course.name}`
        }
      ])
      break
    case 'category-category-section-course-post':
      category = checkArray(store.state.allCategories, route.params.category)
      course = checkArray(store.state.allCourses, route.params.course)
      if (!category || !course) return redirect('/not-found')
      store.commit('SET_BREADCRUMB_ITEMS', [
        {
          text: category.title,
          href: `/${category.name}`
        },
        {
          text: course.title,
          href: `/${course.name}`
        }
      ])
      break
    default:
      redirect('/not-found')
  }
}
