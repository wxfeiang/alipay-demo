import { baseUrlApi } from '@/interceptors/utils'
import { request } from '@/utils/http'
import { METHOD_INSTANCE } from '../model/baseModel'

const REFRESH_TOKEN = '/refresh/token'
const FACE_LOGIN = baseUrlApi('/member/app/xcxLogin/faceLogin')
const APP_LOGIN_BY_NUMBER = baseUrlApi('/member/app/appLogin/appLoginByNumber')
const FACE_LOGIN_OUT = baseUrlApi('/captcha/faceLoginOut')

const USER_ID_KEY = baseUrlApi('/member/app/xcxLogin/getUserIdKey')
const GET_INFO = baseUrlApi('/member/app/xcxLogin/getInfo')
const ADD_XCX_USER_DETAIL = baseUrlApi('/member/app/xcxLogin/xcxUserLoginByCode')
const ADD_XCX_USER_DETAIL_WXV = baseUrlApi('/member/app/xcxLogin/xcxUserLoginByWx')
const GET_USER_OPEN_ID_BY_CODE = baseUrlApi('/member/app/getUserOpenIdByCode')
const UPDATE_OPENID_AND_UNIONID = baseUrlApi('/member/app/updateOpenIdAndUnionId')

const UPDATE_REAL_NAME = baseUrlApi('/member/app/xcxLogin/updateRealName')

const XCX_SCAN_FACE_REAL_NAME_AUTH = baseUrlApi('/member/app/xcxLogin/xcxScanFaceRealNameAuth')

const LOGIN_OFF = baseUrlApi('/member/app/userInfo/lOginOff')
const GET_SIGN_PARAM = baseUrlApi('/member/digital/identity/getSignParam')
const APP_UPDATE_REALNAME = baseUrlApi('/member/app/appLogin/appUpdateRealName')
const ZFB_QUICK_LOGIN = baseUrlApi('/member/app/zfbLogin/zfbQuickLogin')
const FACE_CERTIFY_INITIALIZE = baseUrlApi('/member/app/zfbLogin/faceCertifyInitialize')
const QR_LOGIN = baseUrlApi('/member/manage/scanCode/scanCodeToken')

const GET_FACE_VERIFICATION_INFO = baseUrlApi('/member/app/zfbLogin/getFaceVerificationInfo')
const ZFB_LOGIN_BY_FACE = baseUrlApi('/member/app/zfbLogin/zfbLoginByFace')
const ZFB_UPDATE_REAL_NAME = baseUrlApi('/member/app/zfbLogin/zfbUpdateRealName')

const THIRD_PARTY_ID = baseUrlApi('/member/applications/v1/getToken')
/**
 * app实名认证
 * @param params
 */

export function appUpdateRealName(data) {
  return request.Post(
    APP_UPDATE_REALNAME, // 地址
    data,
  )
}

export function QRLogin(data) {
  return request.Post(
    QR_LOGIN, // 地址
    data,
  )
}

/**
 * 获取 app数字身份认证参数
 * @param params
 */

export function appLoginByNumber(data) {
  return request.Post(
    APP_LOGIN_BY_NUMBER, // 地址
    data,
  )
}

/**
 * 获取 app数字身份认证参数
 * @param params
 */

export function getSignParam(data) {
  return request.Post(
    GET_SIGN_PARAM, // 地址
    data,
  )
}

/**
 * 获取 人脸识别Key
 * @param params
 */

export function getUserIdKey(data) {
  return request.Post(
    USER_ID_KEY, // 地址
    data,
  )
}

/**
 * 微信获取 识别后信息
 * @param params
 */
export function getUserInfo(data) {
  return request.Post(
    GET_INFO, // 地址
    data,
  )
}
/**
 * 微信获取 识别后信息
 * @param params
 */
export function getFaceVerificationInfo(data) {
  return request.Post(
    GET_FACE_VERIFICATION_INFO, // 地址
    data,
  )
}

/**
/**
 * 人脸登录
 * @param params 初始参数()
 * */
export function faceLogin(data) {
  return request.Post(
    FACE_LOGIN, // 地址
    data,
  )
}

/**
 * 支付宝人脸登录
 * @param params
 */
export function zfbLoginByFace(data) {
  return request.Post(
    ZFB_LOGIN_BY_FACE, // 地址
    data,
  )
}

/**
 * 人脸实名认证
 * @param params 初始参数()
 * */
export function xcxScanFaceRealNameAuth(data) {
  return request.Post(
    XCX_SCAN_FACE_REAL_NAME_AUTH, // 地址
    data,
  )
}

/**
 * 支付宝人脸实名认证
 * @param params 初始参数()
 * */
export function zfbUpdateRealName(data) {
  return request.Post(
    ZFB_UPDATE_REAL_NAME, // 地址
    data,
  )
}

/**
 * 手机登录
 * @param params 初始参数()
 * */
export function phoneLogin(data) {
  return request.Post(
    ADD_XCX_USER_DETAIL, // 地址
    data,
  )
}
/**
 * 登录凭证
 * @param params 初始参数()
 * */
export function openIdCode(data) {
  return request.Post(
    GET_USER_OPEN_ID_BY_CODE, // 地址
    data,
  )
}

/**
 * 小程序登录成功后更新或新增 openId 和 unionId
 * @param params 初始参数()
 * */
export function updateOpenIdAndUnionId(data) {
  return request.Post(
    UPDATE_OPENID_AND_UNIONID, // 地址
    data,
  )
}

/**
 * 微信电话号码登录
 * @param params 初始参数()
 * */
export function phoneChartLogin(data) {
  return request.Post(
    ADD_XCX_USER_DETAIL_WXV, // 地址
    data,
  )
}

/**
 * 支付宝电话号码登录
 * @param params 初始参数()
 * */
export function zfbQuickLogin(data) {
  return request.Post(
    ZFB_QUICK_LOGIN, // 地址
    data,
  )
}

/**
 * 补充电话号码/实名认证
 * @param params 初始参数()
 * */
export function updateRealName(data) {
  return request.Post(
    UPDATE_REAL_NAME, // 地址
    data,
  )
}

/**
 * 登出
 * 测试token
 * @param params
 */
export function logout(data) {
  // TODO: 地址么有配置
  return request.Post(
    FACE_LOGIN, // 地址
    data,
  )
}

/**
 * 刷新token
 */
export function refreshToken() {
  return request.Post<LoginModel>(REFRESH_TOKEN, {})
}

/**
 * 注销
 * @param params 初始参数()
 * */
export function userLogout(data) {
  const meta: METHOD_INSTANCE = {
    loading: true,
    loadingText: '注销中...',
    Tips: true,
  }

  return request.Post(LOGIN_OFF, data, {
    meta,
  })
}

/**
 * 获取支付宝授人脸Key
 * @param params
 */
export function getLoginAlKey(data) {
  return request.Post(FACE_CERTIFY_INITIALIZE, data)
}

/**
 * 获取第三方ID
 * @param params
 */
export function getThirdPartyId(data) {
  const meta: METHOD_INSTANCE = {
    loading: false,
    Tips: false,
    ignorEencrypt: true,
    Analysis: true,
  }

  return request.Post(THIRD_PARTY_ID, data, { meta })
}
