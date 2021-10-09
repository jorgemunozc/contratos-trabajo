<template>
<div class="form">
  <div>
    <label for="jornadaExenta">
      El Trabajador se encuentra excluido de la limitación de jornada de trabajo conforme al Artículo 22
      Inciso 2° del Código del Trabajo
    </label>
    <input type="radio" name="jornadaExtra" value="1">SI
    <input type="radio" name="jornadaExtra" value="0">NO
  </div>
  <div class="input-field">
    <label for="duracionJornada">Duración de Jornada (en horas)</label>
    <input type="text">
  </div>
  <div class="input-field">
    <label for="tipoJornada">Horarios y turnos</label>
    <select name="tipoJornada" v-model="jornada">
      <option value="fijo">Horario fijo sin turnos</option>
      <option value="regl">Turnos especificados en reglamento interno</option>
      <option value="mt">Turno rotativo mañana y tarde</option>
      <option value="mn">Turno rotativo mañana y noche</option>
      <option value="tn">Turno rotativo tarde y noche</option>
      <option value="mtn">Turno rotativo mañana, tarde y noche</option>
    </select>
    Jornada: {{jornada}}
  </div>
  <TablaHorario :tipoJornada="'j'" v-if="jornada === 'fijo'"/>
  <TablaHorario :tipoJornada="'m'" v-if="jornada.includes('m')"/>
  <TablaHorario :tipoJornada="'t'" v-if="jornada.includes('t')"/>
  <TablaHorario :tipoJornada="'n'" v-if="jornada.includes('n')"/>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TablaHorario from '@/components/TablaHorario.vue'

export default defineComponent({
  components: {
    TablaHorario
  },
  setup () {
    const jornada = ref('j')
    return {
      jornada
    }
  }
})
</script>
