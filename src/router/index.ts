import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '@/views/Tasks.vue'
import Notifications from '@/views/Notifications.vue'
import Settings from '@/views/Settings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/tasks',
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: Tasks,
      meta: {
        title: 'Tasks',
      },
    },
    {
      path: '/notifications',
      name: 'Notifications',
      component: Notifications,
      meta: {
        title: 'Notifications',
      },
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        title: 'Settings',
      },
    },
  ],
})

router.beforeEach((to, from) => {
  document.title = (to.meta.title as string) || 'Default Title'
})

export default router
