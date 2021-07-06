<template>
  <div v-if="isSearchOpen 
  || query">
    <section
        @click="close"
        class="z-20 h-screen w-screen bg-gray-500 fixed top-0 opacity-50"
    ></section>
    <div class="absolute inset-0">
      <div class="flex  h-full">
        <div
            class="z-30 m-auto mx-2 bg-white p-2 rounded-md shadow-md lg:w-full xl:w-full w-full"
        >
          <h1 @click="close"
              class="bg-blue-400  text-white font-bold py-2 px-4 border-b-4 border-blue-500 rounded text-xl text-center my-2 cursor-pointer">
            「{{ query }}」の検索結果</h1>
          <table class="w-full border" v-if="items.length >1">

            <tbody>
            <tr class="bg-gray-100 text-center border-b text-sm text-gray-600 w-100/5" v-for="(item,key) in items "
                :key="key">
              <template v-for="(val,i) in item" :key="i">
                <td class="p-2 border-r hover:bg-gray-200 w-96 text-xs sm:text-base" >
                  <img :src="val.image" :alt="val.title"  class="w-6 h-3 mx-auto bg-no-repeat bg-center rounded-full text-blue-50 "/>
                  <a  :href="val.url" target="_blank" :title="val.title">{{val.title}}</a>
                </td>
              </template>

            </tr>

            </tbody>
          </table>
          <div v-else class="text-center">いつも当サイトをご覧頂きありがとうございます。「{{ query }}」で検索しましたがページが見つかりませんでした。</div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, reactive, ref, watch} from 'vue';
import {useRouter, useRoute} from 'vue-router'
import {useStore} from 'vuex'
import axios from "../../plugins/axios"

export default {
  name: "search-form",
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const query = ref()
    const state = reactive({
      items: [],
    })
    const isSearchOpen = computed(() => store.state.isSearchOpen)
    const items = computed(() => sliceIntoChunks(state.items, 5))
    watch(
        () => route.query.q,
        async (q) => {
          if (q) {
            query.value = q.trim()
            const {data} = await axios.get(`/list?search=` + query.value);
            state.items = data.results;
            store.commit("setIsLoading", false);
          } else {
            router.push("/")
          }
        }
    )

    function close() {
      store.commit("setIsLoading", false);
      store.commit("setSearchModal", false);
      query.value = "";
      router.push("/");
    }

    function sliceIntoChunks(arr, chunkSize) {
      const res = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
      }
      return res;
    }

    return {close, query, items, isSearchOpen}
  },

};
</script>

<style></style>
