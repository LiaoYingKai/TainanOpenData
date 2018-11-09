// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faMap,
  faChartLine,
  faListUl
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
import {
  Radio,
  Slider,
  Table,
  TableColumn,
} from 'element-ui'
import VCharts from 'v-charts'


library.add(faMap)
library.add(faChartLine)
library.add(faListUl)

Vue.use(Radio)
Vue.use(Slider)
Vue.use(Table);
Vue.use(TableColumn);

Vue.use(VCharts)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})