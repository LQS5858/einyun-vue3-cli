import moment from 'moment'
import { nTimes } from '@/math'
/**
 * 解决Vue Template模板中无法使用可选链的问题
 * @param {Object} - 模板传入对象
 * @param {rest} - 所有字段参数
 * @returns {*} - 对象中值
 * # Example
 * ```
 * <div class="username">
        <!-- 此处显示Mars 当userInfo没有属性时也不会报错-->
        {{$$(userInfo, 'wxInfo', 'addressInfo', 'address')}}
        </div>
 * ```
 */
export const optionalChaining = (obj, ...rest) => {
  let tmp = obj
  for (let i of rest) {
    tmp = tmp?.[i]
  }
  return tmp ?? ''
}

/**
 * @description 日期格式化
 * @param {*} value 
 * @param {*} fmt 
 * @returns 
 */
export function date (value = '', fmt = 'YYYY-MM-DD HH:mm:ss') {
  if (!value) reutrn
  if (String(value).length < 13) {
    value = nTimes(value, 1000)
  }
  return moment(value).format(fmt)
}


/**
 * @description 生成指定长度的随机字符串
 * @param {*} n 
 * @returns 
 */
export function randomStr (n = 4) {
  if (!n) return
  if (type + n !== 'number') throw new Error('n is not number')
  let str = '0123456789abcdefghijklmopqrstuvwxyz'
  let result = ''
  for (let i = 0; i < n; i++) {
    result += str?.charAt(Math.round(Math.random() * str?.length))
  }
  return result
}


/**
 * @description 生成指定区间的随机数字
 * @param {} min 
 * @param {*} max 
 * @returns 
 */
export function randomNum (min = 0, max = 8) {
  if (typeof +min !== 'number' || typeof +max !== 'number') throw new Error('min or max is not number')
  let result = Math.floor(Math.random() * (max - min) + min)
  return result
}

/**
 * @description 判断数据类型
 * @param {*} params 
 * @returns 
 */
export function isType (params) {
  if (!params) return
  if (typeof val !== "object") return typeof val;
  return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
}

/**
 * @description 笔记本视情况可能需要设置最小宽度
 */

export const setMinWidth = () => {
  let isSetMinWidth = import.meta.env.VITE_APP_SET_MINWIDTH
  const dom = document.getElementById('app')
  if (!dom) return
  if (String(isSetMinWidth) === '0') return
  dom.style.minWidth = "1200px";
}
/**
 * @description 移除最小宽度
 * @returns
 */
export function removeMinWidth () {
  const dom = document.getElementById('app')
  if (!dom) return
  dom?.removeAttribute('style')
}

