import Vue from 'vue'
import Router from 'vue-router'
import vuex from 'vuex'
import index from '@/components/index'
import ONE from '@/components/ONE'
import ALL from '@/components/ALL'
import ME from '@/components/ME'
Vue.use(Router)
Vue.use(vuex)
export default new Router({
  routes: [{
    path: '/',
    name: '',
    component: index,
    children: [{
        path: '/',
        redirect: 'ONE'
      },
      {
        path: 'ONE',
        component: ONE,
        meta: {
          keepAlive: true
        },
      },
      {
        path: 'ALL',
        component: ALL,
        meta: {
          keepAlive: true
        },
      },
      {
        path: 'ME',
        component: ME,
        meta: {
          keepAlive: true
        },
      }
    ]
  }]
})