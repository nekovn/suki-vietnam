<template>
    <div class="h-screen flex flex-row flex-wrap">
      <menu-profile/>
    <div class="bg-gray-200  dark:bg-black-alt flex-1 p-6 lg:mt-0 mt-4">
      <!-- General Report -->
      <div
        class="flex flex-col bg-white dark:bg-gray-800 m-auto w-full  h-full rounded-md shadow-xl"
      >
        <div class="flex justify-center mt-20  lg:mx-auto  mx-6 w-5/6  ">
          <form>
              <router-view></router-view>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuProfile from '../../components/profiles/MenuProfile.vue';

export default {
  components: { MenuProfile },
  };

</script>

<style></style>
