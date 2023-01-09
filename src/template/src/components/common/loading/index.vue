<template>
  <div v-loading="loading"
       class="loading-wrap"
       element-loading-text="Loading..."></div>
</template>

<script>
import { defineComponent } from "vue";
import common from "./common";
export default defineComponent({
  ...common,
});
</script>

<style lang="scss" scoped src="./common.scss">
</style>