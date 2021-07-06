<template>
  <nav class="dark:bg-gray-800 top-0  w-full">
    <draggable group="drag" v-model="list" class="dropzone" item-key="id" id="trash-logo-box">
      <template #item="{element}">
        <span class="trashzone">{{element.name}}</span>
      </template>
      <template #footer>
        <div class="sm:px-6 lg:px-4 my-1 xl:mx-6">
          <div class="relative flex items-center justify-between h-20">
            <div
              class="absolute inset-y-0 right-0 flex items-center lg:hidden mx-10"
            >
              <!-- Mobile hambuger menu button-->
              <hambuger-menu/>
            </div>
            <div class="flex items-center">
              <div class="flex-shrink-0 flex items-center ">
                <!-- Logo Oonavi -->
                <logo-menu />
              </div>
              <div class="hidden sm:block sm:ml-6 lg:ml-1 xl:ml-6">
                <!-- Main Menu -->
                <main-menu />
              </div>
              <!-- Search Box -->
              <search-box />
            </div>
          </div>
        </div>
        <!-- Mobile menu, show/hide based on menu state. -->
        <mobile-menu />
      </template>
    </draggable>
  </nav>
</template>
<script>
import SearchBox from "./SearchBox";
import MobileMenu from "./mobiles/MobileMenu";
import LogoMenu from "./LogoMenu.vue";
import MainMenu from "./header-menus/MainMenu";
import HambugerMenu from "./mobiles/HambugerMenu.vue";
import draggable from "vuedraggable";
export default {
  name: "app-header",
  components: {
    SearchBox,
    MobileMenu,
    LogoMenu,
    MainMenu,
    HambugerMenu,
    draggable,
  },
  data() {
    return {
      list: [{ name: "" }],
    };
  },
};
</script>

<style scoped>
.dropzone .trashzone{
  display:none;
}
</style>
