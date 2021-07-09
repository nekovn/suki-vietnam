<template>
  <table class="w-full grid-cols-5 overflow-hidden">
    <tbody class="text-sm font-light">
    <draggable v-if="state.list.length" v-model="state.list" item-key="id" @end="handleEndGroup">
      <template #item="{ element }">
        <tr class="border-b border-gray-200 hover:bg-gray-100" :title="element.title">
          <td
              class="
                w-24
                border-r-2
                bg-blue-50
                p-2
                text-center
              "
          >
            <img
                :place="element.place"
                :src="element.image"
                :alt="element.title"
                :class="{'animate-spin':isAnimateSpin}"
                class="w-6 h-auto mx-auto bg-no-repeat bg-center rounded-full text-blue-50 mt-2"
            />
            <a
                v-if="element.title.length < 10"
                href="#"
                class="font-medium text-blue-400"
                @click="handleGroup(element.id, element.title, element.image)"
                :title="element.title"
            >

              {{ element.title }}
            </a
            >
            <a
                v-else
                href="#"
                @click="handleGroup(element.id)"
                class="font-medium text-blue-400"
                :title="element.title"
            >{{ element.title.substring(0, 10) + ".." }}</a
            >
          </td>
          <div
              @drop="drop($event)"
              @dragenter="dragenter($event)"
              @dragover="dragover($event)"
          >
            <draggable
                v-model="element.data"
                item-key="id"
                class="grid grid-flow-col grid-cols-5"
                :group="{'drag':isAnimateSpin}"
                @change="log"
                @end="end"
                :clone="cloneItem"
                :id="`category-` + element.id"
            >
              <template #item="{ element }">
                <td
                    class="p-2 sm:px-2 lg:px-2 xl:px-4 2xl:px-5 text-left"
                    :title="element.title"
                >
                  <div
                      class="flex items-center justify-center"
                      :id="`category-` + element.category"
                  >
                    <a
                        :href="element.url"
                        :class="{'animate-bounce':isAnimateSpin}"
                        class="
                          font-light
                          text-xs
                          w-12
                          lg:text-sm
                          lg:w-full
                          sm:w-full
                          sm:text-sm
                          xl:text-sm
                          xl:w-full
                          2xl:w-full
                          2xl:text-lg
                          text-gray-700
                        "
                        :title="element.title"
                        :id="`place-` + element.id"
                        target="_blank"
                    >
                      {{ element.title }}
                    </a>

                  </div>
                </td>
              </template>
            </draggable>
          </div>
        </tr>
      </template>
    </draggable>
    <!-- no items -->
    <no-items-in-table v-else/>
    </tbody>
  </table>
  <pagination-items
      :totalItem="state.totalItem"
      @getPagination="getPagination"
      v-if="state.list.length"
  />
  <item-pop-up @handleGetItem="handleGetLogo"/>
