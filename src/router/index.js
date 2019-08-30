import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login/login'
import layout from '@/view/layout/layout'
import casemanager from '@/view/casemanager/casemanager'
Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/cese',
      name: 'layout',
      component: layout,
      children: [
        {
          path: '/cese',
          name: 'casemanager',
          component: casemanager
        }
      ]
    }
  ]
})
