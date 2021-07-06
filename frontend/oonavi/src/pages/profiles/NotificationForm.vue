<template>
  <div class="flex flex-col max-w-2xl rounded overflow-hidden shadow-lg lg:-mt-14 -mt-20 mb-2 dark:bg-gray-500">
    <div class="flex-1 flex flex-col cursor-pointer">
      <!-- message -->
      <div
        class="flex items-center shadow-xs transition-all duration-300 ease-in-out lg:p-5 p-4 hover:shadow-md text-gray-800"
        v-for="(val,index) in list" :key="index"
      >
        <div class=" w-10 h-10 overflow-hidden rounded-md ">
          <img
            class="transform hover:scale-125"
            :src="val.img"
            :alt="val.name"
          />
        </div>
        <h1 class="lg:ml-3 mx-2 dark:text-gray-50">{{val.name}}</h1>
        <p class="lg:ml-6 mx-3 flex-1 text-xs">
          {{val.content}}
        </p>
        <p class="lg:font-bold text-gray-800 lg:text-md text-sm">{{val.time}}</p>
        <svg @click="remove(index)" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </div>
    </div>
    <div class="block py-4 mx-4 text-base">
      <p class="float-right tracking-wider" v-if="list.length > 0 "> 合計 ：{{list.length}}件。</p>
      <p class="float-right tracking-wider" v-else>現在、 通知 がございません。 </p>

    </div>
  </div>
</template>
spacing
<script>
export default {
  data() {
    return {
      list: [
        {
          img:
            "https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png",
          name: "Rim",
          content: "ログインしました。",
          time: "05:09 AM",
        },
        {
          img:
            "https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png",
          name: "Rim",
          content: "アカウントを登録しました。",
          time: "05:19 AM",
        },
        {
          img: "https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png",
          name: "Rim",
          content: "美術館を削除しました。",
          time: "06:10 AM",
        },
        {
          img: "https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png",
          name: "Rim",
          content: "厚生労働省を移動しました。",
          time: "07:10 AM",
        },
        {
          img: "https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png",
          name: "Rim",
          content: "みずほ銀行を追加しました。",
          time: "08:10 AM",
        },
        {
          img:
            "https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png",
          name: "Rim",
          content: "パスワードを変更しました。",
          time: "05:19 AM",
        },
      ],
    };
  },
  methods:{
    remove(index){
        this.list = this.list.filter((value, i) => i != index)
    }
  }
};
</script>

<style></style>
