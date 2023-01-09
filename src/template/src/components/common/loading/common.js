
import { defineComponent } from "vue";
export default defineComponent({
  name: 'Loading',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:loading'],
  setup () {
    
  }
})