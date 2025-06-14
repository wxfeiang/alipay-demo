import { useRequest } from 'alova/client'
import { onMounted, onUnmounted, ref } from 'vue'
export default (callback, success, immediate = true, time = 3, gap = 5) => {
  const isPause = ref(false)
  const isShowPwd = ref(false)
  const timerId: any = ref(null)

  // 设置是否显示密码
  const setIsShowPwd = () => {
    isShowPwd.value = true
  }

  // 设置是否暂停
  const setIsPauseFalse = () => {
    isPause.value = false
    startTimer()
  }
  const setIsPauseTrue = () => {
    isPause.value = true
    stopTimer()
  }

  // const {
  //   send: sendAutoApi,
  //   data: autoApiData,
  //   onSuccess,
  // } = useAutoRequest((params) => callback(params), {
  //   immediate,
  //   loading: false,
  //   enableVisibility: true,
  //   enableFocus: true,
  //   enableNetwork: true,
  //   throttle: gap * 1000, // 节流时间，在一定时间内多次触发只会发送1次请求，单位ms
  //   pollingTime: time * 1000, // 轮询时间，单位ms
  //   async middleware(ctx, next) {
  //     if (!isPause.value) {
  //       // 为fals的时候, 继续请求
  //
  //       next()
  //     }
  //   },
  // })
  const {
    send: sendAutoApi,
    data: autoApiData,
    onSuccess,
  } = useRequest((params?: any) => callback(params), {
    immediate,
    loading: false,
    // enableVisibility: true,
    // enableFocus: true,
    // enableNetwork: true,
    // throttle: gap * 1000, // 节流时间，在一定时间内多次触发只会发送1次请求，单位ms
    // pollingTime: time * 1000, // 轮询时间，单位ms
    // async middleware(ctx, next) {
    //   if (!isPause.value) {
    //     // 为fals的时候, 继续请求
    //
    //     next()
    //   }
    // },
  })
  const startTimer = () => {
    timerId.value = setInterval(() => {
      sendAutoApi()
    }, time * 1000)
  }

  const stopTimer = () => {
    clearInterval(timerId.value)
  }

  const resetTimer = () => {
    timerId.value = null
  }

  onSuccess((res) => {
    success(res.data)
  })
  onMounted(() => {
    startTimer()
  })
  onUnmounted(() => {
    stopTimer()
  })

  return {
    sendAutoApi,
    autoApiData,
    isPause,
    isShowPwd,
    setIsPauseFalse,
    setIsPauseTrue,
  }
}