</template>
<script>
import {useRouter} from "vue-router";
import {reactive, onMounted, toRef, ref, computed} from "vue";
import draggable from "vuedraggable";
import PaginationItems from "./PaginationItems";
import {useStore} from "vuex";
import NoItemsInTable from "./NoItemsInTable.vue";
import {getUrlFromGG} from "../utilities/helps/getUrlFromGG";
import {handleEventEnd} from "../utilities/helps/handleEventEnd";
import {getCloneItem} from "../utilities/helps/getCloneItem";
import ItemPopUp from "./popup/ItemPopUp";
import {notification_error} from "../utilities/composition/useNotification";
import {notification} from "ant-design-vue"
export default {
  name: "itemsintable",
  components: {ItemPopUp, draggable, PaginationItems, NoItemsInTable},
  props: {
    newListItems: Array,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const listItems = toRef(props, "newListItems");
    const cloneData = ref([]);
    const isAnimateSpin = computed(()=>store.state.isAnimateSpin)
    const state = reactive({
      totalItem: 10,
      totalLogo: 10,
      categories: [],
      items: [],
      list: [],
      id: "",
    });

    function dragenter(evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }

    function dragover(evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }
    function handleEndGroup(e) {
      const valueNewIndex =
          parseInt(e.newIndex) === 10 ? parseInt(e.newIndex) - 1 : parseInt(e.newIndex) + 1;
      const elmChildren = e.to.children[valueNewIndex];
      const elmNewTitle = elmChildren.title;
      const searchNewTitle = (element) => element.title === elmNewTitle;
      const new_index = state.categories.findIndex(searchNewTitle);
      const searchOddTitle = (element) => element.title === e.item.title;
      const old_index = state.categories.findIndex(searchOddTitle);
      if (new_index >= state.categories.length) {
        let k = new_index - state.categories.length + 1;
        while (k--) {
          state.categories.push(undefined);
        }
      }


      if (new_index > old_index) {
        state.categories.splice(new_index - 1, 0, state.categories.splice(old_index, 1)[0]);
      } else {
        state.categories.splice(new_index, 0, state.categories.splice(old_index, 1)[0]);
      }

      let flag = 1
      state.categories.forEach((val, index) => {
        val.place = flag;
        flag++;
      })
      state.categories = state.categories.sort((a, b) => a.place - b.place)
    }

    async function handleGetLogo(data){
      const searchTitle = (element) => element.title === data.title;
      const setIndexItem = state.items.findIndex(searchTitle);
      const setIndexLogo = store.getters.getListLogo.findIndex(searchTitle);
      if(setIndexItem !== -1 || setIndexLogo !== -1){
        notification_error(notification, `現在、「 ${data.title} 」が存在されています。`)
        return
      }
      const ItemsFromGG = store.state.ItemsFromGG
      const obj = {
        newData:data,
        newIndex: ItemsFromGG.newIndex,
        item: ItemsFromGG.item,
        category: ItemsFromGG.category,
      }
      const getAddedItem = await store.dispatch("getItemFromLogo", obj);
      if (getAddedItem.status) {
        state.list = store.getters.getListItems
      } else {
        notification_error(notification, `もう一度やり直してください。`)
      }
    }
    async function drop(evt) {
      const result = await getUrlFromGG(evt, state.items, state.categories, store, 'ItemsInTable');
      if (result) {
        store.commit("setOpenItemPop", true)
        store.commit("setItemPopModal", result.newData)
        store.commit("setItemsFromGG", result.data)
      }
    }

    async function end(e) {
      const result = await handleEventEnd(
          e,
          cloneData,
          store,
          state.items,
          state.categories,
          state.id
      );
      if (result) {
        if (result.type === "movedRow") {
          state.list = result.list;
          state.items = result.items;
          state.categories = result.category;
        }
        if (result.type === "movedColumn") {
          state.list = result.list;
          state.items = result.items;
          state.categories = result.category;
        }
        if (result.type === "deleteItem") {
          state.list = result.list;
          state.items = result.items;
          state.categories = result.category;
        }
      }
    }

    async function log(evt) {
      if (evt.removed && !evt.removed.newIndex) {
        state.id = evt.removed.element.id;
      }

      if (evt.added) {
        state.list = state.list.map((data) => {
          if (data.data.length >= 6) {
            const newData = data.data.slice(0, 5);
            return {...data, data: newData};
          }
          return {...data};
        });
      }
    }

    function cloneItem({id, title, url, image, created, modified}) {
      state.items = store.getters.getItems.filter((item) => item.id !== id);
      const result = getCloneItem(
          state.totalLogo,
          title,
          url,
          image,
          created,
          modified,
          cloneData
      );
      if (result) {
        return result;
      }
    }

    onMounted(async () => {
      const data = await store.dispatch("getListCategory");
      if (data.status) {
        state.list = listItems.value.length
            ? listItems.value
            : store.getters.getListItems;
        state.totalItem = store.getters.getTotalItems;
        state.totalLogo = store.getters.getCountLogo;
        state.categories = store.getters.getCategories;
        state.items = store.getters.getItems;
      } else {
        alert("error");
      }
    });

    async function getPagination(data) {
      state.categories = data;
      const result = await store.dispatch("getPaginationPage", data);
      if (result.status) {
        state.list = store.getters.getListItems;
        store.commit("setIsLoading", false);
      }
    }

    function handleGroup(id, title, image) {
      store.commit("setIsLoading", true);
      if (id) {
        router.push({
          name: "home",
          query: {
            g: id,
          },
        });
        store.commit("setGroupName", title);
        store.commit("setGroupImage", image);
        store.commit("setCategoryModal", true);
      }
    }

    return {
      state,
      handleGetLogo,
      listItems,
      getPagination,
      end,
      log,
      cloneItem,
      handleGroup,
      dragenter,
      drop,
      dragover,
      isAnimateSpin,
      handleEndGroup
    };
  },
};
</script>
<style></style>
