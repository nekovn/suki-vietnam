<template>
  <div :class="{ dark: isDark }">
    <div class="max-w-full  max-h-full dark:bg-black-alt transition">
      <router-view name="header" class="-mt-1"></router-view>
      <router-view  />
      <router-view name="footer"></router-view>
    </div>  
  </div>
  <teleport to="body">
    <AppLoadingSvg/>
    <login-form />
    <register-form />
    <search-form/>
    <category-group/>
    <reset-password/>
    <set-new-password/>
  </teleport>
</template>

<script>
import LoginForm from "./components/popup/LoginForm.vue";
import RegisterForm from "./components/popup/RegisterForm.vue";
import SearchForm from "./components/popup/SearchForm.vue";
import CategoryGroup from './components/popup/CategoryGroup.vue';
import ResetPassword from "./components/popup/ResetPassword";
import SetNewPassword from "./components/popup/SetNewPassword";
import AppLoadingSvg from "./components/AppLoadingSvg";

import { useStore } from "vuex";
import  {computed, ref, onMounted} from "vue"



export default {
  name: "App",
  components: {
    SetNewPassword,
    ResetPassword,
    LoginForm,
    RegisterForm,
    SearchForm,
    AppLoadingSvg,
    CategoryGroup
  },
  setup(){
    const color  = ref('red')
    const store = useStore()
    const isDark = computed(()=>store.state.isDark)
    onMounted(()=>{
      const interval = setInterval(() => {
        if (!document.cookie) {
          clearInterval(interval)
          return store.dispatch("actLogout")
        }
      }, 5000)
    })

    return {color,isDark}

  },


};
</script>

<style>
</style>
