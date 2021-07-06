<template>
  <a
      @click="handleLogout" class="text-gray-800 dark:hover:text-white dark:text-gray-500  hover:bg-gray-700 lg:px-1 xl:px-2 hover:text-white px-2 py-2 rounded-md text-sm font-medium "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-5 inline-block text-indigo-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
    ログアウト
  </a>
</template>

<script>
import {useStore} from "vuex"
import {notification_success} from '../../utilities/composition/useNotification';
import { useRouter} from 'vue-router'
import {notification} from "ant-design-vue"
export default {
  setup(){
    const store = useStore()
    const router = useRouter()
    async function actLogout(){
      await store.dispatch("actLogout").then(()=>{
        store.commit("setMobileModal", false)
        notification_success(notification, '正常にログアウトしました。')
      })
    }
    function handleLogout(){
      actLogout();
      setTimeout(() => {
        router.push("/")
      }, 500)
    }
    return {handleLogout}
  }
}
</script>

<style>

</style>