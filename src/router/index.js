import Vue from 'vue'
import Router from 'vue-router'
import SDGIndicator from '@/components/SDGIndicator'
import mapDistribution from '@/components/mapDistribution'
import chartPage from '@/components/chartPage'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'SDGIndicator',
    component: SDGIndicator
  }, {
    path: '/map',
    name: 'mapDistribution',
    component: mapDistribution
  }, {
    path: '/chart',
    name: 'chartPage',
    component: chartPage
  }, ]
})