import { NAVIGATE_TYPE } from '@/enums/routerEnum'
import { pages, subPackages, tabBar } from '@/pages.json'
import { isH5 } from '@/utils/platform'
import { Modal } from '@/utils/uniapi/prompt'
import { isArray, isObject, isString } from 'lodash-es'
import qs from 'qs'

/** 判断当前页面是否是tabbar页  */
export const getIsTabbar = () => {
  if (!tabBar) {
    return false
  }
  if (!tabBar.list.length) {
    // 通常有tabBar的话，list不能有空，且至少有2个元素，这里其实不用处理
    return false
  }
  // getCurrentPages() 至少有1个元素，所以不再额外判断
  const lastPage = getCurrentPages().at(-1)
  const currPath = lastPage.route
  return !!tabBar.list.find((e) => e.pagePath === currPath)
}

/**
 * @description: 获取当前页面路由的 path 路劲和 redirectPath 路径
 * @return {}  path 如 'pages/login/index' redirectPath 如 'pages/demo/base/route-interceptor'
 */
export const currRoute = () => {
  // getCurrentPages() 至少有1个元素，所以不再额外判断
  const lastPage = getCurrentPages().at(-1)
  const currRoute = (lastPage as any).$page
  // console.log('lastPage.$page:', currRoute)
  // console.log('lastPage.$page.fullpath:', currRoute.fullPath)
  // console.log('lastPage.$page.options:', currRoute.options)
  // console.log('lastPage.options:', (lastPage as any).options)
  // 经过多端测试，只有 fullPath 靠谱，其他都不靠谱
  const { fullPath } = currRoute as { fullPath: string }
  console.log(fullPath)
  // eg: /pages/login/index?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor (小程序)
  // eg: /pages/login/index?redirect=%2Fpages%2Froute-interceptor%2Findex%3Fname%3Dfeige%26age%3D30(h5)
  return getUrlObj(fullPath)
}

const ensureDecodeURIComponent = (url: string) => {
  if (url.startsWith('%')) {
    return ensureDecodeURIComponent(decodeURIComponent(url))
  }
  return url
}

/**
 * @description:  * 解析 url 得到 path 和 query
 * @param {} url: /pages/login/index?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor
 * @return {} {path: /pages/login/index, query: {redirect: /pages/demo/base/route-interceptor}}
 */
export const getUrlObj = (url: string) => {
  const [path, queryStr] = url.split('?')
  // console.log(path, queryStr)

  if (!queryStr) {
    return {
      path,
      query: {},
    }
  }
  const query: Record<string, string> = {}
  queryStr.split('&').forEach((item) => {
    const [key, value] = item.split('=')
    // console.log(key, value)
    query[key] = ensureDecodeURIComponent(value) // 这里需要统一 decodeURIComponent 一下，可以兼容h5和微信y
  })
  return { path, query }
}

/**
 * @description:  得到所有的需要登录的pages，包括主包和分包的
 * @param {} key 这里设计得通用一点，可以传递key作为判断依据，默认是 needLogin, 与 route-block 配对使用
 * @return {} 如果没有传 key，则表示所有的pages，如果传递了 key, 则表示通过 key 过滤
 */
export const getAllPages = (key = 'needLogin') => {
  // FIX:对权限页面取反
  // 这里处理主包
  const mainPages = [
    ...pages
      .filter((page) => {
        return !(!key || page[key])
      })
      .map((page) => ({
        ...page,
        path: `/${page.path}`,
      })),
  ]
  // 这里处理分包
  const subPages: any[] = []

  subPackages.forEach((subPageObj) => {
    const { root } = subPageObj
    subPageObj.pages.forEach((page) => {})
    subPageObj.pages
      .filter((page) => !(!key || page[key]))
      .forEach((page: { path: string } & Record<string, any>) => {
        subPages.push({
          ...page,
          path: `/${root}/${page.path}`,
        })
      })
  })

  const result = [...mainPages, ...subPages]
  console.log(`getAllPages by ${key} result: `, result)
  return result
}

