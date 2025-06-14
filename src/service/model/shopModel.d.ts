// declare interface BaseType<T> {
//   code?: string | number
//   msg?: string
//   data?: T
// }
declare type ActivityParams = {
  id: string | number
  userDId: string | number
  userId: string | number
}

declare type PageOption = {
  page?: number
  size?: number
  bannerFlag?: 1 | '1'
  location?: string
  shopHdState?: string | number
}

interface IActivityBean {
  activityName: string
  activityContent: string
  createTime: string
  endTime: string
}

interface IProductSpuBean {
  spuName: string
  rotationUrl: string
  sellPrice: number
  frequently: string
}

interface ITBCoupon {
  couponName: string
  couponBeginDate: string
  couponEndDate: string
  couponPrice: number
  couponFillPrice: number
  couponType: number
  couponRemark: string
  couponId: number
}

declare interface IActivity {
  activityBean?: Partial<IActivityBean>
  productSpuBean?: Partial<IProductSpuBean>[]
  tbCoupon?: Partial<ITBCoupon>[]
}

declare interface IActivityBanner {
  itemId: number
  shopHdBanner: string
}

declare interface IPaginationData<T> {
  content?: T[]
  number?: number
  numberOfElements?: 9
  size?: number
  totalElements?: number
  totalPages?: number
}

declare interface IStdTDParams {
  appId: string
  data: {
    publicKey: string
    xm: string
    cardNo: string
    // "调用终端：1 微信小程序 2 支付宝小程序 3 androd 4 ios  "
    term: '1' | '2' | '3' | '4'
    userId: string | number
  }
  appSign: string
}
