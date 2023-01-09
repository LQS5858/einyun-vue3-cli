<template>
  <section class="wrapper-not-found flex-row">
    <svg-icon class="notfound-svg"
              name="404"></svg-icon>
  </section>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "404",
});
</script>

<style lang="scss" scoped>
.wrapper-not-found {
  height: 100%;
  width: 100%;
  justify-content: center;
  .notfound-svg {
    width: 600px;
    height: 300px;
  }
}
</style>