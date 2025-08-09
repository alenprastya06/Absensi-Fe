// src/main.js
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import StudentsView from './views/StudentsView.vue'
import AttendanceView from './views/AttendanceView.vue'
import ReportsView from './views/ReportsView.vue'
import ClassesView from './views/ClassesView.vue'
import CreateUserView from './views/CreateUserView.vue' // Import komponen baru

const routes = [
  { path: '/', component: Home },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  {
    path: '/students',
    component: StudentsView,
    meta: { requiresAuth: true, roles: ['admin', 'secretary'] },
  },
  {
    path: '/attendance',
    component: AttendanceView,
    meta: { requiresAuth: true, roles: ['admin', 'secretary'] },
  },
  {
    path: '/reports',
    component: ReportsView,
    meta: { requiresAuth: true, roles: ['admin', 'secretary'] },
  },
  { path: '/classes', component: ClassesView, meta: { requiresAuth: true, roles: ['admin'] } },
  {
    path: '/users/create',
    component: CreateUserView,
    meta: { requiresAuth: true, roles: ['admin'] },
  }, // Rute baru
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  if (to.meta.requiresAuth && !token) {
    next('/')
  } else if (to.meta.roles && user && !to.meta.roles.includes(user.role)) {
    alert('Anda tidak memiliki akses ke halaman ini.')
    next('/dashboard')
  } else if (token && to.path === '/') {
    next('/dashboard')
  } else {
    next()
  }
})

createApp(App).use(router).mount('#app')
