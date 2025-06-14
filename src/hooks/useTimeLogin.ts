import { useUserStore } from '@/store'
import { Modal } from '@/utils/uniapi/prompt'
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
const loginRoute = '/pages/login/index'
export default (url = loginRoute, time = 30) => {
  const { clearUserInfo } = useUserStore()
  const { isLogined, noLoginRequiredDate } = storeToRefs(useUserStore())

  const timerId: any = ref(null)

  const startTimer = () => {
    if (timerId.value) {
      stopTimer()
    }
    timerId.value = setInterval(() => {
      cdata()
    }, 1000 * 5)
  }
  const stopTimer = () => {
    clearInterval(timerId.value)
  }

  const resetTimer = () => {
    timerId.value = null
  }
  function cdata() {
    console.log('免密登录检测中: 到期时间', noLoginRequiredDate.value)
    if (!dayjs().isBefore(noLoginRequiredDate.value)) {
      stopTimer()
      Modal({
        title: '提示',
        content: '您的免密登录到期了，请重新登录！',
        showCancel: false,
      }).then((res: any) => {
        if (res.confirm) {
          // 重定向
          const router = loginRoute
          const redirectRoute = `${router}?redirect=${encodeURIComponent(url)}`
          uni.navigateTo({ url: redirectRoute })
          LogOut()
        } else {
          startTimer()
        }
      })
    }
  }
  const LogOut = async () => {
    try {
      // await sendLogOut()
      clearUserInfo()
    } catch (error) {}
    // TODO: 清除用户信息
    clearUserInfo()
  }

  if (isLogined.value) {
    startTimer()
  } else {
    stopTimer()
  }

  return {
    startTimer,
    resetTimer,
  }
}
