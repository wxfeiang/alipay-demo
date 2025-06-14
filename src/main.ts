import '@/style/index.scss'
import 'virtual:uno.css'
import { createSSRApp } from 'vue'
import App from './App.vue'
import { prototypeInterceptor, routeInterceptor } from './interceptors'
import store from './store'

import shareModule from '@/utils/share'
uni.$zp = {
  config: {
    // 配置分页默认pageSize为15

    // 配置空数据图默认描述文字为：空空如也~~
    'empty-view-text': '空空如也~~',
    // ...
  },
}
export function createApp() {
  const app = createSSRApp(App)
  app.mixin(shareModule)
  app.use(store)
  app.use(routeInterceptor)
  app.use(prototypeInterceptor)
  return {
    app,
    store,
  }
}
