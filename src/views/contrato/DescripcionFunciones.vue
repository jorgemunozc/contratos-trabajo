<template>
  <p>
    <span class="font-bold">PRIMERO</span> -
    De la naturaleza de los servicios. "{{ DENOMINACION_TRABAJADOR }}" se compromete
    a desempeñar el cargo de: {{ condicionesContrato.cargo }}
    <template v-if="condicionesContrato.funciones.length">
      Dentro de sus funciones deberá cumplir lo siguiente:
      <ul
        v-for="(funcion, index) in condicionesContrato.funciones"
        :key="index"
      >
        <li>{{ funcion }}</li>
      </ul>
    </template>
  </p>
</template>

<script lang="ts">
import store from '@/store/contrato';
import { defineComponent } from 'vue';
import { DENOMINACION_TRABAJADOR } from '@/utils/constants'

export default defineComponent({
  setup() {
    const condicionesContrato = store.state.condicionesContractuales

    return {
      condicionesContrato,
      DENOMINACION_TRABAJADOR,
    }
  }
});
</script>
