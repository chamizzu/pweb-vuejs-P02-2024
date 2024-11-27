import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddBookView from '@/views/AddBookView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/add-book',
      name: 'add-book',
      component: AddBookView
    },
    {
      path: '/detail-book',
      name: 'about',
      component: () => import('../views/BooksDetail.vue'),
    },
  ],
})

export default router
