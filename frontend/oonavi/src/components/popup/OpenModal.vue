<template>
  <a
      class="inline-block align-baseline font-bold text-sm lg:text-xs text-gray-500 hover:text-blue-300"
      @click="OpenModal"
  >
    {{ text }}
  </a>
</template>

<script>
import {toRef, computed} from "vue"
export default {
  name: "OpenModal",
  props: {
    level:Number,

  },
  setup(props,context){
    const level = toRef(props, "level");
    const text = computed(()=>{
      if(level.value === 1){
        return '既にアカウントを持っていますか?'
      }
      if(level.value === 2){
        return 'パスワードを忘れた方はこちら'
      }
    })
    function OpenModal(){
      context.emit("open", level.value);
    }
    return { OpenModal ,text }
  }
}
</script>

<style scoped>

</style>