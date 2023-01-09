import { useBasicStore } from "@store/basic";

import { defineComponent, ref, defineAsyncComponent } from "vue";

export default defineComponent({
  name: "DefaultLayout",
  components: {
    EinRDrawer: defineAsyncComponent(() => import("./components/drawer")),
    EinDrawer: defineAsyncComponent(() => import("./components/drawer")),
  },
  setup () {
    let openltrDrawer = ref(false);
    let rtlDrawer = ref(false);
    const basicStore = useBasicStore();
    const openLtrDrawerHandler = () => {
      openltrDrawer.value = true;
    };
    const openRtrDrawerHandler = () => {
      console.log("rtl");
      rtlDrawer.value = true;
    };
    return {
      basicStore,
      openRtrDrawerHandler,
      rtlDrawer,
      openLtrDrawerHandler,
      openltrDrawer,
    };
  },
});
