import { getModules } from "@/utils/getModules";

const modules = import.meta.glob(["./modules/**/*.js"], {
  eager: true,
});

console.log("modules", modules);
let result = getModules(modules);
console.log("directives", result);

const installDirectives = function (app) {
  result?.forEach((item) => {
    Object?.keys(item)?.forEach((key) => {
      app.directive(key, item?.[key]);
    });
  });
};
export { installDirectives };
