<template>
  <form class="form overflow-y-auto">
    <div class="input-field w-full">
      <label for="cargo">Puesto de trabajo que desempeñará</label>
      <input
        v-model="cargo"
        type="text"
      >
    </div>
    <div class="input-field">
      <div>
        <label for="funciones">Funciones del puesto (opcional)</label>
        <button
          class="bg-blue-50 px-1"
          type="button"
          @click="agregarInput"
        >
          +
        </button>
        <button
          class="bg-red-50 px-1"
          type="button"
          @click="funciones.pop()"
        >
          -
        </button>
      </div>
      <input
        v-for="(funcion, index) in funciones"
        :key="index"
        v-model="funciones[index]"
        type="text"
      />
    </div>
    <div class="input-field w-full flex flex-wrap flex-row">
      <h1 class="w-full">
        Lugar donde se prestarán los servicios
      </h1>
      <div class="input-field w-full">
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
      <div class="input-field w-1/3 mx-4">
        <label for="comuna">Comuna</label>
        <ComunaDropdown
          v-model:comuna="comunaSeleccionada"
          :region="regionSeleccionada.codigo"
        />
      </div>
    </div>
  </form>
  {{ funciones }}
</template>

<script lang="ts">
// TODO: reparar comuna y asociar store
import ComunaDropdown from '@/components/ComunaDropdown.vue'
import RegionDropdown from '@/components/RegionDropdown.vue'
import store from '@/store/contrato'
import { computed, defineComponent } from 'vue'
export default defineComponent({
  components: {
    ComunaDropdown,
    RegionDropdown
  },
  setup() {
    const regionSeleccionada = computed({
      get: () => store.get('condicionesContractuales', 'regionLabores'),
      set: (nuevaRegion) => {
        store.set('condicionesContractuales', 'regionLabores', nuevaRegion)
      }
    })
    const comunaSeleccionada = computed({
      get: () => store.get('condicionesContractuales', 'comunaLabores'),
      set: (nuevaComuna) => {
        store.set('condicionesContractuales', 'comunaLabores', nuevaComuna)
      }
    })

    const direccion = computed({
      get: () => store.get('condicionesContractuales', 'direccionLabores'),
      set: (nuevaDireccion) => store.set('condicionesContractuales', 'direccionLabores', nuevaDireccion)
    })

    const cargo = computed({
      get: () => store.get('condicionesContractuales', 'cargo'),
      set: (nuevoCargo) => store.set('condicionesContractuales', 'cargo', nuevoCargo)
    })

    const funciones = computed(
    () => store.get('condicionesContractuales', 'funciones')
    )

    function agregarInput() {
      const numeroFunciones = funciones.value.length
      if (numeroFunciones > 0 && funciones.value[numeroFunciones - 1].length === 0) {
        return
      }
      funciones.value.push('')
    }
    return {
      regionSeleccionada,
      comunaSeleccionada,
      direccion,
      cargo,
      funciones,
      agregarInput
    }
  }
})
</script>
