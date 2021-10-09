<template>
  <form class="form">
    <div class="flex w-full">
      <div>
        <input type="radio" id="juridica" value="true" v-model="empleador.esPersonaJuridica"/>
        <label for="juridica">Persona Juridica</label>
      </div>
      <div>
        <input type="radio" id="natural" value="false" v-model="empleador.esPersonaJuridica">
        <label for="natural">Persona Natural</label>
      </div>
    </div>
    <div class="w-1/3 input-field">
      <label for="rut" class="text-left">Rut</label>
      <input class="border" type="text" id="rut"/>
    </div>
    <div class="w-2/3 input-field">
      <label for="razonSocial">Razón Social o Nombre</label>
      <input type="text" id="razonSocial">
    </div>
    <div class="w-1/3 input-field">
      <label for="direccion">Dirección</label>
      <input type="text" >
    </div>
    <div class="w-1/3 input-field">
      <label for="region">Región</label>
      <RegionDropdown v-model:region="regionSeleccionada"/>
    </div>
    <div class="w-1/3 input-field">
      <label for="comuna">Comuna</label>
      <ComunaDropdown :region="regionSeleccionada"/>
    </div>
    <div class="w-full input-field">
      <label for="repLegal">Nombre Rep. Legal</label>
      <input type="text">
    </div>
    <div class="w-1/3 input-field">
      <label for="rutRepLegal">RUN Rep. Legal</label>
      <input type="text">
    </div>
    <div class="w-2/3 input-field">
      <label for="cargoRepLegal">Cargo Rep. Legal (Opcional)</label>
      <input type="text">
    </div>
  </form>
</template>

<script>
import { defineComponent, ref } from 'vue'

import store from '@/store/contrato'
import RegionDropdown from '@/components/RegionDropdown.vue'
import ComunaDropdown from '@/components/ComunaDropdown.vue'

export default defineComponent({
  components: {
    RegionDropdown,
    ComunaDropdown
  },
  setup () {
    const empleador = store.state.empleador
    const regionSeleccionada = ref('')
    return {
      empleador,
      regionSeleccionada
    }
  }
})
</script>
