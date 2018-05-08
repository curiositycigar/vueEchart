import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/components/notFound'
import HelloWorld from '@/components/HelloWorld'
import E11 from '@/components/E11'
import E12 from '@/components/E12'
import E13 from '@/components/E13'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/1-1'
    },
    {
      path: '/1-1',
      name: '1-1',
      component: E11
    },
    {
      path: '/1-2',
      name: '1-2',
      component: E12
    },
    {
      path: '/1-3',
      name: '1-3',
      component: E13
    },
    {
      path: '/2-1',
      name: '2-1',
      component: HelloWorld
    },
    {
      path: '/2-2',
      name: '2-2',
      component: HelloWorld
    },
    {
      path: '/3-1',
      name: '3-1',
      component: HelloWorld
    },
    {
      path: '/3-2',
      name: '3-2',
      component: HelloWorld
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})
