<template>
      <button
      v-if="isDark"
      @click="changeLight"
      type="button"
      class="flex text-sm border p-1  rounded-full bg-gray-800  shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mt-1 transition duration-100"
      id="use"
      aria-expanded="false"
      aria-haspopup="true"
    >
      <img
        class="h-5 w-5  rounded-full hover-trigger group"
        :src="renderImage"
        alt=""
      />
      <span v-if="user_name"  class="px-2 font-thin text-gray-200">{{user_name}}</span>
    </button>
    <button
      v-else
      @click="changeDark"
      type="button"
      class="flex text-sm border p-1  rounded-full bg-gray-50  shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mt-1 transition duration-100"
      id="user-menu"
      aria-expanded="false"
      aria-haspopup="true"
    >
      <span v-if="user_name" class="px-2 font-thin text-gray-800">{{user_name}}</span>
      <img
        class="h-5 w-5  rounded-full hover-trigger group"
       :src="renderImage"
        alt=""
      />
    </button>
</template>

<script>
import useDebounce from "@/utilities/composition/useDebounce";
import  {computed} from "vue"
import { useStore} from "vuex";
export default {
  setup(){
    const store = useStore();
    const currentUser = store.getters.getCurrentUser

    const user_name = computed(()=>{if(currentUser) return currentUser.user_name})
    const isDark = computed(()=>store.state.isDark)
    const renderImage = computed(()=>{
      if (currentUser && currentUser.image) {
        const myRegex = /<img.*?src='(.*?)'[^>]+>/g;
        const exec = myRegex.exec(currentUser.image)
        if (exec) {
          return exec[1]
        } else {
          return currentUser.image
        }
      }
      return "/images/avatar.png";
    })

    return { user_name, isDark, renderImage}
  },
  data() {
    return {
      debounce: "",
    };
  },

  mounted() {
    const { debounce } = useDebounce();
    this.debounce = debounce;
  },
  methods: {
    changeDark() {
      const task = () => this.$store.commit("setDarkModal", true);
      this.debounce(task, 300);
    },
    changeLight() {
      const task = () => this.$store.commit("setDarkModal", false);
      this.debounce(task, 300);
    },
  },
}
</script>

<style>
.active .setting-text {
  --tw-text-opacity: 1;
  color: rgba(209, 213, 219, var(--tw-text-opacity));
}
</style>