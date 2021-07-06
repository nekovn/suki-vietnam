<template>
     <div class="flex flex-col menu-profile ">
      <router-link
        v-for="(value, i) in list"
        :key="i"
        :to="value.link"
        class="flex justify-items-center mb-2 items-center bg-gray-100 h-14 w-full rounded-md shadow-md  hover:bg-gray-500 hover:text-gray-50 cursor-pointer transition "
        :class="value.ops"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mx-4"
          :class="value.color"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="value.icon"
          />
        </svg>
        <!-- link -->
        <span
          class="text-gray-800 capitalize font-medium text-sm transition ease-in-out duration-500"
        >
          {{ value.name }}
        </span>
      </router-link>
    </div> 
</template>


<script>
export default {
  name: "member-button",
  props:{
    mt:{type:String, default:'mt-20' }
  },
  data() {
    return {
      list: [
        {
          name: "会員情報",
          link: "/profile",
          color: "text-blue-400",
          icon:
            "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",
          ops: this.mt
        },
        {
          name: "プロファイル画像",
          link: "/profile/img",
          color: "text-indigo-400",
          icon:
            "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z",
          opst: "",
        },
        {
          name: " パスワード変更",
          link: "/profile/password",
          color: "text-green-400",
          icon:
            "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
          opst: "",
        },
        // {
        //   name: "通知",
        //   link: "/profile/notification",
        //   color: "text-red-400",
        //   icon:
        //     "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
        //   opst: "",
        // },
      ],
    };
  },
};
</script>

<style>
.menu-profile a.active {
  --tw-bg-opacity: 1;
  background-color: rgba(191, 219, 254, var(--tw-bg-opacity));
}
</style>>