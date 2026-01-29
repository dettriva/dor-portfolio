// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ⭐ RUTA DE WELCOME (intro épica)
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('@/views/WelcomeView.vue')
    },
    // Rutas normales
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/sobre-mi',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/habilidades',
      name: 'skills',
      component: () => import('@/views/SkillsView.vue')
    },
    {
      path: '/proyectos',
      name: 'projects',
      component: () => import('@/views/ProjectsView.vue')
    },
    {
      path: '/experiencia',
      name: 'experience',
      component: () => import('@/views/ExperienceView.vue')
    },
    {
      path: '/contacto',
      name: 'contact',
      component: () => import('@/views/ContactView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// ⭐ GUARD: Redirigir a /welcome si no ha visto la intro
router.beforeEach((to, from, next) => {
  const introSeen = sessionStorage.getItem('introSeen')
  
  // Si no ha visto la intro y no está yendo a /welcome, redirigir
  if (!introSeen && to.path !== '/welcome') {
    next('/welcome')
  } else {
    next()
  }
})

export default router