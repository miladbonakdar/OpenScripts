export default {
  install(Vue) {
    Vue.prototype.$appConfig = {
      defaultPageSize: 10
    }
  }
}
