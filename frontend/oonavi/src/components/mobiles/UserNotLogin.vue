<template>
  <template v-if="!isLoggedIn">
    <div
      class="flex justify-items-center mb-2 items-center bg-gray-100 h-14 px-2 w-full rounded-md shadow-md  hover:bg-gray-500 hover:text-gray-50 cursor-pointer transition"
    >
      <login-button />
    </div>
    <div
      class="flex justify-items-center mb-2 items-center bg-gray-100 h-14 w-full px-2 rounded-md shadow-md  hover:bg-gray-500 hover:text-gray-50 cursor-pointer transition"
    >
      <register-button />
    </div>
  </template>
</template>

<script>
import LoginButton from "../header-menus/LoginButton.vue";
import RegisterButton from "../header-menus/RegisterButton.vue";
export default {
    name:'user-not-login',
  components: {
    RegisterButton,
    LoginButton,
  },
  computed: {
    isLoggedIn() {
      return  this.$store.getters.isLogin;
    },
  },
};
</script>

<style></style>
