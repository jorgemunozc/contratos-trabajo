<template>
  <div class="form overflow-y-auto content-start">
    <div>
      <label for="jornadaExenta">
        El Trabajador se encuentra excluido de la limitación de jornada de trabajo conforme al Artículo 22
        Inciso 2° del Código del Trabajo
      </label>
      <input
        type="radio"
        name="jornadaExtra"
        value="1"
      >SI
      <input
        type="radio"
        name="jornadaExtra"
        value="0"
      >NO
    </div>
    <div class="input-field">
      <label for="duracionJornada">Duración de Jornada (en horas)</label>
      <input type="text">
    </div>
    <div class="input-field">
      <label for="tipoJornada">Horarios y turnos</label>
      <select
        v-model="jornada"
        name="tipoJornada"
      >
        <option value="">
          Elija opcion
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
import { computed, defineComponent } from 'vue'
import TablaHorario from '@/components/TablaHorario.vue'
import store from '@/store/contrato'
import * as Enums from '@/enums'

export default defineComponent({
  components: {
    TablaHorario
  },
  setup() {
    const turno = Enums.Turno
    const jornada = computed<RotacionTurnos | ''>({
      get: () => {
       return store.obtenerTipoJornada()
      },
      set: (nuevaJornada) => {
        store.actualizarTipoJornada(nuevaJornada)
        store.quitarHorariosQueNoSonDeJornadaActual()
      }
    })


    store.obtenerTipoJornada()
    return {
      jornada,
      store,
      turno,
      Enums
    }
  }
})
</script>
<style scoped>
.form {
  scrollbar-color: rgb(68, 68, 68) gray;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background-color: rgba(128, 128, 128, 0.5);
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.5);
}
</style>
