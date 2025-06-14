<route lang="json5" type="home">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationStyle: 'custom',
    'mp-alipay': {
      transparentTitle: 'always',
      defaultTitle: '',
      titlePenetrate: 'NO',
      backButtonIcon: null,
    },
  },
}
</route>
<script lang="ts" setup>
import { phoneLogin } from '@/service/api/auth'
import { useCaptcha } from 'alova/client'

const {
  send: sendPhoneCode,
  loading: sending,
  countdown,
  data: codeData,
} = useCaptcha(
  (data) => {
    console.log('---')
    return phoneLogin(data)
  },
  {
    initialCountdown: 90,
    loading: false,
    immediate: true,
  },
).onError((err) => {
  console.log(err)
})
const codeClick = () => {
  console.log('12')
  sendPhoneCode({ a: 1 })
}
</script>
<template>
  <view class="px-20px color-#000 pt-200px">请不要关注页面 ，查看控制台</view>
  <view class="mt-20px w-100%">
    <wd-button type="primary" size="large" @click="codeClick" block>获取验证吗</wd-button>
  </view>
</template>

<style>
page {
  background: linear-gradient(180deg, #d1e8ff 0%, #f7f7f7 30%, #f2f3f7 100%);
}
</style>
<style>
:deep(.nav_show) {
  @apply bg-transparent!;
}

:deep(.nav_hide) {
  @apply bg-#2B66ED! color-#fff!;
}

.serch-bg {
  background: rgba(255, 255, 255, 0.18);
  border-radius: 6px 6px 6px 6px;
}

.search-type::after {
  position: absolute;
  top: 2px;
  bottom: 2px;
  left: -10px;
  width: 1px;
  content: '';
  background: rgba(255, 255, 255, 0.65);
}

.swiper {
  --wot-swiper-radius: 0;
  --wot-swiper-item-padding: 0 24 rpx;
  --wot-swiper-nav-dot-color: #fff;
  --wot-swiper-nav-dot-active-color: #4d80f0;
}

:deep(.custom-class-noticebar) {
  @apply p-0! bg-transparent!  color-#333! text-14px! w-60vw overflow-hidden truncate-1! text-28rpx!;
  text-overflow: ellipsis;
}

.menuitem:first-child {
  margin-left: 10px !important;
}

.fwzq {
  margin-bottom: 10px;
}
/*  #ifdef  MP-ALIPAY  */
.al-Left {
  @apply pl-30px mt-[-2px];
}
/*  #endif  */

.rmfw {
  background: linear-gradient(180deg, #e0eeff 0%, #ffffff 100%);
}
</style>
