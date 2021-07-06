<template>
  <div class="lg:hidden" v-if="isMobOpen">
    <div class="px-2 pt-2 pb-3 space-y-1 mobile-menu">
      <template v-for="(item,i) in listMenu" :key="i">
        <component
            :is="item.link.startsWith('https') ? 'a' : 'router-link'"
            :href="item.link"
            :to="item.link"
            :target="item.target ? item.target : '_self'"
            class="flex justify-items-center mb-2 items-center bg-gray-100 h-14 w-full rounded-md shadow-md  hover:bg-gray-500 hover:text-gray-50 cursor-pointer transition "
        >
        <span class="capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500 px-4"
        >
          {{ item.title }}
        </span>
        </component>
      </template>
      <user-not-login/>
      <user-logged/>
    </div>
  </div>
</template>

<script>

import UserLogged from "./UserLogged.vue";
import UserNotLogin from './UserNotLogin.vue';

export default {
  name: "mobile-menu",
  components: {
    UserLogged,
    UserNotLogin,
  },
  data() {
    return {
      listMenu: [
        {title: "ホーム", link: "/"},
        {title: "カレンダー", link: "https://www.himekuricalendar.com/year2021", target: "_blank"},
        {title: "天気", link: "https://www.tenki-yoho.com/", target: "_blank"},
        {title: "運行情報", link: "https://www.navitime.co.jp/", target: "_blank"},
        {title: "辞書・翻訳", link: "https://dictionary.goo.ne.jp/", target: "_blank"},
      ],
    };
  },
  computed: {
    isMobOpen() {
      return this.$store.state.isMobOpen;
    },
  },
};
</script>

<style>
.mobile-menu a.active {
  --tw-bg-opacity: 1;
  background-color: rgba(75, 85, 99, var(--tw-bg-opacity));
  color: rgba(255, 255, 255, var(--tw-text-opacity));
}
</style>
