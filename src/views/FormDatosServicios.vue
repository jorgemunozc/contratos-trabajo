<template>
  <form class="form">
    <div class="input-field w-full">
      <label for="cargo">Puesto de trabajo que desempeñará</label>
      <input type="text">
    </div>
    <div class="input-field">
      <label for="funciones">Funciones del puesto (opcional)</label>
      <textarea name="funciones" cols="30" rows="5"></textarea>
    </div>
    <div class="input-field w-full flex flex-wrap flex-row">
      <h1 class="w-full">Lugar donde se prestarán los servicios</h1>
      <div class="input-field w-full">
        <label for="direccion">Dirección</label>
        <input type="text">
      </div>
      <div class="input-field w-1/3">
        <label for="region">Región</label>
        <RegionDropdown v-model:region="regionSeleccionada" />
      </div>
      <div class="input-field w-1/3 mx-4">
        <label for="comuna">Comuna</label>
        <ComunaDropdown :region="regionSeleccionada" />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import ComunaDropdown from '@/components/ComunaDropdown.vue'
import RegionDropdown from '@/components/RegionDropdown.vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: {
    ComunaDropdown,
    RegionDropdown
  },
  setup () {
    const regionSeleccionada = ref('')
    return {
      regionSeleccionada
    }
  }
})
</script>
