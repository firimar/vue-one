import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import ONE from '@/components/ONE'
import ALL from '@/components/ALL'
import ME from '@/components/ME'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: index,
      redirect: '/ONE',
      children: [
        {
          path: 'ONE',
          component: ONE,
          meta: { keepAlive: true }
        },
        {
          path: 'ALL',
          component: ALL,
          meta: { keepAlive: true }
        },
        {
          path: 'ME',
          component: ME,
          meta: { keepAlive: true }
        }
      ]
    }
  ]
})
