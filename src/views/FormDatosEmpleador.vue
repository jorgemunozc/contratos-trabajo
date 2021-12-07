<template>
  <form
    class="form"
  >
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
        required
      />
      <small
        class="absolute bg-black text-white
          top-full px-2 text-xs
        "
      >
        {{ errores.rut }}
      </small>
    </div>
    <div class="w-2/3 input-field">
      <label for="razonSocial">Razón Social o Nombre</label>
      <input
        v-model="razonSocial"
        type="text"
      >
      <small
        class="absolute bg-black text-white
          top-full px-2 text-xs
        "
      >
        {{ errores.razonSocial }}
      </small>
    </div>
    <div class="w-1/3 input-field">
      <label for="domicilio">Dirección</label>
      <input
        v-model="domicilio"
        type="text"
      >
      <small
        class="absolute bg-black text-white
          top-full px-2 text-xs
        "
      >
        {{ errores.domicilio }}
      </small>
    </div>
    <div class="w-1/3 input-field">
      <label for="region">Región</label>
      <RegionDropdown v-model:region="regionSeleccionada" />
      <small
        class="absolute bg-black text-white
          top-full px-2 text-xs
        "
      >
        {{ errores.region }}
      </small>
    </div>
    <div class="w-1/3 input-field">
      <label for="comuna">Comuna</label>
      <ComunaDropdown
        v-model:comuna="comunaSeleccionada"
        :region="regionSeleccionada.codigo"
      />
      <small
        class="absolute bg-black text-white
          top-full px-2 text-xs
        "
      >
        {{ errores.comuna }}
      </small>
    </div>
    <div class="w-full input-field">
      <label for="nombreRepLegal">Nombre Rep. Legal</label>
      <input
        v-model="nombreRepLegal"
        type="text"
        :disabled="!esPersonaJuridica"
      >
      <small
        class="absolute bg-black text-white
          top-full px-2 text-xs
        "
      >
        {{ errores.nombreRepLegal }}
      </small>
    </div>
    <div class="w-1/3 input-field">
      <label for="rutRepLegal">RUN Rep. Legal</label>
      <input
        v-model="rutRepLegal"
        type="text"
        :disabled="!esPersonaJuridica"
      >
      <small
        class="absolute bg-black text-white
          top-full px-2 text-xs
        "
      >
        {{ errores.rutRepLegal }}
      </small>
    </div>
  </form>
  {{}}
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'

import store from '@/store/contrato'
import RegionDropdown from '@/components/RegionDropdown.vue'
import ComunaDropdown from '@/components/ComunaDropdown.vue'
import { onBeforeRouteLeave } from 'vue-router';

export default defineComponent({
  components: {
    RegionDropdown,
    ComunaDropdown
  },
  setup() {
    const regionSeleccionada = computed({
      get: () => store.get('empleador', 'region'),
      set: (nuevaReg: Region) => {
        store.set('empleador', 'region', nuevaReg)
      }
    })

    const comunaSeleccionada = computed({
      get: () => store.get('empleador', 'comuna'),
      set: (nuevaCom: Comuna) => {
        store.set('empleador', 'comuna', nuevaCom)
      }
    })

    const esPersonaJuridica = computed({
      get: (): boolean => {
        return store.get('empleador', 'esPersonaJuridica')
      },
      set: (nuevoValor: boolean) => {
        store.set('empleador', 'esPersonaJuridica', nuevoValor)
      }
    })

    const rut = computed({
      get: () => {
        if (store.get('empleador', 'rut')) {
          return store.get('empleador', 'rut')
        }
        return ''
      },
      set: (nuevoRut: string) => {
        store.set('empleador', 'rut', nuevoRut)
      }
    })

    const razonSocial = computed({
      get: () => {
        if (store.get('empleador','razonSocial')) {
          return store.get('empleador','razonSocial')
        }
        return ''
      },
      set: (nuevaRazon) => {
        store.set('empleador', 'razonSocial', nuevaRazon)
      }
    })

    const nombreRepLegal = computed({
      get: () => store.get('empleador', 'nombreRepLegal'),
      set: (nuevoNomb) => {
        store.set('empleador', 'nombreRepLegal', nuevoNomb)
      }
    })

    const direccion = computed({
      get: () => store.get('empleador','domicilio'),
      set: (nuevoDom) => {
        store.set('empleador', 'domicilio', nuevoDom)
      }
    })

    const rutRepLegal = computed({
      get: () => store.get('empleador', 'rutRepLegal'),
      set: (nuevoRut) => {
        store.set('empleador', 'rutRepLegal', nuevoRut)
      }
    })

    const errores: {[key: string]: string} = reactive({
      rut: '',
      razonSocial: '',
      domicilio: '',
      region: '',
      comuna: '',
      nombreRepLegal: '',
      rutRepLegal: '',
    })

    function limpiarErrores(): void {
      Object.keys(errores).forEach((key) => errores[key] = '')
    }

    function esInformacionValida(): boolean {
      limpiarErrores()
      let numeroCamposInvalidos = 0
      const camposInvalidos : string[] = []
      Object.entries(store.state.empleador).forEach(([campo, valorCampo]) => {
        if (['rutRepLegal', 'nombreRepLegal'].includes(campo) && !esPersonaJuridica.value) {
          return
        }
        if (typeof valorCampo === 'object' && !Object.entries(valorCampo).length) {
          numeroCamposInvalidos++;
          camposInvalidos.push(campo)
          errores[campo] = 'Seleccione una opción'
          console.log(errores[campo])
        } else if (campo !== 'esPersonaJuridica' && !valorCampo){
          numeroCamposInvalidos++
          errores[campo] = 'Ingrese un valor'
          camposInvalidos.push(campo)
        }
      })
      console.log(`campos invalidos: ${numeroCamposInvalidos}`)
      console.log(`campos: ${camposInvalidos.toString()}`)
      return numeroCamposInvalidos === 0
    }

    onBeforeRouteLeave((to, from) => {
      return esInformacionValida()
    })

    return {
      regionSeleccionada,
      comunaSeleccionada,
      esPersonaJuridica,
      rut,
      razonSocial,
      domicilio: direccion,
      nombreRepLegal,
      rutRepLegal,
      errores
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
