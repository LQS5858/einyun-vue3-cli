<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>
        <RouterView :name="$$(basicStore, 'curSize')" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent } from "vue";
import common from "./common";
export default defineComponent({
  ...common,
});
</script>

<style scoped lang="scss" src="./common.scss"></style>
