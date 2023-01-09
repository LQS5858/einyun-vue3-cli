
import { createI18n } from 'vue-i18n'
import { getdefaultLang } from '@/utils/getdefaultLang'

const modules = import.meta.glob([
  './modules/*.json'
], {
  eager: true
})


function siphonI18n (prefix = "zh") {
  return Object.fromEntries(
    Object.entries(
      modules
    ).map(([key, value]) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1];
      return [matched, value?.default];
    })
  )[prefix];
}

let lang = getdefaultLang()
console.log('lang', lang);

const i18n = createI18n({
  locale: lang,
  fallbackLocale: 'en',
  legacy: false, //处理报错Uncaught (in promise) SyntaxError: Not available in legacy mode (at message-compiler.esm-bundler.js:54:19)
  messages: {
    zh: {
      ...siphonI18n('zh') //参数为modules下定义的json文件名
    },
    en: {
      ...siphonI18n('en')
    }
  }
})

export { i18n }