import { agencyTextingService, getPhoneCode, sendMsgCode } from '@/service/api/userMessage'
import { useCaptcha } from 'alova/client'

export default (flag = 0, time = 90) => {
  // 获取验证码
  const {
    send: sendPhoneCode,
    loading: sending,
    countdown,
    data: codeData,
  } = useCaptcha(
    (data) => {
      switch (flag) {
        case 1:
          return agencyTextingService(data)
        case 2:
          return sendMsgCode(data)
        default:
          return getPhoneCode(data)
      }
    },
    {
      initialCountdown: time,
      loading: false,
    },
  )
  return {
    sendPhoneCode,
    countdown,
    sending,
    codeData,
  }
}
