import { createApp } from "vue";
import pinia from "./stores";
import App from "./App.vue";
import router from "./router";
import { i18n } from "@/locale";
import SvgIcon from "@/components/svg-icon/entry";
import { optionalChaining } from "@/utils/common";
import "virtual:svg-icons-register";
import "@/assets/styles/global.scss";
import { useRegisterSW } from "virtual:pwa-register/vue";
import ElementIcon from "@/elementPlusIcon";
import { installDirectives } from "@/directives";
import '@/utils/expandArray'

import { initSentry } from "@/utils/sentry";
useRegisterSW();

const app = createApp(App);
if (!import.meta.env.DEV) {
  initSentry(app, router);
}

app.config.globalProperties.$$ = optionalChaining;

app.use(installDirectives);
app.use(SvgIcon);
app.use(ElementIcon);
app.use(pinia);
app.use(router);
app.use(i18n);

app.mount("#app");
