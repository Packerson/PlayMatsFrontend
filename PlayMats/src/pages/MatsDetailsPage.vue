<template>
  <div class=" main-container q-ml-xl wrap ">
    <div class="flex row">

      <div class="flex column">
        <q-carousel
          swipeable
          animated
          v-model="slide"
          height="50vh"
          class="mat-carousel q-mt-xl"
        >
          <q-carousel-slide
            v-for="(image, index) in matImages"
            :key="index"
            :name="index"
            :img-src="image"
            @click="openModal(image ?? '')"
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

      <div id="details" class="q-mt-xl q-ml-xl">
        <div class="q-ml-md q-mt-md text-left">
          <div class="text-h2 q-mb-md">{{ matDetails?.name }}</div>
          <div class="q-mb-md">
            Dostępność:
            <span
              class="text-weight-bold"
              :style="matDetails?.availability !== 0 ? 'color: green' : 'color:red'"> {{ matDetails?.availability }}</span>
          </div>
          <div class="text-h5 q-mb-md">Cena: {{ matDetails?.price }} zł</div>
          <q-btn
            color="primary"
            label="Zapytaj o produkt"
            class="q-my-md q-mb-xl"
          />
          <div class="q-mb-xl">{{ matDetails?.description }}</div>
          <div class="">Dostępne rozmiary: {{ matDetails?.availableSizes }}</div>
        </div>
      </div>

      <!-- Modal for Enlarged Image -->
      <q-dialog v-model="isModalOpen">
        <img :src="currentImage" class="full-image"/>
      </q-dialog>

    </div>
    <div v-if="matDetails">
      <MatDetailsContactForm :mat="matDetails" />
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, useRoute, onMounted, watch, ref, computed } from 'src/utils/import';
import { fetchMat } from 'src/utils/functions';
import { Mat } from 'src/utils/models'
import MatDetailsContactForm from '../components/MatDetailsContactForm.vue';


export default defineComponent({
  name: 'MatsDetailsPage',
  components: {
    MatDetailsContactForm
  },
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

    /**
     * Open modal with enlarged image
     * @param image - image to display in modal
     */
    const openModal = (image: string) => {
      if (!image) return
      isModalOpen.value = true
      currentImage.value = image
    }

    /**
     * Fetch mat details on page load and when route changes
     */
    onMounted(async () => {
      const matId = Number(route.params.matId);
      matDetails.value = await fetchMat(matId);
    });

    /**
     * Fetch mat details when route changes
     */
    watch(() => route.params.matId, async () => {
      const matId = Number(route.params.matId);
      matDetails.value = await fetchMat(matId);
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
  width: calc(100vw - 5vw);
}

.q-carousel {
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: calc(100vw - 50vw);
  cursor: pointer;
}

.thumbnail {
  width: 5vw;
  height: 5vw;
  margin: 0.5vw;
  cursor: pointer;
  border-radius: 5px;
}

.q-dialog {
  .full-image {
    width: calc(100vw - 30vw);
    max-width: 900px;

    height: calc(100vw - 30vw);
    max-height: 900px;

  }
}

#details {
  width: calc(100vw - 65vw);
  min-height: 30vh;
  max-height: 50vh;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>