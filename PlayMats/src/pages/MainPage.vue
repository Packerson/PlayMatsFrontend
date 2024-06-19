<template>

  <div class="flex column flex-center">

    <span class="text-subtitle1">Sklep w budowie, aby zamówić zadzwoń lub napisz</span>

    <RandomMats/>

    <div class="video-wrapper q-mt-xl q-mb-lg">
      <iframe
        src="https://www.youtube.com/embed/puEZyF2O9yI"
        title="Biwak z widokiem na Czaple Wyspy // Zimowy Bushcraft"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      >
      </iframe>
    </div>

    <ContactForm />
  </div>

</template>

<script lang="ts">

import RandomMats from 'src/components/RandomMats.vue'
import ContactForm from 'src/components/ContactForm.vue'

import { defineComponent } from 'src/utils/import'

export default defineComponent({
  name: 'MainPage',
  components: {
    RandomMats,
    ContactForm
  },
  setup() {
    return {
    }
  }
})



</script>

<style lang="scss" scoped>

 .video-wrapper {
  width: 55%;
  position: relative;
  padding-bottom: 31.25%; /* 16:9 ratio, 9/16 = 0.5625 */
  height: 0;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

</style>
