<template>
  <tr
    v-for="(category, key) in placeholders"
    :key="key"
    class="border-b border-gray-200 hover:bg-gray-100"
  >
    <td class="text-left border-r-2 w-10 px-10 bg-gray-400 animate-pulse"></td>
    <td
      v-for="(item, i) in placeholders[0].data"
      :key="i"
      class="py-3 px-2 sm:px-2 lg:px-2 xl:px-4 2xl:px-5 text-left"
    >
      <a class="text-left border-r-2 w-20 px-10 sm:px-20 bg-gray-300 animate-pulse"></a>
    </td>
  </tr>
</template>

<script>
import { range } from "lodash";
import { onMounted, ref } from "vue";
export default {
  setup() {
    const placeCaregory = range(10).fill({});
    const placeItems = range(5).fill({});
    const placeholders = ref([]);
    onMounted(() => {
      placeholders.value = placeCaregory.map((category) => ({
        ...category,
        data: placeItems
          .filter((item) => category.id == item.category)
          .slice(0, 5),
      }));
    });
    return { placeholders };
  },
};
</script>

<style></style>
