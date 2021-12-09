<template>
  <div class="w-44">
    <div class="w-full border-b-2" />
    <div>
      {{ esEmpleador? 'FIRMA EMPLEADOR': 'FIRMA TRABAJADOR' }}
    </div>
    <div>
      {{ esEmpleador? 'RUT': 'RUN' }}: {{ rut }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    esEmpleador: {
      type: Boolean,
      default: true
    },
    rut: {
      type: String,
      required: true
    }
  }
})
</script>
