<template>
  <div class="w-64 h-64 relative mb-4">
    <div
        class=" w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer -mt-4"
    >
      <img
          :src="renderImage"
          alt="user avatar"
          class="object-cover object-center w-full h-full visible  transform hover:scale-125"
      />
    </div>
  </div>
  <div class="flex w-full items-center justify-center bg-grey-lighter">
    <label
        class="w-64 flex flex-col items-center px-4 py-4 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white"
    >
      <svg
          class="w-8 h-8"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
      >
        <path
            d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
        />
      </svg>
      <span class="mt-2 text-base leading-normal" @click="uploadImage"
      >{{ getButton }}</span
      >
      <input
          type="file"
          class="hidden"
          ref="refUpload"
          name="images"
          @change="handleUploadImage"
      />
    </label>
  </div>
  <save-button :fileImg="obj_image" :getId="getIdUser" :user_name="getUserName" :email="getEmail" type="update-image"/>
</template>

<script>
import SaveButton from "../../components/SaveButton.vue";
import {checkImageFile} from "../../utilities/composition/checkImageFile";
import {ref, computed} from "vue";
import {useStore} from "vuex";
import { notification_error } from "../../utilities/composition/useNotification";
import { notification } from "ant-design-vue"

export default {
  components: {SaveButton},
  setup() {
    const store = useStore()
    const url_image = ref('')
    const getIdUser = ref();
    const getUserName = ref();
    const getEmail = ref();
    const refUpload = ref('')
    const getButton = computed(()=>'ファイルを選択してください。')
    const obj_image = ref({
      objFile: null,
      base64URL: "",
    })
    const currentUser = store.getters.getCurrentUser
    const renderImage = computed(() => {
      if (obj_image.value.base64URL) {
        return obj_image.value.base64URL;
      }
      if (currentUser && currentUser.image) {
        const myRegex = /<img.*?src='(.*?)'[^>]+>/g;
        const exec = myRegex.exec(currentUser.image)
        if (!exec) {
          return currentUser.image
        } else {
          return exec[1]
        }
      } else {
        return "/images/avatar.png";
      }

    })
    if (currentUser) {
      getUserName.value = currentUser.user_name
      getIdUser.value = currentUser.id
      getEmail.value = currentUser.email
    }

    function uploadImage() {
      refUpload.value.click();
    }

    function handleUploadImage(e) {
      if (e.target.files && e.target.files.length) {
        const imageUpload = e.target.files[0];

        let check = checkImageFile(imageUpload);
        if (!check) {
          // 不適切なファイル形式
          notification_error(notification, '不適切なファイル形式です。')
          return;
        }

        let reader = new FileReader();

        reader.addEventListener(
            "load",
            () => {
              const result = reader.result;
              store.commit("setUrlImgUser", result);
              obj_image.value = {
                base64URL: result,
                objFile: imageUpload
              }
            },
            false
        );

        if (imageUpload) {
          reader.readAsDataURL(imageUpload);
        }
      }
    }

    return {url_image, getButton, obj_image, renderImage, getIdUser, getUserName, getEmail, uploadImage, handleUploadImage}
  },

};
</script>

<style></style>
