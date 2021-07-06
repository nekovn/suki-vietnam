<template>
  <div class="h-screen flex flex-row flex-wrap">
    <div class="bg-gray-200  dark:bg-black-alt flex-1 p-6 lg:mt-0 mt-4">
      <div
          class="flex flex-col bg-white dark:bg-gray-800 m-auto w-full  h-full rounded-md shadow-xl"
      >
        <div class="flex justify-center lg:mt-20 xl:mt-20 2xl:mt-20 mt-1 lg:mx-auto  mx-6 w-5/6  ">
            <router-view></router-view>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

</style>