<template>
  <section class="w-full flex-grow flex max-w-2xl justify-center">
    <iframe
      ref="iframePdf"
      class="w-full"
      type="application/pdf"
    />
  </section>
</template>

<script lang="ts">
import {defineComponent, ref, watch } from 'vue'
import ContratoPDF from '@/utils/pdf'
import cargarFakeInfo from '@/utils/faker'

export default defineComponent({
  setup() {
    const iframePdf = ref<HTMLIFrameElement>()
    // eslint-disable-next-line
    const doc = new ContratoPDF()
    function agregarHtml(): void {
      if (iframePdf.value !== undefined) {
        iframePdf.value.src = doc.output().toString()
      }
    }
    watch(
      () => iframePdf.value,
      () => {
        if (iframePdf.value){
          iframePdf.value.src = doc.output().toString()
        }
      }
    )
    return {
      iframePdf,
      agregarHtml
    }
  }
})
</script>