/**
 * @description: 得到所有的需要登录的pages，包括主包和分包的
 * @param {} string
 * @return {} 只得到 path 数组
 */
export const getNeedLoginPages = (): string[] => getAllPages('needLogin').map((page) => page.path)

/**
 * @description: 得到所有的需要登录的pages，包括主包和分包的
 * @param {} getAllPages
 * @return {} 只得到 path 数组
 */
export const needLoginPages: string[] = getAllPages('needLogin').map((page) => page.path)

/**
 * @description: 得到所有的需要人脸识别的pages，包括主包和分包的
 * @param {} getAllPages
 * @return {} 只得到 path 数组
 */
export const needLoginFeacePages: string[] = getAllPages('needLogin')
  .filter((page) => page.realNameAuthentication)
  .map((page) => page.path)

/**
 * @description: 字典值解析
 * @param {} data 字典数组
 * @param {} value 当前比对值
 * @param {} key  要比对的key 最终返回的key
 * @param {} val  要比对的val
 * @param {} all  是否返回所有匹配的值
 */
export const changeDict = (
  data: any[],
  value: any,
  key: string = 'label',
  val: string = 'value',
  all = false,
) => {
  const result = data.find((item: any) => item[val] === value)
  return all ? (result ?? {}) : (result?.[key] ?? '')
}

/**
 * @description: 返回规定长度的随机字符串
 * @param {} length
 * @return {}
 */
export const randomStr = (length: number) => {
  let result = ''
  const characters = '0123456789abcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

/**
 * @description:  返回当前请求需要的baseUrl
 * @return {}
 */
export const baseUrl = () => {
  if (isH5) {
    return import.meta.env.VITE_APP_PROXY_PREFIX
  } else {
    return import.meta.env.VITE_SERVER_BASEURL + import.meta.env.VITE_APP_PROXY_PREFIX
  }
}

/**
 * @description:  页面跳转
 * @param {} options url  类型   数据
 * @return {}
 */
export const routeTo = (options: { url?: string; data?: any; navType?: NAVIGATE_TYPE }) => {
  let { url, data, navType = NAVIGATE_TYPE.NAVIGATE_TO } = options
  console.log('跳转路径:', url, '====跳转携带参数:', data, navType)

  if (data) {
    const queryStr = qs.stringify(data)
    if (url.includes('?')) {
      url += `&${queryStr}`
    } else {
      url += `?${queryStr}`
    }
  }
  if (navType === NAVIGATE_TYPE.NAVIGATE_BACK || !navType) {
    uni.navigateBack({
      delta: 1,
      url,
    })
    return
  }
  if (navType === NAVIGATE_TYPE.NAVIGATE_TO) {
    uni.navigateTo({
      url,
    })
    return
  }
  if (navType === NAVIGATE_TYPE.SWITCH_TAB) {
    uni.switchTab({
      url,
    })
  }
  if (navType === NAVIGATE_TYPE.REDIRECT_TO) {
    uni.redirectTo({
      url,
    })
  }
}

/**
 * @description:  获取当前地址栏 url 参数 用于第三方进入
 * @param {} key 传入的key
 * @return {}  value
 */
export function getUrlKeyValue(key: string) {
  // 从第一个?开始，且不包括#之后，并截取掉?的部分
  let query = location.search.substring(1)
  query = decodeURIComponent(query)
  // 从#开始的部分，并转换成数组
  const hash = location.hash.split('?')
  // query和hash均没有参数
  if (!query && hash.length < 2) {
    return ''
  }
  // 先取query部分的参数进行匹配
  let vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === key) {
      return pair[1]
    }
  }
  // query没有参数，或者有参数但没找到，则取hash部分的参数
  if (!hash[1]) {
    return ''
  }
  vars = decodeURIComponent(hash[1]).split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === key) {
      return pair[1]
    }
  }
  return ''
}

/**
 * @description:  日期时间去除T
 * @param {} date 传入的key
 * @return {}  value
 */
export function removeT(date: string) {
  if (!date) return ''
  return date.replace('T', ' ')
}

