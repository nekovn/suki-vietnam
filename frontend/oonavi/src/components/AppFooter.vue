<template>
  <!-- footer  -->
  <footer class="bg-white relative dark:bg-gray-800">
    <div class="container mx-auto px-1 lg:px-6 sm:px-6">
      <footer-menu/>
      <copy-right />
    </div>
  </footer>
</template>

<script>
import CopyRight from "./CopyRight.vue";
import FooterMenu from './FooterMenu.vue';
export default {
  components: { CopyRight, FooterMenu },
};
</script>

<style></style>
