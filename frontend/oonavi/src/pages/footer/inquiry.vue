<template>
  <div class="flex text-center w-full h-full">
    <div
        class=" m-auto bg-white p-2 rounded-md shadow-md"
    >
      <section class="text-gray-600 body-font relative">
        <div class="px-5 py-12">
          <template v-if="isOpenContact">
            <div class="font-bold flex items-center mb-1 -mt-20 justify-center mr-14">
              <div>
                <img
                    class="rounded object-cover object-center lg:block h-auto w-32 animate-pulse"
                    src="/images/logo.png"
                    alt="Oonavi"
                />
              </div>
              <div class="-ml-5 lg:text-4xl xl:text-4xl 2xl:text-4xl text-base">
                {{ getTitle }}
              </div>
            </div>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-sm">{{ getSubTitle }}</p>
            <div class="lg:w-1/2 md:w-2/3 mx-auto">
              <div class="flex flex-wrap -m-2">
                <template v-for="(elm,i) in ElmForm" :key="i">
                  <div class="p-2" :class="{'w-1/2':!elm.css, 'w-full':elm.css}">
                    <div class="relative" v-if="!elm.button">
                      <div class="flex items-center my-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="elm.icon" />
                        </svg>
                        <label :for="elm.id" class="lg:text-sm sm:text-sm text-xs text-gray-600">
                          {{ elm.label }}
                          <span class="text-red-500">※</span>
                        </label>
                      </div>

                      <input v-if="!elm.textarea" type="text" :id="elm.id" :name="elm.id" v-model="elm.input"
                             class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                      <div v-else>
                      <textarea :id="elm.id" :name="elm.id" v-model="content"
                                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                        <p class="float-left mx-auto leading-relaxed text-sm text-red-400">{{ elm.note }}</p>
                      </div>
                    </div>
                    <button
                        v-else
                        @click="elm.input"
                        class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                      {{ elm.label }}
                    </button>
                  </div>
                </template>
              </div>
            </div>
          </template>
          <confirm-contact @evtContact="handleContact" @evtSuccess="handleSuccess" v-if="isOpenConfirmContact"
                           :name="name" :email="email" :content="content" :code="code"/>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import {ref, computed} from "vue"
import ConfirmContact from "./ConfirmContact";
import {notification_error} from "../../utilities/composition/useNotification";
import {notification} from "ant-design-vue"

export default {
  name: "inquiry",
  components: {ConfirmContact},
  setup() {
    const isOpenContact = ref(true)
    const isOpenConfirmContact = ref(false)
    const name = ref('')
    const email = ref('')
    const content = ref('')
    const code = ref('')
    const getTitle = computed(()=> '問い合わせ')
    const getSubTitle = computed(()=> 'お客様の返答にただいま通常よりもお時間をいただいております。')
    const ElmForm = ref([
      {
        'label': 'お名前',
        'input': name,
        'id': 'name',
        'note':'',
        'css': false,
        'button': false,
        'textarea': false,
        'icon':'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      },
      {
        'label': 'メールアドレス',
        'input': email,
        'id': 'email',
        'note':'',
        'css': false,
        'button': false,
        'textarea': false,
        'icon':'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
      },
      {
        'label': 'お問合せ内容',
        'input': content,
        'id': 'message',
        'note':'※必須項目',
        'css': true,
        'button': false,
        'textarea': true,
        'icon':'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
      },
      {
        'label': '確認',
        'input': openContact,
        'id': 'message',
        'note':'',
        'css': true,
        'button': true,
        'textarea': false,
        'icon':''
      },
    ])

    function handleSuccess(data) {
      isOpenConfirmContact.value = data.isOpenConfirm
      isOpenContact.value = data.isOpenContact
      name.value = data.valEmpty
      email.value = data.valEmpty
      content.value = data.valEmpty

    }

    function handleContact(data) {
      isOpenConfirmContact.value = data.isOpenConfirm
      isOpenContact.value = data.isOpenContact
    }

    function validateName(name) {
      const re = /^([^<>()[\]\\.,;:\s@"][^0-9]{2,10})$/;
      return re.test(String(name).toLowerCase());
    }

    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    function validateContent(content) {
      if (content.trim().length <= 10) {
        return {
          "isVal": false,
          "message": '内容が短すぎます。最小10文字が必要です。'
        }
      }
      if (content.trim().length >= 500) {
        return {
          "isVal": false,
          "message": '内容が長すぎます。最大500文字が必要です。'
        }
      }
      return {
        "isVal": true,
        "message": '内容が正しいです。'
      }
    }

    function openContact(e) {
      e.preventDefault();
      const valName = validateName(name.value)
      const valEmail = validateEmail(email.value)
      const valContent = validateContent(content.value)
      const stringRandom = Math.random().toString(36).substring(2, 8);


      if (name.value.trim() && email.value.trim() && content.value.trim() && stringRandom) {
        if (!valName) {
          notification_error(notification, '無効なお名前です。')
          name.value = ''
          return
        }
        if (!valEmail) {
          notification_error(notification, '無効なメールアドレスです。')
          email.value = ''
          return
        }

        if (!valContent.isVal) {
          notification_error(notification, valContent.message)
          return
        }
        code.value = stringRandom
        isOpenConfirmContact.value = true
        isOpenContact.value = false
      } else {
        notification_error(notification, 'データを入力してください。')
      }
    }

    return {
      openContact,
      name,
      email,
      content,
      code,
      isOpenContact,
      isOpenConfirmContact,
      handleContact,
      handleSuccess,
      ElmForm,
      getTitle,
      getSubTitle
    }
  }
}
</script>

<style scoped>

</style>