import { Modal, Toast } from '@/utils/uniapi/prompt'

/**
 * 统一处理错误信息
 * @param status 状态码
 * @param msg 错误信息
 * @param tipsType 提示框类型
 * @returns
 */
export function checkStatus(
  status: number,
  msg?: string,
  tipsType: 'toast' | 'model' = 'toast',
): void {
  let errMessage = null
  switch (status) {
    case 400:
      errMessage = `${msg}`
      break
    case 401:
      errMessage = '用户没有权限（令牌、用户名、密码错误）!'
      break
    case 403:
      errMessage = '用户得到授权，但是访问是被禁止的!'
      break
    case 404:
      errMessage = '网络请求错误,未找到该资源!'
      break
    case 405:
      errMessage = '网络请求错误,请求方法未允许!'
      break
    case 408:
      errMessage = '网络请求超时!'
      break
    case 500:
      errMessage = '服务器错误,请联系管理员!'
      // errMessage = false
      break
    case 501:
      errMessage = '网络未实现!'
      break
    case 502:
      errMessage = '服务不可用，服务器暂时过载或维护!'
      break
    case 503:
      errMessage = '服务不可用，服务器暂时过载或维护!'
      break
    case 504:
      errMessage = '网络超时!'
      break
    case 505:
      errMessage = 'http版本不支持该请求!'
      break
    default:
      errMessage = `${msg ?? '未知错误'}`
      // errMessage = false
      break
  }
  if (errMessage) {
    tipsType === 'toast'
      ? Toast(errMessage)
      : Modal({ title: '提示', content: errMessage, showCancel: false })
  }
}
