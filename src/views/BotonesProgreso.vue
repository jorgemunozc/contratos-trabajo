<template>
  <div class="max-w-2xl mx-auto flex justify-end">
    <button class="bg-blue-700 text-white px-2 mr-2" @click="handleNav('prev')">Anterior</button>
    <button class="bg-blue-700 text-white px-2" @click="handleNav('next')">Siguiente</button>
  </div>
  {{currNav}}
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const route = useRoute()
    const router = useRouter()
    const MAXSTEP = 5
    const handleNav = function (navDirection: string) {
      const currNav = route.path.split('/')
      const currStep = parseInt(currNav[currNav.length - 1])
      currNav.pop()
      if (navDirection === 'prev' && currStep > 1) {
        currNav.push(String(currStep - 1))
        router.push(currNav.join('/'))
      } else if (navDirection === 'next' && currStep < MAXSTEP) {
        currNav.push(String(currStep + 1))
        router.push(currNav.join('/'))
      }
    }
    return {
      handleNav
    }
  }
})
</script>
