<template>
  <div
      class="
      flex
      m-10
      flex-grap
      p-10
      items-center
      flex-row
      shadow-md
      rounded
      space-x-5
      bg-white
    "
      @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)"
  >
    <ul>
      <draggable
          v-model="state.listLogo"
          item-key="title"
          id="category-1"
          group="drag"
          class="grid grid-flow-row grid-cols-5 gap-5 sm:grid-cols-9 sm:gap-9 2xl:gap-8 2xl:grid-cols-12"
          @end="end"
          :clone="cloneItemToCategory"
      >
        <template #item="{ element ,index}" :key="index">
          <li
              class="flex items-center justify-center hover:border-red-300"
          >
            <a :href="element.url" :title="element.title" target="_blank" v-if="element.image">
              <img
                  :place="index"
                  :src="element.image"
                  :alt="element.title"
                  class="w-28 h-auto "
              />
            </a>
            <a :href="element.url" :title="element.title" target="_blank" v-else>
              {{ element.title }}
            </a>
          </li>
        </template>
      </draggable>
    </ul>
  </div>
  <picture-pop-up @handleGetLogo="handleGetLogo"/>
</template>

<script>
import {onMounted, ref, reactive} from "vue";
import draggable from "vuedraggable";
import {useStore} from "vuex";
import {getUrlFromGG} from "../utilities/helps/getUrlFromGG";
import {getCloneItem} from "../utilities/helps/getCloneItem";
import {handleEvtEndLogo} from "../utilities/helps/handleEvtEndLogo";
import PicturePopUp from "./popup/PicturePopUp";
import {notification_error} from "../utilities/composition/useNotification";
import {notification} from "ant-design-vue"

export default {
  name: "logo-box",
  components: {
    PicturePopUp,
    draggable,
  },
  emits: ["handleNewListItems"],
  setup(_,{ emit }) {
    const store = useStore();
    const cloneData = ref([]);
    const state = reactive({
      listLogo: [],
    });
    function dragenter(evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }
    function handleGetLogo(data){
      const searchTitle = (element) => element.title === data.title;
      const setIndexLogo = state.listLogo.findIndex(searchTitle);
      const setIndexCategory = store.getters.getItems.findIndex(searchTitle);
      if(setIndexLogo !== -1 || setIndexCategory !== -1){
        notification_error(notification, `現在、「 ${data.title} 」が存在されています。`)
        return
      }
      state.listLogo.push(data)
    }
    function dragover(evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }
    async function drop(evt) {
      const result = await getUrlFromGG(evt, state.listLogo, [], store, 'LogoBox')
      if (result) {
        store.commit("setPictureModal", result)
      }
    }
    async function end(e) {
      const result = await handleEvtEndLogo(e, state.listLogo, store, cloneData.value)
      if (result) {
        if (result.type === "movedRow") {
          state.listLogo = result.list
        }
        if (result.type === "deleteItem") {
          state.listLogo = result.list
        }
        if (result.type === "movedColumn") {
          if(result.list){
            emit("handleNewListItems", result.list)
          }

        }
      }
    }
    function cloneItemToCategory({title, url, image, created, modified}) {
      const id = store.getters.getItems.length + 1;
      const result = getCloneItem(id, title, url, image, created, modified, cloneData)
      if (result) {
        return result
      }
    }
    onMounted(async () => {
      const data = await store.dispatch("getListLogoBox");
      if (data.status) {
        state.listLogo = store.getters.getListLogo;
      } else {
        alert("error");
      }
    });
    return {
      cloneItemToCategory,
      end,
      state,
      dragenter,
      drop,
      dragover,
      handleGetLogo
    };
  },
};
</script>

<style></style>