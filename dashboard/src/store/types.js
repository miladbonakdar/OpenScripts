const staticsPrefix = 'appStatics-';
export const statics = {
  getters: {
    loading: `${staticsPrefix}get-loading`,
    pagePosts: `${staticsPrefix}get-pagePosts`,
    allCategories: `${staticsPrefix}get-allCategories`,
    allCourses: `${staticsPrefix}get-allCourses`,
    pageCourses: `${staticsPrefix}get-pageCourses`,
    allTags: `${staticsPrefix}get-allTags`,
    pageTags: `${staticsPrefix}get-pageTags`,
    pageNewsLetters: `${staticsPrefix}get-pageNewsLetters`,
    user: `${staticsPrefix}get-user`,
  },
  mutations: {
    loading: `${staticsPrefix}mut-loading`,
    pagePosts: `${staticsPrefix}mut-pagePosts`,
    allCategories: `${staticsPrefix}mut-allCategories`,
    allCourses: `${staticsPrefix}mut-allCourses`,
    pageCourses: `${staticsPrefix}mut-pageCourses`,
    allTags: `${staticsPrefix}mut-allTags`,
    pageTags: `${staticsPrefix}mut-pageTags`,
    pageNewsLetters: `${staticsPrefix}mut-pageNewsLetters`,
    user: `${staticsPrefix}mut-user`,
  },
  actions: {
    init: `${staticsPrefix}action-init`,
    pagePosts: `${staticsPrefix}action-pagePosts`,
    allCategories: `${staticsPrefix}action-allCategories`,
    allCourses: `${staticsPrefix}action-allCourses`,
    pageCourses: `${staticsPrefix}action-pageCourses`,
    allTags: `${staticsPrefix}action-allTags`,
    pageTags: `${staticsPrefix}action-pageTags`,
    pageNewsLetters: `${staticsPrefix}action-pageNewsLetters`,
    user: `${staticsPrefix}action-user`,
  }
};
