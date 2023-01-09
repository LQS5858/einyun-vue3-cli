const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    components: {
      pc: () => import("@/layout/default"),
      notebook: () => import("@/layout/default"),
      h5: () => import("@/layout/default/h5"),
      ipad: () => import("@/layout/default"),
    },
    children: [
      {
        path: "",
        name: "Home",
        components: {
          pc: () => import("@/views/home"),
          h5: () => import("@/views/home"),
          ipad: () => import("@/views/home"),
          notebook: () => import("@/views/home"),
        },
      },
    ],
    meta: {
      keepAlive: false,
      title: "首页",
    },
  },
  {
    path: "/demo",
    name: "Demo",
    components: {
      pc: () => import("@/views/demo/index.vue"),
      notebook: () => import("@/views/demo/index"),
      h5: () => import("@/views/demo/h5"),
      ipad: () => import("@/views/demo/index"),
    },
    meta: {
      keepAlive: false,
      title: "Demo",
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    components: {
      pc: () => import("@/views/404"),
      notebook: () => import("@/views/404"),
      h5: () => import("@/views/404"),
      ipad: () => import("@/views/404"),
    },
    meta: {
      title: '404'
    }
  }
];

export { routes };
