<template>
  <form
    action="#"
    @submit.prevent="handleSearch"
    class="shadow flex ml-5 lg:mb-0 mb-1"
  >
    <input
      v-model="querySearch"
      class="rounded p-2 2xl:w-72 dark:bg-gray-600 dark:text-white h-9"
      type="search"
      ref="searchRef"
      placeholder="サイト内検索..."
    />
    <search-button />
  </form>
</template>
<script>
import SearchButton from "./header-menus/SearchButton.vue";
import {notification_error} from  "../utilities/composition/useNotification"
import {notification} from "ant-design-vue"
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
export default {
  name: "site-search-box",
  components: { SearchButton },
  setup() {
    const searchRef = ref("");
    const router = useRouter();
    const store = useStore();
    const querySearch = ref("");

    onMounted(() => {
      searchRef.value.focus();
    });

    function handleSearch() {
      store.commit("setIsLoading", true);
      if (querySearch.value) {
        router.push({
          name: "home",
          query: {
            q: querySearch.value.replace(/\s/g, ''),
          },
        });
        store.commit("setSearchModal", true);
        querySearch.value = "";
      } else {
        store.commit("setIsLoading", false);
        notification_error(notification, `検索テキストを入力してください。`)
      }
    }
    return { querySearch, handleSearch, searchRef };
  },
};
</script>

<style></style>
