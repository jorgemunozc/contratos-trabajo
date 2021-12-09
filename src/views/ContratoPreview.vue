<template>
  <section class="w-full flex-grow max-w-2xl overflow-auto mx-auto border">
    <div class="transform scale-100">
      <ContratoTrabajo />
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent } from 'vue'
import ContratoTrabajo from './ContratoTrabajo.vue'

export default defineComponent({
  components: { ContratoTrabajo },
})
</script>
