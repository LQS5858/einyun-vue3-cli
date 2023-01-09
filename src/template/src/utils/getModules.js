import { isEmpty } from "lodash";

export function getResultModules (tempRoutes) {
  if (isEmpty(tempRoutes)) return;
  if (!Array.isArray(tempRoutes) && tempRoutes?.constructor !== Object) {
    new Error("Router modules allow to Array or Object");
    return;
  }
  if (Array.isArray(tempRoutes)) {
    return tempRoutes;
  }
  if (tempRoutes?.constructor === Object) {
    return [tempRoutes];
  }
}

export function getModules (modules = {}) {
  if (isEmpty(modules)) return;
  let result = [];
  if (modules?.constructor !== Object)
    throw new Error("arguments is not object");
  Object.keys(modules).forEach((key) => {
    console.log("modules", modules[key], modules?.[key].test);
    if ("default" in modules?.[key]) {
      let tempRoutes = modules?.[key]?.default;
      console.log("key", modules?.[key], modules?.[key]?.default, tempRoutes);
      let temp = getResultModules(tempRoutes);
      result = temp ? [...result, ...temp] : [];
    } else {
      let resultRoute = modules?.[key];
      Object.keys(resultRoute).forEach((key) => {
        let tempRoutes = resultRoute?.[key];
        let temp = getResultModules(tempRoutes);
        result = temp ? [...result, ...temp] : [];
      });
    }
  });
  return result;
}
