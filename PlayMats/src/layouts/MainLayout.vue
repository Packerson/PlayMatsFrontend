<template>
  <div class="q-pt-lg">
    <q-layout class="layout-main" view="hHh Lpr fFf">
      <TopHeader />
    <div class="flex column q-mt-md flex-center">
      <h6>Sklep w budowie, aby zamówić zadzwoń lub napisz</h6>

      <RandomMats />

      <div class="video-wrapper x-mt-xl">
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

    </div>
    <q-page-container>
      <router-view />
    </q-page-container>

    <ContactForm />
  </q-layout>
  </div>

</template>

<script lang="ts">


import { defineComponent } from 'vue'
import  TopHeader  from 'src/components/TopHeader.vue'
import RandomMats from 'src/components/RandomMats.vue'
import ContactForm from 'src/components/ContactForm.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    TopHeader,
    RandomMats,
    ContactForm

  },
  setup() {
    return {
    }
  }

})
</script>


<style lang="scss">
.layout-main {
    background: linear-gradient(123.2deg, #a8a5a5 15.09%, #E1E1E1 75.56%);
}

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