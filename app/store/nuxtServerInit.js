const cookieParser = process.server ? require('cookieparser') : undefined

export async function nuxtServerInit(vuex, context) {
  const req = context.req
  try {
    const [
      allCategories,
      allCourses,
      allTags,
      randomUser,
      websiteconfig
    ] = await Promise.all([
      this.$axios.$get('category'),
      this.$axios.$get('course'),
      this.$axios.$get('tag'),
      this.$axios.$get('user/random'),
      this.$axios.$get('websiteMetadata')
    ])
    vuex.commit('SET_ALL_CATEGORIES', allCategories.data)
    vuex.commit('SET_ALL_COURSES', allCourses.data)
    vuex.commit('SET_ALL_TAGS', allTags.data)
    vuex.commit('SET_RANDOM_USER', randomUser.data)
    vuex.commit('SET_SITE_CONFIG', websiteconfig.data)

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
