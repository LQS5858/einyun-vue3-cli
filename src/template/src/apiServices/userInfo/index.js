import http from '../http'

/**
 * 
 * @param {*} params 
 * @param {*} showError -用户主动发起请求，配置该参数在axios拦截里面抛出错误
 * @returns 
 */

export const getUserInfo = (params, showError = false) => {
  return http.get('/portal/portal/main/v1/myHome', { params, showError }).then(res => [res, null]).catch(err => [null, err])
}