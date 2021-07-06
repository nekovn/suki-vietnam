<template>
  <div v-if="isGetCodeOpen">
    <section
        @click="close"
        class="z-20 h-screen w-screen bg-gray-500 fixed top-0 opacity-50"
    ></section>
    <div class="absolute inset-0">
      <div class="flex  h-full">
        <form-html :title="getTitle" :button="getButton" :level="parseInt(4)"/>
      </div>
    </div>
  </div>
</template>

<script>
import {computed} from "vue"
import {useStore} from "vuex"
import FormHtml from "./FormHtml";

export default {
  name: "SetNewPassword",
  components: {FormHtml},
  setup() {
    const store = useStore()
    const isGetCodeOpen = computed(() => store.state.isGetCodeOpen)
    const getTitle = computed(() => 'パスワードの再設定')
    const getButton = computed(() => '送信')
    close = () => {
      store.commit("setCodeModal", false)
    }

    return { isGetCodeOpen, close, getTitle, getButton }
  },
}
</script>

<style scoped>

</style>