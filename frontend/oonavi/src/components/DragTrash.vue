<template>
  <draggable
      group="drag"
      v-model="state.list"
      class="dropzone"
      :class="{'w-20 py-80': ( idName==='trash-left' || idName=== 'trash-right') }"
      item-key="id"
      :id="idName"
  >
    <template #item="{ element }">
      <span class="trashzone" v-html="element.name"></span>
    </template>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import { reactive , toRef} from "vue";
export default {
  name: "DragTrash",
  components: {
    draggable,
  },
  props: {
    idName: String,
  },
  setup(props) {
    const state = reactive({
      lists: [{ name: "" }],
    });
    const idName = toRef(props, "idName");

    return { state, idName };
  },
}
</script>

<style scoped>
.dropzone .trashzone {
  display: none;
}
</style>