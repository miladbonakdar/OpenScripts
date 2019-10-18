const staticsPrefix = 'appStatics-'
export const statics = {
  getters: {
    loading: `${staticsPrefix}get-loading`,
    allCategories: `${staticsPrefix}get-allCategories`,
    allCourses: `${staticsPrefix}get-allCourses`,
    allTags: `${staticsPrefix}get-allTags`,
    user: `${staticsPrefix}get-user`
  },
  mutations: {
    loading: `${staticsPrefix}mut-loading`,
    allCategories: `${staticsPrefix}mut-allCategories`,
    allCourses: `${staticsPrefix}mut-allCourses`,
    allTags: `${staticsPrefix}mut-allTags`,
    user: `${staticsPrefix}mut-user`
  },
  actions: {
    init: `${staticsPrefix}action-init`,
    allCategories: `${staticsPrefix}action-allCategories`,
    allCourses: `${staticsPrefix}action-allCourses`,
    allTags: `${staticsPrefix}action-allTags`,
    user: `${staticsPrefix}action-user`
  }
}
