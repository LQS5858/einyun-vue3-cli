import Decimal from "decimal.js";

/**
 * @description 加法
 * @param {*} x1
 * @param {*} x2
 * @returns
 */
export function nPlus (x1 = "", x2 = "") {
  if (!x1 || !x2) return;
  if (typeof +x1 !== "number" || typeof +x2 !== "number") {
    new Error("arguments is not number");
    return;
  }
  try {
    let temp1 = new Decimal(+x1);
    let temp2 = new Decimal(+x2);
    return temp1.plus(temp2);
  } catch (error) { }
}

/**
 * @description 减法
 * @param {} x1
 * @param {*} x2
 * @returns
 */

export function nMinus (x1 = "", x2 = "") {
  if (!x1 || !x2) return;
  if (typeof +x1 !== "number" || typeof +x2 !== "number") {
    new Error("arguments is not number");
    return;
  }
  try {
    let temp1 = new Decimal(+x1);
    let temp2 = new Decimal(+x2);
    return temp1.minus(temp2);
  } catch (error) { }
}

/**
 * @description 乘法
 * @param {*} x1
 * @param {*} x2
 * @returns
 */
export function nTimes (x1 = "", x2 = "") {
  if (!x1 || !x2) return;
  if (typeof +x1 !== "number" || typeof +x2 !== "number") {
    new Error("arguments is not number");
    return;
  }
  try {
    let temp1 = new Decimal(+x1);
    let temp2 = new Decimal(+x2);
    return temp1.times(temp2);
  } catch (error) { }
}

/**
 * @description 除法
 * @param {*} x1
 * @param {*} x2
 * @returns
 */

export function nDiv (x1 = "", x2 = "") {
  if (!x1 || !x2) return;
  if (typeof +x1 !== "number" || typeof +x2 !== "number") {
    new Error("arguments is not number");
    return;
  }
  try {
    let temp1 = new Decimal(+x1);
    let temp2 = new Decimal(+x2);
    return temp1.div(temp2);
  } catch (error) { }
}

/**
 * @description  -数字千分位不补0
 * @param {*} x
 * @param {*} precision -保留小数位数
 * @param {*} round -为1-向上四舍五入,为0向下舍入
 * @returns
 */
export const toDecimal = (x, precision = 2, round = 0) => {
  if (!x) return;
  if (typeof +x !== "number") {
    new Error("arguement is not number");
    return;
  }
  let precision_ = Math.pow(10, precision);
  let mulNum = nTimes(+x, +precision_);
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
};

/**
 * @description 保留小数数字不补0
 * @param {*} num
 * @param {*} precision -保留小数位数
 * @param {*} round -为1-向上四舍五入,为0向下舍入
 * @returns
 */

export const toNumTrunc = (num, precision = 2, round = 0) => {
  if (!num) return;
  if (typeof +num !== "number") {
    new Error("arguement is not number");
    return;
  }
  let precision_ = Math.pow(10, precision);
  let temp = nTimes(+num, +precision_);
  var divtemp = +round ? Math.round(temp) : Math.floor(temp);
  let f = +precision_ ? nDiv(+divtemp, +precision_) : 0;
  var num = f.toString();
  return num;
};
