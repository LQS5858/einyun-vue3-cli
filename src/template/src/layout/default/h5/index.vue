<template>
  <EinDrawer v-model="openltrDrawer"></EinDrawer>
  <EinRDrawer v-model="rtlDrawer"
              direction="rtl"></EinRDrawer>
  <header class="flex-row einyun-header">
    <el-icon size="20px"
             @click.stop="openLtrDrawerHandler">
      <Expand />
    </el-icon>
    <div @click.stop="openRtrDrawerHandler">
      <svg-icon name="list"
                class="list-icon"></svg-icon>
    </div>
  </header>
  <RouterView :name="$$(basicStore, 'curSize')"></RouterView>
</template>
<script>
import { defineComponent } from "vue";
import common from "../common";
export default defineComponent({
  ...common,
});
</script>
<style scoped lang="scss" src="../common.scss"></style>
