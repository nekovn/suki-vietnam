<template>
  <div v-if="isCategoryOpen
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
          <div @click="close" class="flex items-center justify-center bg-blue-400  text-white font-bold py-2 px-4 border-b-4 border-blue-500 rounded text-xl text-center my-2 cursor-pointer">
            <div>
              <img
                  :src="getGroupImage"
                  :alt="getGroupName"
                  class="w-6 h-auto mx-auto bg-no-repeat bg-center rounded-full text-blue-50 "/>
            </div>
            <div class="ml-1">
              {{getGroupName || query}}
            </div>
          </div>

        <table class="w-full border" v-if="items.length >1">
            <tbody>
                <tr class="bg-gray-100 text-center border-b text-sm text-gray-600 w-100/5" v-for="(item,key) in items " :key="key">
                <template v-for="(val,i) in item" :key="i">
                     <td class="p-2 border-r hover:bg-gray-200 w-96 text-xs sm:text-base" >
                       <img :src="val.image" :alt="val.title"  class="w-10 h-auto mx-auto bg-no-repeat bg-center rounded-full text-blue-50 "/>
                       <a  :href="val.url" target="_blank" :title="val.title">{{val.title}}</a>
                     </td>
                </template>

                </tr>

            </tbody>
        </table>
         <div v-else class="text-center" >いつも当サイトをご覧頂きありがとうございます。「{{query}}」で検索しましたがページが見つかりませんでした。</div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, reactive, ref,watch} from 'vue';
import { useRouter, useRoute} from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: "category-group",
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const query = ref()
    const state = reactive({
        items:[],
     })
  const isCategoryOpen = computed(()=>store.state.isCategoryOpen)
  const getGroupName = computed(()=>store.state.getGroupName)
  const getGroupImage = computed(()=>store.state.setGroupImage)
  const items  = computed(()=> sliceIntoChunks(state.items,5))
    watch(
      () => route.query.g,
      async (id) => {
          if(id) {
            const getId = parseInt(id);
            query.value = getId
            const listItems = store.getters.getItems
                                      .filter((item) => getId === item.category)
                                      .sort((a,b) => a.place - b.place)
            if(listItems.length){
              state.items = listItems
              store.commit("setIsLoading",false);
            }else{
              state.items = []
              store.commit("setIsLoading",false);
            }


          } else {
               router.push("/")
               store.commit("setIsLoading",false);
               }
         }
    )
  function close(){
      store.commit("setIsLoading",false);
      store.commit("setCategoryModal", false);
      query.value="";
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
    return { close , query,state,getGroupName, items, isCategoryOpen, getGroupImage}
  },

};
</script>

<style></style>
