<template>
  <div class="flex column items-center q-mt-none">
    <q-carousel
      :model-value="slide"
      @update:model-value="updateSlide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-type="flat"
      control-color="white"
      navigation
      padding
      arrows
      height="400px"
      class="carousel"
    >

      <q-carousel-slide v-for="(matChunk, index) in matChunks" :key="index" :name="index" class="row no-wrap">
        <div v-for="mat in matChunk" :key="mat.id"
          class="flex column fit justify-start items-center q-gutter-xs q-col-gutter no-wrap q-ma-xs mat-container"
        >
          <q-img :src="mat.image" :alt="mat.name" class="img"></q-img>
          <div class="flex column mat-info">
              <div class="text-h5">{{ mat.name }}</div>
              <div>{{ mat.price }} zł</div>
            </div>
        </div>
      </q-carousel-slide>

    </q-carousel>

  </div>

</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'


export default defineComponent ({
  name: 'RandomMats',
  setup() {
    interface Mat {
      id: number,
      name: string,
      image: string,
      description: string,
      price: number
    }

    const mats = ref<Mat[] | null>(null);
    const slide = ref(0)

    const matChunks = computed(() => {
      const chunks = []
      if  (Array.isArray(mats.value) && mats.value.length !== 0) {
        for (let i = 0; i < mats.value.length; i += 3) {
          chunks.push(mats.value.slice(i, i + 3))
        }
      } else {
        console.error('No mats found')
      }

      return chunks
    })

    const updateSlide = (value:number) => {
      slide.value = value
    }

    // Sort shuffle mats
    const shuffleMats = () => {
      if ( Array.isArray(mats.value) && mats.value.length === 0) {
        return
      } else if ( Array.isArray(mats.value) ){
        mats.value.sort(() => Math.random() - 0.5)
      }
    }

    // Fetch mats from json file
    const fetchData = async () => {
      try {
        const response = await fetch('data/mats.json')

        if (!response.ok) {
          console.error('Failed to fetch mats')
          return
        }
        mats.value = await response.json()
        if ( Array.isArray(mats.value) && !mats.value.length) {
          console.error('No mats found')
        } else {
          shuffleMats()
          console.log('shuffleMats ', mats.value)
        }
      } catch (error) {
        console.error('Failed to fetch mats', error)
      }
    }


    onMounted( async() => {
      await fetchData()
    })

    return {
      matChunks,
      slide,
      updateSlide
    }
  }
})
</script>

<style scoped lang="scss">

.carousel {
  width: 80vw;
  max-width:1200px;
  background-color: transparent;

  .q-carousel-slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mat-container {
    width: calc(80vw / 3); // Adjust width to fit three items in the carousel view
    max-width: 400px; // Adjust as necessary to prevent overflow
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .img {
    width: 100%;
    height: auto;
    max-height: 200px;
    object-fit: contain;
  }

  .mat-info {
    width: 100%;
    text-align: center;
  }
}


</style>