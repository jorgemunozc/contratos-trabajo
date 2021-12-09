<template>
  <p>
    <span class="font-bold">SEPTIMO</span> -
    Se deja constancia que el trabajador ingresó el {{ fechaIngreso }}
  </p>
</template>
<script lang="ts">
import store from '@/store/contrato';
import obtenerFechadeDateTime from '@/utils/fecha';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  setup() {
    const condicionesContrato = store.state.condicionesContractuales
    const fechaIngreso = computed(() => {
      const fecha = new Date(condicionesContrato.fechaIngreso)
      return obtenerFechadeDateTime(fecha)
    })

    return {
      fechaIngreso
    }
  }
});
</script>
