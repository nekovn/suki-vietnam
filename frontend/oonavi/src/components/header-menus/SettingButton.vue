<template>
  <a class="relative  group">
    <avatar-button/>
    <!-- setting button -->
    <router-link
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
        to="/profile"
    >
      <div
          class="hidden px-4  py-2 dark:text-gray-500 group-hover:flex items-center origin-top-right absolute right-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hover:bg-gray-100 "
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-5" fill="none" viewBox="0 0 20 20" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>


        <span class="text-sm text-gray-600 px-1 setting-text">設定</span>
      </div>

    </router-link>

  <a
      v-if="isAdmin"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu"
      target="_blank"
      href="/admin/"
  >
    <div
        class="hidden px-4 py-2 mt-9 border-t-2 border-gray-200 dark:text-gray-500 group-hover:flex items-center origin-top-right absolute right-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hover:bg-gray-100 "
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-5" fill="none" viewBox="0 0 20 20" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>

      <span class="text-sm text-gray-600 px-1 setting-text">管理画面</span>
    </div>
  </a>
  </a>
</template>

<script>
import AvatarButton from "./AvatarButton.vue";
import  {computed} from "vue"
import { useStore } from "vuex";
export default {
  components: {AvatarButton},
  name: "setting-button",
  setup(){
    const store = useStore();
    const isAdmin = computed(()=>store.getters.isAdmin)
    return {isAdmin}
  }
};
</script>

<style>
.active .setting-text {
  --tw-text-opacity: 1;
  color: rgba(209, 213, 219, var(--tw-text-opacity));
}
</style>
