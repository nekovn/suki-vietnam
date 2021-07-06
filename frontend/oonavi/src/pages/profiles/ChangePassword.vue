<template>
  <div class="relative flex shadow-md border-b-2 border-gray-400" v-for="(elm,i) in ElmForm" :key="i">
    <label
        class="w-32 sm:w-56 lg:w-56 font-medium text-xs lg:text-sm sm:text-sm  inline-flex items-center pl-1 sm:px-6 py-4 border-gray-300 bg-gray-100 text-gray-500"
        :for="elm.id"
    >
      {{ elm.label }}
              <span aria-label="eyes" class="px-2" v-if="elm.icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    @click="elm.event"
                    :class="{ hidden: !elm.show, block: elm.show }"
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
                    @click="elm.event"
                    :class="{ block: !elm.show, hidden: elm.show }"
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
    </label>
    <input
        autocomplete="on"
        :disabled="elm.disabled"
        :type="elm.type"
        :name="elm.id"
        :id="elm.id"
        v-model="elm.input"
        class="outline-none flex-1 block sm:text-sm border-gray-300 px-4 lg:w-96"
        :placeholder="elm.placeholder"
    />
  </div>
  <save-button :new_password="get_new_password"  :old_password="get_old_password" :confirm_password="get_confirm_password"    type="change-password"/>
</template>

<script>
import SaveButton from "../../components/SaveButton.vue";
import {useStore} from "vuex"
import {ref} from "vue"

export default {
  components: {SaveButton},
  setup() {
    const show = ref(true)
    const show_old = ref(true)
    const store = useStore()
    const getUserName = ref();
    const get_new_password = ref();
    const get_old_password = ref();
    const get_confirm_password = ref();
    const text_old = ref('password')
    const text_new = ref('password')
    const ElmForm = ref([
      {
        'label': 'ユーザー名',
        'input': getUserName,
        'id': 'username',
        'type': 'text',
        'event': '',
        'disabled': true,
        'placeholder': 'yamata',
        'show':false,
        'icon': false,

      },
      {
        'label': '現在のパスワード',
        'input': get_old_password,
        'id': 'current-password',
        'event': evtShowOldPassword,
        'disabled': false,
        'type': text_old,
        'placeholder': '*****************',
        'show':show_old,
        'icon': true,

      },
      {
        'label': '新パスワード',
        'input': get_new_password,
        'id': 'new-password',
        'event': evtShowNewPassword,
        'disabled': false,
        'type': text_new,
        'placeholder': '*****************',
        'show':show,
        'icon': true,

      },
      {
        'label': '新パスワード（確認用）',
        'input': get_confirm_password,
        'id': 'confirm-password',
        'event': '',
        'disabled': false,
        'type': text_new,
        'placeholder': '*****************',
        'show':show,
        'icon': false,

      },

    ])
    function evtShowOldPassword(){
      text_old.value = show_old.value ? 'text' : 'password'
      return show_old.value = !show_old.value
    }
    function evtShowNewPassword(){
      text_new.value = show.value ? 'text' : 'password'
      return show.value = !show.value
    }

    const currentUser = store.getters.getCurrentUser

    if (currentUser) {
      getUserName.value = currentUser.user_name
    }

    return {ElmForm, show, show_old, getUserName,get_new_password,get_old_password,get_confirm_password}
  },
};
</script>

<style></style>
