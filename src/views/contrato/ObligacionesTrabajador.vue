<template>
  <section>
    <span class="font-bold">QUINTO</span> -
    Son obligaciones esenciales, de {{ DENOMINACION_TRABAJADOR }},
    cuya infracción las partes entienden como causa justificada de terminación
    del presente contrato, las siguientes:
    1.- Realizar su labor a plena satisfacción de su empleador manteniendo una
    permanente, oportuna y debida atención de su cargo;
    2.- Cumplir con la mayor diligencia, cuidado y buena voluntad los deberes
    que le imponen sus funciones o labores;
    3.- Mantener la más absoluta confidencialidad y reserva de los antecedentes,
    documentos o información, cualquiera fuera su naturaleza, de que tome
    conocimiento en el desempeño de los servicios encomendados, obligándose
    a no revelarlos;
    4.- Guardar la más estricta reserva frente a terceros, respecto de los
    negocios del empleador;
    5.- Mantener una presentación personal acorde con sus labores;
    6.- Informar y dar cuenta en forma permanente y oportuna a sus jefes
    sobre las labores que desarrolle, con todo detalle;
    7.- Cuidar y mantener, en perfecto estado de conservación, las máquinas,
    útiles y otros bienes de la empresa;
    8.- Cumplir las instrucciones y las órdenes que le imparta cualquiera de sus superiores;
    9.- En casos de inasistencia al trabajo, por enfermedad, el trabajador
    deberá justificarla -únicamente- con el correspondiente certificado médico,
    dentro del plazo de 24 horas, desde que aquél dejó de asistir al trabajo;
    10.- Colaborar activamente, en todas aquellas tareas en que se desempeñe
    representando al empleador;
    11.- Informar a su jefe directo de cualquier anomalía y eventual perjuicio
    que pudiere afectar al empleador que pudiere mitigarse o evitarse de conocerse;
    12.- En general toda conducta que pudiere perjudicar el nombre y/o prestigio del empleador
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DENOMINACION_TRABAJADOR } from '@/utils/constants'

export default defineComponent({
  setup() {
    return {
      DENOMINACION_TRABAJADOR
    }
  }
});
</script>
