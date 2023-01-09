<template>
  <el-drawer v-model="drawer"
             :size="size"
             :show-close="showClose"
             :before-close="beforeClose"
             :direction="direction">
    <slot name="content"></slot>
  </el-drawer>
</template>
<script>
import { defineComponent, watch, ref } from "vue";
export default defineComponent({
  name: "EinyunDrawer",
  props: {
    size: {
      type: [String, Number],
      default: "300px",
    },
    direction: {
      type: String,
      default: "ltr",
    },
    showClose: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    let drawer = ref(false);
    const beforeClose = () => {
      drawer.value = false;
      emit("update:modelValue", false);
    };
    watch(
      () => props.modelValue,
      (val) => {
        if (val) {
          drawer.value = true;
          emit("update:modelValue", true);
        } else {
          drawer.value = false;
          emit("update:modelValue", false);
        }
      }
    );
    return {
      beforeClose,
      drawer,
    };
  },
});
</script>
<style scoped lang="scss"></style>
