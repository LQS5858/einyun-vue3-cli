import { i18n } from "@/locale";
import axios from "axios";
import router from "@/router";
import { useBasicStore } from "@store/basic";
import { ElNotification } from "element-plus";
import {
  CancelRepeatRequest,
  RequestInterceptor,
  ResponseInterceptor,
} from "bt-tools";
/**
 * descripe
 * axios封装，如果调用接口需要抛出错误信息，只需要调用接口传入配置{showError:true}即可
 * ```
 * this.$http.post('xx',data,{showError:true})
 * ```
 */

let warningCount = 0;
const service = axios.create({
  timeout: 30000,
  baseURL: import.meta.env.VITE_APP_API_URL,
});
service.interceptors.request.use((config) => {
  let token = localStorage.getItem("token") || null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Accept-Language"] = `${i18n?.global?.locale}`;

  /**
   * 把当前请求信息添加到pendingRequest对象中
   * 通过接口传入配置开关{cancelRequest:true}决定是否开启axios取消重复请求
   * @param {Object} {cancelRequest:true} -通过接口传入配置开关{cancelRequest:true}决定是否开启axios取消重复请求
   * @returns 无
   * 参考文档(需翻墙):https://lqs5858.github.io/bt-tools/bt-tools/1.2.4/global.html
   */
  CancelRepeatRequest.addPendingRequest(config);
  /**
   * 通过传入axios接口配置参数{cache:true}是否开启对api数据缓存
   * @param {Object} {cache:true} -通过传入axios接口配置参数{cache:true}是否开启对api数据缓存
   * @returns 无
   * 参考文档(需翻墙):https://lqs5858.github.io/bt-tools/bt-tools/1.2.4/global.html
   */
  RequestInterceptor(config, service);
  return config;
});
service.interceptors.response.use(
  (res) => {
    // 移除取消队列的api
    // 参考文档(需翻墙):https://lqs5858.github.io/bt-tools/bt-tools/1.2.4/global.html
    CancelRepeatRequest.removePendingRequest(res);
    // 接口成功，对数据进行缓存
    // 参考文档(需翻墙):https://lqs5858.github.io/bt-tools/bt-tools/1.2.4/global.html
    ResponseInterceptor(res);
    const basicStore = useBasicStore();
    const { data: result, config } = res || {};
    const { url } = config || {};
    const { showError } = config || {};
    const { code, message, data } = result || {};
    if (showError && +code !== 0)
      ElNotification({
        type: "warning",
        message: message,
        duration: 1500,
        showClose: false,
      });
    if (+code === 401) {
      try {
        localStorage.removeItem("token");
        basicStore.saveUserInfo(null)
        router.push("/login");
      } catch (error) {
        console.error(error);
      }
    }
    return result;
  },
  (error) => {
    const { response } = error;
    // 服务异常,移除取消列表的api
    CancelRepeatRequest.removePendingRequest(response);
    if (
      error?.code === "ECONNABORTED" ||
      error?.message?.indexOf("timeout") !== -1
    ) {
      if (String(warningCount) === "0" && error?.message) {
        ElNotification({
          type: "error",
          message: i18n?.global.t("network_timeout"),
          duration: 1500,
        });
        warningCount += 1;
        let id = setTimeout(() => {
          warningCount = 0
          id = clearTimeout(id);
        }, 15000);
      }
    }

    return Promise.reject(error);
  }
);

/**
 * @description 同时提供单独定义一个get方法
 * @method get
 * @params url -接口地址
 * @params params -参数
 * @params showError -是否用户主动请求抛出错误
 * @params resType -响应数据类型，针对二进制流文件
 */

export function get (url = "", params = {}, showError = false, resType) {
  if (typeof url !== "string") throw new Error("url is not string");
  if (params?.constructor !== Object) throw new Error("params is not object");
  if (typeof showError !== "boolean")
    throw new Error("showError is not boolean");
  let config = resType ? { params, showError, resType } : { params, showError };
  return service
    .get(url, config)
    .then((res) => [res, null])
    .catch((err) => [null, err]);
}

/**
 * @description 同时单独提供一个post方法
 * @method post
 * @params url -接口地址
 * @params body -参数
 * @params showError -是否用户主动请求抛出错误
 * @params resType -响应数据类型，针对二进制流文件
 */

export function post (url = "", body = {}, showError = false, resType) {
  if (typeof url !== "string") throw new Error("url is not string");
  if (body?.constructor !== Object) throw new Error("params is not object");
  if (typeof showError !== "boolean")
    throw new Error("showError is not boolean");
  let config = resType ? { showError, resType } : { showError };
  return service
    .post(url, body, config)
    .then((res) => [res, null])
    .catch((err) => [null, err]);
}

export default service;
