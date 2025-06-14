import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'
import path from 'node:path'
import { loadEnv } from 'vite'

const env = loadEnv(process.env.NODE_ENV!, path.resolve(process.cwd(), 'env'))

const { VITE_APP_LOGOTITLE } = env
export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    // #ifndef MP-ALIPAY
    navigationBarTitleText: VITE_APP_LOGOTITLE,
    allowsBounceVertical: 'NO',
    // #endif
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
      '^dy-(.*)': 'components/dy-$1/dy-$1.vue',
    },
  },
  tabBar: {
    color: '#000000',
    selectedColor: '#3177f6',
    // selectedColor: '#f6314f',
    backgroundColor: '#fff',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/tabbar2/index.png',
        selectedIconPath: 'static/tabbar2/index-a.png',
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        iconPath: 'static/tabbar2/fuwu.png',
        selectedIconPath: 'static/tabbar2/fuwu-a.png',
        pagePath: 'pages/login/index',
        text: '登录',
      },
    ],
  },
})
