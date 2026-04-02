import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Formulaire from '../views/Formulaire.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import { isAuthenticated } from '../services/auth'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  {
    path: '/formulaire',
    name: 'formulaire',
    component: Formulaire,
    meta: { requiresAuth: true },
  },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }
  next()
})

export default router
