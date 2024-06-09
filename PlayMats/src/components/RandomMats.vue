<template>
  <div class="flex column items-center q-mt-none">
    <h2>Losowe maty</h2>
    <div class="q-pa-md">
      <q-carousel
        :model-value="slide"
        @update:model-value="updateSlide"
          transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        control-color="amber"
        navigation
        padding
        arrows
        height="300px"
        class="bg-grey-9 shadow-2 rounded-borders"
      >

        <q-carousel-slide v-for="mat in mats" :key="mat.id" :name="mat.id" style="width: 400px;">
          <q-img :src="mat.image" :alt="mat.name" class="img full-width">
            <div class="absolute-bottom bg-dark text-white text-center q-pa-sm">
              <div class="text-h5">{{ mat.name }}</div>
              <div>{{ mat.price }} $</div>
            </div>
          </q-img>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'


export default defineComponent ({
  name: 'RandomMats',
  setup() {
    const mats = ref(null);
    const randomMats = ref([]);
    const slide = ref(1);

    const updateSlide = (value:any) => {
      slide.value = value
    }

    const getRandomMats = () => {
      if (mats.value.length === 0) {
        return
      }
      let randomMat = mats.value[(Math.floor(Math.random() * mats.value.length))];
      mats.value = mats.value.filter((mat) => mat.id !== randomMat.id)
      randomMats.value.push(randomMat)

      return randomMats
    }


    onMounted( async() => {
      const response = await fetch('data/mats.json')

      if (!response.ok) {
        console.error('Failed to fetch mats')
        return
      }
      mats.value = await response.json()
      if (!mats.value.length) {
        console.error('No mats found')
      } else {
        // console.log('Mats', mats.value)
        // for (let i = 0; i < 3; i++) {
        //   getRandomMats()
        // }
      }
    })

    return {
      randomMats,
      mats,
      slide,
      updateSlide
    }
  }
})
</script>

<style scoped lang="scss">

.one-mat {
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }


  
  .span {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.img {
  width: 250px;
  height: 230px;
  max-height: 90%;
  max-width: 95%;

}


</style>