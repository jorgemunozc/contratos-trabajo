<template>
  <form class="form">
    <div class="input-field w-full">
      <label for="run">RUN</label>
      <input
        v-model="run"
        type="text"
        class="w-1/3"
      >
    </div>
    <div class="input-field w-1/3">
      <label for="nombres">Nombres</label>
      <input
        v-model="nombres"
        type="text"
      >
    </div>
    <div class="input-field w-1/3">
      <label for="apellidoP">Apellido Paterno</label>
      <input
        v-model="apellidoP"
        type="text"
      >
    </div>
    <div class="input-field w-1/3">
      <label for="apellidoM">Apellido Materno</label>
      <input
        v-model="apellidoM"
        type="text"
      >
    </div>
    <div class="input-field">
      <label for="nacionalidad">Nacionalidad</label>
      <input
        v-model="nacionalidad"
        type="text"
      >
    </div>
    <div class="w-2/3 flex">
      <div class="input-field">
        <label for="estadoCivil">Estado Civil</label>
        <select
          v-model="estadoCivil"
          name="estadoCivil"
        >
          <option
            v-for="estado in EstadoCivil"
            :key="estado"
            :value="estado"
          >
            {{ estado }}
          </option>
        </select>
      </div>
      <div class="input-field">
        <label for="fechaNac">Fecha Nacimiento</label>
        <input
          v-model="fechaNac"
          type="date"
        >
      </div>
    </div>
    <div class="input-field">
      <label for="direccion">Dirección</label>
      <input
        v-model="direccion"
        type="text"
      >
    </div>
    <div class="input-field w-1/3">
      <label for="region">Región</label>
      <RegionDropdown v-model:region="regionSeleccionada" />
    </div>
    <div class="input-field w-1/3">
      <label for="comuna">Comuna</label>
      <ComunaDropdown
        v-model:comuna="comunaSeleccionada"
        :region="regionSeleccionada.codigo"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import RegionDropdown from '@/components/RegionDropdown.vue'
import ComunaDropdown from '@/components/ComunaDropdown.vue'

import store from '@/store/contrato'
import { EstadoCivil } from '@/enums'
export default defineComponent({
  components: {
    RegionDropdown,
    ComunaDropdown
  },
  setup() {
    const trabajador = store.state.trabajador
    const regionSeleccionada = computed({
      get: () => store.get('trabajador', 'region'),
      set: (nuevaRegion) => {
        trabajador.region = nuevaRegion
      }
    })
    const comunaSeleccionada = computed({
      get: () => store.get('trabajador', 'comuna'),
      set: (nuevaComuna) => {
        trabajador.comuna = nuevaComuna
      }
    })

    const run = computed({
      get: () => store.get('trabajador', 'run'),
      set: (nuevoRun) => { trabajador.run = nuevoRun }
    })

    const nombres = computed({
      get: () => store.get('trabajador', 'nombre'),
      set: (nuevoNomb) => store.set('trabajador', 'nombre', nuevoNomb)
    })

    const apellidoP = computed({
      get: () => store.get('trabajador', 'apellidoPaterno'),
      set: (nuevoApellido) => { trabajador.apellidoPaterno = nuevoApellido }
    })

    const apellidoM = computed({
      get: () => store.get('trabajador', 'apellidoMaterno'),
      set: (nuevoApellido) => { trabajador.apellidoMaterno = nuevoApellido }
    })

    const estadoCivil = computed({
      get: () => store.get('trabajador', 'estadoCivil'),
      set: (nuevoEstado) => { trabajador.estadoCivil = nuevoEstado }
    })

    const direccion = computed({
      get: () => store.get('trabajador', 'domicilio'),
      set: (nuevaDir) => { trabajador.domicilio = nuevaDir }
    })

    const fechaNac = computed({
      get: () => store.get('trabajador', 'fechaNac'),
      set: (nuevaFecha) => { trabajador.fechaNac = nuevaFecha }
    })

    const nacionalidad = computed({
      get: () => store.get('trabajador', 'nacionalidad'),
      set: (nuevaNacionalidad) => {store.set('trabajador', 'nacionalidad', nuevaNacionalidad)}
    })

    return {
      regionSeleccionada,
      comunaSeleccionada,
      run,
      nombres,
      apellidoP,
      apellidoM,
      estadoCivil,
      direccion,
      fechaNac,
      nacionalidad,
      EstadoCivil
    }
  }
})
</script>
