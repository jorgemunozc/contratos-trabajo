<template>
  <form class="form">
    <div class="input-field w-full">
      <label for="run">RUN</label>
      <input type="text" class="w-1/3">
    </div>
    <div class="input-field w-1/3">
      <label for="nombres">Nombres</label>
      <input type="text">
    </div>
    <div class="input-field w-1/3">
      <label for="apellidoP">Apellido Paterno</label>
      <input type="text">
    </div>
    <div class="input-field w-1/3">
      <label for="apellidoM">Apellido Materno</label>
      <input type="text">
    </div>
    <div class="input-field">
      <label for="nacionalidad">Nacionalidad</label>
      <input type="text">
    </div>
    <div class="w-2/3 flex">
      <div class="input-field">
        <label for="estadoCivil">Estado Civil</label>
        <select name="estadoCivil" id="estadoCivil">
          <option value="casado" selected>Casado/a</option>
          <option value="soltero">Soltero/a</option>
          <option value="viudo">Viudo/a</option>
        </select>
      </div>
      <div class="input-field">
        <label for="fechaNac">Fecha Nacimiento</label>
        <input type="date" name="fechaNac" id="fechaNac">
      </div>
    </div>
    <div class="input-field">
      <label for="direccion">Dirección</label>
      <input type="text">
    </div>
    <div class="input-field w-1/3">
      <label for="region">Región</label>
      <RegionDropdown v-model:region="regionSeleccionada"/>
    </div>
    <div class="input-field w-1/3">
      <label for="comuna">Comuna</label>
      <ComunaDropdown :region="regionSeleccionada"/>
    </div>
  </form>
</template>

<script lang="ts">
import RegionDropdown from '@/components/RegionDropdown.vue'
import ComunaDropdown from '@/components/ComunaDropdown.vue'

import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    RegionDropdown,
    ComunaDropdown
  },
  setup () {
    const regionSeleccionada = ref('0')
    return {
      regionSeleccionada
    }
  }
})
</script>
