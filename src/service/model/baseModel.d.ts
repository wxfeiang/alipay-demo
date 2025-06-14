import { ResultEnum } from '@/enums/httpEnum'

export declare interface API<T = any> {
  code: ResultEnum
  data?: T
  message: string
  success?: boolean
}

export declare interface METHOD_INSTANCE<T = any> {
  data?: T
  ignoreSign?: boolean // 忽略签名
  ignorEencrypt?: boolean // 忽略加密
  ignorToken?: boolean // 忽略token
  resAll?: boolean // 返回所有数据
  Analysis?: boolean // 不加解密的情况下只返回data
  AnalysisData?: boolean // 解析后直接返回(用于全量数据)
  loading?: boolean // 是否显示全局loading 默认不显示
  loadingText?: string // 全局loading文字
  Tips?: boolean // 是否显示  /全局提示 (默认显示: false)  true 不在全局显示
  tipsType?: 'toast' | 'model' // 提示框类型(默认toast)
  initParams?: boolean // 是否需要初始参数
}

export declare interface List<T = any> {
  content: T
  totalElements?: string
  size?: number
  number?: number
  numberOfElements?: number
  totalPages?: number
}

// 字典类型接口
export declare interface DICT<T = any> {
  label: any
  value: T
  type?: string
}
