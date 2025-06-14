import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'

import { ContentTypeEnum, ResultEnum } from '@/enums/httpEnum'
// eslint-disable-next-line import/named
import { useUserStore } from '@/store'
import { checkStatus } from '@/utils/http/checkStatus'

import { Constant } from '@/enums/constant'
import { assign } from 'lodash-es'
import { HideLoading, Loading } from '../uniapi/prompt'

const timeOut = Constant.TOKEN_TIMEOUT_VALUE
const HEADER = {
  'Content-Type': ContentTypeEnum.JSON,
  Accept: 'application/json, text/plain, */*',
}

/**
 * alova 请求实例
 * @link
 */

const alovaInstance = createAlova({
  // baseURL: baseUrl(), //TODO:多服务配置情况下不需要基本前缀
  ...AdapterUniapp(),

  timeout: Number(timeOut),
  cacheFor: null,
  beforeRequest: (method) => {
    const userStore = useUserStore()

    // 默认不是用全局加载状态。。。
    if (method?.meta?.loading) {
      Loading(method?.meta?.loadingText || '加载中...')
    }

    let token = {}
    if (!method?.meta?.ignorToken) {
      token = userStore.getAuthorization()
    }
    method.config.headers = assign(method.config.headers, HEADER, token)
  },

  responded: {
    /**
     * 请求成功的拦截器
     * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
     * @param response
     * @param method
     */
    onSuccess: async (response, method) => {
      const { config, meta } = method
      if (meta?.loading) {
        HideLoading()
      }

      const { enableDownload, enableUpload, responseType, dataType } = config as any
      // 返回所有结果
      const { statusCode, data: rawData } = response as any
      const { msg, data, code } = rawData as any

      // 返回所有结果
      if (statusCode === 200 && (meta?.resAll || responseType || dataType)) {
        return response
      } else {
        if (statusCode === 200) {
          if (enableDownload) {
            // 下载处理
            return rawData
          }
          if (enableUpload) {
            // 上传处理
            return rawData
          }
          // 返回不解析的数据 ()
          const resAllData = meta?.Analysis ? rawData : response
          const { data: rdata, code: rode, msg: rmsg, errCode, errMsg } = resAllData
          console.log(method.url + '====>🍯[解析后的数据]:', resAllData)
          if (meta?.AnalysisData) {
            return resAllData
          }
          if (
            rode !== ResultEnum.CODE ||
            (rdata.code && rdata.code * 1 !== ResultEnum.CODE) ||
            (errCode && errCode !== ResultEnum.CODE)
          ) {
            !meta?.Tips &&
              (rmsg || errMsg) &&
              checkStatus(
                statusCode,
                rdata?.message ?? rdata?.msg ?? rmsg ?? errMsg ?? '',
                meta?.tipsType,
              )
            return Promise.reject(resAllData)
          } else {
            // success
            return rdata as any
          }
        }
      }
      !meta?.Tips && checkStatus(statusCode, msg || '')
      return Promise.reject(rawData)
    },

    /**
     * 请求失败的拦截器，请求错误时将会进入该拦截器。
     * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
     * @param err
     * @param method
     */
    onError: (err, method) => {
      const { config, meta } = method
      if (meta?.loading) {
        HideLoading()
      }

      console.log(err, method, '~~~~~~~~333~~~~~~~~')
      // 制卡进度查询-查询提示信息优化，自主处理
      if (method.url.indexOf('getCardScheduleInfo') >= 0) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({ err, method })
      }
      checkStatus(500)
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ err, method })
    },
  },
})

export const request = alovaInstance
