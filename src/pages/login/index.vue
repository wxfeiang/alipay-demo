<route lang="json5">
{
  layout: 'default',
  needLogin: true,
  style: {
    navigationStyle: 'custom',
    'mp-alipay': {
      transparentTitle: 'always',
      titlePenetrate: 'YES',
      defaultTitle: '',
      titlePenetrate: 'NO',
    },
  },
}
</route>
<script lang="ts" setup>
import { phoneLogin } from '@/service/api/auth'
import { useForm } from 'alova/client'

const form = ref()
const {
  loading: phoneLoading,
  send: handleSubmit,
  form: model,
} = useForm(
  (formData) => {
    const params = {
      userId: '',
      userPhone: formData.phone,
      userName: '',
      verCode: formData.code,
      shopId: '',
    }
    // 可以在此转换表单数据并提交
    return phoneLogin(params)
  },
  {
    // 设置这个参数为true即可在提交完成后自动重置表单数据
    resetAfterSubmiting: true,
    immediate: false,
    loading: false,
    // 初始化表单数据
    initialForm: {
      phone: '',
      imgcode: '',
      code: '',
    },
  },
)
</script>
<template>
  <view class="pt-150px bg-#ccc">
    <wd-form ref="form" :model="model">
      <wd-cell-group border>
        <wd-input
          label="用户名"
          label-width="100px"
          prop="value1"
          clearable
          v-model="model.code"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <wd-input
          label="密码"
          label-width="100px"
          prop="value2"
          show-password
          clearable
          v-model="model.imgcode"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </wd-cell-group>
      <view class="footer">
        <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
      </view>
    </wd-form>
  </view>
</template>
<style lang="scss" scoped>
:deep(.label-class),
:deep(.text-btn) {
  font-size: 12px !important;
  color: #999 !important;
}

:deep(.wd-img) {
  vertical-align: middle !important;
}

:deep(.custom-class-ftn) {
  margin: 0 !important;
}
</style>
