<template>
  <div
    class="flex-grow"
  >
    <button
      class="sticky top-0 right-0
        bg-gray-600 p-2 text-white
        opacity-50 hover:opacity-100
      "
      @click="descargarEnPDF"
    >
      Descargar
    </button>
    <div
      ref="contrato"
      class="contrato"
    >
      <h1 class="text-center font-bold">
        Contrato de Trabajo
      </h1>
      <br>
      <IdentificacionPartes />
      <DescripcionFunciones />
      <LugarFunciones />
      <JornadaLaboral />
      <DetallesRemuneracion />
      <ObligacionesTrabajador />
      <DuracionContrato />
      <FechaIngresoTrabajador />
      <DomicilioJudicial />
      <CopiasContrato />
      <FirmasPartes />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import JornadaLaboral from './contrato/JornadaLaboral.vue';
import DetallesRemuneracion from './contrato/DetallesRemuneracion.vue';
import FirmasPartes from './contrato/FirmasPartes.vue';
import IdentificacionPartes from './contrato/IdentificacionPartes.vue';
import ObligacionesTrabajador from './contrato/ObligacionesTrabajador.vue';
import DescripcionFunciones from './contrato/DescripcionFunciones.vue';
import LugarFunciones from './contrato/LugarFunciones.vue';
import DuracionContrato from './contrato/DuracionContrato.vue';
import FechaIngresoTrabajador from './contrato/FechaIngresoTrabajador.vue';
import CopiasContrato from './contrato/CopiasContrato.vue';
import DomicilioJudicial from './DomicilioJudicial.vue';
import jsPDF, { jsPDFOptions } from 'jspdf';

export default defineComponent({
    components: {
    JornadaLaboral,
    DetallesRemuneracion,
    FirmasPartes,
    IdentificacionPartes,
    ObligacionesTrabajador,
    DescripcionFunciones,
    LugarFunciones,
    DuracionContrato,
    FechaIngresoTrabajador,
    CopiasContrato,
    DomicilioJudicial
  },
  setup() {
    const contrato = ref<HTMLElement>()
    function descargarEnPDF() {
      const pdfOptions: jsPDFOptions = {
        format: 'letter',
        orientation: 'portrait',
        unit: 'pt'
      }

      const doc = new jsPDF(pdfOptions)
      if (contrato.value !== undefined) {
        doc.html(contrato.value, {
          callback: function (doc) {
            doc.save()
          },
          x: 0,
          y: 0,
          autoPaging: 'text',
          margin: [12, 0, 18, 0],
          width: doc.internal.pageSize.getWidth(),
          windowWidth: 930,
        })
      }
    }

    return {
      contrato,
      descargarEnPDF
    }
  }
});
</script>

<style scoped>
.contrato {
  font-variant: normal;
  font-family: 'Arial', 'Helvetica', 'sans-serif';
  width: 90%;
  margin: 0 auto;
}
</style>
