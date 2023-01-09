import { nTimes, nDiv } from '@/math'

/**
 * @description 清空数组
 * @param {*} params 
 */

Array.prototype.empty = function () {
  this.splice(0, this.length)
}

/**
 * 
 * @param {*} key -数组对象去重的属性
 */

Array.prototype.unique = function (key) {
  let result = new Map()
  return this?.filter(item => {
    if (key) {
      return !result?.has(item?.[key]) && result.set(item?.[key], 1)
    } else {
      return !result?.has(item) && result.set(item, 1)
    }
  })
}


//扩展数组过滤假值
Array.prototype.filterFalse = function () {
  return this.filter(Boolean)
}


/**
 * 扩展数字,保留小数位数不补0
 * @param {*} precision 精度
 * @param {*} round 是否四舍五入
 * @returns 
 */
Number.prototype.toNumTrunc = function (precision = 2, round = 0) {
  if (!this) return;
  if (typeof +this !== "number") {
    new Error("arguement is not number");
    return;
  }
  let precision_ = Math.pow(10, precision);
  let temp = nTimes(+this, +precision_);
  var divtemp = +round ? Math.round(temp) : Math.floor(temp);
  let f = +precision_ ? nDiv(+divtemp, +precision_) : 0;
  var num = f.toString();
  return num;
}

/**
 * 数字千分位保留小数位数
 * @param {*} precision 精度
 * @param {*} round 是否四舍五入
 */
Number.prototype.toDecimal = function (precision = 2, round = 0) {
  if (!this) return;
  if (typeof +this !== "number") {
    new Error("arguement is not number");
    return;
  }
  let precision_ = Math.pow(10, precision);
  let mulNum = nTimes(+this, +precision_);
  let divNum = +round ? Math.round(mulNum) : Math.floor(mulNum);
  let f = +precision_ ? nDiv(+divNum, +precision_) : 0;
  var num = f.toString();
  var res = num.toString().replace(/\d+/, function (n) {
    // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ",";
    });
  });
  return res;
}


