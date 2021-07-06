<template>
  <div
      class="z-30 m-auto bg-white p-2 rounded-md shadow-md lg:w-1/2 xl:w-1/3 w-5/6"
  >
    <form class="p-2 my-2">
      <div
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
      >
        <h1 class="text-xl text-center font-mono mb-4">{{ title }}</h1>
        <template v-for="(item,index) in ElmForm" :key="index">
          <div class="mb-4" v-if="item.level[0] === level || item.level[1] === level || item.level[2] === level">
            <label
                class="block text-gray-700 text-sm font-bold mb-2 mr-1"
                :for="item.name"
                v-if="!item.icon"
            >
              {{item.label}}
            </label>

            <div class="flex" v-else>
              <label
                  class="block text-gray-700  text-sm font-bold mb-2 mr-1"
                  :for="item.name"
              >
                {{item.label}}
              </label>
              <span aria-label="eyes" class="inline-block mt-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        @click="show = !show"
                        :class="{ hidden: !show, block: show }"
                        v-if="item.level[0] === level || item.level[1] === level"
                    >
                      <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        @click="show = !show"
                        :class="{ block: !show, hidden: show }"
                        stroke="currentColor"
                    >
                      <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.02 8.971m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  </span>
            </div>

            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 lg:text-xs"
                :id="item.name"
                :name="item.name"
                :type="item.type === 'password' ? show ? 'password' : 'text' : item.type"
                v-model="item.input"
                :autocomplete="item.name"
                required
                :placeholder="item.placeholder"
            />
            <p v-if="!item.input  && item.note"  class="text-red-400 text-xs italic mt-1">
              {{item.note}}
            </p>
          </div>
        </template>


        <div class="lg:flex 2xl:flex xl:flex items-center justify-between">
          <button
              class="flex items-center bg-blue-400 text-sm hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded shadow-lg focus:outline-none focus:ring focus:ring-offset-1 focus:ring-indigo-500 focus:ring-opacity-50 my-2"
              type="submit"
              @click.native="handleSubmit"
          >
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-3 w-3 text-white"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ button }}
          </button>
          <open-modal @open="openModal" :level="level"/>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, toRef } from "vue"
import { useStore } from "vuex"
import { notification } from "ant-design-vue"
import { setHandleSubmit } from "../../utilities/helps/setHandleSubmit";
import OpenModal from "./OpenModal";

export default {
  name: "FormHtml",
  components: {OpenModal},
  props: {
    title: String,
    button: String,
    level:Number
  },
  setup(props) {
    const show = ref(true)
    const isLoading = ref(false)
    const title = toRef(props, "title");
    const button = toRef(props, "button");
    const level = toRef(props, "level");
    const store = useStore()
    const username = ref('')
    const password = ref('')
    const code = ref('')
    const confirm_password = ref('')
    const email = ref('')
    const message = ref('')
    const times = ref(1)
    const ElmForm = ref([
      {
        'label':'ユーザー名',
        'name':'username',
        'input':username,
        'type':'username',
        'icon':false,
        'note':'',
        'placeholder': 'ユーザー名を入力してください。',
        'level':[1,2]

      },
      {
        'label':'メールアドレス',
        'name':'email',
        'input':email,
        'type':'email',
        'icon':false,
        'note':'',
        'placeholder': 'メールアドレを入力してください。',
        'level':[1,3]
      },
      {
        'label':'コード',
        'name':'code',
        'input':code,
        'type': 'text',
        'icon':false,
        'note':'',
        'placeholder': 'コードを入力してください。',
        'level':[4]
      },
      {
        'label':'パスワード',
        'name':'password',
        'input':password,
        'type': 'password',
        'icon':true,
        'note':(level.value === 1 || level.value === 4) ? '最小8文字、1つの数字、および1つの特殊文字が必要です。':'パスワードを入力してください。',
        'placeholder': (level.value === 1 || level.value === 4) ? 'パスワードを入力してください。':'****************',
        'level':[1,2,4]
      },
      {
        'label':'パスワード（確認用）',
        'name':'confirm-password',
        'input':confirm_password,
        'type': 'password',
        'icon':false,
        'note':'もう一度パスワードを入力してください。',
        'placeholder': '****************',
        'level':[1,4]
      },


    ])
    async function openModal(data){
      if(data === 1) {
        await store.commit("setRegisterModal", false)
        await store.commit("setLoginModal", true)
      }
      if(data === 2) {
        store.commit("setLoginModal", false)
        store.commit("setResetPasswordModal",true)
      }
    }
    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    function validatePassword(password) {
      const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
      return re.test(String(password));
    }

    function handleSubmit(e) {
      e.preventDefault();
      setHandleSubmit(isLoading.value, password, confirm_password, notification,
          username, email, validateEmail, validatePassword,
          store, message.value, level.value, times, code
      )
    }
    return {openModal, level, title, button, show, email, confirm_password, password, username, isLoading, handleSubmit,ElmForm}
  },
}
</script>

<style scoped>

</style>