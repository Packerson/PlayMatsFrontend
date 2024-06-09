<template>
  <q-header elevated>

    <div class="first-row">

      <div class="logo">
        <span>Logo should be here</span>
      </div>

      <div>
        <q-btn
          flat
          round
          dense
          label="PL"
          icon="img:/flags/pl.svg"
          class="q-mr-md"
        />
        <span class="q-mr-md">
          <q-icon name="phone" />
          Zadzwoń
          <q-tooltip>
            <span>123 456 789</span>
          </q-tooltip>
        </span>
        <q-btn
          flat
          round
          dense
          label="Napisz"
          icon="mail"
        />
      </div>
    </div>

    <div  class="second-row">
      <div class="q-mx-md">
        <q-btn
          v-for="item in menu"
          flat
          dense
          :label="item"
          :key="item"
          class="q-ml-xl menu-item"
        />
      </div>

    </div>


  </q-header>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TopHeader',
  setup() {

    const topMenu = [
      'Flaga/wybór języka', 'Telefon', 'Napisz',
    ]
    const menu = [
      'Maty', 'Tereny', 'Karty', 'Żetony', 'Akcesoria',
    ]
    return {
      menu,
      topMenu,
    }
  },
})
</script>

<style scoped lang="scss">

.q-header {
  background: linear-gradient(123.2deg, #a8a5a5 15.09%, #f3e4e4 102.56%);
  color: #000;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .first-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    .logo {
    font-size: 1.5rem;
    font-weight: bold;
    }
  }
  .second-row {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    .menu-item {
      color: black;
      font-size: 16px;
    }
  }
}

</style>
