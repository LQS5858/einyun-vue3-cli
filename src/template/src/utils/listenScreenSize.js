import { debounce } from "lodash";
import { resizeDelay } from '@/config/common'
import { useBasicStore } from '@store/basic'
import { setMinWidth, removeMinWidth } from '@/utils/common'

const excuteSize = debounce(() => {
  const basicStore = useBasicStore()
  console.log('listen-1');
  const screenSize = document.body.clientWidth
  const ua = navigator.userAgent?.toLowerCase()
  if (/ipad/.test(ua) || (screenSize < 880 && screenSize >= 775)) {
    removeMinWidth()
    basicStore.changeSize('ipad')
  } else if (screenSize < 775) {
    removeMinWidth()
    basicStore.changeSize('h5')
  } else if (screenSize < 1400) {
    try {
      setMinWidth()
      basicStore.changeSize('notebook')
    } catch (error) {
      console.error(error);
    }
  } else {
    removeMinWidth()
    basicStore.changeSize('pc')
  }

}, resizeDelay)
function listenScreenSize () {
  excuteSize()
  window.addEventListener('resize', excuteSize)
}

function removeListen () {
  window.removeEventListener('resize', excuteSize)
}

export { listenScreenSize, excuteSize, removeListen }