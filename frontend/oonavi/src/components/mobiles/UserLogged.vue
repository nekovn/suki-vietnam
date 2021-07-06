<template>
  <template v-if="isLoggedIn">
    <div class="flex mt-4 ">
      <avatar-button />
    </div>
    <menu-icons mt="mt-2" />
    <!-- Logout-->
    <div
      class="flex justify-items-center mb-2 items-center bg-gray-100 h-14 w-full px-2 rounded-md shadow-md  hover:bg-gray-500 hover:text-gray-50 cursor-pointer transition"
    >
      <logout-btn />
    </div>
  </template>
</template>
<script>
import LogoutBtn from "../header-menus/LogoutBtn.vue";
import AvatarButton from "../header-menus/AvatarButton.vue";
import MenuIcons from "../profiles/MenuIcons.vue";
export default {
  name: "user-logged",
  components: {
    LogoutBtn,
    AvatarButton,
    MenuIcons,
  },
  computed: {
    isLoggedIn() {

      return this.$store.getters.isLogin;
    },
  },
};
</script>

<style></style>
