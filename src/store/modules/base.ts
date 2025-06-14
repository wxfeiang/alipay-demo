import { defineStore } from 'pinia'
import { ref } from 'vue'
type Location = {
  latitude?: number
  longitude?: number
}

export const useBaseStore = defineStore(
  'baseStore',
  () => {
    // 进入服务页面激活标志
    const active = ref(0)

    function setActive(val) {
      active.value = val
    }

    // 当前用户坐标
    const userLocation = ref({} as Location)

    const setLocation = (val) => {
      userLocation.value = val
    }
    // bannet 自带详情
    const bannerData = ref(0)

    function setbannetData(val) {
      bannerData.value = val
    }

    // 用户历史搜索记录
    const historySearch = ref([])

    const setHistorySearch = (val) => {
      if (historySearch.value.includes(val)) return
      historySearch.value.unshift(val)
      if (historySearch.value.length > 10) {
        historySearch.value.pop()
      }
    }
    const clearHistorySearch = () => {
      historySearch.value = []
    }

    // 服务列表
    const serviceList = ref([])

    const setServiceList = (val) => {
      serviceList.value = val
    }
    // 第三方ID
    const thirdPartyId = ref('')

    const setThirdPartyId = (val) => {
      thirdPartyId.value = val
    }

    return {
      active,
      userLocation,
      setLocation,
      historySearch,
      setHistorySearch,
      clearHistorySearch,
      setActive,
      setbannetData,
      bannerData,
      serviceList,
      setServiceList,
      thirdPartyId,
      setThirdPartyId,
    }
  },
  {
    persist: true,
  },
)
