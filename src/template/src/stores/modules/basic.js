import { defineStore } from 'pinia'
import { ref, reactive } from "vue";


const useBasicStore = defineStore('basicStore', () => {
  let userInfo = ref({})
  let curSize = ref('pc')

  function changeSize (size) {
    curSize.value = size
  }

  function saveUserInfo (info = {}) {
    userInfo.value = info
  }



  return { curSize, changeSize, userInfo, saveUserInfo }
},
  {
    persist: true
  }
)

export { useBasicStore }