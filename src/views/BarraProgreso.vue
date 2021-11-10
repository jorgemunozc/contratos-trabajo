<template>
  <div class="flex w-full max-w-3xl h-3 border mx-auto">
    <div
      v-for="n in descPasos.length"
      :key="n"
      class="flex-grow relative h-full"
      :class="{'bg-green-300': currStep === n}"
    >
      <small class="w-full absolute bottom-4 text-xs">{{ descPasos[n - 1] }}</small>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const currNav = route.path.split('/')
    const currStep = ref(parseInt(currNav[currNav.length - 1]))
    const descPasos = [
      'Datos Empleador', 'Datos Trabajador',
      'Definición Trabajo',
      'Definición Jornada', 'Detalles Remuneracion',
      'Contrato de Trabajo'
    ]
    watch(
      () => route.path,
      newPath => {
        const path = newPath.split('/')
        currStep.value = parseInt(path[path.length - 1])
      }
    )
    return {
      currStep,
      descPasos
    }
  }
})
</script>
