import { defineComponent, reactive, computed, ref, defineAsyncComponent, onMounted } from "vue";
import { useCounterStore } from "@store/counter";
import { getUserInfo } from "@/apiServices/userInfo";
import logoSvg from "@/assets/logo.svg";

import { nPlus, nMinus, nTimes, nDiv, toNumTrunc, toDecimal } from '@/math'
import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "Demo",
  components: {
    Loading: defineAsyncComponent(() => import('@/components/common/loading'))
  },
  setup (props) {
    let result = ref({});
    let loading = ref(false)
    let id = setTimeout(() => {
      loading.value = true
      id = clearTimeout(id)
    }, 5000);
    let logo = logoSvg
    let blobStr = new Blob([9, 0, 4]);
    const CounterStore = useCounterStore();
    const { locale } = useI18n();
    async function fetchUser () {
      const [res] = await getUserInfo();
      result.value = res;
    }
    const fPlus = computed(() => nPlus(0.1, 0.2))
    const fminus = computed(() => nMinus(0.1, 0.2))
    const ftimes = computed(() => nTimes(0.1, 0.2))
    const fdiv = computed(() => nDiv(0.1, 0.2))

    const numTrunc = computed(() => toNumTrunc(5.6566, 2, 1))
    const numDecimal = computed(() => toDecimal(5566666, 2, 1))

    async function changeLocale () {
      let value = locale?.value;
      if (value?.indexOf("zh") > -1) {
        locale.value = "en";
      } else {
        locale.value = "zh";
      }
    }
    async function changeCount () {
      CounterStore.increment();
    }

    onMounted(() => {
      console.log('filter', [5, 3, 2, '', false].filterFalse());
      console.log('filter2', [{ coin: 'usdt', id: 1 }, { coin: 'ltc', id: 2 }, { coin: 'usdt', id: 3 }].unique('coin'));
    })
    return {
      CounterStore,
      fetchUser,
      blobStr,
      result,
      logo,
      loading,
      numTrunc,
      numDecimal,
      fminus,
      ftimes,
      fdiv,
      fPlus,
      changeCount,
      changeLocale,
    };
  },
});
