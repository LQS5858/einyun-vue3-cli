<template>
  <el-config-provider :locale="curLang">
    <keep-alive v-if="$$($route, 'meta', 'keepAlive')">
      <RouterView :name="$$(basicStore, 'curSize')"
                  v-slot="{ Component, route }">
        <transition name="slide">
          <component :is="Component"
                     :key="$$(route, 'fullPath')" />
        </transition>
      </RouterView>
    </keep-alive>
    <router-view v-else
                 :name="$$(basicStore, 'curSize')"
                 v-slot="{ Component, route }">
      <transition name="slide">
        <component :is="Component"
                   :key="$$(route, 'fullPath')" />
      </transition>
    </router-view>
    <!-- <transition v-else
                name="slide">
      <RouterView :name="$$(basicStore, 'curSize')"> </RouterView>
    </transition> -->
  </el-config-provider>
</template>
<script setup>
import { useBasicStore } from "@store/basic";
import {
  listenScreenSize,
  excuteSize,
  removeListen,
} from "@/utils/listenScreenSize";
import { computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";

const basicStore = useBasicStore();
const { locale } = useI18n();
console.log("basic", basicStore.curSize);

let curLang = computed(() => {
  const obj = {
    zh: zhCn,
    en,
  };
  return obj?.[locale?.value];
});
onMounted(() => {
  listenScreenSize();
});
onUnmounted(() => {
  removeListen();
});
</script>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter,
.slide-leave-to {
  transform: translateX(10px);
}
</style>
