<template>
  <table class="border bg-gray-300 w-full text-sm mb-4">
    <thead>
      <tr>
        <th colspan="8">
          Distribución de la Jornada de Trabajo ({{ nombreJornada }})
        </th>
      </tr>
      <tr>
        <td />
        <!-- <td>Todos</td> -->
        <td>Lunes</td>
        <td>Martes</td>
        <td>Miércoles</td>
        <td>Jueves</td>
        <td>Viernes</td>
        <td>Sábado</td>
        <td>Domingo</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Distribución</td>
        <!-- <td class="text-center"><input type="checkbox" name="todos" @change="seleccionarTodos($event.target.checked)"/></td> -->
        <td
          v-for="dia in 7"
          :key="dia"
          class="text-center"
        >
          <input
            v-model="diasSeleccionados"
            type="checkbox"
            :value="dia"
          >
        </td>
      </tr>
      <tr class="border">
        <td>Hora de Inicio</td>
        <td
          v-for="i in 7"
          :key="i"
          class="text-center"
        >
          <select
            v-model="horario[i][0]"
            :disabled="!estaDiaSeleccionado(i)"
          >
            <template
              v-for="hora in range(24)"
              :key="hora"
            >
              <option :value="hora+':00'">
                {{ hora }}:00
              </option>
              <option :value="hora+':30'">
                {{ hora }}:30
              </option>
            </template>
          </select>
        </td>
      </tr>
      <tr>
        <td>Hora de término</td>
        <td
          v-for="i in 7"
          :key="i"
          class="text-center"
        >
          <select
            v-model="horario[i][1]"
            :disabled="!estaDiaSeleccionado(i)"
          >
            <template
              v-for="hora in range(24)"
              :key="hora"
            >
              <option :value="hora+':00'">
                {{ hora }}:00
              </option>
              <option :value="hora+':30'">
                {{ hora }}:30
              </option>
            </template>
          </select>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">

import { computed, defineComponent, PropType} from 'vue'
import { range } from '@/utils/numbers'
import store from '@/store/contrato'
import * as Enums from '@/enums'
export default defineComponent({
  props: {
    tipoTurno: {
      type: String as PropType<Turno>,
      required: true
    }
  },
  setup(props) {
    const jornada: Record<Turno,string> = {
      [Enums.Turno.SinTurno]: 'jornada',
      [Enums.Turno.Manhana]: 'manhana',
      [Enums.Turno.Tarde]: 'tarde',
      [Enums.Turno.Noche]: 'noche'
    }

    const templateHorario = [
      ['', ''],
      ['0:00', '0:00'],
      ['0:00', '0:00'],
      ['0:00', '0:00'],
      ['0:00', '0:00'],
      ['0:00', '0:00'],
      ['0:00', '0:00'],
      ['0:00', '0:00'],
      []
    ]
    const horario = computed(() => {
      if (!store.tieneHorarioTurno(props.tipoTurno)) {
        store.actualizarHorario(props.tipoTurno, templateHorario)
      }
      return store.obtenerHorarioTurno(props.tipoTurno)
    })
    const diasSeleccionados = computed({
      get: () => {
        return store.obtenerDiasTurno(props.tipoTurno)
      },
      set: (dias) => {
        store.actualizarDiasTurno(props.tipoTurno, dias)
      }
    })

    const nombreJornada = computed(
      () => {
        if (jornada[props.tipoTurno]) {
          return jornada[props.tipoTurno]
        }
        return 'jornada'
      })


    function estaDiaSeleccionado(dia: number): boolean {
      return diasSeleccionados.value.indexOf(dia.toString()) !== -1
    }

    return {
      jornada,
      nombreJornada,
      diasSeleccionados,
      horario,
      range,
      estaDiaSeleccionado
    }
  }
})
</script>
