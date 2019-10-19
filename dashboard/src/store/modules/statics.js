import { statics } from '../types'
import init from './partials/init.partial'
import loadPromise from './partials/loadPromise.partial'
import $gate from '../../implementation/crudly/CRUDlyInstance'

const state = {
  loading: false,
  allCategories: [],
  allCourses: [],
  allTags: [],
  user: {},
  notReadedMessages: [],
  notReadedCount: 0,
  notAcceptedComments: [],
  notAcceptedCount: 0
}

const getters = {
  [statics.getters.loading]: state => state.loading,
  [statics.getters.allCategories]: state => state.allCategories,
  [statics.getters.allCourses]: state => state.allCourses,
  [statics.getters.allTags]: state => state.allTags,
  [statics.getters.user]: state => state.user,
  [statics.getters.notReadedMessages]: state => state.notReadedMessages,
  [statics.getters.notReadedCount]: state => state.notReadedCount,
  [statics.getters.notAcceptedComments]: state => state.notAcceptedComments,
  [statics.getters.notAcceptedCount]: state => state.notAcceptedCount
}

const mutations = {
  [statics.mutations.loading]: (state, payload) => (state.loading = payload),

  [statics.mutations.allCategories]: (state, payload) =>
    (state.allCategories = payload),

  [statics.mutations.allCourses]: (state, payload) =>
    (state.allCourses = payload),

  [statics.mutations.allTags]: (state, payload) => (state.allTags = payload),

  [statics.mutations.user]: (state, payload) => (state.user = payload),

  [statics.mutations.notReadedMessages]: (state, payload) =>
    (state.notReadedMessages = payload),

  [statics.mutations.notReadedCount]: (state, payload) =>
    (state.notReadedCount = payload),

  [statics.mutations.notAcceptedComments]: (state, payload) =>
    (state.notAcceptedComments = payload),

  [statics.mutations.notAcceptedCount]: (state, payload) =>
    (state.notAcceptedCount = payload)
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
    loadPromise($gate.tag.getAll(), items => {
      commit(statics.mutations.allTags, items)
      done()
    })
  },

  [statics.actions.loadUser]: ({ commit }, done = console.log) => {
    loadPromise($gate.auth.getUser(), user => {
      commit(statics.mutations.user, user)
      done()
    })
  },

  [statics.actions.notReadedMessages]: ({ commit }, done = console.log) => {
    loadPromise($gate.message.notRead(), messages => {
      commit(statics.mutations.notReadedMessages, messages)
      commit(statics.mutations.notReadedCount, (messages || []).length)
      done()
    })
  },

  [statics.actions.notAcceptedComments]: ({ commit }, done = console.log) => {
    loadPromise($gate.comment.notAccepted(), comments => {
      commit(statics.mutations.notAcceptedComments, comments)
      commit(statics.mutations.notAcceptedCount, (comments || []).length)
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
