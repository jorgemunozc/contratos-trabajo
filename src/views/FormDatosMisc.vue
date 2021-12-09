<template>
  <div class="form">
    <div class="w-full">
      <label for="sueldoBase">Sueldo Base</label>
      <input
        v-model="sueldoBase"
        type="number"
      >
    </div>
    <div class="w-full">
      <label for="">Fecha Ingreso Trabajador</label>
      <input
        v-model="fechaIngreso"
        type="date"
      >
    </div>
    <!-- <h1>Periodicidad y Forma de Pago</h1> -->
    <!-- <div class="w-full">
      <label for="periodoPago">Período de Pago</label>
      <select
        id="sueldoBase"
        name="sueldoBase"
      >
        <option value="m">
          Mensual
        </option>
        <option value="s">
          Semanal
        </option>
        <option value="d">
          Diaria
        </option>
        <option value="bm">
          Bimestral
        </option>
      </select>
    </div> -->
    <div class="flex flex-col">
      <label>Comuna celebracion contrato</label>
      <ComunaDropdown
        :region="'-1'"
        :comuna="comunaCelebracion"
        @update:comuna="comunaCelebracion = $event"
      />
    </div>
  </div>
</template>
<script lang="ts">
import store from '@/store/contrato'
import { defineComponent, computed } from 'vue'
import ComunaDropdown from '@/components/ComunaDropdown.vue';

export default defineComponent({
    components: { ComunaDropdown },
    setup() {
        const sueldoBase = computed({
            get: () => store.get("condicionesContractuales", "sueldoBase"),
            set: (nuevoSueldo: number) => {
                store.set("condicionesContractuales", "sueldoBase", nuevoSueldo);
            }
        });
        const comunaCelebracion = computed({
            get: () => store.state.comunaCelebracion,
            set: (nuevaComuna: Comuna) => store.state.comunaCelebracion = nuevaComuna
        });

        const fechaIngreso = computed({
          get: () => store.get('condicionesContractuales', 'fechaIngreso'),
          set: (nuevaFecha) => {
            store.set('condicionesContractuales', 'fechaIngreso', nuevaFecha)
          }
        })

        return {
            fechaIngreso,
            sueldoBase,
            comunaCelebracion
        };
    }
});
</script>
