
import qs from 'qs'

export function getdefaultLang () {
  let searchLang = location.search || ''
  searchLang = searchLang?.split('?')
  let { lang } = qs.parse(searchLang?.[1]) || {}
  if (!lang) {
    lang = navigator.language || 'zh'
  }
  if (lang?.includes('zh')) lang = 'zh'
  return lang
}