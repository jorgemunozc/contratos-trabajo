<template>
  <p>
    <span class="font-bold">SEGUNDO</span> -
    Del lugar de prestación de los servicios.
    "{{ DENOMINACION_TRABAJADOR }}" desempeñará sus funciones en las instalaciones de
    "{{ DENOMINACION_EMPLEADOR }}" ubicadas en el domicilio:
    {{ condicionesContrato.direccionLabores }},
    comuna {{ condicionesContrato.comunaLabores.nombre }},
    Región {{ condicionesContrato.regionLabores.nombre }}.
  </p>
</template>
<script lang="ts">
import store from '@/store/contrato';
import { DENOMINACION_TRABAJADOR, DENOMINACION_EMPLEADOR } from '@/utils/constants'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const condicionesContrato = store.state.condicionesContractuales

    return {
      DENOMINACION_TRABAJADOR,
      DENOMINACION_EMPLEADOR,
      condicionesContrato,
    }
  }
});
</script>
