<template>
  <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 text-center">
    <a-pagination
        :current="currentPage"
        show-size-changer
        :total="totalPage"
        @change="onChange"
        @showSizeChange="onShowSizeChange"
    />
  </div>
</template>

<script>
import {ref, toRef} from "vue";
import axios from "../plugins/axios";
import {useStore} from "vuex";

export default {
  name: "pagination-items",
  props: {
    totalItem: Number
  },
  setup(props, context) {
    const currentPage = ref(1);
    const store = useStore();
    const totalPage = toRef(props, 'totalItem')
    const sizePage = ref(10);

    async function onShowSizeChange(current, pageSize) {
      currentPage.value = current;
      sizePage.value = pageSize;
      const {data} = await axios.get(`/category?page=` + currentPage.value + `&page_size=` + sizePage.value);
      if (data.results.length > 0) {
        store.commit("setIsLoading", false);
        context.emit("getPagination", data.results);
      } else {
        store.commit("setIsLoading", false);
        alert("Error");
      }
    }

    async function onChange(current, pageSize) {
      store.commit("setIsLoading", true);
      currentPage.value = current;
      sizePage.value = pageSize;
      const {data} = await axios.get(`/category?page=` + currentPage.value + `&page_size=` + sizePage.value);
      if (data.results.length > 0) {
        store.commit("setIsLoading", false);
        context.emit("getPagination", data.results);
      } else {
        store.commit("setIsLoading", false);

        alert("Error");
      }
    }

    return {currentPage, onChange, totalPage, onShowSizeChange};
  },
};
</script>

<style>
@media (max-width: 640px) {
  .ant-pagination-jump-next{
    margin-right: 1px !important;
  }
  .ant-pagination{
    font-size: 10px !important;
  }
  .ant-pagination-item {
    min-width: 0px !important;
  }
}
@media screen and (device-aspect-ratio: 40/71) {
  .ant-pagination-jump-next{
    margin-right: 1px !important;
  }
  .ant-pagination-prev, .ant-pagination-next, .ant-pagination-jump-prev, .ant-pagination-jump-next {
    min-width: 0px !important;
  }

}

</style>
