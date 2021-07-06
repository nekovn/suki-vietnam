<template>
  <div class="flex shadow-md border-b-2 border-gray-400" v-for="(elm,i) in ElmForm" :key="i">
    <label
        class="w-32 sm:w-56 font-medium text-xs sm:text-sm inline-flex items-center px-6 py-4 border-gray-300 bg-gray-100 text-gray-500"
        :for="elm.id"
    >
      {{ elm.label }}
    </label>
    <input
        v-if="!elm.sex"
        :type="elm.type"
        :name="elm.id"
        v-model="elm.input"
        :id="elm.id"
        class="outline-none flex-1 block sm:text-sm border-gray-300 px-4 lg:w-96 "
        :placeholder="elm.placeholder"
    />
    <select
        v-else
        class="outline-none sm:text-sm  px-4 lg:w-96 w-52 cursor-pointer"
        :id="elm.id"
        :name="elm.id"
        v-model="elm.input"
    >
      <option v-for="(option,index) in options"
              :key="index" class="text-gray-500"
              :value="option.value"
              :selected="getGender === index
      ">
        {{ option.text }}
      </option>
    </select>
  </div>
  <save-button type="update-user" :getId="getIdUser" :user_name="getUserName" :email="getEmail" :first_name="getFirstName" :gender="parseInt(getGender)" :birthday="getBirthday"/>
</template>

<script>
import SaveButton from "../../components/SaveButton.vue";
import { ref } from "vue"
import {useStore} from "vuex";

export default {
  components: {SaveButton},
  setup() {
    const store = useStore();
    const selected = ref();
    const getIdUser = ref();
    const getUserName = ref();
    const getEmail = ref();
    const getFirstName = ref("");
    const getGender = ref();
    const getBirthday = ref();
    const ElmForm = ref([
      {
        'label': 'ユーザー名',
        'input': getUserName,
        'id': 'username',
        'type':'text',
        'placeholder':'yamata',
        'sex': false,

      },
      {
        'label': 'メールアドレス',
        'input': getEmail,
        'id': 'email',
        'type':'text',
        'placeholder':'yamata@gmail.com',
        'sex': false,

      },
      {
        'label': '氏名',
        'input': getFirstName,
        'id': 'name',
        'type':'text',
        'placeholder':'山田',
        'sex': false,
      },
      {
        'label': '誕生日',
        'input': getBirthday,
        'id': 'birthday',
        'type':'date',
        'sex': false,
      },
      {
        'label': '性別',
        'input': getGender,
        'id': 'sex',
        'type':'',
        'sex': true,
      },
    ])
    const options = ref([
      {text: '未登録', value: '0'},
      {text: '男性', value: '1'},
      {text: '女性', value: '2'}])
    const currentUser = store.getters.getCurrentUser
    if(currentUser){
      getUserName.value = currentUser.user_name
      getIdUser.value = currentUser.id
      getEmail.value = currentUser.email
      getFirstName.value = currentUser.first_name
      getGender.value = currentUser.gender
      getBirthday.value = currentUser.birthday
    }


    return { ElmForm,getIdUser,getUserName,getEmail,getFirstName,getGender,getBirthday,options,selected}
  }
};
</script>

<style></style>
