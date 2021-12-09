<template>
  <select v-model="selectedCom">
    <option :value="{}">
      Seleccione Comuna
    </option>
    <option
      v-for="com in comunas"
      :key="com.codigo"
      :value="com"
    >
      {{ com.nombre }}
    </option>
  </select>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue'
import { cargarComunas } from '@/services/ComunaService'
export default defineComponent({
  props: {
    region: {
      type: String,
      default: ''
    },
    comuna: {
      type: Object as PropType<Comuna>,
      required: true
    }
  },
  emits: ['update:comuna'],
  setup(props, { emit }) {
    const selectedCom = computed({
      get: () => props.comuna,
      set: (nuevaComuna) => {
        emit('update:comuna', nuevaComuna)
      }
    })
    const comunas = ref<Comuna[]>([])
    if (props.region) {
      cargarComunas(props.region)
        .then(
          (data) => {
            comunas.value = data
          }
        )
    }
    watch(
      () => props.region,
      async (nuevaRegion) => {
        comunas.value = await cargarComunas(nuevaRegion)
        selectedCom.value = {} as Comuna
      }
    )
    return {
      selectedCom,
      comunas
    }
  }
})
</script>
