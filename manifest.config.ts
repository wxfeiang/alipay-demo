// manifest.config.ts
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'
import path from 'node:path'
import { loadEnv } from 'vite'

// 获取环境变量的范例
const env = loadEnv(process.env.NODE_ENV!, path.resolve(process.cwd(), 'env'))
// console.log(env)
const {
  VITE_APP_TITLE,
  VITE_UNI_APPID,
  VITE_WX_APPID,
  VITE_APP_PUBLIC_BASE,
  VITE_FALLBACK_LOCALE,
  VITE_HALF_APPID,
} = env

export default defineManifestConfig({
  name: VITE_APP_TITLE,
  appid: VITE_UNI_APPID,
  description: '',
  versionName: '1.0.8',
  versionCode: '108',
  transformPx: false,
  locale: VITE_FALLBACK_LOCALE, // 'zh-Hans'
  h5: {
    router: {
      base: VITE_APP_PUBLIC_BASE,
    },
  },
  /* 5+App特有相关 */
  'app-plus': {
    usingComponents: true,
    nvueStyleCompiler: 'uni-app',
    compilerVersion: 3,
    compatible: {
      ignoreVersion: true,
    },
    splashscreen: {
      alwaysShowBeforeRender: true,
      waiting: true,
      autoclose: true,
      delay: 0,
    },
    /* 模块配置 */
    modules: {
      Barcode: {},
      Bluetooth: {},
      OAuth: {},
      Camera: {},
      Geolocation: {},
      Maps: {},
      'Webview-x5': {},
    },
    /* 应用发布信息 */
    distribute: {
      /* android打包配置 */
      android: {
        minSdkVersion: 22,
        targetSdkVersion: 28,
        abiFilters: ['armeabi-v7a', 'arm64-v8a', 'x86'],
        permissions: [
          '<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>',
          '<uses-permission android:name="android.permission.VIBRATE"/>',
          '<uses-permission android:name="android.permission.READ_LOGS"/>',
          '<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>',
          '<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.CAMERA"/>',
          '<uses-permission android:name="android.permission.GET_ACCOUNTS"/>',
          '<uses-permission android:name="android.permission.READ_PHONE_STATE"/>',
          '<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>',
          '<uses-permission android:name="android.permission.WAKE_LOCK"/>',
          '<uses-permission android:name="android.permission.FLASHLIGHT"/>',
          '<uses-feature android:name="android.hardware.camera"/>',
          '<uses-feature android:name="android.hardware.camera.autofocus"/>',
          '<uses-permission android:name="android.permission.WRITE_SETTINGS"/>',
          '<uses-permission android:name="android.permission.CALL_PHONE"/>',
          '<uses-permission android:name="android.permission.INTERNET" />',
          '<uses-permission android:name="android.permission.RECORD_AUDIO" />',
          '<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />',
          '<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />',
          '<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />',
        ],
      },
      /* ios打包配置 */
      ios: {},
      /* SDK配置 */
      sdkConfigs: {
        speech: {
          ifly: {},
        },
        geolocation: {
          amap: {
            name: 'amapBjiEH21Je',
            __platform__: ['android'],
            appkey_android: '283b148ee0693ef6eac085445b212735',
          },
          system: {
            __platform__: ['android'],
          },
        },
        oauth: {},
        maps: {
          amap: {
            name: 'amapBjiEH21Je',
            appkey_ios: '283b148ee0693ef6eac085445b212735',
            appkey_android: '283b148ee0693ef6eac085445b212735',
          },
        },
      },
      /* 图标配置 */
      icons: {
        android: {
          hdpi: 'unpackage/res/icons/72x72.png',
          xhdpi: 'unpackage/res/icons/96x96.png',
          xxhdpi: 'unpackage/res/icons/144x144.png',
          xxxhdpi: 'unpackage/res/icons/192x192.png',
        },
      },
    },
  },
  /* 快应用特有相关 */
  quickapp: {},
  /* 小程序特有相关 */
  'mp-weixin': {
    appid: VITE_WX_APPID,
    setting: {
      urlCheck: false,
      minified: true,
    },
    makePhoneCall: {
      desc: '用于拨打电话',
    },
    ignoreDevUnusedFiles: false, // 忽略未使用的文件
    usingComponents: true,

    optimization: { subPackages: true },
    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于小程序位置接口的效果展示',
      },
      'scope.userFuzzyLocation': {
        desc: '你的位置信息将用于小程序位置接口的效果展示',
      },
      'scope.userLocationBackground': {
        desc: '你的位置信息将在后台运行时用于小程序位置接口的效果展示',
      },
      'scope.writeMessage': {
        desc: '你的应用需要发送消息到微信',
      },
    },
    requiredPrivateInfos: ['getLocation', 'chooseLocation'],
    lazyCodeLoading: 'requiredComponents',
    embeddedAppIdList: [VITE_HALF_APPID],
  },
  requiredPrivateInfos: ['getFuzzyLocation'],
  'mp-alipay': {
    usingComponents: true,
    styleIsolation: 'shared',
  },
  'mp-baidu': {
    usingComponents: true,
  },
  'mp-toutiao': {
    usingComponents: true,
  },
  uniStatistics: {
    enable: false,
  },
  vueVersion: '3',
})
