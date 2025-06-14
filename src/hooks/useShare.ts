import { Constant } from '@/enums/constant'
import { shareType } from '@/interceptors/dict'
import { userShareLog } from '@/service/api/userMessage'
import { useUserStore } from '@/store'
import { changeDict } from '@/utils'

/**
 * @description: 分享
 * @param {string} type 分享类型
 * @return {*}
 *  */

import qs from 'qs'
export default (path: string) => {
  //  获取当前页面实例
  const pages = getCurrentPages()
  // 获取当前页面的实例
  const currentPage = pages[pages.length - 1]
  // 获取页面地址
  const pageUrl = currentPage.route
  // 当前页面是否为统一入口页面
  const flog = Constant.MAIN_PAGE.includes(pageUrl)
  console.log('当前页面地址:', pageUrl)
  // 获取系统用户信息
  const userStore = useUserStore()

  // 获取分享页面参数
  const pathData = qs.parse(path)

  const dictData = changeDict(
    shareType,
    pathData[`${Constant.MAIN_PAGE}?type`] ?? pathData?.type,
    'value',
    'type',
    true,
  )
  const params = {
    shareUserId: pathData?.shareUserId,
    shareType: dictData.value,
    receiveId: flog ? userStore.userInfo?.userDId : '',
    shareUrl: pageUrl + qs.stringify(pathData),
    isRead: flog ? '1' : '0', // 1为查看，0为未查看）
    productId: pathData[dictData.id],
  }

  // 调用分享接口

  async function apiShare() {
    // 调用分享接口
    await userShareLog(params)
  }

  apiShare()
}
