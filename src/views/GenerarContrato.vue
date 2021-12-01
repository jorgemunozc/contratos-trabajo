<template>
  <div
    class="
    min-h-0 w-full max-w-3xl
    flex-grow flex flex-col items-end gap-y-2
    max-h-96
  "
  >
    <BarraProgreso />
    <router-view />
    <BotonesProgreso />
  </div>
  <!-- <div class="w-full">
    {{ test }}
  </div> -->yay
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import BarraProgreso from '@/views/BarraProgreso.vue'
import BotonesProgreso from '@/views/BotonesProgreso.vue'
import store from '@/store/contrato'


export default defineComponent({
  components: {
    BarraProgreso,
    BotonesProgreso,
    // ContratoPreview
  },
  setup() {
    // const horariosTurno = store.obtenerHorariosJornada(RotacionTurnos.ManTardeNoche)
    // cargarFakeInfo()
    const test = computed(() => store.state.condicionesContractuales)
    return {
      test
    }
  }
})
</script>
