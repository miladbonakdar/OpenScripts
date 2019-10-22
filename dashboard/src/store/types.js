const staticsPrefix = 'appStatics-'
export const statics = {
  getters: {
    loading: `${staticsPrefix}get-loading`,
    allCategories: `${staticsPrefix}get-allCategories`,
    allCourses: `${staticsPrefix}get-allCourses`,
    allTags: `${staticsPrefix}get-allTags`,
    difficulties: `${staticsPrefix}get-difficulties`,
    user: `${staticsPrefix}get-user`,
    notReadedMessages: `${staticsPrefix}get-notReadedMessages`,
    notReadedCount: `${staticsPrefix}get-notReadedCount`,
    notAcceptedComments: `${staticsPrefix}get-notAcceptedComments`,
    notAcceptedCount: `${staticsPrefix}get-notAcceptedCount`
  },
  mutations: {
    loading: `${staticsPrefix}mut-loading`,
    allCategories: `${staticsPrefix}mut-allCategories`,
    allCourses: `${staticsPrefix}mut-allCourses`,
    allTags: `${staticsPrefix}mut-allTags`,
    user: `${staticsPrefix}mut-user`,
    notReadedMessages: `${staticsPrefix}mut-notReadedMessages`,
    notReadedCount: `${staticsPrefix}mut-notReadedCount`,
    notAcceptedComments: `${staticsPrefix}mut-notAcceptedComments`,
    notAcceptedCount: `${staticsPrefix}mut-notAcceptedCount`
  },
  actions: {
    init: `${staticsPrefix}action-init`,
    allCategories: `${staticsPrefix}action-allCategories`,
    allCourses: `${staticsPrefix}action-allCourses`,
    allTags: `${staticsPrefix}action-allTags`,
    user: `${staticsPrefix}action-user`,
    notReadedMessages: `${staticsPrefix}action-notReadedMessages`,
    notAcceptedComments: `${staticsPrefix}action-notAcceptedComments`
  }
}
