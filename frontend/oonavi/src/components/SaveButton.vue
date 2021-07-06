<template>
  <div class="mt-4 flex justify-center">
    <button
        class="flex items-center bg-blue-500 hover:bg-blue-400 text-white font-medium text-sm py-2 px-4 border-b-2 border-blue-700 hover:border-blue-500 rounded"
        @click.native="handleSubmit"
        type="submit"
    >
      <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-3 w-3 text-white"
           xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      保存
    </button>
  </div>

</template>

<script>
import {toRef, ref} from "vue";
import {useStore} from "vuex"
import {notification_error, notification_success} from "../utilities/composition/useNotification";
import {notification} from "ant-design-vue"
import {useRouter} from 'vue-router'

export default {
  props: {
    getId: Number,
    type: String,
    user_name: String,
    email: String,
    first_name: String,
    gender: Number,
    birthday: String,
    fileImg: Object,
    old_password: String,
    new_password: String,
    confirm_password: String,

  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const isLoading = ref(false)
    const id = toRef(props, "getId");
    const type = toRef(props, "type");
    const user_name = toRef(props, "user_name");
    const email = toRef(props, "email");
    const first_name = toRef(props, "first_name");
    const gender = toRef(props, "gender");
    const birthday = toRef(props, "birthday");
    const fileImg = toRef(props, "fileImg");
    const new_password = toRef(props, "new_password");
    const old_password = toRef(props, "old_password");
    const confirm_password = toRef(props, "confirm_password");
    const message = ref("")

    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    function validateFirstName(first_name) {
      if (first_name) {
        const re = /^([^<>()[\]\\.,;:\s@"][^0-9]{2,10})$/;
        return re.test(String(first_name).toLowerCase());
      }
      return ''
    }

    async function handleSubmit(e) {
      e.preventDefault();
      isLoading.value = true
      if (type.value === 'update-user') {
        if (id.value && email.value && user_name.value) {
          const valEmail = validateEmail(email.value)
          const valFirstName = validateFirstName(first_name.value)
          if (gender.value === 0) {
            isLoading.value = false
            notification_error(notification, '性別を選択してください。')

            return
          }
          if (!valFirstName) {
            isLoading.value = false
            notification_error(notification, '無効な氏名です。')

            return
          }
          if (!valEmail) {
            notification_error(notification, '無効なメールアドレスです。')
            isLoading.value = false
            return
          }
          const data = {
            id: id.value,
            first_name: first_name.value,
            user_name: user_name.value.trim(),
            email: email.value.trim(),
            gender: gender.value,
            birthday: birthday.value,
          }
          await store.dispatch("actUpdateProfile", data)
              .then((res) => {
                if (res.status) {
                  setTimeout(() => {
                    notification_success(notification, '情報が正常に変更されました。')
                    isLoading.value = false
                  }, 600)

                } else {
                  if (res.error.code === "token_not_valid") {
                    notification_error(notification, "ログインの有効期限が切れました。もう一度ログインしてください。")
                    isLoading.value = false
                    store.dispatch("actLogout")
                    router.push("/")
                    return store.commit("setLoginModal", true)
                  }
                  if (res.error.user_name) message.value = (res.error.user_name.user_name || res.error.user_name[0])
                  if (res.error.email) message.value = (res.error.email.email || res.error.email[0])
                  if (res.error.birthday) message.value = res.error.birthday[0]
                  if (res.error.first_name) message.value = res.error.first_name[0]
                  setTimeout(() => {
                    notification_error(notification, message.value)
                    isLoading.value = false
                  }, 600)

                }
              })

        } else {
          notification_error(notification, '項目は空にできません。')
          isLoading.value = false
        }
      }
      if (type.value === 'update-image') {
        if (id.value && fileImg.value.objFile) {
          const data = {
            id: id.value,
            user_name: user_name.value,
            file: fileImg.value.objFile,
          }
          await store.dispatch("actUploadAvatar", data)
              .then((res) => {
                if (res.status) {
                  store.commit("setUrlImgUser", res.data);
                  setTimeout(() => {
                    notification_success(notification, '情報が正常に変更されました。')
                    isLoading.value = false
                  }, 600)

                } else {
                  if (res.error.code === "token_not_valid") {
                    notification_error(notification, "ログインの有効期限が切れました。もう一度ログインしてください。")
                    isLoading.value = false
                    store.dispatch("actLogout")
                    router.push("/")
                    return store.commit("setLoginModal", true)
                  }
                  if (res.error.user_name) message.value = (res.error.user_name.user_name || res.error.user_name[0])
                  if (res.error.image) message.value = res.error.image[0]
                  setTimeout(() => {
                    notification_error(notification, message.value)
                    isLoading.value = false
                  }, 600)

                }
              })
        } else {
          notification_error(notification, '写真をアップロードしてください。')
          isLoading.value = false
        }

      }

      if (type.value === 'change-password') {
        function validatePassword(password) {
          const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
          return re.test(String(password));
        }

        if (new_password.value && old_password.value && confirm_password.value) {
          const valPass = validatePassword(new_password.value)
          if (!valPass) {
            notification_error(notification, '最小8文字、1つの数字、および1つの特殊文字が必要です。')
            isLoading.value = false
            return;
          }

          if (new_password.value !== confirm_password.value) {
            notification_error(notification, '新パスワードが確認用パスワードと一致していません。');
            isLoading.value = false
            return;
          }

          if (new_password.value === old_password.value) {
            notification_error(notification, '現在のパスワードを新パスワードと同じにすることはできません。')
            isLoading.value = false
            return
          }
          const data = {
            old_password: old_password.value,
            new_password: new_password.value
          }
          await store.dispatch("actChangePassword", data)
              .then((res) => {
                if (res.status) {
                  setTimeout(() => {
                    notification_success(notification, res.message)
                    isLoading.value = false
                    router.push("/profile")
                  }, 600)
                } else {
                  if (res.error.code === "token_not_valid") {
                    notification_error(notification, "ログインの有効期限が切れました。もう一度ログインしてください。")
                    isLoading.value = false
                    store.dispatch("actLogout")
                    router.push("/")
                    return store.commit("setLoginModal", true)
                  }
                  if (res.error.old_password) message.value = res.error.old_password[0]
                  setTimeout(() => {
                    notification_error(notification, message.value)
                    isLoading.value = false
                  }, 600)

                }
              })

        } else {
          notification_error(notification, '項目は空にできません。')
          isLoading.value = false
        }
      }
    }

    return {handleSubmit, isLoading}
  }
}
</script>

<style>

</style>