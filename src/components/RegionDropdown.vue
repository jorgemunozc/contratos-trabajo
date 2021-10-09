<template>
  <select @input="$emit('update:region', $event.target.value)">
    <option value="">Seleccione Región</option>
    <option v-for="region in regiones" :key="region.codigo" :value="region.codigo">
      {{region.nombre}}
    </option>
  </select>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { cargarRegiones, RegionInfo } from '@/services/RegionService'
export default defineComponent({
  props: {
    region: {
      type: String
    }
  },
  emits: ['update:region'],
  setup () {
    const regiones = ref<RegionInfo[]>([])
    const loadRegiones = async function () {
      regiones.value = await cargarRegiones()
    }

    loadRegiones()

    return {
      regiones
    }
  }
})
</script>
