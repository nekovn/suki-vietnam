<template>
  <button
    class="text-gray-800 hover:bg-gray-700 hover:text-white px-2 py-2 xl:px-3 lg:px-1 rounded-md text-sm font-medium focus:ring focus:outline-none focus:ring-offset-2 focus:ring-indigo-400 focus:ring-opacity-5"
    @click="openReg"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
    登録
  </button>
</template>

<script>
export default {
  name: "register-button",
  methods: {
    openReg() {
      this.$store.commit("setRegisterModal", true);
    },
  },
};
</script>

<style></style>
