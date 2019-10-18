import { statics } from '../types'
import init from './partials/init.partial'
import loadPromise from './partials/loadPromise.partial'
import $gate from '../../implementation/crudly/CRUDlyInstance'

const state = {
  loading: false,
  allCategories: [],
  allCourses: [],
  allTags: [],
  user: {}
}

const getters = {
  [statics.getters.loading]: state => state.loading,
  [statics.getters.allCategories]: state => state.allCategories,
  [statics.getters.allCourses]: state => state.allCourses,
  [statics.getters.allTags]: state => state.allTags,
  [statics.getters.user]: state => state.user
}

const mutations = {
  [statics.mutations.loading]: (state, payload) => (state.loading = payload),

  [statics.mutations.allCategories]: (state, payload) =>
    (state.allCategories = payload),

  [statics.mutations.allCourses]: (state, payload) =>
    (state.allCourses = payload),

  [statics.mutations.allTags]: (state, payload) => (state.allTags = payload),

  [statics.mutations.user]: (state, payload) => (state.user = payload)
}

let actions = {
  [statics.actions.init]: init,

  [statics.actions.allCategories]: ({ commit }, done = console.log) => {
    loadPromise($gate.category.getAll(), items => {
      commit(statics.mutations.allCategories, items)
      done()
    })
  },

  [statics.actions.allCourses]: ({ commit }, done = console.log) => {
    loadPromise($gate.course.getAll(), items => {
      commit(statics.mutations.allCourses, items)
      done()
    })
  },

  [statics.actions.allTags]: ({ commit }, done = console.log) => {
    loadPromise($gate.category.getAll(), items => {
      commit(statics.mutations.allTags, items)
      done()
    })
  },

  [statics.actions.loadUser]: ({ commit }, done = console.log) => {
    loadPromise($gate.auth.getUser(), user => {
      commit(statics.mutations.user, user)
      done()
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
