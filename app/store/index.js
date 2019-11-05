import { nuxtServerInit } from './nuxtServerInit'

export const state = () => ({
  token: null,
  user: null,
  allCategories: [],
  allCourses: [],
  allTags: [],
  randomUser: null,
  siteConfig: null
})

export const mutations = {
  SET_TOKEN(state, data) {
    state.token = data
  },
  SET_ALL_CATEGORIES(state, data) {
    state.allCategories = data
  },
  SET_ALL_COURSES(state, data) {
    state.allCourses = data
  },
  SET_ALL_TAGS(state, data) {
    state.allTags = data
  },
  SET_USER(state, data) {
    state.user = data
  },
  SET_RANDOM_USER(state, data) {
    state.randomUser = data
  },
  SET_SITE_CONFIG(state, data) {
    state.siteConfig = data
  }
}

export const actions = {
  nuxtServerInit,
  async getUser({ commit }, token) {
    try {
      const user = await this.$axios.get('auth', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      commit('SET_USER', user.data)
    } catch (err) {
      console.error(err)
    }
  }
}

export const getters = {
  getToken: (state) => state.token,
  user: (state) => state.user,
  allCategories: (state) => state.allCategories,
  allCourses: (state) => state.allCourses,
  allTags: (state) => state.allTags,
  randomUser: (state) => state.randomUser,
  siteConfig: (state) => state.siteConfig
}
