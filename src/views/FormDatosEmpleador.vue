<template>
  <form>
    <div>
      <div>
        <input type="radio" id="juridica" value="true" v-model="empleador.esPersonaJuridica"/>
        <label for="juridica">Persona Juridica</label>
      </div>
      <div>
        <input type="radio" id="natural" value="false" v-model="empleador.esPersonaJuridica">
        <label for="natural">Persona Natural</label>
      </div>
    </div>
    <div>
      <label for="rut">Rut</label>
      <input type="text" id="rut"/>
    </div>
    <div>
      <label for="razonSocial">Razón Social o Nombre</label>
      <input type="text" id="razonSocial">
    </div>
    <div>
      <label for="direccion">Dirección</label>
      <input type="text">
    </div>
    <div>
      <label for="region">Región</label>
      <input type="text">
    </div>
  </form>
</template>

<script>
import { defineComponent } from 'vue'

import store from '@/store/contrato'

export default defineComponent({
  setup () {
    const empleador = store.state.empleador
    return {
      empleador
    }
  }
})
</script>
