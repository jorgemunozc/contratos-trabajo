<template>
  <span class="font-bold">OCTAVO</span> -
  Para todos los efectos derivados de este contrato,
  las partes fijan su domicilio en la comuna de
  {{ comuna }}
  y prorrogan competencia para ante sus tribunales de justicia.
</template>
<script lang="ts">
import store from '@/store/contrato';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  setup() {
    const comuna = computed(() => {
      return store.state.empleador.comuna.nombre
    })

    return {
      comuna
    }
  }
});
</script>
