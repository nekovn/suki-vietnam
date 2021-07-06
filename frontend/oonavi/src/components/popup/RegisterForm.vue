<template>
  <div v-if="isRegOpen">
    <section
        @click="close"
        class="z-20 h-screen w-screen bg-gray-500 fixed top-0 opacity-50"
    ></section>
    <div class="absolute inset-0">
      <div class="flex  h-full">
        <form-html :title="getTitle" :button="getButton" :level="parseInt(1)"/>
      </div>
    </div>
  </div>
</template>

<script>
import {computed} from "vue"
import {useStore} from "vuex"
import FormHtml from "./FormHtml";

export default {
  name: "register-form",
  components: {FormHtml},
  setup() {
    const store = useStore()
    const isRegOpen = computed(() => store.state.isRegOpen)
    const getTitle = computed(() => '登録')
    const getButton = computed(() => '登録')
    close = () => {
      store.commit("setRegisterModal", false)
    }
    return {isRegOpen, close, getTitle, getButton}
  },

};
</script>

<style></style>
