<template>
  <section>
    <span class="font-bold">TERCERO</span> - De la jornada de trabajo. {{ DENOMINACION_TRABAJADOR }}
    cumplirá una jornada de {{ condicionesContrato.horasJornada }} horas semanales,
    distribuidas en {{ descripcionTipoJornada }}, las cuales estarán distribuidas
    de acuerdo a
    <template v-if="jornadaEstaEnReglamentoInterno">
      lo estipulado en el Reglamento Interno.
    </template>
    <template v-else>
      los siguientes horarios:
      <table
        v-for="(horario, turno) in horariosJornada"
        :key="turno"
      >
        <thead>
          <tr>
            <th colspan="2">
              {{ parsearNombreTurno(turno) }}
            </th>
          </tr>
        </thead>
        <tr
          v-for="dia in horario[8]"
          :key="dia"
        >
          <td>
            {{ nombreDias[Number(dia)] }}
          </td>
          <td class="pl-2">
            {{ horario[Number(dia)][0] }} - {{ horario[Number(dia)][1] }}
          </td>
        </tr>
      </table>
    </template>
  </section>
</template>
<script lang="ts">
import { RotacionTurnos, Turno } from '@/enums';
import store from '@/store/contrato';
import { DENOMINACION_TRABAJADOR } from '@/utils/constants'
import { defineComponent, computed } from 'vue'
import nombreDias from '@/utils/dias'
export default defineComponent({
  setup() {
    const condicionesContrato = store.state.condicionesContractuales

    const descripcionTipoJornada = computed(() => {
      return store.obtenerDescripcionTipoJornada(condicionesContrato.jornada)
    })

    const jornadaEstaEnReglamentoInterno = computed(() =>
      condicionesContrato.jornada === RotacionTurnos.Reglamento
    )

    const horariosJornada = computed(() =>
      store.obtenerHorariosJornada(condicionesContrato.jornada))

    function parsearNombreTurno(nombreTurno: Turno): string {
      let turnoParseado = ''
      switch(nombreTurno) {
        case Turno.Manhana:
          turnoParseado = 'Mañana'
          break
        case Turno.Tarde:
          turnoParseado = 'Tarde'
          break
        case Turno.Noche:
          turnoParseado = 'Noche'
        break
      }
      return turnoParseado
    }

    return {
      DENOMINACION_TRABAJADOR,
      descripcionTipoJornada,
      condicionesContrato,
      jornadaEstaEnReglamentoInterno,
      horariosJornada,
      nombreDias,
      parsearNombreTurno
    }
  }
});
</script>
