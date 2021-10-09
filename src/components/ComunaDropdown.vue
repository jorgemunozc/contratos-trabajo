<template>
  <select v-model="selectedCom">
    <option value="">Seleccione Comuna</option>
    <option v-for="comuna in comunas" :key="comuna.codigo" :value="comuna.codigo">{{comuna.nombre}}</option>
  </select>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { cargarComunas } from '@/services/ComunaService'
export default defineComponent({
  props: {
    region: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const selectedCom = ref('')
    const comunas = ref()
    watch(
      () => props.region,
      async (nuevaRegion) => {
        comunas.value = await cargarComunas(nuevaRegion)
        selectedCom.value = ''
      }
    )
    console.log(comunas.value)
    return {
      selectedCom,
      comunas
    }
  }
})
</script>
