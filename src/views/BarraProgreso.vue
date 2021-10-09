<template>
  <div class="flex max-w-3xl h-4 border mx-auto my-2">
    <div v-for="(n, i) in 6" :key="n"
    class="flex-grow relative" :class="{'bg-green-300': currStep === n}"
    >
    <small class="w-full absolute bottom-4 text-xs">{{descPasos[i]}}</small>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup () {
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
