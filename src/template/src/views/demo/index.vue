<template>
  <header style="height:1200px">
    <div class="wrapper flex-column">
      <div class="row">
        语言:{{ $t("test") }}
        <el-button type="primary"
                   @click.stop="changeLocale">切换语言
        </el-button>
      </div>
      <div>
        setup状态: {{ $$(CounterStore, "count") }}
        <el-button type="primary"
                   @click.stop="changeCount">改变状态</el-button>
      </div>
      <div>
        svg:
        <SvgIcon name="logo"></SvgIcon>
      </div>
      <div>
        <span>接口调用:</span>
        <el-button type="primary"
                   @click.stop="fetchUser">获取用户信息</el-button>
        <span>接口返回:{{ result }}</span>
      </div>
      <div>
        <span>自定义指令:</span>
        <el-input v-focus></el-input>
      </div>

      <div>
        <el-button type="primary"
                   v-download-blob:test.click="blobStr">下载blob:</el-button>
        <span>{{ blobStr }}</span>
      </div>
      <div>
        <span>打印指令</span>
        <el-button type="primary"
                   v-print.click>打印</el-button>
      </div>
      <div>
        <span>加0.1+0.2:</span>
        <span>{{ fPlus }}</span>
      </div>
      <div>
        <span>减0.1-0.2:</span>
        <span>{{ fminus }}</span>
      </div>
      <div>
        <span>乘0.1*0.2:</span>
        <span>{{ ftimes }}</span>
      </div>
      <div>
        <span>除0.1/0.2:</span>
        <span>{{ fdiv }}</span>
      </div>
      <div>
        <span>阿里巴巴字体图标:</span>
        <i class="iconfont icon-yiwenwenti"></i>
      </div>

      <div>
        <span>数字原型链上扩展方法:</span>
        <span>{{ (8.888).toNumTrunc(4,1) }}</span>
      </div>
      <div>
        <span>数字原型链上扩展方法2:</span>
        <span>{{ (565655.5464545).toDecimal(3,1) }}</span>
      </div>
      <div>
        <span>math工具函数保留小数位数:</span>
        <span>{{ numTrunc }}</span>
      </div>

      <div>
        <span>math工具函数数字千分位:</span>
        <span>{{ numDecimal }}</span>
      </div>

    </div>
    <div style="height:100px"
         class="flex-column">
      <span>异步组件加载loading</span>
      <Loading v-model:loading="loading"></Loading>
    </div>
  </header>

  <div>
    <img v-lazy="logo"
         alt="">
  </div>
</template>

<script>
import { defineComponent } from "vue";
import index from "./entry";

export default defineComponent({
  ...index,
});
</script>

<style scoped lang="scss" src="./index.scss"></style>
