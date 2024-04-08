import { createRouter, createWebHistory } from 'vue-router'
import MainContents from '@/views/MainContents.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'MainContents',
      component: MainContents
    }
  ]
})

export default router
