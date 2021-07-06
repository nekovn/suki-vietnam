<template>
  <div v-if="isResetPasswordOpen">
    <section
        @click="close"
        class="z-20 h-screen w-screen bg-gray-500 fixed top-0 opacity-50"
    ></section>
    <div class="absolute inset-0">
      <div class="flex  h-full">
        <form-html title="パスワードの再設定" button="送信" :level="parseInt(3)"/>
      </div>
    </div>
  </div>
</template>

<script>
import {　computed　} from "vue"
import {　useStore　} from "vuex"
import FormHtml from "./FormHtml";
export default {
  name: "ResetPassword",
  components: {FormHtml},
  setup() {
    const store = useStore()
    const isResetPasswordOpen = computed(() => store.state.isResetPasswordOpen)
    close = () => {
      store.commit("setResetPasswordModal", false)
    }

    return {isResetPasswordOpen,　close}
  },

};
</script>

<style></style>