/**
 * @description:  批量处理入参数Json 对象 转码 地址栏
 * @param {} data 传入的key
 * @return {}  data
 */
export function changeUrlJson(data: object) {
  if (!data) return {}
  for (const key in data) {
    data[key] = decodeURIComponent(data[key])
  }
  return data
}

/**
 * @description:  处理小程序码扫码结果
 * @param {} resData 传入的结果
 * @param {} needDecode 是否需要处理里面的数据 单一字符串
 * @return {}  obg 返回拼接后的url /  不符合的提示
 */
export function sceneResult(resData: any, needCode = false) {
  console.log('扫码内容=====>', resData)
  // 如果不是小程序码的标志 直接返回

  //  不是json  也不是链接
  let status = false
  let url = null
  let path = null
  const type = 'WX'
  const data = {}
  if (needCode) {
    return {
      status: true,
      url: resData.result,
    }
  }

  try {
    if (isString(resData.result) && isObject(JSON.parse(resData.result))) {
      const data = JSON.parse(resData.result)
      console.log('🥫[data]:', data)
      const aa = {
        status: true,
        url: data.url,
        ...data,
      }
      console.log('🥫[aa]:', aa)
      return aa
    }
  } catch (error) {
    if (resData.scanType === 'WX_CODE') {
      // 扫描到小程序码支付/核销
      url = decodeURIComponent(resData.path).split('?')
      if (isArray(url) && url[1]) {
        url[1] = url[1].split(',')
        status = url[1].indexOf('xaCard') > -1
        path = `merchantId=${url[1][0].replace('scene=', '')}&type=${url[1][1]}&actionType=${url[1][2]}`
      }
      return {
        status,
        url: path,
        type,
        data,
      }
    } else if (
      resData.scanType === 'QR_CODE' ||
      resData.scanType === 'QR' ||
      resData.type === 'QR_CODE' ||
      resData.type === 'qrcode'
    ) {
      if (resData.result.indexOf('?') > -1) {
        url = decodeURIComponent(resData.result).split('?')
        if (isArray(url) && url[1]) {
          console.log('🥫[url]:', url)
          status = url[1].indexOf('xaCard') > -1
          path = url[1]
        }
        return {
          status,
          url: path,
          type,
          data,
        }
      } else {
        return {
          status: true,
          url: resData.result,
          type: 'socialCard',
        }
      }
    } else {
      // 不是json  也不是链接
      return {
        status: false,
        url: resData.result,
      }
    }
  }
}

/**
 * @description:  处理返回 操作
 */
export function getBack() {
  const pageList = getCurrentPages()
  if (pageList.length <= 1) {
    routeTo({ url: '/pages/index/index', navType: NAVIGATE_TYPE.SWITCH_TAB })
  } else {
    uni.navigateBack()
  }
}

/**
 * @description: 数据脱敏显示
 * @param {} data 数据
 * @param {} flog 是否脱敏
 * @param {} position 脱敏位置
 * @return {}
 */
