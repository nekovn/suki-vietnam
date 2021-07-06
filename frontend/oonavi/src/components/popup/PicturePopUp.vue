<template>
  <div v-if="isPictureOpen">
    <section
        @click="close"
        class="z-20 h-screen w-screen bg-gray-500 fixed top-0 opacity-50"
    ></section>
    <div class="absolute inset-0">
      <div class="flex  h-full">
        <div
            class="z-30 m-auto bg-white p-2 rounded-md shadow-md w-3/2"
        >
          <div class="p-2 my-2 transform hover:scale-105 cursor-pointer"
               v-for="(image,index) in getAllLogo" :key="index" v-if="getAllLogo.length">
            <div
                class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
                @click="handleGetImage(image)"
            >
              <div class="w-full flex justify-center transform motion-safe:hover:scale-110">
                <img class="w-28 h-auto" :src="image" :alt="getTitlePic"/>
              </div>
            </div>
          </div>
          <div v-else class="p-2 my-2 transform hover:scale-105 cursor-pointer">
            <div
                class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
                @click="handleGetImage('')"
            >
              <div class="w-full flex justify-center">
                <h1>{{ getTitlePic }}</h1>
              </div>
            </div>
          </div>

          <div v-if="getAllLogo.length" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <a-pagination
                :current="currentPage"
                :total="totalPage"
                @change="onChange"
                :defaultPageSize="3"
            />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref} from "vue"
import {useStore} from "vuex"

export default {
  name: "PicturePopUp",
  emits: ["handleGetLogo"],
  setup(_, {emit}) {
    const store = useStore()
    const sizePage = ref(3)
    const currentPage = ref(1)
    const isPictureOpen = computed(() => store.state.arrPicture.open)

    const startNumber = ref(0)
    const endNumber = ref(3)
    const getAllLogo = computed(() => store.state.arrPicture.image.slice(startNumber.value, endNumber.value))
    const getTitlePic = computed(() => store.state.arrPicture.title)
    const test = computed(() => store.state.arrPicture)
    const totalPage = computed(() => store.state.arrPicture.image.length)
    close = () => {
      startNumber.value = 0;
      endNumber.value = 3;
      currentPage.value = 1;
      store.commit("setPictureModal", {open: false, data: []})
    }

    function handleGetImage(image) {
      const arrPic = store.state.arrPicture
      const obj = {
        id: arrPic.id,
        place: arrPic.place,
        title: arrPic.title,
        url: arrPic.url,
        category: 1,
      }
      obj.image = image ? image : ''
      emit("handleGetLogo", obj);
      store.commit("setPictureModal", {open: false, data: []})
    }

    function onChange(current, pageSize) {
      currentPage.value = current;
      sizePage.value = pageSize;
      startNumber.value = parseInt((currentPage.value - 1)) * parseInt(sizePage.value);
      endNumber.value = (parseInt((currentPage.value - 1)) * parseInt(sizePage.value)) + parseInt(sizePage.value);
    }

    return {test, handleGetImage, isPictureOpen, close, getAllLogo, onChange, currentPage, totalPage, getTitlePic}
  },
}
</script>

<style scoped>

</style>