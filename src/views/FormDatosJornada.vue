<template>
  <div class="form overflow-y-auto content-start">
    <div class="flex gap-x-4">
      <label
        for="jornadaEspecial"
        class="w-2/3"
      >
        El Trabajador se encuentra excluido de la limitación de jornada de trabajo conforme al Artículo 22
        Inciso 2° del Código del Trabajo
      </label>
      <div>
        <label
          for="si"
          class="mx-2"
        >SI</label>
        <input
          id="si"
          v-model="jornadaEspecial"
          type="radio"
          name="jornadaEspecial"
          :value="true"
        >
      </div>
      <div>
        <label
          for="no"
          class="mx-2"
        >NO</label>
        <input
          id="no"
          v-model="jornadaEspecial"
          type="radio"
          name="jornadaEspecial"
          :value="false"
        >
      </div>
    </div>
    <div class="input-field">
      <label for="duracionJornada">Duración de Jornada (en horas)</label>
      <input
        v-model="horasJornada"
        type="number"
        :disabled="jornadaEspecial"
      >
    </div>
    <div class="input-field">
      <label for="tipoJornada">Horarios y turnos</label>
      <select
        v-model="jornada"
        name="tipoJornada"
        :disabled="jornadaEspecial"
      >
        <option value="">
          Elija opción
        </option>
        <option :value="Enums.RotacionTurnos.Fijo">
          Horario fijo sin turnos
        </option>
        <option :value="Enums.RotacionTurnos.Reglamento">
          Turnos especificados en reglamento interno
        </option>
        <option :value="Enums.RotacionTurnos.ManTarde">
          Turno rotativo mañana y tarde
        </option>
        <option :value="Enums.RotacionTurnos.ManNoche">
          Turno rotativo mañana y noche
        </option>
        <option :value="Enums.RotacionTurnos.TardeNoche">
          Turno rotativo tarde y noche
        </option>
        <option :value="Enums.RotacionTurnos.ManTardeNoche">
          Turno rotativo mañana, tarde y noche
        </option>
      </select>
      Jornada: {{ jornada }}
    </div>
    <TablaHorario
      v-if="jornada === 'fijo'"
      :tipo-turno="turno.SinTurno"
    />
    <TablaHorario
      v-if="jornada.includes('m')"
      :tipo-turno="turno.Manhana"
    />
    <TablaHorario
      v-if="jornada.includes('t')"
      :tipo-turno="turno.Tarde"
    />
    <TablaHorario
      v-if="jornada.includes('n')"
      :tipo-turno="turno.Noche"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import TablaHorario from '@/components/TablaHorario.vue'
import store from '@/store/contrato'
import * as Enums from '@/enums'

export default defineComponent({
  components: {
    TablaHorario
  },
  setup() {
    const turno = Enums.Turno

    const jornadaEspecial = ref(store.esJornadaArticulo22())
    const jornada = computed<RotacionTurnos | ''>({
      get: () => {
       return store.obtenerTipoJornada()
      },
      set: (nuevaJornada) => {
        store.actualizarTipoJornada(nuevaJornada)
        store.quitarHorariosQueNoSonDeJornadaActual()
      }
    })
    const horasJornada = computed({
      get: () => store.get('condicionesContractuales', 'horasJornada'),
      set: (nuevasHoras) => {
        store.set('condicionesContractuales', 'horasJornada', nuevasHoras)
      }
    })

    function resetearCampos() {
      horasJornada.value = 0
      jornada.value = ''
    }

    watch(
      (jornadaEspecial),
      (esJornadaEspecial) => {
        if (esJornadaEspecial) {
          resetearCampos()
        }
      }
    )
    store.obtenerTipoJornada()
    return {
      jornada,
      horasJornada,
      turno,
      Enums,
      jornadaEspecial
    }
  }
})
</script>
