<template>
  <div
      class="flex sm:hidden lg:flex space-x-4 lg:space-x-1 bg-gray-200 p-2 shadow-md rounded-sm main-menu items-center"
  >

    <template v-for="(item,i) in listMenu" :key="i">

      <component
          :is="item.link.startsWith('https') ? 'a' : 'router-link'"
          :href="item.link"
          :to="item.link"
          :target="item.target ? item.target : '_self'"
          class="text-gray-800  flex items-center dark:text-gray-500 hover:bg-gray-700 dark:hover:text-white sm:px-2 hover:text-white py-2 rounded-md  text-base font-medium transition "
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" :class="item.color" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                :d="item.icon"/>
        </svg>
        {{ item.title }}
      </component>
    </template>
    <!-- Login -->
    <login-user :isLoggedIn="isLoggedIn"/>
    <!-- Logout-->
    <logout-user :isLoggedIn="isLoggedIn"/>
  </div>
</template>

<script>
import LoginUser from './LoginUser.vue';
import LogoutUser from "./LogoutUser.vue";
import {computed, ref, onMounted} from "vue"
import {useStore} from "vuex";
import {getTokenFromCookie, handleCookies} from '../../utilities/helps/handleCookies'

export default {
  components: {LogoutUser, LoginUser},
  name: "main-menu",
  setup() {
    const store = useStore();
    const isLoggedIn = computed(() => store.getters.isLogin)
    const listMenu = ref([
      {
        title: "ホーム",
        link: "/",
        icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
        color:"text-blue-500"
      },
      {
        title: "カレンダー",
        link: "https://www.himekuricalendar.com/year2021",
        target: "_blank",
        icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        color:"text-purple-500"
      },
      {
        title: "天気",
        link: "https://www.tenki-yoho.com/",
        target: "_blank",
        icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
        color:"text-yellow-500"
      },
      {
        title: "今日占い",
        link: "https://goisu.net/",
        target: "_blank",
        icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
        color:"text-red-500"
      },
      {
        title: "辞書・翻訳",
        link: "https://dictionary.goo.ne.jp/",
        target: "_blank",
        icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129',
        color:"text-green-500"
      },
    ])

    onMounted(async () => {
      const token = getTokenFromCookie("access_token");
      if (token) {
        const result = await store.dispatch('actFetchCurrentUser', token)
        if (result.status) {
          store.commit("setLoginModal", false)
        } else {
          handleCookies()
        }
      } else {
        store.commit("setLoginModal", false)
      }

    })


    return {isLoggedIn, listMenu}
  },
};
</script>

<style>
.main-menu a.active {
  --tw-bg-opacity: 1;
  background-color: rgba(107, 114, 128, var(--tw-bg-opacity));
  color: rgba(255, 255, 255, var(--tw-text-opacity));
}
</style>
