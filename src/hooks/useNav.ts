import PLATFORM from '@/utils/platform'
onMounted(async () => {
  if (PLATFORM.isH5) {
    navTop.value = navTop.value - 44
  }
})

const { safeAreaInsets } = uni.getSystemInfoSync()

// 计算出顶部所需要的安全距离
const navTop = ref(safeAreaInsets?.top || 0 + 40)
console.log('🍱[navTop]:', navTop)

export default () => {
  return {
    navTop,
  }
}
