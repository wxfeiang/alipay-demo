import PLATFORM from '@/utils/platform'

const {
  VITE_APP_PROXY_PREFIX,
  VITE_SERVER_BASEURL,
  VITE_PAY_BASEURL,
  VITE_SERVER_STATIC_URL,
  VITE_SERVER_STATIC_PREFIX,
} = import.meta.env

// FIX: 注意路径斜杠
// 第一个代理后端地址
export const baseUrlApi = (url: string) => {
  if (PLATFORM.isH5) {
    return VITE_APP_PROXY_PREFIX + url
  } else {
    return VITE_SERVER_BASEURL + url
  }
}

// 静态资源代理地址
export const staticUrlApi = (url: string) => {
  if (PLATFORM.isH5) {
    return VITE_SERVER_STATIC_PREFIX + url
  } else {
    return VITE_SERVER_STATIC_URL + url
  }
}

// 支付代理地址
export const payUrlApi = (url: string) => {
  return VITE_PAY_BASEURL + url
}

// 第二个代理后端地址
export const baseUrlOtherApi = (url: string) => `otherApi${url}`
