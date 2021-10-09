<template>
  <BarraProgreso />
  <router-view />
  <BotonesProgreso />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BarraProgreso from '@/views/BarraProgreso.vue'
import BotonesProgreso from '@/views/BotonesProgreso.vue'

export default defineComponent({
  components: {
    BarraProgreso,
    BotonesProgreso
  }
})
</script>
