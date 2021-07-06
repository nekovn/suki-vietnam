<template>
  <div v-if="isLoginOpen">
    <section
        @click="close"
        class="z-20 h-screen w-screen bg-gray-500 fixed top-0 opacity-50"
    ></section>
    <div class="absolute inset-0">
      <div class="flex  h-full">
        <form-html :title="getTitle" :button="getButton" :level="parseInt(2)"/>
      </div>
    </div>
  </div>
</template>

<script>
import {computed} from "vue"
import {useStore} from "vuex"
import FormHtml from "./FormHtml";
export default {
  name: "LoginForm",
  components: {FormHtml},
  setup() {
    const store = useStore()
    const isLoginOpen = computed(() => store.state.isLoginOpen)
    const getTitle = computed(() => 'ログイン')
    const getButton = computed(() => 'ログイン')
    close = () => {
      store.commit("setLoginModal", false)
    }
    return { isLoginOpen, close, getTitle, getButton }
  },

};
</script>

<style></style>
