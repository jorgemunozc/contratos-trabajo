<template>
  <p>
    En {{ ciudadCelebracion }}, a {{ fechaCelebracion }},
    entre {{ empleador.razonSocial }}, RUT {{ empleador.rut }},
    <template v-if="tieneRepLegal">
      representada legalmente por don(ña) {{ empleador.nombreRepLegal }},
      RUN {{ empleador.rutRepLegal }}, ambos
    </template>
    con domicilio en {{ empleador.domicilio }},
    comuna de {{ empleador.comuna.nombre }},
    Región {{ empleador.region.nombre }}, en lo sucesivo
    "{{ DENOMINACION_EMPLEADOR }}" y don(ña) {{ nombreTrabajador }},
    RUN {{ trabajador.run }}, de nacionalidad {{ trabajador.nacionalidad }},
    nacido(a) el {{ fechaNacimiento }}, domiciliado en {{ trabajador.domicilio }},
    comuna de {{ trabajador.comuna.nombre }}, Región {{ trabajador.region.nombre }},
    estado civil {{ trabajador.estadoCivil }}, en
    adelante "{{ DENOMINACION_TRABAJADOR }}", han convenido el siguiente contrato de trabajo:
  </p>
  <br>
</template>
<script lang="ts">
import store from '@/store/contrato'
import { defineComponent, computed } from 'vue'
import {DENOMINACION_EMPLEADOR, DENOMINACION_TRABAJADOR} from '@/utils/constants'
import obtenerFechadeDateTime from '@/utils/fecha';
export default defineComponent({
  setup() {
    const trabajador = store.state.trabajador
    const empleador = store.state.empleador

    const ciudadCelebracion = computed(
      () => store.state.comunaCelebracion.nombre)

    const fechaCelebracion = computed(() => {
      const fecha = new Date()
      return obtenerFechadeDateTime(fecha)
    })

    const fechaNacimiento = computed(() => {
      let fecha = ''
      if (trabajador.fechaNac) {
        fecha = obtenerFechadeDateTime(new Date(trabajador.fechaNac))
      }
      return fecha
    })

    const tieneRepLegal = computed(() => {
      return empleador.esPersonaJuridica && empleador.nombreRepLegal.length
    })

    const nombreTrabajador = computed(() => {
      return `${trabajador.nombre}
      ${trabajador.apellidoPaterno}
      ${trabajador.apellidoMaterno}`
    })

    return {
      trabajador,
      empleador,
      fechaCelebracion,
      fechaNacimiento,
      ciudadCelebracion,
      nombreTrabajador,
      tieneRepLegal,
      DENOMINACION_TRABAJADOR,
      DENOMINACION_EMPLEADOR,
    }
  }
});
</script>
