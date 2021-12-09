<template>
  <p>
    <span class="font-bold">CUARTO</span> -
    "{{ DENOMINACION_EMPLEADOR }}" se compromente a remunerar los servicios
    de "{{ DENOMINACION_TRABAJADOR }}" con un sueldo mensual de
    ${{ sueldoBase }} que será liquidado y pagado,
    por períodos vencidos y en forma proporcional a los días trabajados.
    De la remuneración se deducirán los impuestos; las cotizaciones de
    previsión o seguridad social, de salud, de seguro de cesantía; y
    todas aquellas deducciones, con los topes legales señalados en el
    artículo 54 y siguientes del Código del Trabajo, que el trabajador
    haya autorizado de manera expresa mediante carta autorización firmada.
  </p>
</template>
<script lang="ts">
import store from '@/store/contrato';
import { DENOMINACION_EMPLEADOR, DENOMINACION_TRABAJADOR } from '@/utils/constants'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  setup() {
    const sueldoBase = computed(() => {
      const formatter = new Intl.NumberFormat()
      const sueldo = store.state.condicionesContractuales.sueldoBase
      return formatter.format(sueldo)
    })

    return {
      DENOMINACION_EMPLEADOR,
      DENOMINACION_TRABAJADOR,
      sueldoBase
    }
  }
});
</script>
