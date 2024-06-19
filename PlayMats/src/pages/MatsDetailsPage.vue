<template>
  <div class="flex row main-container q-ml-xl ">
    <div class="flex column">
      <q-carousel
        swipeable
        animated
        v-model="slide"
        height="500px"
        class="mat-carousel q-mt-md"
      >
        <q-carousel-slide
          v-for="(image, index) in matImages"
          :key="index"
          :name="index"
          :img-src="image"
          @click="openModal(image)"
        >
        </q-carousel-slide>
      </q-carousel>

      <!-- Thumbnails -->
      <div class="thumbnails flex row wrap justify-center">
        <img
          v-for="(image, index) in matImages"
          :key="index"
          :src="image"
          class="thumbnail"
          @click="slide = index"
        />
      </div>

    </div>


    <div id="details">

      Details
    </div>

     <!-- Modal for Enlarged Image -->
     <q-dialog v-model="isModalOpen">
      <q-card>
        <q-card-section>
          <img :src="currentImage" class="full-image"/>
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>


<script lang="ts">
import { defineComponent, useRoute, onMounted, watch, ref, computed } from 'src/utils/import';
import { Mat } from 'src/utils/models'

export default defineComponent({
  name: 'MatsDetailsPage',
  setup() {

    const route = useRoute();
    const matDetails = ref<Mat | null>(null);
    const slide = ref(1)
    const isModalOpen = ref(false)
    const currentImage = ref('')
    const matImages = computed(() => {
      return [
        matDetails.value?.image, matDetails.value?.image1, matDetails.value?.image2, matDetails.value?.image3
      ]
    })

    const openModal = (image: string) => {
      isModalOpen.value = true
      currentImage.value = image
      console.log('openModal', image);
      console.log('currentImage', currentImage.value);
    }

    const fetchMat = async () => {
      try {
        const matId = Number(route.params.matId);
        const response = await fetch('data/mats.json')

        if (!response.ok) {
          console.error('Failed to fetch mats')
          return
        }
        const temp = await response.json()
        matDetails.value = temp.find((mat: Mat) => mat.id === matId)
        if(!matDetails.value) {
          console.error('Mat not found')
          return
        }

        console.log('matDetails', matDetails.value);

      } catch (error) {
        console.error('Failed to fetch mats', error)
      }
    }

    onMounted(async () => {
      console.log('MatDetailPage mounted');

      await fetchMat();
    });

    watch(() => route.params.matId, async () => {
      console.log('router.params.id changed');
      await fetchMat();
    });

    return {
      matImages,
      matDetails,
      slide,
      isModalOpen,
      openModal,
      currentImage
    }
  }
})


</script>


<style scoped lang="scss">

.main-container {
  width: calc(100vw - 20vw);
}

.q-carousel {
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: calc(100vw - 50vw)
}

.thumbnail {
  width: 100px;
  height: 100px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
}
.full-image {
  width: 100%;
  height: auto;
}


</style>
