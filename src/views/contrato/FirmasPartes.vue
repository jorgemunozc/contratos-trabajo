<template>
  <section class="flex  items-end justify-evenly mt-4 h-44">
    <FirmaBase
      :rut="rutEmpleador"
    />
    <FirmaBase
      :rut="runTrabajador"
      :es-empleador="false"
    />
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import FirmaBase from '@/components/FirmaBase.vue';
import store from '@/store/contrato';
export default defineComponent({
  components: {
    FirmaBase
  },
  setup(){
    const rutEmpleador = store.state.empleador.rut
    const runTrabajador = store.state.trabajador.run

    return {
      rutEmpleador,
      runTrabajador,
    }
  }
});
</script>
