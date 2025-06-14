/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  /** 网站标题，应用名称 */
  readonly VITE_APP_TITLE: string

  /** 网站logo标题 */
  readonly VITE_APP_LOGOTITLE: string

  /** 服务端口号 */
  readonly VITE_SERVER_PORT: number
  /** 后台接口地址 */
  readonly VITE_SERVER_BASEURL: string
  /** 支付地址 */
  readonly VITE_PAY_BASEURL: string
  /** H5是否需要代理 */
  readonly VITE_APP_PROXY: 'true' | 'false'
  /** H5是否需要代理，需要的话有个前缀 */
  readonly VITE_APP_PROXY_PREFIX: string // 一般是/api
  /** 上传图片地址 */
  readonly VITE_UPLOAD_BASEURL: string
  /** 文件显示地址前缀 */
  readonly VITE_FILE_BASRURL: string
  /** 是否清除console */
  readonly VITE_DELETE_CONSOLE: string

  /** 网络请求超时 */
  readonly VITE_SERVER_TIME_OUT: number

  /** 半屏幕小程序 */
  VITE_HALF_APPID: string
  /** 静态资源地址 */
  readonly VITE_SERVER_STATIC_URL: string
  /** 静态资源前缀 */
  readonly VITE_SERVER_STATIC_PREFIX: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
