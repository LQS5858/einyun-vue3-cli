import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getModules } from "@/utils/getModules";

const modules = import.meta.glob(["./modules/**/*.js"], {
  eager: true,
});

console.log("modules", modules);

let routes = getModules(modules);
console.log("routes", routes);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
      //如果路由有配置锚点，滚动条滚动到页面锚点位置
    } else if (to?.meta?.hash) {
      const { hash } = to?.meta || {};
      return {
        el: hash,
        behavior: "smooth",
      };
    } else {
      return {
        top: 0,
      };
    }
  },
});

router.beforeEach((to) => {
  NProgress.start();
  let token = null;
  try {
    token = localStorage.getItem("token");
  } catch (error) { }
  const { name, meta } = to || {};
  const { requireLogin, title } = meta || {};
  if (title) document.title = title;
  if (!token && name !== "Login" && requireLogin) {
    return { name: "Login" };
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
