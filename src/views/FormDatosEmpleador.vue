<template>
  <form class="form">
    <div class="flex w-full">
      <div>
        <input
          id="juridica"
          v-model="esPersonaJuridica"
          type="radio"
          :value="true"
        />
        <label for="juridica">Persona Juridica</label>
      </div>
      <div>
        <input
          id="natural"
          v-model="esPersonaJuridica"
          type="radio"
          :value="false"
        >
        <label for="natural">Persona Natural</label>
      </div>
    </div>
    <div class="w-1/3 input-field test">
      <label
        for="rut"
        class="text-left"
      >Rut</label>
      <input
        v-model="rut"
        class="border"
        type="text"
        placeholder="Rut"
      />
    </div>
    <div class="w-2/3 input-field">
      <label for="razonSocial">Razón Social o Nombre</label>
      <input
        v-model="razonSocial"
        type="text"
      >
    </div>
    <div class="w-1/3 input-field">
      <label for="direccion">Dirección</label>
      <input
        v-model="direccion"
        type="text"
      >
    </div>
    <div class="w-1/3 input-field">
      <label for="region">Región</label>
      <RegionDropdown v-model:region="regionSeleccionada" />
    </div>
    <div class="w-1/3 input-field">
      <label for="comuna">Comuna</label>
      <ComunaDropdown
        v-model:comuna="comunaSeleccionada"
        :region="regionSeleccionada.codigo"
      />
    </div>
    <div class="w-full input-field">
      <label for="nombRepLegal">Nombre Rep. Legal</label>
      <input
        v-model="nombRepLegal"
        type="text"
        :disabled="!esPersonaJuridica"
      >
    </div>
    <div class="w-1/3 input-field">
      <label for="runRepLegal">RUN Rep. Legal</label>
      <input
        v-model="runRepLegal"
        type="text"
        :disabled="!esPersonaJuridica"
      >
    </div>
    <div class="w-2/3 input-field">
      <label for="cargoRepLegal">Cargo Rep. Legal (Opcional)</label>
      <input
        v-model="cargoRepLegal"
        type="text"
        :disabled="!esPersonaJuridica"
      >
    </div>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import store from '@/store/contrato'
import RegionDropdown from '@/components/RegionDropdown.vue'
import ComunaDropdown from '@/components/ComunaDropdown.vue'

export default defineComponent({
  components: {
    RegionDropdown,
    ComunaDropdown
  },
  data() {
    const empleador = store.state.empleador
    const regionSeleccionada = computed({
      get: () => empleador.region,
      set: (nuevaReg) => {
        empleador.region = nuevaReg
      }
    })

    const comunaSeleccionada = computed({
      get: () => empleador.comuna,
      set: (nuevaCom) => {
        empleador.comuna = nuevaCom
      }
    })

    const esPersonaJuridica = computed({
      get: (): boolean => {
        return empleador.esPersonaJuridica
      },
      set: (nuevoValor: boolean) => {
        empleador.esPersonaJuridica = nuevoValor
      }
    })

    const rut = computed({
      get: () => {
        if (empleador.rut) {
          return empleador.rut
        }
        return ''
      },
      set: (nuevoRut: string) => {
        empleador.rut = nuevoRut
      }
    })

    const razonSocial = computed({
      get: () => {
        if (empleador.razonSocial) {
          return empleador.razonSocial
        }
        return ''
      },
      set: (nuevaRazon) => {
        empleador.razonSocial = nuevaRazon
      }
    })

    const nombRepLegal = computed({
      get: () => empleador.nombreRepLegal,
      set: (nuevoNomb) => {
        empleador.nombreRepLegal = nuevoNomb
      }
    })

    const direccion = computed({
      get: () => empleador.domicilio,
      set: (nuevoDom) => {
        empleador.domicilio = nuevoDom
      }
    })

    const runRepLegal = computed({
      get: () => empleador.rutRepLegal,
      set: (nuevoRut) => {
        empleador.rutRepLegal = nuevoRut
      }
    })

    const cargoRepLegal = computed({
      get: () => empleador.cargoRepLegal,
      set: (nuevoCargo) => {
        empleador.cargoRepLegal = nuevoCargo
      }
    })
    return {
      empleador,
      regionSeleccionada,
      comunaSeleccionada,
      esPersonaJuridica,
      rut,
      razonSocial,
      direccion,
      nombRepLegal,
      runRepLegal,
      cargoRepLegal
    }
  }
})
</script>
<style scoped>
.test {
  position: relative;
}
.test > input::placeholder {
  opacity: 0;
}
.test > label + input:not(:placeholder-shown),
.test > label + input:focus:not(:placeholder-shown) {
  background: red;
}
</style>
