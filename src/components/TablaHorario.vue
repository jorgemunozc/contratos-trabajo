<template>
  <table class="border bg-gray-300 table-fixed w-full text-sm">
    <thead>
      <tr>
        <th colspan="9">Distribución de la Jornada de Trabajo ({{ nombreJornada }})</th>
      </tr>
      <tr>
        <td></td>
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
        <td v-for="n in 7" :key="n" class="text-center">
          <input type="checkbox" name="lunes" :value="n - 1" v-model="diasSeleccionados" @change="manejarHorario"/>
        </td>
      </tr>
      <tr class="border w-full">
        <td>Hora de Inicio</td>
        <td v-for="i in 7" :key="i" class="text-center">
          <select :disabled="!estaSeleccionado(i - 1)" v-model="horario[i-1][0]">
            <template v-for="(j, k )  in 24" :key="j" >
              <option :value="k+':00'">{{ k }}:00</option>
              <option :value="k+':30'">{{ k }}:30</option>
            </template>
          </select>
        </td>
      </tr>
      <tr>
        <td>Hora de término</td>
        <td v-for="i in 7" :key="i" class="text-center">
          <select :disabled="!estaSeleccionado(i - 1)" v-model="horario[i-1][1]">
            <template v-for="(j, k )  in 24" :key="j" >
              <option :value="k+':00'">{{ k }}:00</option>
              <option :value="k+':30'">{{ k }}:30</option>
            </template>
          </select>
        </td>
      </tr>
    </tbody>
  </table>
  <div>
    Dias seleccionados: [{{ diasSeleccionados }}]
  </div>
  <div>
    {{horario}}
  </div>
</template>

<script lang="ts">

import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    tipoJornada: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const jornada: {[key: string] : string} = {
      j: 'jornada',
      m: 'manhana',
      t: 'tarde',
      n: 'noche'
    }
    // eslint-disable-next-line
    const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
    const diasSeleccionados = ref([] as number[])
    // eslint-disable-next-line
    const horario = ref({
      0: ['0:00', '0:00'],
      1: ['0:00', '0:00'],
      2: ['0:00', '0:00'],
      3: ['0:00', '0:00'],
      4: ['0:00', '0:00'],
      5: ['0:00', '0:00'],
      6: ['0:00', '0:00']
    })
    const nombreJornada = computed(
      () => {
        if (jornada[props.tipoJornada]) {
          return jornada[props.tipoJornada]
        }
        return 'jornada'
      })

    //
    const estaSeleccionado = function (dia: number) {
      return diasSeleccionados.value.indexOf(dia) !== -1
    }

    const manejarHorario = function (e: Event) {
      const checkbox = e.target as HTMLInputElement
      if (checkbox.checked) {
        console.log('seleccionado!')
      }
    }
    return {
      nombreJornada,
      // seleccionarTodos,
      diasSeleccionados,
      horario,
      estaSeleccionado,
      manejarHorario
    }
  }
})
</script>
