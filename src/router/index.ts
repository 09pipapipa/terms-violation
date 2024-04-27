import { createRouter, createWebHistory } from 'vue-router'
import MainContents from '@/views/MainContents.vue'
import TestPage from '@/views/TestPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'MainContents',
      component: MainContents
    },

    {
      path: '/TestPage',
      name: 'test',
      component: TestPage
    }
  ]
})

export default router
