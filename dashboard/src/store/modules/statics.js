import { statics } from '../types'
import init from './partials/init.partial'
import loadPromise from './partials/loadPromise.partial'
import $gate from '../../implementation/crudly/CRUDlyInstance'

const state = {
  loading: false,
  pagePosts: [],
  allCategories: [],
  pageCourses: [],
  allCourses: [],
  pageTags: [],
  allTags: [],
  pageNewsLetters: [],
  user: {}
}

const getters = {
  [statics.getters.loading]: state => state.loading,
  [statics.getters.pagePosts]: state => state.pagePosts,
  [statics.getters.allCategories]: state => state.allCategories,
  [statics.getters.pageCourses]: state => state.pageCourses,
  [statics.getters.allCourses]: state => state.allCourses,
  [statics.getters.allTags]: state => state.allTags,
  [statics.getters.pageTags]: state => state.pageTags,
  [statics.getters.pageNewsLetters]: state => state.pageNewsLetters,
  [statics.getters.user]: state => state.user
}

const mutations = {
  [statics.mutations.loading]: (state, payload) => (state.loading = payload),

  [statics.mutations.pagePosts]: (state, payload) =>
    (state.pagePosts = payload),

  [statics.mutations.allCategories]: (state, payload) =>
    (state.allCategories = payload),

  [statics.mutations.allCourses]: (state, payload) =>
    (state.allCourses = payload),

  [statics.mutations.pageCourses]: (state, payload) =>
    (state.pageCourses = payload),

  [statics.mutations.allTags]: (state, payload) => (state.allTags = payload),

  [statics.mutations.pageTags]: (state, payload) => (state.pageTags = payload),

  [statics.mutations.pageNewsLetters]: (state, payload) =>
    (state.pageNewsLetters = payload),

  [statics.mutations.user]: (state, payload) => (state.user = payload)
}

let actions = {
  [statics.actions.init]: init,

  [statics.actions.pagePosts]: (
    { commit },
    { number = 0, size = 15, done = console.log }
  ) => {
    loadPromise($gate.post.page(size, number), items => {
      commit(statics.mutations.pagePosts, items)
      done()
    })
  },

  [statics.actions.allCategories]: ({ commit }, done = console.log) => {
    loadPromise($gate.category.getAll(), items => {
      commit(statics.mutations.allCategories, items)
      done()
    })
  },

  [statics.actions.pageCourses]: (
    { commit },
    { number = 0, size = 15, done = console.log }
  ) => {
    loadPromise($gate.course.page(size, number), items => {
      commit(statics.mutations.pageCourses, items)
      done()
    })
  },

  [statics.actions.allCourses]: ({ commit }, done = console.log) => {
    loadPromise($gate.course.getAll(), items => {
      commit(statics.mutations.allCourses, items)
      done()
    })
  },

  [statics.actions.pageTags]: (
    { commit },
    { number = 0, size = 15, done = console.log }
  ) => {
    loadPromise($gate.tag.page(size, number), items => {
      commit(statics.mutations.pageTags, items)
      done()
    })
  },

  [statics.actions.allTags]: ({ commit }, done = console.log) => {
    loadPromise($gate.category.getAll(), items => {
      commit(statics.mutations.allTags, items)
      done()
    })
  },

  [statics.actions.pageNewsLetters]: (
    { commit },
    { number = 0, size = 15, done = console.log }
  ) => {
    loadPromise($gate['news-letter'].page(size, number), items => {
      commit(statics.mutations.pageNewsLetters, items)
      done()
    })
  },

  [statics.actions.loadUser]: ({ commit }, done) => {
    done()
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
