// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VModal from 'vue-js-modal'
import VueHighcharts from 'vue-highcharts'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: 'en-US',
  locales: {
    // you will need json-loader in webpack 1
    'en-US': require('vue-timeago/locales/en-US.json')
  }
})
Vue.use(VueLodash, lodash)
Vue.use(VueHighcharts);
Vue.use(VModal)
Vue.config.productionTip = false
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

