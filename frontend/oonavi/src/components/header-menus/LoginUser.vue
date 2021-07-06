<template>
  <template v-if="!isLoggedIn">
    <login-button />
    <register-button />
  </template>
</template>

<script>
import LoginButton from "./LoginButton.vue";
import RegisterButton from "./RegisterButton.vue";
export default {
  name: "login-user",
  components: { RegisterButton, LoginButton },
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
