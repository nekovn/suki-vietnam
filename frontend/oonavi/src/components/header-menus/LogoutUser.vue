<template>
  <template v-if="isLoggedIn">
      <logout-btn/>
    <!-- Profile dropdown -->
    <setting-button />
  </template>
</template>

<script>
import LogoutBtn from './LogoutBtn.vue';
import SettingButton from "./SettingButton.vue";
export default {
  components: { SettingButton, LogoutBtn},
  name: "logout-user",
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
