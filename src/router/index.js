import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/components/notFound'
import E11 from '@/components/E11'
import E12 from '@/components/E12'
import E13 from '@/components/E13'
import E21 from '@/components/E21'
import E22 from '@/components/E22'
import E31 from '@/components/E31'
import E32 from '@/components/E32'
import E33 from '@/components/E33'

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
      component: E21
    },
    {
      path: '/2-2',
      name: '2-2',
      component: E22
    },
    {
      path: '/3-1',
      name: '3-1',
      component: E31
    },
    {
      path: '/3-2',
      name: '3-2',
      component: E32
    },
    {
      path: '/3-3',
      name: '3-3',
      component: E33
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})
