<template>
  <select v-model="regionSelec">
    <option :value="{}">
      Seleccione Región
    </option>
    <option
      v-for="reg in regiones"
      :key="reg.codigo"
      :value="reg"
    >
      {{ reg.nombre }}
    </option>
  </select>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { cargarRegiones, RegionInfo } from '@/services/RegionService'
export default defineComponent({
  props: {
    region: {
      type: Object as PropType<Region>,
      required: true
    }
  },
  emits: ['update:region'],
  setup(props, context) {
    const regiones = ref<RegionInfo[]>([])
    const loadRegiones = async function () {
      regiones.value = await cargarRegiones()
    }
    const regionSelec = computed({
      get: () => props.region,
      set: (newVal) => {
        context.emit('update:region', newVal)
      }
    })
    loadRegiones()
    return {
      regiones,
      regionSelec
    }
  }
})
</script>
