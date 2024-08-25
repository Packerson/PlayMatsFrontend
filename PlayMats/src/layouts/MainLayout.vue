<template>
  <div class="q-pt-lg">
    <q-layout class="layout-main" view="hHh Lpr fFf">
      <TopHeader />

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
  </div>

</template>

<script lang="ts">


import { defineComponent } from 'vue'
import  TopHeader  from 'src/components/TopHeader.vue'


export default defineComponent({
  name: 'MainLayout',
  components: {
    TopHeader,
  },
  setup() {
    return {
    }
  }
})
</script>


<style lang="scss" scoped>
.layout-main {
    background: linear-gradient(123.2deg, #a8a5a5 15.09%, #E1E1E1 75.56%);
    // background: #ffffff;
}



</style>