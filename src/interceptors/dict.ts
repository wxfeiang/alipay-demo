/*
 * @Author: wxfeiang
 * @Description:  系统字典拦截器
 * @Date: 2024-09-26 16:07:20
 * @LastEditTime: 2024-10-23 15:55:45
 */

import { mainTypeEmums } from '@/enums/mainTypeEmum'

export const qrcodeType = [
  { value: '1', label: '支付' },
  { value: '2', label: '券码核销' },
  { value: '3', label: '分享进入' },
]

// 分享类型
export const shareType = [
  {
    value: '1',
    label: '优惠券分享',
    type: mainTypeEmums.SHARE_COUPN,
    id: 'couponId',
  },
  { value: '2', label: '商品分享', type: mainTypeEmums.SHARE_PROUDUCT, id: 'id' },
  { value: '3', label: '海报二维码分享', type: mainTypeEmums.SHARE_HB, id: 'posterId' },
]
