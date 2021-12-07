<template>
  <section>
    En {{ ciudadCelebracion }}, a {{ fechaCelebracion }},
    entre {{ empleador.razonSocial }}, RUT {{ empleador.rut }},
    <template v-if="tieneRepLegal">
      representada legalmente por don(ña) {{ empleador.nombreRepLegal }},
      RUN {{ empleador.rutRepLegal }}, ambos
    </template>
    con domicilio en {{ empleador.domicilio }},
    comuna de {{ empleador.comuna.nombre }},
    Región {{ empleador.region.nombre }}, en lo sucesivo "{{ DENOMINACION_EMPLEADOR }}";
    y don(ña) {{ trabajador.nombre }},
    RUN {{ trabajador.run }}, de nacionalidad {{ trabajador.nacionalidad }},
    nacido(a) el {{ fechaNacimiento }}, domiciliado en {{ trabajador.domicilio }},
    comuna de {{ trabajador.comuna.nombre }}, Región {{ trabajador.region.nombre }},
    estado civil {{ trabajador.estadoCivil }}, en
    adelante "{{ DENOMINACION_TRABAJADOR }}", han convenido el siguiente contrato de trabajo:
  </section>
</template>
<script lang="ts">
import store from '@/store/contrato'
import { defineComponent, computed } from 'vue'
import {DENOMINACION_EMPLEADOR, DENOMINACION_TRABAJADOR} from '@/utils/constants'
export default defineComponent({
  setup() {
    const trabajador = store.state.trabajador
    const empleador = store.state.empleador
    const ciudadCelebracion = computed(
      () => store.get('empleador', 'comuna'))

    const fechaCelebracion = computed(() => {
      const fecha = new Date()
      return `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getUTCFullYear()}`
    })

    const fechaNacimiento = computed(() => {
      let fecha = ''
      if (trabajador.fechaNac) {
        fecha = new Date(trabajador.fechaNac).toISOString().split('T')[0]
      }
      return fecha
    })

    const tieneRepLegal = computed(() => {
      return empleador.esPersonaJuridica && empleador.nombreRepLegal.length
    })

    return {
      trabajador,
      empleador,
      fechaCelebracion,
      fechaNacimiento,
      ciudadCelebracion,
      tieneRepLegal,
      DENOMINACION_TRABAJADOR,
      DENOMINACION_EMPLEADOR,
    }
  }
});
</script>
