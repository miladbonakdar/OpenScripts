const cookieParser = process.server ? require('cookieparser') : undefined

export async function nuxtServerInit(vuex, context) {
  const req = context.req
  try {
    const [
      allCategories,
      allCourses,
      allTags,
      randomUser,
      websiteconfig,
      randomPosts,
      mostViewedPosts,
      popularPosts
    ] = await Promise.all([
      this.$axios.$get('category'),
      this.$axios.$get('course'),
      this.$axios.$get('tag'),
      this.$axios.$get('user/random'),
      this.$axios.$get('websiteMetadata'),
      this.$axios.$get('post/appPosts/mostViewes/3'),
      this.$axios.$get('post/appPosts/random/3'),
      this.$axios.$get('post/appPosts/popular/3')
    ])
    vuex.commit('SET_ALL_CATEGORIES', allCategories.data)
    vuex.commit('SET_ALL_COURSES', allCourses.data)
    vuex.commit('SET_ALL_TAGS', allTags.data)
    vuex.commit('SET_RANDOM_USER', randomUser.data)
    vuex.commit('SET_SITE_CONFIG', websiteconfig.data)
    vuex.commit('SET_RANDOM_POSTS', randomPosts.data)
    vuex.commit('SET_MOST_VIEWED_POSTS', mostViewedPosts.data)
    vuex.commit('SET_POPULAR_POSTS', popularPosts.data)

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
