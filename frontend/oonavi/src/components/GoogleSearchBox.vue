<template>
  <form
    class="shadow flex ml-5 lg:mb-0 mb-1"
  >
    <input type="hidden" value="ja" />
    <input
      class="rounded p-2 2xl:w-72 lg:h-9 dark:bg-gray-600 dark:text-white "
      type="search"
      autocomplete="off"
      v-model="search"
      placeholder="Google 検索..."
    />
    <button
      class="bg-white flex justify-end items-center text-blue-500 p-2  lg:h-9 "
      @click="searchItem"
    >
      <i class="material-icons">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          />
        </svg>
      </i>
    </button>
  </form>
</template>

<script>
import { ref } from "vue";
export default {
  name: "google-search-box",
  setup() {
    const search = ref("");
    const searchItem = (e) => {
      e.preventDefault();
      window.open("https://google.com/search?q=" + search.value.trim(),"_blank");
      search.value = "";
    };
    return { search, searchItem };
  },
};
</script>

<style></style>
