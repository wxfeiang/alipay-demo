import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'

const REFRESH_TOKEN = baseUrlApi('/refresh/token')

export function getPhoneCode(data) {
  return request.Post(
    REFRESH_TOKEN, // 地址
    data,
  )
}

export function agencyTextingService(data) {
  return request.Post(
    REFRESH_TOKEN, // 地址
    data,
  )
}

export function sendMsgCode(data) {
  return request.Post(
    REFRESH_TOKEN, // 地址
    data,
  )
}

export function getCode(data) {
  return request.Post(
    REFRESH_TOKEN, // 地址
    data,
  )
}
