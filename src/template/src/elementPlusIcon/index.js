import { Expand } from "@element-plus/icons-vue";

const icons = [Expand];

export default function iconInstall (app) {
  icons?.forEach((item) => {
    app.component(item.name, item);
  });
}
