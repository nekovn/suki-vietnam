<template>
  <!-- Logo Box -->
  <logo-box @handleNewListItems="handleNewListItems"/>
  <section class="flex w-full">
    <div class="m-auto">
      <div class="flex flex-wrap justify-center my-2">
        <div class="w-full flex justify-center">
          <svg  @click="spin" xmlns="http://www.w3.org/2000/svg" :class="{'animate-spin':isAnimateSpin}" class="h-6 w-6 bg-green-400 rounded-full text-gray-100 cursor-pointer " fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      </div>
    </div>
  </section>

  <draggable group="drag" v-model="state.list" class="dropzone" item-key="id">
    <template #item="{ element }">
      <span class="trashzone" v-html="element.name"></span>
    </template>
  </draggable>
  <div class="lg:overflow-x-auto" >

    <div
        class="
        flex
        items-center
        justify-center
        bg-gray-100
        dark:bg-gray-800
        font-sans
        overflow-hidden
      "
    >


      <div class="sm:w-5/6 w-full xl:w-5/6">
        <div class="bg-white shadow-md rounded my-6">
          <!-- Items  in Table-->
          <items-in-table :newListItems="state.newListItems"/>
        </div>
      </div>
    </div>
  </div>
  <draggable group="drag" v-model="state.list" class="dropzone" item-key="id">
    <template #item="{ element }">
      <span class="trashzone" v-html="element.name"></span>
    </template>
  </draggable>
</template>
<script>
import LogoBox from "../components/LogoBox";
import ItemsInTable from "../components/ItemsInTable";
import draggable from "vuedraggable";
import { reactive, computed } from "vue";
import {useStore} from "vuex";
export default {
  name: "HomePage",
  components: {
    LogoBox,
    ItemsInTable,
    draggable,
  },
  setup() {
    const state = reactive({
      lists: [{ name: "" }],
      newListItems:[]
    });
    const isAnimateSpin = computed(()=>store.state.isAnimateSpin)
    const store = useStore()
    function handleNewListItems(data){
      state.newListItems = data
    }
    function spin(){
      const isAnimateSpin = store.state.isAnimateSpin
      store.commit("setAnimateSpin",!isAnimateSpin)
    }
    return { state , handleNewListItems, spin , isAnimateSpin};
  },
};
</script>
<style scoped>
.dropzone .trashzone {
  display: none;
}
</style>