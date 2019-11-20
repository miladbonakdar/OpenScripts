import Vue from 'vue'
import Toasted from 'vue-toasted'

import globalExceptionHandling from '~/plugins/utils/globalExceptionHandling'
import configureToastedTemplates from '~/plugins/utils/configureToastedTemplates'
import utils from '~/plugins/utils/utils'
import appConfig from '~/plugins/appConfig'

Vue.use(Toasted, {
  position: 'bottom-right',
  duration: 5000,
  iconPack: 'fontawesome'
})
Vue.use(globalExceptionHandling)
Vue.use(configureToastedTemplates)
Vue.use(utils)
Vue.use(appConfig)
