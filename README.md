## demo 说明

- 清不要关注 请求接口的地址的对错

- 开发中跳过 es5 编译后 正常/ 预览模式/真机调试正常/

- 上传体验版后出现报错情况

- useForm、 useCaptcha 、除了 useRequest 都会出现以下错误

```
vue.runtime.esm.js:1418 TypeError: this.$dhy is not a function
    at Object.get (alova-shared.esm.js:453:21)
    at FrameworkState.get (alova-shared.esm.js:468:22)
    at Object.useForm (index.esm.js:2860:78)
    at setup (index.vue:11:5)
    at callWithErrorHandling (vue.runtime.esm.js:1353:22)
    at setupStatefulComponent (vue.runtime.esm.js:4312:29)
    at setupComponent (vue.runtime.esm.js:4268:11)
    at mountComponent (vue.runtime.esm.js:5121:5)
    at createComponent22 (vue.runtime.esm.js:5376:16)
    at $createComponent (uni.mp.esm.js:529:19)

```

- 复现步骤(下图)
- 支付宝小程序 不开启 跳过 es5
  <img src="./iShot2025-06-14 21.37.28.png" width = 300 height = 200>

- 支付宝小程序 官方回复是用上传的都是最终编译成 es5 代码了
  <img src="./iShot2025-06-14 21.42.06.png" width = 300 height = 200>

- 本地开发开启跳过 es5 没有问题 正常了

- 进过上传版本以后就出能真机显示 报错问题了

  <img src="./iShot2025-06-14 21.45.42.png" width = 300 height = 200>

- 支付宝体验版本

  <img src="./iShot2025-06-14 21.52.40.png" width = 300 height = 200>

  - 描述不清楚的话我去在补充
