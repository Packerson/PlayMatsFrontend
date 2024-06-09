<template>
  <q-layout class="layout-main" view="hHh Lpr fFf">
    <TopHeader />
    <div>
      <h2>Play Mats</h2>
    </div>
    <Q-page-container>
      <router-view />
    </Q-page-container>
  </q-layout>
</template>

<script lang="ts">


import { defineComponent } from 'vue'
import  TopHeader  from 'src/components/TopHeader.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    TopHeader

  },
  setup() {
    return {
    }
  }

})
</script>


<style lang="scss">
.layout-main {
    background: linear-gradient(123.2deg, #a8a5a5 15.09%, #E1E1E1 102.56%);
}

</style>