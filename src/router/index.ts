import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const FormDatosRemuneracion = () => import('@/views/FormDatosRemuneracion.vue')
const FormDatosEmpleador = () => import('@/views/FormDatosEmpleador.vue')
const FormDatosTrabajador = () => import('@/views/FormDatosTrabajador.vue')
const FormDatosServicios = () => import('@/views/FormDatosServicios.vue')
const FormDatosJornada = () => import('@/views/FormDatosJornada.vue')
const GenerarContrato = () => import('@/views/GenerarContrato.vue')
const ContratoPreview = () => import('@/views/ContratoPreview.vue')

const rutasPasosLlenadoForm = [
  FormDatosEmpleador,
  FormDatosTrabajador,
  FormDatosServicios,
  FormDatosJornada,
  FormDatosRemuneracion,
  ContratoPreview
]
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/contrato-trabajo',
    name: 'Home',
    component: GenerarContrato,
    children: crearRutasPasos()
  },
  {
    path: '/test',
    component: () => import('@/views/ContratoPreview.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function crearRutasPasos():Array<RouteRecordRaw> {
  return rutasPasosLlenadoForm.map((componente, index): RouteRecordRaw => {
    return {
      path: `${index + 1}`,
      component: componente,
    }
  })
}

export default router
