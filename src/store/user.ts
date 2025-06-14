import { dataDesensitization } from '@/utils'
import { TOKEN_OVER } from '@/utils/constant'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const initState = {
  nickname: '',
  avatar: '',
  tokenTime: new Date().getTime(),
  appSign: '',
}

interface GlobalDialogData {
  url?: string
  flog?: boolean
  showTps?: number
  title?: string
}
export const useUserStore = defineStore(
  'user',
  () => {
    const openid = ref(null)
    const userInfo = ref<Partial<IUserInfo>>({ ...initState })
    // app 数字身份插件
    const realNamePlugin = ref(null)
    const pluginStatus = ref(false)

    const setPluginStatus = (val) => {
      pluginStatus.value = val
    }
    const setUserInfo = (val: IUserInfo) => {
      val.cardNameTm = dataDesensitization(val.cardName, false, 'userName')
      val.idCardNumberTm = dataDesensitization(val.idCardNumber, false, 'last')
      val.socialCardTm = dataDesensitization(val.socialCard, false, 'centerString')
      userInfo.value = val
    }
    const setRealNamePlugin = (val) => {
      realNamePlugin.value = val
    }
    const setOpenid = async (code) => {
      openid.value = code
    }

    const clearUserInfo = () => {
      userInfo.value = {}
      openid.value = null
      // #ifdef APP-PLUS
      uni.setStorageSync('userInfo', {})
      // #endif
      setNoLoginRequired(noLoginRequired.value ?? '30')
    }
    // 一般没有reset需求，不需要的可以删除 退出后调用
    const reset = () => {
      userInfo.value = { ...initState }
    }
    // 是否已经登录
    const isLogined = computed(() => !!userInfo.value.appSign)

    // 严格校验实名信息后
    const isRealSataus = computed(() => {
      return userInfo.value.idCardNumber && userInfo.value.cardId && userInfo.value.isReal === '1'
    })

    // token过期 ture
    const isTokenExpired = computed(() => {
      const date = new Date().getTime()
      return date - userInfo.value.tokenTime > TOKEN_OVER
    })

    function getAuthorization() {
      // Bearer 服务端已经返回了，可以不用再写
      return userInfo.value?.appSign ? { appSign: `${userInfo.value?.appSign}` } : {}
    }

    const noLoginRequired = ref('30')
    const noLoginRequiredDate = ref(
      dayjs().add(Number(noLoginRequired.value), 'day').format('YYYY-MM-DD'),
    )

    function setNoLoginRequired(val: string) {
      console.log('🍺[val]:', val)
      noLoginRequired.value = val
      noLoginRequiredDate.value = dayjs().add(Number(val), 'day').format('YYYY-MM-DD')
    }

    // 显示全局弹框处理

    const showGlobalDialog = ref(false)

    const showGlobalDialogData = ref<GlobalDialogData>()

    function setShowGlobalDialog(val: boolean, data: GlobalDialogData) {
      showGlobalDialog.value = val
      showGlobalDialogData.value = data
      // if (val) {
      //   uni.hideTabBar() // 隐藏tabbar
      // } else {
      //   uni.showTabBar() // 显示tabbar
      // }
    }

    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
      isLogined,
      reset,
      getAuthorization,
      isTokenExpired,
      noLoginRequired,
      setNoLoginRequired,
      noLoginRequiredDate,
      openid,
      setOpenid,
      isRealSataus,
      setShowGlobalDialog,
      showGlobalDialog,
      showGlobalDialogData,
      realNamePlugin,
      setRealNamePlugin,
      setPluginStatus,
      pluginStatus,
    }
  },
  {
    persist: true,
  },
)
