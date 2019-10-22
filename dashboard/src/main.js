// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import filters from './implementation/filters'
import VueCrud from './implementation/crudly/vueCrud'
import MyGate from './implementation/crudly/CRUDlyInstance'
import { store } from './store/store'
import Toasted from 'vue-toasted'
import VueMoment from 'vue-moment'
import './implementation/registerRootComponents'
import quillConfig from './implementation/quellConfiguration'
import vueFilterPrettyBytes from 'vue-filter-pretty-bytes'
import globalExceptionHandling from './implementation/globalExceptionHandling'
import configureToastedTemplates from './implementation/configureToastedTemplates'
import Datetime from 'vue-datetime'
import JsonViewer from 'vue-json-viewer'
import VueHighlightJS from 'vue-highlightjs'

quillConfig()

Vue.use(BootstrapVue)
Vue.use(VueCrud, MyGate)

Vue.use(Toasted, {
  position: 'bottom-right',
  duration: 3000,
  iconPack: 'fontawesome'
})

Vue.use(configureToastedTemplates)
Vue.use(globalExceptionHandling)
Vue.use(vueFilterPrettyBytes)
Vue.use(VueMoment)
Vue.use(filters)
Vue.use(Datetime)
Vue.use(JsonViewer)
Vue.use(VueHighlightJS)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
