<script setup lang="ts">
import { useUserStore } from './store'

const authStore = useUserStore()

onShow(async (e) => {
  if (e && e.referrerInfo && e.referrerInfo.extraData && e.referrerInfo.extraData.openPath) {
    uni.navigateTo({ url: e.referrerInfo.extraData.openPath })
  }
})

//
</script>

<style lang="scss">
/* stylelint-disable selector-type-no-unknown */
button::after {
  border: none;
}

swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

button {
  display: inline-block;
  background-color: transparent;

  &::after {
    border: none;
  }
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
</style>
