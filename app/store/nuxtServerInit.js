const cookieParser = process.server ? require('cookieparser') : undefined

export async function nuxtServerInit(vuex, context) {
  const req = context.req
  try {
    const [allCategories, allCourses, allTags] = await Promise.all([
      this.$axios.$get('category'),
      this.$axios.$get('course'),
      this.$axios.$get('tag')
    ])
    vuex.commit('SET_ALL_CATEGORIES', allCategories)
    vuex.commit('SET_ALL_COURSES', allCourses)
    vuex.commit('SET_ALL_TAGS', allTags)

    if (req.headers.cookie) {
      const parsed = cookieParser.parse(req.headers.cookie)

      if (parsed.token) {
        try {
          const user = await this.$axios.$get('auth', {
            headers: {
              Authorization: `Bearer ${parsed.token}`
            }
          })
          vuex.commit('SET_USER', user.data)
          vuex.commit('SET_TOKEN', parsed.token)
        } catch (err) {
          console.error(err)
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