export function dataDesensitization(
  data: string,
  flog = false,
  position:
    | 'left'
    | 'right'
    | 'center'
    | 'last'
    | 'first'
    | 'lastString'
    | 'centerString'
    | 'phoneString'
    | 'areaString'
    | 'userName'
    | 'promoterName'
    | 'lastFour',
) {
  if (!data) return ''
  if (flog) {
    return data
  } else {
    let len = position === 'first' ? data.length - 2 : data.length - 5
    len = len > 8 ? 8 : len
    let str = '*'
    for (let i = 0; i < len; i++) {
      str += '*'
    }

    switch (position) {
      case 'userName':
        if (data.length === 2) {
          return '*' + data.substring(1, 2) // 截取name 字符串截取第一个字符，
        } else if (data.length === 3) {
          return '*' + '*' + data.substring(2, 3) // 截取第一个和第三个字符
        } else if (data.length > 3) {
          return '*' + '*' + data.substring(3, data.length) // 截取第一个和大于第4个字符
        }
        break
      case 'promoterName':
        if (data.length > 2) {
          return data.substring(0, 1) + '**' // 截取name 字符串截取第一个字符，
        } else {
          return data
        }
      case 'last':
        return data.replace(/(.*)(.{4})/, `${str}$2`)
      case 'first':
        return data.replace(/^(.)(.*)(.{1})/, `${str}$3`)
      case 'lastString':
        return data.replace(/(.)(.*)(.{4})/, `$1${str}$3`)
      case 'centerString':
        return data.replace(/(.{1})(.*)(.{3})/, `$1${str}$3`)
      case 'phoneString':
        return data.replace(/^(.{3})(.*)(.{4})/, `$1***$3`)
      case 'areaString':
        return data.replace(/^(.{6,7})(.*)$/, `$1${str}`)
      case 'lastFour':
        return data.replace(/(.*)(.{4})/, `$2`)
      default:
        return data.replace(/(.*)(.{4})/, `${str}$2`)
    }
  }
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * @description:  根据经纬度计算距离
 * @param {} cdata 传入的1 {}
 * @param {} dData 传入的2 {}
 * @return {} 距离 保留了2位小数
 */
export function haversineDistance(cdata: any, dData: any): number {
  const default1 = 39.058663
  const default2 = 115.878204
  const { latitude: lat1 = default1, longitude: lon1 = default2 } = cdata

  const { latitude: lat2, longitude: lon2 } = dData
  const R = 6371 // 地球半径，单位为公里

  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const distance = R * c // 返回的距离单位为公里

  return Number(distance.toFixed(2))
}

export function formatHTML(html: any) {
  let HTML = ''
  if (html !== undefined && html !== '') {
    HTML = html.replace(/width:\s*[0-9]*[.]*[0-9]*px/g, '')
    HTML = HTML.replace(/height:\s*[0-9]*[.]*[0-9]*px/g, '')

    HTML = HTML.replace(/style=\s*["][;]*["]/g, '')
    HTML = HTML.replace(/style=\s*['][;]*[']/g, '')
    HTML = HTML.replace(/style=\s*["]\//g, '/')
    HTML = HTML.replace(/style=\s*[']\//g, '/')
    HTML = HTML.replace(/style=\s*["]\s/g, '')
    HTML = HTML.replace(/style=\s*[']\s/g, '')

    HTML = HTML.replace(
      /<img/g,
      '<img style="width:100%;height:auto;border-radius:5px;margin:5px 0;overflow:hidden;display:block; object-fit: cover;" ',
    )

    HTML = HTML.replace(/<h1/g, '<h1 style="font-size:38rpx" ')
    HTML = HTML.replace(/<h2/g, '<h1 style="font-size:36rpx" ')
    HTML = HTML.replace(/<h3/g, '<h1 style="font-size:34rpx" ')
    HTML = HTML.replace(/<h4/g, '<h1 style="font-size:32rpx" ')
    HTML = HTML.replace(/<h5/g, '<h1 style="font-size:30rpx" ')
    HTML = HTML.replace(/<p/g, '<p style="font-size:28rpx" ')
    HTML = HTML.replace(/<div/g, '<div style="font-size:28rpx" ')
    return HTML
  } else {
    HTML = ''
    return HTML
  }
}

export function getHTML(html: any) {
  let HTML = ''
  if (html !== undefined && html !== '') {
    HTML = html.replace(/<[^>]+>/g, '')
  }
  return HTML
}

export function nameHide(name) {
  if (!name) {
    name = '*'
    return name
  } else {
    if (name && name.length === 1) {
      name = '*' + name // 截取name 字符串截取第一个字符，
      return name // 张三显示为张*
    } else if (name && name.length === 2) {
      name = '*' + name.substring(1, 2) // 截取name 字符串截取第一个字符，
      return name // 张三显示为张*
    } else if (name && name.length === 3) {
      name = '**' + name.substring(2, 3) // 截取第一个和第三个字符
      return name // 李思思显示为李*思
    } else if (name && name.length > 3) {
      name = '***' + name.substring(3, name.length) // 截取第一个和大于第4个字符
      return name // 王五哈哈显示为王**哈
    } else {
      return '****' + name.substring(name.length - 1, name.length)
    }
  }
}

export const loginModal = () => {
  Modal({
    title: '提示',
    content: '您还没有登录,请先登录？',
    showCancel: true,
  }).then((res: any) => {
    if (res.confirm) {
      // 重定向
      const router = '/pages/login/index'
      const redirectRoute = `${router}`
      uni.navigateTo({ url: redirectRoute })
    }
  })
}

/**
 * 校验中国身份证号（15位简版 + 18位标准版）
 * @param {string} idCard 身份证号
 * @returns {boolean}
 */
export function isValidChinaID(idCard) {
  const regex =
    /^(^[1-9]\d{5}(?:19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dXx]$)|(^[1-9]\d{5}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}$)$/

  if (!regex.test(idCard)) return false

  // --------------- 18位身份证校验码验证 ---------------
  if (idCard.length === 18) {
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    const parity = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    let sum = 0

    for (let i = 0; i < 17; i++) {
      sum += parseInt(idCard[i]) * factor[i]
    }

    const lastChar = idCard[17].toUpperCase()
    return parity[sum % 11] === lastChar
  }

  return true // 15位身份证不校验出生日期逻辑
}

/**
 * 校验姓名，支持名·姓形式，长度为2-20
 * @param {string} name 姓名
 * @return {boolean}
 */
export function isValidName(name) {
  const extendedRegex = /^(?:[\u4e00-\u9fa5]{2,20}|[\u4e00-\u9fa5]+·[\u4e00-\u9fa5]+)$/
  return extendedRegex.test(name)
}

/**
 * 校验手机号码，支持+8618919888888形式，+86可选
 * @param {string} phone 手机号码
 * @return {boolean}
 */
export function isValidPhone(phone) {
  return /^(\+86\s?)?(?!148)1[3-9]\d{9}$/.test(phone)
}

/**
 * 校验地址，支持中英文、数字及部分标点符号，不支持特殊字符
 * @param {string} address 地址
 * @return {boolean}
 */
export function isValidAddress(address) {
  const basicAddressRegex = /^[\u4e00-\u9fa5A-Za-z0-9-()（）#·\s]{5,70}$/
  return basicAddressRegex.test(address)
}

/**
 * 清理字符串中的空格
 * @param {string} str 要清理的字符串
 * @return {string} 清理后的字符串
 */
export function clearSpace(str) {
  return str.replace(/\s+/g, '')
}

/**
 * 处理字符图片
 * @param {string} str imgs
 * @return {arr}  arr
 */
export function handleImg(str) {
  console.log('🍝[str]:', str)
  if (!str) return []
  const imgs = str.split(',')
  return imgs
}

export function calculateAgeByIdCard(idCard) {
  // 获取当前日期（2025-06-04）
  const currentDate = new Date(2025, 5, 4) // 月份是0-11

  // 从身份证号提取出生日期
  let birthDateStr
  if (idCard.length === 18) {
    birthDateStr = idCard.substring(6, 14) // 18位身份证
  } else if (idCard.length === 15) {
    birthDateStr = '19' + idCard.substring(6, 12) // 15位身份证
  } else {
    // return '身份证号格式不正确';
    return -99
  }

  // 解析出生日期
  const birthYear = parseInt(birthDateStr.substring(0, 4))
  const birthMonth = parseInt(birthDateStr.substring(4, 6)) - 1 // 月份是0-11
  const birthDay = parseInt(birthDateStr.substring(6, 8))
  const birthDate = new Date(birthYear, birthMonth, birthDay)

  // 计算年龄
  let age = currentDate.getFullYear() - birthDate.getFullYear()

  // 如果今年生日还没过，年龄减1
  if (
    currentDate.getMonth() < birthMonth ||
    (currentDate.getMonth() === birthMonth && currentDate.getDate() < birthDay)
  ) {
    age--
  }

  return age
}
