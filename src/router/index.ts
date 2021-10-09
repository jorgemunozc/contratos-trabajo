import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

import FormDatosRemuneracion from '@/views/FormDatosRemuneracion.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/contrato-trabajo',
    name: 'Home',
    component: () => import('@/views/GenerarContrato.vue'),
    children: [
      {
        path: '1',
        component: () => import('@/views/FormDatosEmpleador.vue')
      },
      {
        path: '2',
        component: () => import('@/views/FormDatosTrabajador.vue')
      },
      {
        path: '3',
        component: () => import('@/views/FormDatosServicios.vue')
      },
      {
        path: '4',
        component: () => import('@/views/FormDatosJornada.vue')
      },
      {
        path: '5',
        component: FormDatosRemuneracion
      }
    ]
  },
  {
    path: '/test',
    component: () => import('@/views/FormDatosEmpleador.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
