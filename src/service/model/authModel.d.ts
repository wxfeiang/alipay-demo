declare interface LoginParams {
  username: string
  password: string
  verifyCode?: string
}
declare interface LoginModel {
  token: string
}

declare interface resData {
  code?: number | string
  data?: any
}
