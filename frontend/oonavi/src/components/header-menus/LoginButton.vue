<template>
  <button
    class="text-gray-800 hover:bg-gray-700 lg:px-1 xl:px-1 hover:text-white px-2 py-2 rounded-md text-sm font-medium focus:ring focus:outline-none focus:ring-offset-2 focus:ring-indigo-400 focus:ring-opacity-5"
    @click="openLogin"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 inline-block text-indigo-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
      />
    </svg>
    ログイン
  </button>
</template>

<script>
export default {
  name: "login-button",
  methods: {
    openLogin() {
      this.$store.commit("setLoginModal", true);
    },
  },
};
</script>

<style></style>
