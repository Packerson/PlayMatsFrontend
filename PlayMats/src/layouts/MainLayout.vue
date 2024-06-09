<template>
  <div class="q-pt-lg">
    <q-layout class="layout-main" view="hHh Lpr fFf">
      <TopHeader />
    <div class="flex column q-mt-md flex-center">
      <h6>Sklep w budowie, aby zamówić zadzwoń lub napisz</h6>

      <RandomMats />

      <iframe
        width="860"
        height="640"
        src="https://www.youtube.com/embed/puEZyF2O9yI"
        title="Biwak z widokiem na Czaple Wyspy // Zimowy Bushcraft"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        class="q-mt-xl"
      >
      </iframe>

    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  </div>

</template>

<script lang="ts">


import { defineComponent } from 'vue'
import  TopHeader  from 'src/components/TopHeader.vue'
import RandomMats from 'src/components/RandomMats.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    TopHeader,
    RandomMats

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

</style>