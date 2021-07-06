<template>
  <div
    class="hidden  relative  lg:flex flex-col flex-wrap bg-white dark:bg-gray-800 border-r border-gray-300  flex-none w-64 z-10"
  >
  <menu-icons/>
  </div>
</template>

<script>
import MenuIcons from './MenuIcons.vue';
export default {
  components: {MenuIcons },
  name: "menu-profile",
};
</script>
